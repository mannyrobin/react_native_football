import firebase from 'react-native-firebase';

import { fetchData, arraify } from '../utils';
import { MAIN_LEAGUE_LOADED, FETCH_CHAT } from './types';
import { reduxNav } from '../actions';

export const fetchMainLeague = () =>
    dispatch =>
        firebase.database().ref(`/usersDb/${firebase.auth().currentUser.uid}/mainLeagueUid`)
            .once('value')
            .then(mainLeagueUidSnapshot => {
                const mainLeagueUid = mainLeagueUidSnapshot.val();

                return fetchData(firebase.database().ref(`/mainLeagues/${mainLeagueUid}`),
                    leaguesSnapshot => dispatch({
                        type: MAIN_LEAGUE_LOADED,
                        payload: arraify({ [mainLeagueUid]: leaguesSnapshot.val() })[0]
                    }));
            });

const fetchChats = ({ uid }, dispatch) =>
    fetchData(firebase.database().ref(`/mainLeagues/${uid}/chat`).orderByChild('createdAt'),
        snapshot => {
            dispatch({ type: FETCH_CHAT, payload: arraify(snapshot.val() || []) });
        });

export const openMainLeague = league =>
    dispatch =>
        fetchChats(league, dispatch)
            .then(() => dispatch(reduxNav('MainLeague', { league })));
