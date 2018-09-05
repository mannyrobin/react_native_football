import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import { friendlyLeaguesFetch, fetchMatches, searchOnTextChange, handleSearch, reduxNav, fetchLeaguesAvatars } from '../actions';
import { locali } from '../../locales/i18n';
import FriendlyLeagueListItem from './FriendlyLeagueListItem';

import { BACKGROUND_COLOR, SECONDARY_COLOR } from '../constants';

class FriendlyLeagues extends Component {
  componentDidMount() {
    this.props.friendlyLeaguesFetch();
    this.props.fetchMatches();
  }

  render() {
    RkTheme.setType('RkButton', 'fillScreen', {
      container: {
        marginBottom: 10
      },
      content: {
        flex: 1
      }
    });
    const { dataToShowfriendlyLeague, friendlyLeagues } = this.props;
    this.props.fetchLeaguesAvatars(friendlyLeagues);
    return (
      <View style={{ flex: 8 }}>
        <SearchBar
            inputStyle={{ backgroundColor: 'white' }}
            containerStyle={{ backgroundColor: '#C1E15E' }}
          round
          lightTheme
          onChangeText={textToSearch => {
            this.props.handleSearch(textToSearch, friendlyLeagues, 'friendlyLeagues');
          }}
          placeholder='Type Here...'
        />
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.props.textToSearch === '' ? friendlyLeagues : dataToShowfriendlyLeague}
              renderItem={friendlyLeague =>
                <FriendlyLeagueListItem
                  friendlyLeague={friendlyLeague.item}
                  navigation={this.props.navigation}
                />}
              keyExtractor={friendlyLeague => friendlyLeague.uid}
            />
          </View>

          <RkButton
            rkType="xlarge fillScreen"
            style={{ justifyContent: 'center', backgroundColor: SECONDARY_COLOR }}
            onPress={() => this.props.reduxNav('NewFriendlyLeague')}
          >
            <FontAwesomeIcon name='trophy' color="white" size={30} />
            {locali('friendly_leagues.button_create_new')}
          </RkButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 20
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  }
});

const mapStateToProps = state => {
  const friendlyLeagues = state.friendlyLeagues.friendlyLeaguesListFetch;
  const { textToSearch, dataToShowfriendlyLeague } = state.search;
  const navTest = state.nav;

  return { friendlyLeagues, textToSearch, dataToShowfriendlyLeague, navTest };
};

export default connect(mapStateToProps, 
  { handleSearch, friendlyLeaguesFetch, fetchMatches, searchOnTextChange, reduxNav, fetchLeaguesAvatars })(FriendlyLeagues);
