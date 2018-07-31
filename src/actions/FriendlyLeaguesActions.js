import firebase from 'firebase';
import { 
    FRIENDLY_LEAGUE_NAME_CHANGED,
	NEW_FRIENDLY_LEAGUE,
	FRIENDLY_LEAGUES_FETCH_SUCCESS
 } from './types.js';

 export const friendlyLeagueNameChanged = (leagueName) => {
	return {
		type: FRIENDLY_LEAGUE_NAME_CHANGED,
		payload: leagueName
	};
};

 export const createNewFriendlyLeague = (leagueName, navigation) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        
        firebase.database().ref(`/users/${currentUser.uid}/friendlyLeagues`)
		.push(leagueName)
		.then(() => {
			dispatch({ type: NEW_FRIENDLY_LEAGUE });
            navigation.pop();
		});
    };
};

export const friendlyLeaguesFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/friendlyLeagues`)
		.on('value', snapshot => {
			dispatch({ type: FRIENDLY_LEAGUES_FETCH_SUCCESS, payload: snapshot.val() });
		});
	};
};
