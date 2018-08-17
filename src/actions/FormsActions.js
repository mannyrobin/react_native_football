import firebase from 'firebase';
import { 
    MATCHES_LIST_FETCH,
    SLIDER_VALUE_CHANGED,
    NEW_FORM_UPDATED,
    SUBMIT_FORM_SUCCESS,
    FETCT_CURRENT_FORMS,
    OPEN_FORM,
 } from './types.js';
import { arraify } from '../utils';

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
export const updateNewForm = (newForm, matchUid, bet, odd) => {
    const val = { matchUid, bet, odd };

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

export const fetchCurrentForms = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/forms/${currentUser.uid}`)
        .orderByChild('timestamps')
        .on('value', snapshot => {
            dispatch({ type: FETCT_CURRENT_FORMS, payload: arraify(snapshot.val()) });
        });
    };
};

export const openForm = (navigator, formUid) => 
    dispatch => {
        navigator.navigate('Form');
        dispatch({ type: OPEN_FORM, payload: formUid });
    };


/* eslint-disable no-param-reassign */

export const submitForm = (newForm, coins, navigation) => {
    return (dispatch) => {
        const totalOdd = newForm.map(item => item.odd).reduce((prev, next) => prev * next);
        const totalCoins = totalOdd * coins;
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const val = {
            coins,
            timestamp,
            totalOdd,
            totalCoins,
            won: -1,
            form: newForm
        };
        firebase.database().ref(`/forms/${firebase.auth().currentUser.uid}`)
            .push(val)
            .then(() => {
                dispatch({ type: SUBMIT_FORM_SUCCESS });
                navigation.pop();
        });
    };
};