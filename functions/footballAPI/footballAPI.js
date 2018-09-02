const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { config: { apiBaseUrl, apiKey, eventsInterval, dateFormat} } = require('./footballAPI.config');
const moment = require('moment');
const _ = require('lodash');

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

const fetchLeaguesFromAPI = () => 
  footballAPI.get('/', {
    params: {
      action: 'get_leagues'
    }
  });

const updateLeaguesFromAPI = () => 
  Promise.all([ fetchLeaguesFromAPI(),  admin.database().ref('/matches').once('value')
                                                .then(leagueUpdatesSnapshot => leagueUpdatesSnapshot.val()) ])
  .then(results => {
    [{ data }, leaguesUpdates] = results;
    leaguesUpdates = leaguesUpdates || {};

    data.forEach(league =>  leaguesUpdates[league.league_id] = _.merge(leaguesUpdates[league.league_id], league));

    return admin.database().ref('/matches').update(leaguesUpdates);
  });
  

const formatMatch = ({ match_hometeam_name, match_awayteam_name, match_date, match_time, country_name, league_name }) => 
  ({ 
    hometeamName: match_hometeam_name,
    awayteamName: match_awayteam_name,
    date: match_date,
    time: match_time,
    hometeamOdd: 1.2,
    awayteamOdd: 1.7,
    drawOdd: 2.4,
    countryName: country_name,
    leagueName: league_name
  });

const updateMatchesFromAPI = () =>
  Promise.all([ fetchMatchesFromAPI(),  admin.database().ref('/matches').once('value')
                                              .then(matchUpdatesSnapshot => matchUpdatesSnapshot.val()) ])
    .then(results => {
      [{ data }, matchUpdates] = results;

      data.forEach(match => matchUpdates[match.league_id] = _.merge(matchUpdates[match.league_id], 
                                                                    { matches: { [match.match_id]: formatMatch(match) } }));

      return admin.database().ref('/matches').update(matchUpdates);
    });

exports.updateMatchesFromAPI = functions.https.onRequest((request, response) => 
  updateLeaguesFromAPI()
    .then(() => updateMatchesFromAPI())
    .catch(err => console.error("Football API matches update failure:\n" + err))
    .then(() => response.sendStatus(200)));
