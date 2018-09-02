import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import { arraify } from '../utils';
import {
	FRIENDLY_LEAGUE_NAME_CHANGED,
	FRIEND_EMAIL_CHANGED,
	NEW_FRIENDLY_LEAGUE_SUCCESS,
	INVITE_FRIEND_SUCCESS,
	FRIENDLY_LEAGUES_FETCH_SUCCESS,
	OPEN_LEAGUE,
	FETCH_USERNAMES_SUCCESS,
	FETCH_PARTICIPANTS_AVATARS_SUCCESS,
	FETCH_CHAT,
	MESSAGE_CHANGED,
} from './types.js';

export const friendlyLeagueNameChanged = (leagueName) => {
	return {
		type: FRIENDLY_LEAGUE_NAME_CHANGED,
		payload: leagueName
	};
};

export const friendEmailChanged = (friendEmail) => {
	return {
		type: FRIEND_EMAIL_CHANGED,
		payload: friendEmail
	};
};

export const createNewFriendlyLeague = (leagueName, navigation) => {
	return (dispatch) => {
		const { uid } = firebase.auth().currentUser;
		const league = {
			friendlyLeagueName: leagueName,
			admin: uid,
			participants: {
				[uid]: {
					coins: 1000,
					formsWon: 0,
					formsLost: 0
				}
			}
		};
		firebase.database().ref('/friendlyLeagues')
			.push(league)
			.then(() => {
				dispatch({ type: NEW_FRIENDLY_LEAGUE_SUCCESS });
				dispatch(NavigationActions.back());
			});
	};
};

export const inviteFriendToFriendlyLeague = (
	friendEmail,
	leagueUid,
	friendlyLeagueName,
	navigation) => {
	return (dispatch) => {
		const invite = {
			friendEmail,
			leagueUid,
			friendlyLeagueName,
			inviterEmail: firebase.auth().currentUser.email
		};
		firebase.database().ref('/invitations')
			.push(invite)
			.then(() => {
				dispatch({ type: INVITE_FRIEND_SUCCESS });
				dispatch(NavigationActions.back());
			});
	};
};

export const friendlyLeaguesFetch = () =>
	dispatch =>
		firebase.database()
			.ref('/friendlyLeagues')
			.on('value', snapshot => {
				if (snapshot.val()) {
					dispatch({
						type: FRIENDLY_LEAGUES_FETCH_SUCCESS,
						payload: arraify(snapshot.val())
							.filter(league => league.participants
								.find(user => user.uid === firebase.auth().currentUser.uid))
					});
				}
			});


const fetchChats = ({ uid }, dispatch) =>
	firebase.database().ref(`/friendlyLeagues/${uid}/chat`)
		.on('value', snapshot => {
			dispatch({ type: FETCH_CHAT, payload: snapshot.val() || [] });
		});

const fetchAvatars = (league, dispatch, navigation) => {
	const avatarPromises = league.participants.map(participant =>
		firebase.storage().ref(`/users/${participant.uid}`)
			.child('profile_picture.jpg')
			.getDownloadURL()
			.then(avatarURL => ({ uid: participant.uid, avatarURL })));

	Promise.all(avatarPromises)
		.then(avatars => {
			dispatch({ type: OPEN_LEAGUE, payload: league.uid });
			dispatch({ type: FETCH_PARTICIPANTS_AVATARS_SUCCESS, payload: avatars });
			dispatch(NavigationActions.navigate({ routeName: 'FriendlyLeagueTab' }));
		});
};

export const openFriendlyLeague = (league, navigation) =>
	dispatch => {
		fetchChats(league, dispatch);
		fetchAvatars(league, dispatch, navigation);
	};

export const fetchUserNames = () =>
	dispatch => {
		firebase.database().ref('/usersDb')
			.on('value', snapshot => {
				if (snapshot.val()) {
					dispatch({
						type: FETCH_USERNAMES_SUCCESS,
						payload: arraify(snapshot.val())
					});
				}
			});
	};

export const fetchChat = (leagueUid) => {
	return (dispatch) => {
		firebase.database().ref(`/friendlyLeagues/${leagueUid}/chat`)
			.on('value', snapshot => {
				console.log('snapshot.val()', snapshot.val());
				dispatch({ type: FETCH_CHAT, payload: snapshot.val() });
			});
	};
};

export const onMessageChanged = (message) => {
	return {
		type: MESSAGE_CHANGED,
		payload: message
	};
};

/* export const sendMessage = (message, chat, leagueUid) => {
		const appeandChat = [...message, ...chat];
		firebase.database().ref(`/friendlyLeagues/${leagueUid}/chat`)
		.set({ appeandChat });

 		return {
			type: SEND_MESSAGE,
			payload: appeandChat
		}; 
};
 */
