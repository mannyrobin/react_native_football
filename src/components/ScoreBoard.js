import React, { Component } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { LeaderboardContainer, Header } from './common';
import { BACKGROUND_COLOR } from '../constants';

class ScoreBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../images/CoverFriendlyLeague.jpg')}
          style={{ width: '100%' }}
        >

          <View style={styles.headerContainer}>
{/*             <MaterialIconsIcon
              name='settings' color="#000" size={30}
              onPress={() =>
                this.props.navigation.navigate('FriendlyLeagueSettings')}
            /> */}
            <View style={styles.headerSection}>
              <View style={styles.headerThumbnailContainer}>
                <Image
                  style={styles.headerThumbnail}
                  source={require('../images/DefaultThumbnail.png')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <Header style={{ marginTop: 60 }}>טבלת הליגה</Header>
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
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,

  },
  headerContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    height: 170,
  },
  headerText: {
    fontSize: 26,
    textAlign: 'center',
    color: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  headerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 120,
    position: 'absolute',
  },
  headerRank: {
    flex: 1,
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  headerThumbnailContainer: {
    flex: 1,
    alignItems: 'center'

  },
  headerThumbnail: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    borderWidth: 5,
    borderColor: '#FFF'
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
    marginRight: 5,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    fontWeight: 'bold',
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
