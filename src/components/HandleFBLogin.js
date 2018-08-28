import { LoginManager } from 'react-native-fbsdk';

import firebase from 'react-native-firebase';

export const HandleFBLogin = () => (
  Facebook.login(['public_profile', 'email'])
    .then((token) => {
      firebase.auth()
        .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
    })
    .catch((err) => this.onError && this.onError(err))
);

const Facebook = {
  login: (permissions) => {
    return new Promise((resolve, reject) => {
      LoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {
        if (!error) {
          resolve(data.credentials.token);
        } else {
          reject(error);
        }
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      LoginManager.logout((error, data) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      });
    });
  }
};
