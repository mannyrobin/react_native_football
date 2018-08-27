import _ from 'lodash';
import React, { Component } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { RkText } from 'react-native-ui-kitten';
import { LeaderboardContainer } from './common';
import { locali } from '../../locales/i18n';

class ScoreBoard extends Component {
  render() {
    const { currentUser } = firebase.auth();
    const sortedParticipants = _.orderBy(this.props.league.participants, user => user.coins, 'desc');
		const coins = _.find(sortedParticipants, user => user.uid === currentUser.uid).coins;
		const rank = Number(_.findKey(sortedParticipants, user => user.uid === currentUser.uid)) + 1;

    return (
      <View>
        <ImageBackground
          source={require('../images/AppBG.jpg')}
          style={{ width: '100%' }}
        >

          <View style={styles.headerContainer}>
            <MaterialIconsIcon
              name='settings' color="#000" size={30}
              onPress={() =>
                this.props.navigation.navigate('FriendlyLeagueSettings')}
            />
            <RkText style={styles.headerText}>
              {locali('friendly_leagues.friendly_league.leaderboard')}
            </RkText>

            <View style={styles.headerSection}>
              <RkText style={styles.headerRank}>
              {'#' + rank}
              </RkText>
              <View style={styles.headerThumbnailContainer}>
                <Image
                  style={styles.headerThumbnail}
                  source={require('../images/DefaultThumbnail.png')}
                />
              </View>
              <View style={styles.headerCoinsContainer}>
                <RkText style={styles.headerCoinsText}>
                  {coins}
              </RkText>
                <Image
                  source={require('../images/Currency2Small.png')}
                  style={{ height: 30, width: 30 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </ImageBackground>

        <LeaderboardContainer

          data={this.props.league.participants}
          sortBy='coins'
          labelBy='displayName'
          labelStyle={{ justifyContent: 'flex-start', textAlign: 'left', paddingRight: 10 }}
          icon='avatarURL'
        />
      </View>
    );
  }
}

const styles = {
  headerContainer: {
    paddingVertical: 15,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 26,
    textAlign: 'center',
    color: '#fff'
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15
  },
  headerRank: {
    flex: 1,
    color: 'white',
    fontSize: 25,
    textAlign: 'center'

  },
  headerThumbnailContainer: {
    flex: 1,
    alignItems: 'center'

  },
  headerThumbnail: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2
  },
  headerCoinsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerCoinsText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginRight: 5
  }
};

const mapStateToProps = ({ friendlyLeagues }) => {
  const league = friendlyLeagues.friendlyLeaguesListFetch
    .find(element => element.uid === friendlyLeagues.selectedFriendlyLeagueId);
  league.participants = league.participants.map(participant => ({
    ...participant,
    displayName:
      friendlyLeagues.displayNames.find(user =>
        user.uid === participant.uid).displayName,
    avatarURL:
      friendlyLeagues.friendlyLeagueAvatars.find(user =>
        user.uid === participant.uid).avatarURL
  }));
  return { league };
};
export default connect(mapStateToProps)(ScoreBoard);
