import firebase from 'firebase';
import _ from 'lodash';
import { LEAGUE_INVITATIONS_FETCH_SUCCESS, LEAGUE_INVITATION_ACCEPTED, 
        LEAGUE_INVITATION_REJECTED } from './types';

export const readLeaguesInvitations = navigate =>
    () => navigate('LeaguesInvitations');

export const fetchLeaguesInvitations = () =>
    dispatch => {
        const { currentUser } = firebase.auth();

        firebase.database().ref('/invitations')
        .orderByChild('friendEmail')
        .equalTo(currentUser.email)
            .on('value', invitationsSnapshot =>
                dispatch({
                    type: LEAGUE_INVITATIONS_FETCH_SUCCESS,
                    payload: _.map(invitationsSnapshot.val(), (val, uid) => ({ ...val, uid }))
                }));
    };

const removeInvitation = (invitationUid, db) =>
    db.ref('/invitations')
        .orderByKey()
        .equalTo(invitationUid)
        .ref.remove();


export const acceptInvitation = (invitationUid, leagueUid) => 
    dispatch => {
        const { currentUser } = firebase.auth();
        const db = firebase.database();
        
        removeInvitation(invitationUid, db)
            .then(() => {
                db.ref('friendlyLeagues').child(leagueUid).child('participants')
                .child(currentUser.uid)
                .set(true)
                .then(() => dispatch({
                    type: LEAGUE_INVITATION_ACCEPTED
                }));
            });     
    };

export const declineInvitation = invitationUid => 
    dispatch => {
        const db = firebase.database();

        removeInvitation(invitationUid, db)
            .then(() => dispatch({
                type: LEAGUE_INVITATION_REJECTED
            }));
    };