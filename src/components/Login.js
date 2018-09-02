import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    StatusBar,
    Platform
} from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import RNFetchBlob from 'rn-fetch-blob';
import { fetchUserNames, socialLoginUserIn, socialLoginUserSuccess, reduxNav } from '../actions';
import { locali } from '../../locales/i18n';
import { Spinner, FullScreenSpinner } from './common';
import { PRIMARY_COLOR } from '../constants';

class Login extends Component {

    componentDidMount() {
        this.configureGoogleSignIn();
        this.getCurrentGUser();
        this.getCurrentFBUser();
        this.props.fetchUserNames();
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
            FCM.getToken().then(token => {
                firebase.database().ref(`/usersDb/${user.user.uid}`).update({ notificationToken: token });
            });

            this.uploadProfilePic(user);
            if (user.additionalUserInfo.isNewUser) {
                firebase.database().ref(`/usersDb/${user.user.uid}`)
                    .set({ displayName: user.user.displayName });
                this.props.socialLoginUserSuccess(user, this.props.navigation);
            } else {
                this.props.socialLoginUserSuccess(user, this.props.navigation);
            }
        })
            .catch((error) =>
                console.log('אירעה שגיאה בהתחברות' + error)
            );
    }

    uploadProfilePic({ user }) {
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
            .catch(error => console.log(error));
    }

    SignInFB() {
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(result => {
                if (result.isCancelled) {
                    console.log('Login was cancelled');
                }
                return AccessToken.getCurrentAccessToken();
            }).then(token => {
                const credential = firebase.auth.FacebookAuthProvider.credential(token.accessToken);
                this.HandleSocialLoginSuccess(credential);
            })
            .catch(err => {
                console.log('fail', err);
            });
    }

    SignInG = async () => {
        GoogleSignin.hasPlayServices()
            .then(
                GoogleSignin.signIn()
                    .then((user) => {
                        const credential = firebase.auth.GoogleAuthProvider
                            .credential(user.idToken);
                        this.HandleSocialLoginSuccess(credential);
                    })
                    .catch((error) => console.log(error))
            )
            .catch((error) => console.log(error));
    };

    renderButtons() {
        if (!this.props.loading) {
            return (
                <View style={{ padding: 20 }}>
                    <RkButton
                        rkType="xlarge facebookLogin"
                        onPress={() => this.SignInFB()}
                    >
                        <FontAwsomeIcon name="facebook" color="white" size={30} />
                        {locali('login.login_with_facebook_button_title')}
                    </RkButton>

                    <RkButton
                        rkType="xlarge googleLogin"
                        onPress={() => this.SignInG()}
                    >
                        <ZocialIcon name="googleplus" color="white" size={30} />
                        {locali('login.login_with_google_button_title')}
                    </RkButton>

                    <RkButton
                        rkType="xlarge primary emailLogin"
                        onPress={() => this.props.reduxNav('LoginWithEmail')}
                    >
                        <ZocialIcon name="email" color="white" size={30} />
                        {locali('login.login_with_email_button_title')}
                    </RkButton>
                </View>
            );
        }
        return (
            <View style={{ padding: 20 }}>
                <Spinner size="large" />
            </View>
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
                    {this.renderButtons()}

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
                    {locali('tools.full_screen_spinner_logging_in')}
                    </FullScreenSpinner>

                </ImageBackground>
            </View>
        );
    }
}

RkTheme.setType('RkButton', 'facebookLogin', {
    container: {
        backgroundColor: '#3b5998',
        marginBottom: 10
    },
    content: {
        flex: 1
    }
});

RkTheme.setType('RkButton', 'googleLogin', {
    container: {
        backgroundColor: '#df4a32',
        marginBottom: 10
    },
    content: {
        flex: 1,
        color: 'white'
    }
});

RkTheme.setType('RkButton', 'emailLogin', {
    container: {
        marginBottom: 10
    },
    content: {
        flex: 1
    }
});

const styles = {
    container: {
        flex: 1
    },
    backgroundImage: {
        width: '100%', height: '100%'
    },
    secondContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
};

const mapStateToProps = state => {
    const { loading } = state.auth;

    return { loading };
};

export default connect(mapStateToProps,
    { fetchUserNames, socialLoginUserIn, socialLoginUserSuccess, reduxNav })(Login);
