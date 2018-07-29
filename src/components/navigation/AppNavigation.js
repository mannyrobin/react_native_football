import React from 'react';
import { Text, Animated, Easing, I18nManager } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { locali } from '../../../locales/i18n';

//import Login screens
import Intro from '../Intro';
import Login from '../Login';
import LoginWithEmail from '../LoginWithEmail';
import ForgotPassword from '../ForgotPassword';

//import Main screens
import Main from '../Main';
import Screen2 from '../Screen2';
import Screen3 from '../Screen3';
import DrawerContainer from '../DrawerContainer';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

// drawer stack
const DrawerStack = createDrawerNavigator({
  Main: { screen: Main },
  screen2: { screen: Screen2 },
  screen3: { screen: Screen3 }
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
    headerLeft: drawerButton(navigation)
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
