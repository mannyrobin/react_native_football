import React, { Component } from 'react';
import { View } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Card } from './common';
import { friendUidChanged, inviteFriendToFriendlyLeague } from '../actions';

class AddFriendsToFriendlyLeague extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'הזמן חברים ל-' + navigation.getParam('friendlyLeagueName', ''),
        };
      };

      onInviteFriendButtonPress() {
        const { friendUid, navigation } = this.props;
        const leagueUid = navigation.getParam('friendlyLeagueId', '0');
        this.props.inviteFriendToFriendlyLeague(friendUid, leagueUid, navigation);
      }

    render() {
        return (
            <Card>
                <RkTextInput
                    label={<FontAwesomeIcon style={styles.textInputIcon} name='user-plus' />}
                    placeholder="הזן את קוד ההזמנה של החבר"
                    onChangeText={friendUid => this.props.friendUidChanged(friendUid)}
                    value={this.props.friendUid}
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
    const { friendUid } = state.friendlyLeagues;
    
      return { friendUid };
};

export default connect(mapStateToProps,
    { friendUidChanged, inviteFriendToFriendlyLeague })(AddFriendsToFriendlyLeague);
