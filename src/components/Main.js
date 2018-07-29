import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  }
});
