import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Card, CardSection } from './common';
import { friendlyLeagueNameChanged, createNewFriendlyLeague } from '../actions';
import { locali } from '../../locales/i18n';

class NewFriendlyLeague extends Component {

  onNewFriendlyLeagueButtonPress() {
    const { friendlyLeagueName, navigation } = this.props;

    this.props.createNewFriendlyLeague(friendlyLeagueName, navigation);
  }


  render() {
    return (
        <Card>
            <RkTextInput
              label={<FontAwesomeIcon style={styles.textInputIcon} name='trophy' />}
              placeholder={locali('friendly_leagues.new_friendly_leagues.name_placeholder')}
              onChangeText={leagueName => this.props.friendlyLeagueNameChanged(leagueName)}
              value={this.props.friendlyLeagueName}              
            />
            <CardSection>
                <RkButton
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                    onPress={this.onNewFriendlyLeagueButtonPress.bind(this)}  
                >
                    {locali('friendly_leagues.new_friendly_leagues.button_create')}
                </RkButton>
            </CardSection>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  },
  textInputIcon: {
    fontSize: 20,
    color: '#0000003a',
    marginLeft: 15
  }
});

const mapStateToProps = state => {
  const {
    friendlyLeagueName
  } = state.friendlyLeagues;

  return {
    friendlyLeagueName
  };
};

export default connect(mapStateToProps, {
  friendlyLeagueNameChanged,
  createNewFriendlyLeague
})(NewFriendlyLeague);
