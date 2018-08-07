import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FriendlyLeaguesReducer from './FriendlyLeaguesReducer';
import LeaguesInvitationReducer from './LeaguesInvitationReducer';

export default combineReducers({
    auth: AuthReducer,
    friendlyLeagues: FriendlyLeaguesReducer,
    invitationsData: LeaguesInvitationReducer
});
