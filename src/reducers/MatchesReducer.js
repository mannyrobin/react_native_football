import { 
    FETCH_MATCHES,
    SELECTED_COUNTRY,
    SELECTED_LEAGUE,
    UPDATE_MATCHES_AFTER_PICKER,
    CLEAN_PICKERS
 } from '../actions/types.js';
 import { arraiesToOneArray } from '../utils';

const INITIAL_STATE = {
    matchesLeagues: [],
    matchesToShow: [],
    pickerSelectedCountry: '', 
    pickerSelectedLeauge: '',
    allmatchesToShow: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case FETCH_MATCHES:
        return { ...state, matchesLeagues: action.payload, allmatchesToShow: arraiesToOneArray(action.payload),  matchesToShow: arraiesToOneArray(action.payload), pickerSelectedCountry: null, pickerSelectedLeauge: null };
    case SELECTED_COUNTRY:
      return { ...state, pickerSelectedCountry: action.payload, pickerSelectedLeauge: '' };  
    case SELECTED_LEAGUE:
        return { ...state, pickerSelectedLeauge: action.payload };
        case UPDATE_MATCHES_AFTER_PICKER:
        return { ...state, matchesToShow: arraiesToOneArray(action.payload) };
        case CLEAN_PICKERS:
        return { ...state, pickerSelectedCountry: null, pickerSelectedLeauge: null };
    default:
        return state;    
}
};
