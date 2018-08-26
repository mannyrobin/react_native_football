import React, { Component } from 'react';
import { View, Image, ImageBackground, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { RkText } from 'react-native-ui-kitten';
import { LeaderboardContainer } from './common';
import { locali } from '../../locales/i18n';

class ScoreBoard extends Component {
  static navigationOptions = ({ navigation }) => {
    const navigateToAddFriends = () => {
      navigation.navigate('FriendlyLeagueSettings', {
        friendlyLeagueId: navigation.getParam('friendlyLeagueId', '0'),
        friendlyLeagueName: navigation.getParam('friendlyLeagueName', '')
      });
    };


    const title = I18nManager.isRTL ?
      locali('friendly_leagues.friendly_league.pre_title') + ' ' +
      navigation.getParam('friendlyLeagueName', '') :
      navigation.getParam('friendlyLeagueName', '') + ' ' +
      locali('friendly_leagues.friendly_league.pre_title');

    return {
      title,
      headerRight: (

        <MaterialIconsIcon
          name='settings' color="#000" size={30}
          style={{ paddingLeft: 15 }}
          onPress={() => navigateToAddFriends()}
        />
      )
    };
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={require('../images/AppBG.jpg')}
          style={{ width: '100%' }}
        >
          <View style={{ paddingVertical: 25, alignItems: 'center' }}>
            <MaterialIconsIcon
              name='settings' color="#000" size={30}
              style={{ paddingLeft: 15 }}
              onPress={() => 
                this.props.navigation.navigate('FriendlyLeagueSettings', {
                friendlyLeagueId: this.props.navigation.getParam('friendlyLeagueId', '0'),
                friendlyLeagueName: this.props.navigation.getParam('friendlyLeagueName', '')
              })}
            />
            <RkText style={styles.headerText}>
              {locali('friendly_leagues.friendly_league.leaderboard')}
            </RkText>
            <View style={styles.headerContainer}>
              <RkText style={styles.headerRank}>#1</RkText>
              <Image
                style={styles.headerThumbnail}
                source={require('../images/DefaultThumbnail.png')}
              />
              <RkText style={styles.headerCoins}>
                80 {locali('friendly_leagues.friendly_league.coins')}
              </RkText>
            </View>
          </View>
        </ImageBackground>
        <LeaderboardContainer
          data={this.props.league.participants}
          sortBy='coins'
          labelBy='displayName'
          labelStyle={{ justifyContent: 'flex-start', textAlign: 'left' }}
        />
      </View>
    );
  }
}

const styles = {
  headerText: {
    paddingBottom: 10,
    fontSize: 26,
    textAlign: 'center',
    color: '#fff'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  headerRank: {
    color: 'white',
    fontSize: 25,
    flex: 1,
    textAlign: 'left',
    paddingRight: 20
  },
  headerThumbnail: {
    flex: 0.66,
    height: 60,
    width: 60,
    borderRadius: 60 / 2
  },
  headerCoins: {
    color: 'white',
    fontSize: 25,
    flex: 1,
    marginLeft: 40
  }
};

const mapStateToProps = ({ friendlyLeagues }) => {
  const league = friendlyLeagues.friendlyLeaguesListFetch
  .find(element => element.uid === friendlyLeagues.selectedFriendlyLeagueId);
  league.participants = league.participants.map(participant => ({
    ...participant,
    displayName: friendlyLeagues.displayNames.find(user =>
      user.uid === participant.uid).displayName
  }));

  return { league };
  };
export default connect(mapStateToProps)(ScoreBoard);
