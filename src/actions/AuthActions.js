import _ from 'lodash';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk';
import { StackActions, NavigationActions } from 'react-navigation';
import { locali } from '../../locales/i18n';
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	USERNAME_CHANGED,
	LOGGING_USER_IN,
	SOCIAL_LOGGING_USER_IN,
	SIGN_UP_NAVIGATE,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	FORGOT_PASSWORD,
	LOGOUT
} from './types.js';

export const emailChanged = (email) => {
	return {
		type: EMAIL_CHANGED,
		payload: email
	};
};

export const passwordChanged = (password) => {
	return {
		type: PASSWORD_CHANGED,
		payload: password
	};
};

export const userNameChanged = (username) => {
	return {
		type: USERNAME_CHANGED,
		payload: username
	};
};

export const loginUser = ({ email, password, navigation }) => {
	return (dispatch) => {
		dispatch({ type: LOGGING_USER_IN });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(user, navigation, dispatch))
			.catch((error) => {
				switch (error.code) {
					case 'auth/user-disabled':
						loginUserFail(dispatch, locali('login_with_email.login.error_user_disabled'));
						break;
					case 'auth/invalid-email':
						loginUserFail(dispatch, locali('login_with_email.login.error_invalid_email'));
						break;
					case 'auth/user-not-found':
						loginUserFail(dispatch, locali('login_with_email.login.error_user_not_found'));
						break;
					case 'auth/wrong-password':
						loginUserFail(dispatch, locali('login_with_email.login.error_wrong_password'));
						break;
					default:
						loginUserFail(dispatch, locali('login_with_email.login.error_default'));
						break;
				}
			});
	};
};

export const signupUser = (email, username, password, navigation) => {
	return (dispatch) => {
		dispatch({ type: LOGGING_USER_IN });
		firebase.database().ref('/usersDb')
			.on('value', snapshot => {
				if (checkUserNameExistance(snapshot, username)) {
					loginUserFail(dispatch, locali('login_with_email.signup.error_username_exists'));
				} else {
					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then(user => {
							createUserInDb(user, username);
							loginUserSuccess(user, navigation, dispatch);
						}
						)
						.catch((error) => {
							switch (error.code) {
								case 'auth/email-already-in-use':
									loginUserFail(dispatch, locali('login_with_email.signup.error_email_already_in_use'));
									break;
								case 'auth/invalid-email':
									loginUserFail(dispatch, locali('login_with_email.signup.error_invalid_email'));
									break;
								case 'auth/operation-not-allowed':
									loginUserFail(dispatch, locali('login_with_email.signup.error_operation_not_allowed'));
									break;
								case 'auth/weak-password':
									loginUserFail(dispatch, locali('login_with_email.signup.error_weak_password'));
									break;
								default:
									loginUserFail(dispatch, locali('login_with_email.signup.error_default'));
									break;
							}
						});
				}
			}
			);
	};
};

const checkUserNameExistance = (snapshot, username) => {
	if (_.find(snapshot.val(), (key) => key.username === username)) {
		return true;
	}
	return false;
};

const createUserInDb = ({ user }, username) => {
		firebase.database().ref(`/usersDb/${user.uid}`)
			.set({ username });
};

export const signUpButton = ({ email, navigation }) => {
	return (dispatch) => {
		navigation.navigate('SignUpWithEmail');
		dispatch({ type: SIGN_UP_NAVIGATE, payload: email });
	};
};

export const forgotPassword = ({ email, navigation }) => {
	return (dispatch) => {
		dispatch({ type: FORGOT_PASSWORD, payload: email });
		navigation.navigate('ForgotPassword');
	};
};

export const passwordRecovery = ({ email, navigation }) => {
	return (dispatch) => {
		//dispatch({ type: LOGGING_USER_IN });
		//dispatch({ type: PASSWORD_RECOVERY, payload: email });
		//TODO - send instructions to recover password on email
		navigation.pop();
	};
};

const loginUserSuccess = (user, navigation, dispatch) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	navigation.navigate('DrawerStack');
	const resetAction = StackActions.reset({
		index: 0,
		key: 'Drawer',
		actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
	});
	navigation.dispatch(resetAction);
};

export const socialLoginUserSuccess = (user, navigation) => {
	return (dispatch) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	const resetAction = StackActions.reset({
		index: 0,
		key: null,
		actions: [NavigationActions.navigate({ routeName: 'DrawerStack' })],
	});
	navigation.dispatch(resetAction);
};
};

export const socialLoginUserIn = () => {
	return { type: SOCIAL_LOGGING_USER_IN };
};

export const logout = (user, navigation) => {
	return (dispatch) => {
		GoogleSignin.signOut().then(() => {
			LoginManager.logOut();
			dispatch({
				type: LOGOUT,
				payload: user
			});
			console.log('Logged Out');
		})
		.catch('signout failed');

		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: 'LoginStack' })],
		});
		navigation.dispatch(resetAction);
	};
};

const loginUserFail = (dispatch, error) => {
	dispatch({ type: LOGIN_USER_FAIL, payload: error });
};
