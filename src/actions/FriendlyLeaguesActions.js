import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import { arraify, fetchData } from '../utils';
import { locali } from '../../locales/i18n';
import RNFetchBlob from 'rn-fetch-blob';

import {
	FRIENDLY_LEAGUE_NAME_CHANGED,
	FRIEND_EMAIL_CHANGED,
	NEW_FRIENDLY_LEAGUE_SUCCESS,
	INVITE_FRIEND_SUCCESS,
	INVITE_FRIEND_FAILED,
	FRIENDLY_LEAGUES_FETCH_SUCCESS,
	OPEN_LEAGUE,
	FETCH_USERNAMES_SUCCESS,
	FETCH_PARTICIPANTS_AVATARS_SUCCESS,
	FETCH_CHAT,
	MESSAGE_CHANGED,
	UPLOAD_FRIENDLY_LEAGUE_PHOTO,
	FETCH_FRIENDLY_LEAGUES_AVATARS_SUCCESS
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

export const createNewFriendlyLeague = leagueName => {
	return (dispatch) => {
		const { uid, email } = firebase.auth().currentUser;
		const league = {
			friendlyLeagueName: leagueName,
			admin: uid,
			participants: {
				[uid]: {
					coins: 1000,
					formsWon: 0,
					formsLost: 0,
					email
				}
			},
			leaguePhoto: '../images/DefaultThumbnail.png'
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
	participants) => {
	return (dispatch) => {
		const invite = {
			friendEmail,
			leagueUid,
			friendlyLeagueName,
			inviterEmail: firebase.auth().currentUser.email
		};
		if (participants.find(participant => participant.email === friendEmail)) {
			dispatch({ type: INVITE_FRIEND_FAILED });
			invite.inviterEmail === friendEmail ? 
			Alert.alert(locali('friendly_leagues.friendly_league.settings.invite_same_user'))
			: Alert.alert(locali('friendly_leagues.friendly_league.settings.invite_exist_user'));
		} else {
			firebase.database().ref('/invitations')
			.push(invite)
			.then(() => {
				dispatch({ type: INVITE_FRIEND_SUCCESS });
				dispatch(NavigationActions.back());
			});
		}
	};
};

export const fetchFriendlyLeagues = () =>
	dispatch => 
		fetchData(firebase.database().ref('/friendlyLeagues'),
			friendlyLeaguesSnapshot =>
				dispatch({
					type: FRIENDLY_LEAGUES_FETCH_SUCCESS,
					payload: arraify(friendlyLeaguesSnapshot.val() || [])
						.filter(league => league.participants
							.find(user => user.uid === firebase.auth().currentUser.uid))
				})
		);

const fetchChats = ({ uid }, dispatch) =>
	firebase.database().ref(`/friendlyLeagues/${uid}/chat`)
		.on('value', snapshot => {
			dispatch({ type: FETCH_CHAT, payload: snapshot.val() || [] });
		});

const fetchAvatars = (league, dispatch) => {
	const defaultPhoto = 'https://vignette.wikia.nocookie.net/joke-battles/images/4/49/UserIcon.png/revision/latest?cb=20161202233401';
	const avatarPromises = league.participants.map(participant =>
		firebase.storage().ref(`/users/${participant.uid}`)
			.child('profile_picture.jpg')
			.getDownloadURL()
			.then(avatarURL => ({ uid: participant.uid, avatarURL }))
			.catch(() => ({ uid: participant.uid, avatarURL: defaultPhoto })));

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

export const fetchChat = (leagueUid) => {
	return (dispatch) => {
		firebase.database().ref(`/friendlyLeagues/${leagueUid}/chat`)
			.on('value', snapshot => {
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


export const uploadLeagueAvatar = (avatar, uid) => {
	return (dispatch) => {
		const Blob = RNFetchBlob.polyfill.Blob;
		const mime = 'image/png';
		const imageRef = firebase.storage().ref(`/friendlyLeagues/${uid}`)
			.child('friendly_league_profile_photo.png');
			const imageRefDB = firebase.database().ref(`/friendlyLeagues/${uid}`);
		return Blob.build(avatar, { type: `${mime};BASE64` })
			.then(blob => {
				const filePath = imageRef.put(blob._ref, { contentType: mime })
				.then(() => {
					const urlPromise = firebase.storage().ref(`/friendlyLeagues/${uid}`)
					.child('friendly_league_profile_photo.png')
					.getDownloadURL()
					.then(element => element);
					urlPromise
					.then(leaguePhoto => imageRefDB.update({ leaguePhoto }));
				});
				dispatch({
					type: UPLOAD_FRIENDLY_LEAGUE_PHOTO,
					payload: filePath
				});
			}
			)
			.catch(error => console.log('errorrrrr', error));
	};
};

export const fetchLeaguesAvatars = () =>
	dispatch =>
		fetchData(firebase.database().ref('/friendlyLeagues'),
			avatarsSnapshot => {
				const avatars = arraify(avatarsSnapshot.val() || [])
					.map(league => ({ uid: league.uid, leaguePhoto: league.leaguePhoto }));
				dispatch({ type: FETCH_FRIENDLY_LEAGUES_AVATARS_SUCCESS, payload: avatars });
			});
