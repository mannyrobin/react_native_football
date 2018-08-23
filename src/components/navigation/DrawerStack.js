import React from 'react';
import { Text, I18nManager } from 'react-native';

import {
    createStackNavigator,
    createDrawerNavigator,
    NavigationActions
} from 'react-navigation';

import EntypoIcon from 'react-native-vector-icons/Entypo';

import { locali } from '../../../locales/i18n';

import Main from '../Main';
import MyAccount from '../MyAccount';
import DrawerContainer from '../DrawerContainer';
import LeaguesInvitationBadge from '../LeaguesInvitationBadge';
import LeagueInvitations from '../LeagueInvitations';
import FriendlyLeaguesStack from './FriendlyLeaguesStack';

const Drawer = createDrawerNavigator({
    Main: { screen: Main },
    FriendlyLeaguesStack: { screen: FriendlyLeaguesStack },
    LeagueInvitations: { screen: LeagueInvitations },
    MyAccount: { screen: MyAccount },
}, {
        gesturesEnabled: false,
        contentComponent: DrawerContainer,
        drawerPosition: I18nManager.isRTL ? 'right' : 'left',
        drawerBackgroundColor: '#C1E15E'
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

const DrawerStack = createStackNavigator({
    Drawer: { screen: Drawer }
}, {
        headerMode: 'float',
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#C1E15E' },
            title: locali('app.app_name'),
            headerTintColor: 'black',
            gesturesEnabled: false,
            headerLeft: drawerButton(navigation),
            headerRight: renderHeaderRight(navigation)
        })
    });

export default DrawerStack;

const styles = {
    DrawerMenuIcon: {
        fontSize: 40,
        color: 'black'
    }
};
