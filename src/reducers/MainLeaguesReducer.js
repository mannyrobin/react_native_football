import { 
    MAIN_LEAGUE_LOADED
 } from '../actions/types.js';

const INITIAL_STATE = {
	league: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MAIN_LEAGUE_LOADED: {
            return { ...state, league: action.payload };
        }
        default: {
            return state;
        }
    }
};
