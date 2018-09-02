
import firebase from 'react-native-firebase';
import _ from 'lodash';
import { arraify } from '../utils';
import {
    FETCH_MATCHES,
    SELECTED_COUNTRY,
    SELECTED_LEAGUE,
    UPDATE_MATCHES_AFTER_PICKER,
    CLEAN_PICKERS
} from './types.js';

export const fetchMatches = () => {
    return (dispatch) => {
        firebase.database().ref('/matches')
            .on('value', snapshot => {
                dispatch({ type: FETCH_MATCHES, payload: arraify(snapshot.val()) });
            });
    };
};

export const selectedPickerCountry = (countryChoice, matchesLeagues) => {
    return (dispatch) => {
        const dataAfterFilter = _.filter(matchesLeagues, league => {
            return containsCountry(league, countryChoice === 'countryPlaceholder' ? true : countryChoice);
        });
        console.log('dataAfterFilter', dataAfterFilter);
        dispatch({
            type: SELECTED_COUNTRY,
            payload: countryChoice
        });
        dispatch({
            type: UPDATE_MATCHES_AFTER_PICKER,
            payload: dataAfterFilter
        });
    };
};

export const selectedPickerLeauge = (leaugeChoice, allData, countryChoice) => {
    return (dispatch) => {
        if (leaugeChoice === 'leaugePlaceholder') {
            selectedPickerCountry(countryChoice, allData);
        } else {
            const dataAfterFilter = _.filter(allData, league => {
                return containsLeague(league, leaugeChoice);
            });

            dispatch({
                type: SELECTED_LEAGUE,
                payload: leaugeChoice
            });
            dispatch({
                type: UPDATE_MATCHES_AFTER_PICKER,
                payload: dataAfterFilter
            });
        }
    };
};

const containsLeague = (league, leaugeChoice) => {
    if (league.league_name === leaugeChoice) {
        return true;
    }
    return false;
};

const containsCountry = (league, countryChoice) => {
    if (countryChoice === true) return true;
    if (league.country_name === countryChoice) {
        return true;
    }
    return false;
};

export const cleanPickers = () => {
    return {
        type: CLEAN_PICKERS,
        payload: null
    };
};

/* 
const matchesTorender = (matchesLeagues) => {
    const allMatches = [].concat.apply([], matchesLeagues.map(item => item.matches));
    return allMatches;
  };
 */
