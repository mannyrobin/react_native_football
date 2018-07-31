import { 
    FRIENDLY_LEAGUE_NAME_CHANGED,
    NEW_FRIENDLY_LEAGUE,
    FRIENDLY_LEAGUES_FETCH_SUCCESS
 } from '../actions/types.js';

const INITIAL_STATE = {
    friendlyLeagueName: '',
    friendlyLeaguesListFetch: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FRIENDLY_LEAGUE_NAME_CHANGED: {
            return { ...state, friendlyLeagueName: action.payload };
        }
        case NEW_FRIENDLY_LEAGUE: {
            return { ...state, INITIAL_STATE };
        }
        case FRIENDLY_LEAGUES_FETCH_SUCCESS: {
            return { ...state, friendlyLeaguesListFetch: action.payload };
        }
        default: {
            return state;
        }
    }
};
