import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { locali } from '../../locales/i18n';
import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGGING_USER_IN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	FORGOT_PASSWORD
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

export const loginUser = ({ email, password, navigation }) => {
	return (dispatch) => {
		dispatch({ type: LOGGING_USER_IN });

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user, navigation))
		.catch((error) => {
			console.log('ERROR ON AUTHACTIONS - loginUser', error);
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

export const signupUser = ({ email, password, navigation }) => {
	return (dispatch) => {
		dispatch({ type: LOGGING_USER_IN });

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user, navigation))
		.catch((error) => {
			console.log('ERROR ON AUTHACTIONS - signupUser', error);
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

const loginUserSuccess = (dispatch, user, navigation) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	navigation.navigate('drawerStack');
	const resetAction = StackActions.reset({
		index: 0,
		actions: [NavigationActions.navigate({ routeName: 'DrawerStack' })],
	});
	navigation.dispatch(resetAction);
};

const loginUserFail = (dispatch, error) => {
	dispatch({ type: LOGIN_USER_FAIL, payload: error });
};
