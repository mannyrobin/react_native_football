import { 
    FRIENDLY_LEAGUE_NAME_CHANGED,
    NEW_FRIENDLY_LEAGUE
 } from '../actions/types.js';

const INITIAL_STATE = {
	friendlyLeagueName: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FRIENDLY_LEAGUE_NAME_CHANGED: {
            return { ...state, friendlyLeagueName: action.payload };
        }
        case NEW_FRIENDLY_LEAGUE: {
            return { ...state, INITIAL_STATE };
        }
        default: {
            return state;
        }
    }
};
