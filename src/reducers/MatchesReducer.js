import { 
    FETCH_MATCHES
 } from '../actions/types.js';

const INITIAL_STATE = {
    matchesLeagues: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case FETCH_MATCHES:
        return { ...state, matchesLeagues: action.payload };
    default:
        return state;    
}
};
