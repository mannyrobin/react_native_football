import React, { Component } from 'react';
import { View } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Card } from './common';
import { friendEmailChanged, inviteFriendToFriendlyLeague } from '../actions';

class AddFriendsToFriendlyLeague extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'הזמן חברים ל-' + navigation.getParam('friendlyLeagueName', ''),
        };
      };

      onInviteFriendButtonPress() {
        const { friendEmail, navigation } = this.props;
        const leagueUid = navigation.getParam('friendlyLeagueId', '0');
        this.props.inviteFriendToFriendlyLeague(friendEmail, leagueUid, navigation);
      }

    render() {
        return (
            <Card>
                <RkTextInput
                    label={<FontAwesomeIcon style={styles.textInputIcon} name='user-plus' />}
                    placeholder="הזן כתובת אימייל של חבר"
                    onChangeText={friendEmail => this.props.friendEmailChanged(friendEmail)}
                    value={this.props.friendEmail}
                />
                <View style={{ height: 60, justifyContent: 'center' }}>
                <RkButton
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                    onPress={this.onInviteFriendButtonPress.bind(this)}  
                >
                    הזמן חבר
                </RkButton>
            </View>
            </Card>
        );
    }
}

const styles = {
    textInputIcon: {
      fontSize: 20,
      color: '#0000003a',
      marginLeft: 15
    }
};

const mapStateToProps = state => {
    const { friendEmail } = state.friendlyLeagues;
    
      return { friendEmail };
};

export default connect(mapStateToProps,
    { friendEmailChanged, inviteFriendToFriendlyLeague })(AddFriendsToFriendlyLeague);
