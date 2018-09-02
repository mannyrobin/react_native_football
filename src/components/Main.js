import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { BACKGROUND_COLOR } from '../constants';

export default class Main extends Component {
  static navigationOptions = {
    drawerLabel: 'Main League',
    drawerIcon: () => (
      <FontAwesomeIcon style={styles.drawerItemIcon} name='trophy' />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main League</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  }
});
