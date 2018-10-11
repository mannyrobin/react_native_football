import { 
    OPEN_ACCOUNT_SUCCESS,
    DRAWER_ROUTE_CHANGE
 } from '../actions/types.js';

const INITIAL_STATE = {
    selectedAccountData: [],
    drawerRoute: 'FriendlyLeaguesStack'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_ACCOUNT_SUCCESS: {
            return { ...state, selectedAccountData: action.payload };
        }
        case DRAWER_ROUTE_CHANGE: {
            return { ...state, drawerRoute: action.payload };
        }
        default: {
            return state;
        }
    }
};
