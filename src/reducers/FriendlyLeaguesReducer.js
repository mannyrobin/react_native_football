import { 
    FRIENDLY_LEAGUE_NAME_CHANGED,
    FRIEND_UID_CHANGED,
    NEW_FRIENDLY_LEAGUE_SUCCESS,
    INVITE_FRIEND_SUCCESS,
    FRIENDLY_LEAGUES_FETCH_SUCCESS,
    FRIENDLY_LEAGUE_FETCH_SUCCESS
 } from '../actions/types.js';

const INITIAL_STATE = {
    friendlyLeagueName: '',
    friendUid: '',
    friendlyLeaguesListFetch: {},
    friendlyLeagueFetch: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FRIENDLY_LEAGUE_NAME_CHANGED: {
            return { ...state, friendlyLeagueName: action.payload };
        }
        case FRIEND_UID_CHANGED: {
            return { ...state, friendUid: action.payload };
        }
        case NEW_FRIENDLY_LEAGUE_SUCCESS: {
            return { ...state, friendlyLeagueName: '' };
        }
        case INVITE_FRIEND_SUCCESS: {
            return { ...state, friendUid: '' };
        }
        case FRIENDLY_LEAGUES_FETCH_SUCCESS: {
            return { ...state, friendlyLeaguesListFetch: action.payload };
        }
        case FRIENDLY_LEAGUE_FETCH_SUCCESS: {
            return { ...state, friendlyLeagueFetch: action.payload };
        }
        default: {
            return state;
        }
    }
};
