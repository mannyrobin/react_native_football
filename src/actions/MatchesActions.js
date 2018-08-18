import firebase from 'firebase';
import { arraify } from '../utils';
import { 
    FETCH_MATCHES
 } from './types.js';

 export const fetchMatches = () => {
    return (dispatch) => {
        firebase.database().ref('/matches')
        .on('value', snapshot => {
            dispatch({ type: FETCH_MATCHES, payload: arraify(snapshot.val()) });
        });
    };
};
