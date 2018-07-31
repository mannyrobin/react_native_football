import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FriendlyLeaguesReducer from './FriendlyLeaguesReducer';

export default combineReducers({
    auth: AuthReducer,
    friendlyLeagues: FriendlyLeaguesReducer
});
