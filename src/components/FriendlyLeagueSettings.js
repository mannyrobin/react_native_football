import React, { Component } from 'react';
import { View, I18nManager } from 'react-native';
import { RkTheme, RkTextInput, RkText, RkButton } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Card } from './common';
import { locali } from '../../locales/i18n';
import { friendEmailChanged, inviteFriendToFriendlyLeague } from '../actions';

class FriendlyLeagueSettings extends Component {
    static navigationOptions = ({ navigation }) => {
        const title = I18nManager.isRTL ?
        locali('friendly_leagues.friendly_league.settings.pre_title') + ' ' +
        navigation.getParam('friendlyLeagueName', '') :
        navigation.getParam('friendlyLeagueName', '') + ' ' +
        locali('friendly_leagues.friendly_league.settings.pre_title');
        
        return {
            title
        };
      };

      onInviteFriendButtonPress() {
        const { friendEmail, navigation } = this.props;
        const leagueUid = navigation.getParam('friendlyLeagueId', '0');
        this.props.inviteFriendToFriendlyLeague(friendEmail, leagueUid, navigation);
      }
      
    render() {
        RkTheme.setType('RkText', 'customHeader', {
            fontSize: 26,
            textAlign: 'center'
           });

        return (
            <View>
                <Card>
                    <RkText rkType='customHeader'>{locali('friendly_leagues.friendly_league.settings.invite_friend_header')}</RkText>
                    <RkTextInput
                        label={<FontAwesomeIcon style={styles.textInputIcon} name='user-plus' />}
                        placeholder={locali('friendly_leagues.friendly_league.settings.invite_text_input_placeholder')}
                        onChangeText={friendEmail => this.props.friendEmailChanged(friendEmail)}
                        value={this.props.friendEmail}
                    />
                    <View style={{ height: 60, justifyContent: 'center' }}>
                        <RkButton
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            onPress={this.onInviteFriendButtonPress.bind(this)}  
                        >
                            {locali('friendly_leagues.friendly_league.settings.invite_button')}
                        </RkButton>
                    </View>
                </Card>

                <Card>
                    <RkText rkType='customHeader'>{locali('friendly_leagues.friendly_league.settings.choose_games_header')}</RkText>
                </Card>
            </View>
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
    { friendEmailChanged, inviteFriendToFriendlyLeague })(FriendlyLeagueSettings);