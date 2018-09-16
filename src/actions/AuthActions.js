import _ from 'lodash';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk';
import { StackActions, NavigationActions } from 'react-navigation';
import { fetchFriendlyLeagues, fetchMatches, fetchLeaguesAvatars } from '../actions';
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
	LOGOUT,
	UPDATE_USERNAMES_DB,
	RE_PASSWORD_CHANGED
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

export const rePasswordChanged = (password) => {
	return {
		type: RE_PASSWORD_CHANGED,
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

export const signupUser = (email, username, password, navigation, displayNames) => {
	return (dispatch) => {
		dispatch({ type: LOGGING_USER_IN });
		firebase.database().ref('/usersDb')
			.on('value', snapshot => {
				if (checkUserNameExistance(snapshot, username)) {
					loginUserFail(dispatch, locali('login_with_email.signup.error_username_exists'));
				} else {
					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then(user => {
							firebase.database().ref(`/usersDb/${user.uid}`)
								.set({ displayName: username });
							firebase.messaging().getToken().then(token => {
								firebase.database().ref(`/usersDb/${user.uid}`).update({ notificationToken: token });
								dispatch({ type: UPDATE_USERNAMES_DB, 
									payload: displayNames.push({ displayName: username, uid: user.uid, notificationToken: token }) });
							});
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
	if (_.find(snapshot.val(), (key) => key.displayName === username)) {
		return true;
	}
	return false;
};

export const signUpButton = ({ email, navigation }) => {
	return (dispatch) => {
		dispatch(NavigationActions.navigate({ routeName: 'SignUpWithEmail' }));
		dispatch({ type: SIGN_UP_NAVIGATE, payload: email });
	};
};

export const forgotPassword = ({ email, navigation }) => {
	return (dispatch) => {
		dispatch({ type: FORGOT_PASSWORD, payload: email });
		dispatch(NavigationActions.navigate({ routeName: 'ForgotPassword' }));
	};
};

export const passwordRecovery = ({ email, navigation }) => {
	return (dispatch) => {
		//dispatch({ type: LOGGING_USER_IN });
		//dispatch({ type: PASSWORD_RECOVERY, payload: email });
		//TODO - send instructions to recover password on email
		dispatch(NavigationActions.back());
	};
};

const fetchApplicationData = dispatch => {
	dispatch(fetchFriendlyLeagues());
	dispatch(fetchMatches());
	dispatch(fetchLeaguesAvatars());
};

const loginUserSuccess = (user, navigation, dispatch) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	fetchApplicationData(dispatch);
	dispatch(NavigationActions.navigate({ routeName: 'DrawerStack' }));

	navigation.dispatch(StackActions.reset({
		index: 0,
		key: 'Drawer',
		actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
	}));
};

export const socialLoginUserSuccess = (user, navigation) => {
	return dispatch => {
		dispatch({
			type: LOGIN_USER_SUCCESS,
			payload: user.user
		});

		fetchApplicationData(dispatch);

		navigation.dispatch(StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: 'DrawerStack' })],
		}));
	};
};

export const socialLoginUserIn = () => {
	return { type: SOCIAL_LOGGING_USER_IN };
};

export const logout = (user) => {
	return (dispatch) => {
		GoogleSignin.signOut().then(() => {
			LoginManager.logOut();
			dispatch({
				type: LOGOUT,
				payload: user
			});
		})
			.catch('signout failed');

		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: 'LoginStack' })],
		});
		dispatch(resetAction);
	};
};

const loginUserFail = (dispatch, error) => {
	dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

/* const uploadProfilePic = (user) => {
    return new Promise((resolve, reject) => {
        //sometimes crushes, aspecially after clicking logout or the yellow box in the bottom.
        //after disabling yellowbox no more crushes.
        //read: https://github.com/facebook/react-native/issues/18817
        const Blob = RNFetchBlob.polyfill.Blob;
		const userURL = require('../images/Currency2Small.png');
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const url = userURL + '?width=600';
        const mime = 'image/jpg';
        const { currentUser } = firebase.auth();
        const imageRef = firebase.storage()
            .ref(`/users/${currentUser.uid}`)
            .child('profile_picture.jpg');
        RNFetchBlob.config({ fileCache: true })
            .fetch('GET', url)
            .then(resp => resp.readFile('base64')
                .then(data => {
                    return Blob.build(data, { type: `${mime};BASE64` });
                })
                .catch(error => console.log(error))
            )
            .catch(error => console.log(error))
            .then(blob => {
                return imageRef.put(blob._ref, { contentType: mime });
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}; */
