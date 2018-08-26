const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { config: { apiBaseUrl, apiKey, eventsInterval, dateFormat} } = require('./footballAPI.config');
const moment = require('moment');

admin.initializeApp();

const footballAPI = require('axios').default.create({
  baseURL: apiBaseUrl,
  params: {
    APIkey:  apiKey
  }
});

const fetchMatchesFromAPI = () => 
  footballAPI.get('/', {
    params: {
      action: 'get_events',
      from: moment().format(dateFormat) ,
      to: moment().add(eventsInterval).format(dateFormat)
    }
  });

const updateMatchesFromAPI = () =>
  Promise.all([ fetchMatchesFromAPI(),  admin.database().ref('/matches').once('value') ])
    .then(results => {
        [{ data }, matchUpdates] = results;
        data.forEach(match => matchUpdates[match.league_id] = 
          Object.assign({}, matchUpdates[match.league_id], { [match.match_id]: match }));
  
        return admin.database().ref('/matches').update(matchUpdates);
    });

exports.updateMatchesFromAPI = functions.https.onRequest((request, response) => 
    updateMatchesFromAPI()
    .catch(err => console.error("Football API matches update failure:\n" + err))
    .then(() => response.sendStatus(200)));
 