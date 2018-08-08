import firebase from 'firebase';
import { 
    MATCHES_LIST_FETCH,
    SLIDER_VALUE_CHANGED,
    NEW_FORM_UPDATED
 } from './types.js';

export const fetchMatchesList = () => {
	return (dispatch) => {
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        const endTimestamp = currentTimestamp + (30 * 24 * 60 * 60); // one month
        firebase.database().ref('/matches/437')
        .orderByChild('timestamp')
        .startAt(currentTimestamp)
        .endAt(endTimestamp)
		.on('value', snapshot => {
			dispatch({ type: MATCHES_LIST_FETCH, payload: snapshot.val() });
		});
	};
};

export const sliderValueChanged = (value) => {
	return {
		type: SLIDER_VALUE_CHANGED,
		payload: value
	};
};
/* eslint-disable no-param-reassign */
export const updateNewForm = (newForm, matchUid, bet) => {
    const val = { matchUid, bet };

    const isExistsWithDifferentBet = newForm.findIndex((element) =>
    element.matchUid === matchUid && element.bet !== bet);
    const isExists = newForm.findIndex((element) =>
    element.matchUid === matchUid && element.bet === bet);

    if (isExistsWithDifferentBet !== -1) {
        //replace bet with pressed bet
        newForm[isExistsWithDifferentBet].bet = bet;
    } else if (isExists !== -1) {
        //remove from array
        newForm.splice(isExists, 1);
    } else newForm.push(val);
    return {
        type: NEW_FORM_UPDATED,
        payload: newForm
    };
};
/* eslint-disable no-param-reassign */
