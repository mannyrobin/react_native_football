import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { friendlyLeaguesFetch } from '../actions';
import { locali } from '../../locales/i18n';
import FriendlyLeagueListItem from './FriendlyLeagueListItem';

class FriendlyLeagues extends Component {
  componentWillMount() {
		this.props.friendlyLeaguesFetch();
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

    return (
      <View style={styles.container}>
        <View style={{ height: 200 }}>
          <FlatList 
            data={this.props.friendlyLeagues}
            renderItem={friendlyLeague =>
            <FriendlyLeagueListItem friendlyLeague={friendlyLeague.item} />}
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
  const friendlyLeagues = _.map(state.friendlyLeagues.friendlyLeaguesListFetch, (val, uid) => {
    return { ...val, uid };
  });

  return { friendlyLeagues };
};

export default connect(mapStateToProps, { friendlyLeaguesFetch })(FriendlyLeagues);
