import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import LoginStack from './LoginStack';
import DrawerStack from './DrawerStack';


// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const AppNavigation = createStackNavigator({
  LoginStack: { screen: LoginStack },
  DrawerStack: { screen: DrawerStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginStack',
  transitionConfig: noTransitionConfig
});

export default AppNavigation;
