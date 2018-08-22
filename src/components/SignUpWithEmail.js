import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { locali } from '../../locales/i18n';
import { emailChanged, userNameChanged, passwordChanged, signupUser } from '../actions';
import { Card, CardSection, Spinner } from './common';

class SignUpWithEmail extends Component {
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

      renderButtons() {
        if (this.props.loading) {
          return <Spinner size="large" />;
        }
        
        return (
            <View style={{ height: 60, justifyContent: 'center' }}>
                <RkButton
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                    onPress={() => this.props.signupUser(this.props.email, this.props.username, this.props.password, this.props.navigation)}  
                >
                    {locali('login_with_email.signup.button_sign_up')}
                </RkButton>
            </View>
        );
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
              label={<ZocialIcon style={styles.textInputIcon} name='email' />}
              placeholder={locali('login_with_email.signup.text_field_username_placeholder')}
              onChangeText={username => this.props.userNameChanged(username)}
              value={this.props.username}
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
    const { email, username, password, error, loading } = state.auth;

    return { email, username, password, error, loading };
};

export default connect(mapStateToProps,
    { signupUser, emailChanged, userNameChanged, passwordChanged })(SignUpWithEmail);
