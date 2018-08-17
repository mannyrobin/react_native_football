import React from 'react';
import { Text, Animated, Easing, I18nManager } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  NavigationActions,
  createBottomTabNavigator
} from 'react-navigation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';
import { locali } from '../../../locales/i18n';

//import Login screens
import Intro from '../Intro';
import Login from '../Login';
import LoginWithEmail from '../LoginWithEmail';
import ForgotPassword from '../ForgotPassword';

//import Main screens
import Main from '../Main';

//import friendlyLeagues screens
import FriendlyLeagues from '../FriendlyLeagues';
import NewFriendlyLeague from '../NewFriendlyLeague';
import FriendlyLeague from '../FriendlyLeague';
import FriendlyLeagueSettings from '../FriendlyLeagueSettings';

import Screen3 from '../Screen3';

//import Forms screens
import Forms from '../Forms';
import NewForm from '../NewForm';
import ReviewForm from '../ReviewForm';

import DrawerContainer from '../DrawerContainer';

import LeaguesInvitationBadge from '../LeaguesInvitationBadge';
import LeagueInvitations from '../LeagueInvitations';

import SingleForm from '../SingleForm';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

// Friendly leagues stack

const FriendlyLeaguesStack = createStackNavigator({
  FriendlyLeagues: { screen: FriendlyLeagues,
    navigationOptions: {
      title: locali('navigation.titles.friendly_leagues.main')
    }
  },
  NewFriendlyLeague: { screen: NewFriendlyLeague,
    navigationOptions: {
      title: locali('navigation.titles.friendly_leagues.new_friendly_league')
    }
  },
  FriendlyLeague: { screen: FriendlyLeague },
  FriendlyLeagueSettings: { screen: FriendlyLeagueSettings }
}, {
  // Default config for all screens
  initialRouteName: 'FriendlyLeagues',
  navigationOptions: {
    headerStyle: { backgroundColor: '#C1E15E' },
    headerTintColor: 'black'
  }
}
);

//Fill Form stack

const FillFormStack = createStackNavigator({
  NewForm: { screen: NewForm,
    navigationOptions: {
      headerMode: 'none'
    }
  },
  ReviewForm: { screen: ReviewForm }
}, {
  // Default config for all screens
  initialRouteName: 'NewForm',
  navigationOptions: {
    headerStyle: { backgroundColor: '#C1E15E' },
    headerTintColor: 'black'
  }
}
);

//Forms View Stack

const FormsViewStack = createStackNavigator({
  Forms: { screen: Forms },
  Form: { screen: SingleForm }
});

//Forms Tab

const FormsStack = createBottomTabNavigator({
  FormsViewStack: { screen: FormsViewStack,
    navigationOptions: {
      title: locali('navigation.titles.forms.forms')
    }
  },
  FillFormStack: { screen: FillFormStack,
    navigationOptions: {
      title: locali('navigation.titles.forms.fill_form')
    }
  }
}, {
  // Default config for all screens
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor, inactiveTintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'FormsViewStack') {
      iconName = 'wpforms';
      } else if (routeName === 'FillFormStack') {
        iconName = 'plus-circle';
      }
      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return (
        <FontawesomeIcon
          name={iconName}
          size={30}
          color={focused ? tintColor : inactiveTintColor}
        />
      );
    }
  }),

  // Default config for all screens
  initialRouteName: 'FormsViewStack',
  tabBarOptions: {
    activeTintColor: '#2196f3',
    inactiveTintColor: '#000',
    labelStyle: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    tabStyle: {
      backgroundColor: '#C1E15E'
    },
    style: {
      height: 65
    }
  },
}
);

// drawer stack
const DrawerStack = createDrawerNavigator({
  Main: { screen: Main },
  FriendlyLeaguesStack: { screen: FriendlyLeaguesStack },
  LeagueInvitations: { screen: LeagueInvitations },
  FormsStack: { screen: FormsStack },
  screen3: { screen: Screen3 },
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


const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#C1E15E' },
    title: locali('app.app_name'),
    headerTintColor: 'black',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation),
    headerRight:
    (<LeaguesInvitationBadge 
      onPress={() =>
        navigation.dispatch(NavigationActions.navigate({ routeName: 'LeagueInvitations' })) 
      }
    />)
  })
});

// login stack
const LoginStack = createStackNavigator({
  Intro: { screen: Intro },
  Login: { screen: Login },
  LoginWithEmail: {
    screen: LoginWithEmail,
    navigationOptions: { title: locali('navigation.titles.login_with_email') }
},
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { title: locali('navigation.titles.forgot_password') }
  }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: { backgroundColor: '#C1E15E' },
    headerTintColor: 'black'
  }
});

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
});

export default PrimaryNav;

const styles = {
  DrawerMenuIcon: {
    fontSize: 40,
    color: 'black'
  }
};
