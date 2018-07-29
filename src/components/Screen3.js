import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Main extends Component {
  static navigationOptions = {
    drawerLabel: 'My Account',
    drawerIcon: () => (
      <FontAwesomeIcon style={styles.drawerItemIcon} name='user' />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>My Account</Text>
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
