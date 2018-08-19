import { createStackNavigator } from 'react-navigation';

import { locali } from '../../../locales/i18n';

import Intro from '../Intro';
import Login from '../Login';
import LoginWithEmail from '../LoginWithEmail';
import ForgotPassword from '../ForgotPassword';

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

export default LoginStack;
