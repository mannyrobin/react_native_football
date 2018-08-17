import firebase from 'firebase';
import { arraify } from '../utils';
import { 
    FETCT_MATCHES
 } from './types.js';

 export const fetchMatches = () => {
    return (dispatch) => {
        firebase.database().ref('/matches')
        .on('value', snapshot => {
            dispatch({ type: FETCT_MATCHES, payload: arraify(snapshot.val()) });
        });
    };
};
