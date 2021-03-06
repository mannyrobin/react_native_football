import React from 'react';
import { Text, I18nManager } from 'react-native';
import {
    createStackNavigator,
    createDrawerNavigator,
    NavigationActions
} from 'react-navigation';

import EntypoIcon from 'react-native-vector-icons/Entypo';

import Account from '../Account';
import DrawerContainer from './DrawerContainer';
import LeaguesInvitationBadge from '../LeaguesInvitationBadge';
import LeagueInvitations from '../LeagueInvitations';
import FriendlyLeaguesStack from './FriendlyLeaguesStack';
import { LeagueTab } from '../leagues';

import AppHeader from '../AppHeader';
import LeagueHeader from '../LeagueHeader';

import { PRIMARY_COLOR } from '../../constants';

const MainStackNavigatior = createStackNavigator({
    MainLeague: { screen: LeagueTab },
    FriendlyLeaguesStack: { screen: FriendlyLeaguesStack },
    LeagueInvitations: { screen: LeagueInvitations },
    Account: { screen: Account },
}, {
        initialRouteName: 'FriendlyLeaguesStack',
        headerMode: 'float',
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: PRIMARY_COLOR },
            headerTitle: navigation.getParam('league') ?
                <LeagueHeader league={navigation.getParam('league')} /> :
                <AppHeader />,
            headerTintColor: 'black',
            gesturesEnabled: false,
            headerLeft: drawerButton(navigation),
            headerRight: renderHeaderRight(navigation)
        })
    });

const drawerButton = (navigation) =>
    <Text
        style={{ paddingHorizontal: 10 }}
        onPress={() => {
            navigation.toggleDrawer();
            // https://github.com/react-community/react-navigation/pull/2492
        }
        }
    >
        <EntypoIcon style={styles.DrawerMenuIcon} name='menu' />
    </Text>;

function renderHeaderRight(navigation) {
    return (<LeaguesInvitationBadge
        onPress={() =>
            navigation.dispatch(
                NavigationActions.navigate({ routeName: 'LeagueInvitations' })
            )
        }
    />
    );
}

const MainDrawerNavigator = createDrawerNavigator({
    Stack: { screen: MainStackNavigatior } 
}, 
{
    headerMode: 'none',
    gesturesEnabled: false,
    contentComponent: DrawerContainer,
    drawerPosition: I18nManager.isRTL ? 'right' : 'left',
    drawerBackgroundColor: PRIMARY_COLOR,
});

export default MainDrawerNavigator;

const styles = {
    DrawerMenuIcon: {
        fontSize: 40,
        color: 'black'
    }
};
