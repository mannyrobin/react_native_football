import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';

export default class DrawerContainer extends Component {

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = StackActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.drawerItem}>
          <View style={styles.DrawerItemIconContainer}>
            <FontAwesomeIcon style={styles.DrawerItemIcon} name='trophy' />
          </View>
          <View style={styles.DrawerItemTextContainer}>
            <Text
              onPress={() => navigation.navigate('Main')}
              style={styles.DrawerItemText}
            >
              ראשי
            </Text>
          </View>
        </View>
        <View style={styles.drawerItem}>
        <View style={styles.DrawerItemIconContainer}>
          <FontAwesomeIcon style={styles.DrawerItemIcon} name='trophy' />
        </View>
        <View style={styles.DrawerItemTextContainer}>
          <Text
            onPress={() => navigation.navigate('screen2')}
            style={styles.DrawerItemText}
          >
            Friendly Leagues
          </Text>
        </View>
        </View>
        <View style={styles.drawerItem}>
        <View style={styles.DrawerItemIconContainer}>
          <FontAwesomeIcon style={styles.DrawerItemIcon} name='user' />
        </View>
        <View style={styles.DrawerItemTextContainer}>
          <Text
            onPress={() => navigation.navigate('screen3')}
            style={styles.DrawerItemText}
          >
            Account
          </Text>
        </View>
        </View>
        <View style={styles.drawerItem}>
        <View style={styles.DrawerItemIconContainer}>
          <SimpleLineIconsIcon style={styles.DrawerItemIcon} name='logout' />
        </View>
        <View style={styles.DrawerItemTextContainer}>
          <Text
            onPress={this.logout}
            style={styles.DrawerItemText}
          >
            Log Out
          </Text>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1E15E',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  drawerItem: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  DrawerItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    margin: 5,
    textAlign: 'left'
  },
  DrawerItemIcon: {
    fontSize: 35,
    color: '#000'
  },
  DrawerItemIconContainer: {
    alignItems: 'center',
    flex: 2
  },
  DrawerItemTextContainer: {
    alignItems: 'flex-start',
    flex: 8
  }
});
