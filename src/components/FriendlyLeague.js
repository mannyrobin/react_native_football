import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { friendlyLeagueFetch } from '../actions';

class FriendlyLeague extends Component {
    static navigationOptions = ({ navigation }) => {
      const navigateToAddFriends = () => {
        navigation.navigate('AddFriendsToFriendlyLeague', {
            friendlyLeagueId: navigation.getParam('friendlyLeagueId', '0'),
            friendlyLeagueName: navigation.getParam('friendlyLeagueName', '')
        });
    };

        return {
          title: 'ליגת ' + navigation.getParam('friendlyLeagueName', ''),
          headerRight: (
          
          <Text
          style={{ paddingLeft: 15, fontSize: 18, fontWeight: 'bold', color: '#000' }}
          onPress={() => navigateToAddFriends()}
          >הזמן חברים לליגה</Text>
          )
        };
    };

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  }
});

const mapStateToProps = state => {
  const { friendlyLeagueName } = state.friendlyLeagues.friendlyLeagueFetch;

  return { friendlyLeagueName };
};

export default connect(mapStateToProps, { friendlyLeagueFetch })(FriendlyLeague);
