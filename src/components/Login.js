import React, { Component } from 'react';
import { View, Image, ImageBackground, StatusBar } from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import { locali } from '../../locales/i18n';

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

class Login extends Component {
    static navigationOptions = {
        header: null,
  };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#C1E15E"
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
                            resizeMode: 'contain' }}
                    />

                    <RkButton rkType="xlarge facebookLogin" >
                        <FontAwsomeIcon name="facebook" color="white" size={30} />
                        {locali('login.login_with_facebook_button_title')}
                    </RkButton>

                    <RkButton rkType="xlarge googleLogin" >
                        <ZocialIcon name="googleplus" color="white" size={30} />
                        {locali('login.login_with_google_button_title')}
                    </RkButton>

                    <RkButton
                        rkType="xlarge primary emailLogin"
                        onPress={() => this.props.navigation.navigate('LoginWithEmail')}
                    >
                        <ZocialIcon name="email" color="white" size={30} />
                        {locali('login.login_with_email_button_title')}
                    </RkButton>

                </ImageBackground>
            </View>
          );
  }
}

  const styles = {
      container: {
          flex: 1
      },
      backgroundImage: {
          width: '100%', height: '100%'
      }
    };

export default Login;
