import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { RootNavigator } from '../components/navigation/AppNavigation';
import AuthReducer from './AuthReducer';
import FriendlyLeaguesReducer from './FriendlyLeaguesReducer';
import LeaguesInvitationReducer from './LeaguesInvitationReducer';
import FormsReducer from './FormsReducer';
import MatchesReducer from './MatchesReducer';
import SearchReducer from './SearchReducer';
import HelpersReducer from './HelpersReducer';

const navReducer = createNavigationReducer(RootNavigator);

export default combineReducers({
    nav: navReducer,
    auth: AuthReducer,
    friendlyLeagues: FriendlyLeaguesReducer,
    invitationsData: LeaguesInvitationReducer,
    forms: FormsReducer,
    matches: MatchesReducer,
    search: SearchReducer,
    helpers: HelpersReducer
});
