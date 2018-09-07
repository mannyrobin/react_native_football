import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { fetchUserNames, socialLoginUserIn, socialLoginUserSuccess, reduxNav } from '../actions';
import { locali } from '../../locales/i18n';
import { Spinner } from './common';

class Login extends Component {

    componentDidMount() {
        this.configureGoogleSignIn();
        this.props.fetchUserNames();
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

    SignInFB() {
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(result => {
                if (result.isCancelled) {
                    console.log('Login was cancelled');
                }
                return AccessToken.getCurrentAccessToken();
            }).then(token => {
                const credential = firebase.auth.FacebookAuthProvider.credential(token.accessToken);
                this.props.HandleSocialLoginSuccess(credential);
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
                        this.props.HandleSocialLoginSuccess(credential);
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
                {this.renderButtons()}
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
