
import { Alert } from 'react-native';
import { locali } from '../../locales/i18n';
import { 
    MATCHES_LIST_FETCH,
    SLIDER_VALUE_CHANGED,
    NEW_FORM_UPDATE_PUSH,
    NEW_FORM_UPDATE_SLICE,
    NEW_FORM_UPDATE_CHANGE_BET,
    SUBMIT_FORM_SUCCESS,
    FETCH_CURRENT_FORMS,
    OPEN_FORM,
    SUBMIT_FORM
 } from '../actions/types.js';


const INITIAL_STATE = {
    matchesList: [],
    sliderValue: 0,
    newForm: [],
    currentForms: [],
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

        case NEW_FORM_UPDATE_PUSH: {
            return { ...state, newForm: [...state.newForm, action.payload] };
        }

        case NEW_FORM_UPDATE_SLICE: {
            return { ...state,
                newForm: [
                    ...state.newForm.slice(0, action.payload),
                    ...state.newForm.slice(action.payload + 1)
                ] };
        }

        case NEW_FORM_UPDATE_CHANGE_BET: {
            return { ...state,
                newForm: state.newForm.map(
                (content, i) =>
                    (i === action.payload.isExistsWithDifferentBet ?
                    { ...content, bet: action.payload.bet, odd: action.payload.odd }
                : content)
            ) };
        }

        case SUBMIT_FORM: {
            return { ...state, sliderValue: 0 };
        }

        case SUBMIT_FORM_SUCCESS: {
            return { ...state, sliderValue: 0, newForm: [] };
        }
        
        case FETCH_CURRENT_FORMS: {
            return { ...state, currentForms: action.payload || [] };
        }
        case OPEN_FORM: 
        return { ...state, selectedFormId: action.payload };
        
        default: {
            return state;
        }

    }
};
