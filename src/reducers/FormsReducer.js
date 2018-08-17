
import { 
    MATCHES_LIST_FETCH,
    SLIDER_VALUE_CHANGED,
    NEW_FORM_UPDATED,
    SUBMIT_FORM_SUCCESS,
    FETCT_CURRENT_FORMS,
    FETCT_MATCH_PER_FORM,
    OPEN_FORM
 } from '../actions/types.js';

const INITIAL_STATE = {
    matchesList: {},
    sliderValue: '',
    newForm: [],
    currentForms: [],
    currentMatchsPerForm: [],
    selectedFormId: ''
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
        
        case FETCT_CURRENT_FORMS: {
            return { ...state, currentMatchsPerForm: [], currentForms: action.payload };        
        }

        case FETCT_MATCH_PER_FORM: {
            return { ...state, currentMatchsPerForm: action.payload };
        }
        case OPEN_FORM: 
        return { ...state, selectedFormId: action.payload };

        default: {
            return state;
        }
    }
};
