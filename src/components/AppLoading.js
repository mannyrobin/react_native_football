import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    StatusBar,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken } from 'react-native-fbsdk';
import RNFetchBlob from 'rn-fetch-blob';
import Login from './Login';
import { fetchUserNames, socialLoginUserIn, socialLoginUserSuccess, reduxNav, fetchFriendlyLeagues, fetchMatches } from '../actions';
import { PRIMARY_COLOR, COMPONENT_COLOR } from '../constants';
import { FullScreenSpinner } from './common';

class AppLoading extends Component {

    componentDidMount() {
        this.getAuthorizationData();
        this.fetchApplicationData();
    }

    getAuthorizationData() {
        this.configureGoogleSignIn();
        this.getCurrentGUser();
        this.getCurrentFBUser();
    }

    fetchApplicationData() {
        this.props.fetchFriendlyLeagues();
        this.props.fetchMatches();
    }

    getCurrentGUser() {
        GoogleSignin.signInSilently()
            .then((user) => {
                if (user) {
                    this.props.socialLoginUserIn();
                    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
                    this.HandleSocialLoginSuccess(credential);
                }
            })
            .catch(error => {
                console.log('Failed', error);
            });
    }

    getCurrentFBUser() {
        AccessToken.getCurrentAccessToken()
            .then((token) => {
                if (token) {
                    this.props.socialLoginUserIn();
                    console.log('already logged in to Facebook');
                    const credential =
                        firebase.auth.FacebookAuthProvider.credential(token.accessToken);
                    this.HandleSocialLoginSuccess(credential);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    configureGoogleSignIn() {
        const configPlatform = {
            ...Platform.select({
                ios: {},
                android: {},
            }),
        };

        GoogleSignin.configure({
            ...configPlatform,
            webClientId: '951196383769-llhl0472tfa179fi5emhl3iikgikip4o.apps.googleusercontent.com',
            offlineAccess: false,
        });
    }

    HandleSocialLoginSuccess(credential) {
        this.props.socialLoginUserIn();
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(user => {
            const FCM = firebase.messaging();
            const FCMGetTokenPromise = FCM.getToken().then(token => {
                firebase.database().ref(`/usersDb/${user.user.uid}`).update({ notificationToken: token });
            });

            const uploadProfilePicPromise = uploadProfilePic(user);
            let pushNewUserDataPromise = null;
            if (user.additionalUserInfo.isNewUser) {
                pushNewUserDataPromise = firebase.database().ref(`/usersDb/${user.user.uid}`)
                    .set({ displayName: user.user.displayName });   
            }

            const fetchUserNamesPromise = this.props.fetchUserNames();

            Promise.all([
                FCMGetTokenPromise,
                uploadProfilePicPromise,
                pushNewUserDataPromise,
                fetchUserNamesPromise
            ])
            .then(() => {
                console.log('success');
                this.props.socialLoginUserSuccess(user, this.props.navigation);
            })
            .catch((error) => console.log('error ', error));
        })
            .catch((error) =>
                console.log('שגיאה בהתחברות' + error)
            );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={PRIMARY_COLOR}
                    barStyle="light-content"
                />
                <ImageBackground
                    source={require('../images/AppBG.jpg')}
                    style={styles.backgroundImage}
                >

                    <Image
                        source={require('../images/AppLogoNoBG.png')}
                        style={{
                            alignSelf: 'center',
                            width: 400,
                            height: 150,
                            resizeMode: 'contain'
                        }}
                    />

                    <Login HandleSocialLoginSuccess={(credential) => this.HandleSocialLoginSuccess(credential)} />

                    <FullScreenSpinner
                        visible={this.props.loading}
                        source={require('../images/Spinner2.gif')}
                        style={{
                            alignSelf: 'center',
                            width: 200,
                            height: 200,
                            resizeMode: 'contain'
                        }}
                    >
                        טוען נתונים...
                    </FullScreenSpinner>

                </ImageBackground>
            </View>
        );
    }
}

const uploadProfilePic = ({ user }) => {
    return new Promise((resolve, reject) => {
        //sometimes crushes, aspecially after clicking logout or the yellow box in the bottom.
        //after disabling yellowbox no more crushes.
        //read: https://github.com/facebook/react-native/issues/18817
        const Blob = RNFetchBlob.polyfill.Blob;

        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const url = user.photoURL + '?width=600';
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
};

const styles = {
    container: {
        flex: 1
    },
    backgroundImage: {
        width: '100%', height: '100%'
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        color: COMPONENT_COLOR
    }
};

const mapStateToProps = state => {
    const { loading } = state.auth;

    return { loading };
};

export default connect(mapStateToProps,
    { fetchUserNames, socialLoginUserIn, socialLoginUserSuccess, reduxNav, fetchFriendlyLeagues, fetchMatches })(AppLoading);
