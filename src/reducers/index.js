import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FriendlyLeaguesReducer from './FriendlyLeaguesReducer';
import LeaguesInvitationReducer from './LeaguesInvitationReducer';
import FormsReducer from './FormsReducer';
import MatchesReducer from './MatchesReducer';

export default combineReducers({
    auth: AuthReducer,
    friendlyLeagues: FriendlyLeaguesReducer,
    invitationsData: LeaguesInvitationReducer,
    forms: FormsReducer,
    matches: MatchesReducer,
});
