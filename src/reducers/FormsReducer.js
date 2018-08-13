import { 
    MATCHES_LIST_FETCH,
    SLIDER_VALUE_CHANGED,
    NEW_FORM_UPDATED,
    SUBMIT_FORM_SUCCESS
 } from '../actions/types.js';

const INITIAL_STATE = {
    matchesList: {},
    sliderValue: '',
    newForm: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MATCHES_LIST_FETCH: {
            return { ...state, matchesList: action.payload };
        }
        case SLIDER_VALUE_CHANGED: {
            return { ...state, sliderValue: action.payload };
        }
        case NEW_FORM_UPDATED: {
            return { ...state, newForm: action.payload };
        }
        case SUBMIT_FORM_SUCCESS: {
            return { ...state, newForm: [] };
        } 
        default: {
            return state;
        }
    }
};
