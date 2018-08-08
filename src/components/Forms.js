import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Forms extends Component {
  static navigationOptions = {
    drawerLabel: 'טפסים',
    drawerIcon: () => (
      <FontAwesomeIcon style={styles.drawerItemIcon} name='wpforms' />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>טפסים</Text>
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
