import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import { friendlyLeaguesFetch, fetchMatches, searchOnTextChange, handleSearch } from '../actions';
import { locali } from '../../locales/i18n';
import FriendlyLeagueListItem from './FriendlyLeagueListItem';

class FriendlyLeagues extends Component {
  componentWillMount() {
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
    console.log('dataBeforeSearch', this.props.friendlyLeagues);
    return (
      <View style={{ flex: 8 }}>
        <SearchBar
          round
          lightTheme
          onChangeText={textToSearch => {
            this.props.handleSearch(textToSearch, this.props.friendlyLeagues);
          }}
          placeholder='Type Here...'
        />
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={/* this.props.friendlyLeagues */this.props.dataToShow}
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
            style={{ justifyContent: 'center' }}
            onPress={() => this.props.navigation.navigate('NewFriendlyLeague')}
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
    backgroundColor: '#fff',
    padding: 20
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  }
});

const mapStateToProps = state => {
  const friendlyLeagues = state.friendlyLeagues.friendlyLeaguesListFetch;
  const { textToSearch, dataToShow } = state.friendlyLeagues;

  return { friendlyLeagues, textToSearch, dataToShow };
};

export default connect(mapStateToProps, 
  { handleSearch, friendlyLeaguesFetch, fetchMatches, searchOnTextChange })(FriendlyLeagues);
