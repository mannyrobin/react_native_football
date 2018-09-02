import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { RootNavigator } from '../components/navigation/AppNavigation';
import AuthReducer from './AuthReducer';
import FriendlyLeaguesReducer from './FriendlyLeaguesReducer';
import LeaguesInvitationReducer from './LeaguesInvitationReducer';
import FormsReducer from './FormsReducer';
import MatchesReducer from './MatchesReducer';
import SearchReducer from './SearchReducer';

const navReducer = createNavigationReducer(RootNavigator);

export default combineReducers({
    nav: navReducer,
    auth: AuthReducer,
    friendlyLeagues: FriendlyLeaguesReducer,
    invitationsData: LeaguesInvitationReducer,
    forms: FormsReducer,
    matches: MatchesReducer,
    search: SearchReducer
});
