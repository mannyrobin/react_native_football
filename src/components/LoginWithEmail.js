import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Card, CardSection, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser, signupUser, forgotPassword } from '../actions';
import { locali } from '../../locales/i18n';

class LoginWithEmail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
      };
    };

  onLoginButtonPress() {
    const { email, password, navigation } = this.props;

    this.props.loginUser({ email, password, navigation });
  }

  onSignupButtonPress() {
    const { email, password, navigation } = this.props;

    this.props.signupUser({ email, password, navigation });
  }

  onForgotPasswordButtonPress() {
    const { email, navigation } = this.props;

    this.props.forgotPassword({ email, navigation });
  }

  renderButtons() {
    if (this.props.loading) {
      return (
      <View style={{ height: 120 }}>
        <Spinner size="large" />
      </View>
      );
    }
    
    return (
          <View style={{ height: 120 }}>
            <View style={styles.buttonsContainer}>
              <View style={styles.LoginButtonContainer}>
                <RkButton
                  style={{ justifyContent: 'center' }}
                  onPress={this.onLoginButtonPress.bind(this)}  
                >
                  {locali('login_with_email.form.button_login')}
                </RkButton>
                </View>
                <View style={styles.SignUpButtonContainer}>
              <RkButton
                style={{ justifyContent: 'center' }}
                onPress={this.onSignupButtonPress.bind(this)}  
              >
                {locali('login_with_email.form.button_signup')}
              </RkButton>
            </View>
            </View>
            <View style={styles.buttonsContainer}>
            <RkButton
                onPress={this.onForgotPasswordButtonPress.bind(this)}  
            >
                {locali('login_with_email.form.button_forgot_password')}
              </RkButton>
            </View>
          </View>
    );
  }
  renderError() {
    if (this.props.error) {
      return (
        <CardSection>
          <View>
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
          </View>
        </CardSection>
      );
    }
  }

  render() {
    return (
        <Card>
            <RkTextInput
              label={<ZocialIcon style={styles.textInputIcon} name='email' />}
              placeholder={locali('login_with_email.form.text_field_email_placeholder')}
              onChangeText={email => this.props.emailChanged(email)}
              value={this.props.email}
            />
            <RkTextInput
              secureTextEntry
              label={<EntypoIcon style={styles.textInputIcon} name='lock' />}
              placeholder={locali('login_with_email.form.text_field_password_placeholder')}
              onChangeText={password => this.props.passwordChanged(password)}
              value={this.props.password}
            />
              {this.renderError()}
            
            <CardSection>
            {this.renderButtons()}
            </CardSection>
        </Card>
    );
  }
}

const styles = {
  textInputIcon: {
    fontSize: 20,
    color: '#0000003a',
    marginLeft: 15
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  errorTextStyle: {
		fontSize: 20,
		textAlign: 'center',
		color: 'red'
  },
  LoginButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  SignUpButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
};

const mapStateToProps = state => {
  const {
    email,
    password,
    user,
    loading,
    error
  } = state.auth;

  return {
    email,
    password,
    user,
    loading,
    error
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  signupUser,
  forgotPassword
})(LoginWithEmail);
