import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import { locali } from '../../locales/i18n';

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
    const {
      //items,
      activeItemKey,
      activeTintColor,
      //activeBackgroundColor,
      inactiveTintColor,
      //inactiveBackgroundColor,
      //getLabel,
      //renderIcon,
      //onItemPress,
      //itemsContainerStyle,
      //itemStyle,
      //labelStyle,
      //activeLabelStyle,
      //inactiveLabelStyle,
      //iconContainerStyle,
      //drawerPosition
    } = this.props;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View
        style={activeItemKey === 'Main' ? styles.drawerActiveItem : styles.drawerInActiveItem}
        >
          <View style={styles.DrawerItemIconContainer}>
            <FontAwesomeIcon style={styles.DrawerItemIcon} name='trophy' />
          </View>
          <View style={styles.DrawerItemTextContainer}>
            <Text
              onPress={() => navigation.navigate('Main')}
              style={[styles.DrawerItemText,
                { color: activeItemKey === 'Main' ? activeTintColor : inactiveTintColor }]}
            >
              {locali('navigation.titles.drawer.main_league')}
            </Text>
          </View>
        </View>
        <View
        style={activeItemKey === 'FriendlyLeaguesStack' ?
          styles.drawerActiveItem : styles.drawerInActiveItem}
        >
          <View style={styles.DrawerItemIconContainer}>
            <FontAwesomeIcon style={styles.DrawerItemIcon} name='trophy' />
          </View>
          <View style={styles.DrawerItemTextContainer}>
            <Text
              onPress={() => navigation.navigate('FriendlyLeaguesStack')}
              style={[
                styles.DrawerItemText,
                  { color: activeItemKey === 'FriendlyLeaguesStack' ?
                    activeTintColor : inactiveTintColor 
              }]}
            >
              {locali('navigation.titles.drawer.friendly_leagues')}
            </Text>
          </View>
        </View>
        <View
        style={activeItemKey === 'FormsStack' ? styles.drawerActiveItem : styles.drawerInActiveItem}
        >
        <View style={styles.DrawerItemIconContainer}>
            <FontAwesomeIcon style={styles.DrawerItemIcon} name='wpforms' />
          </View>
          <View style={styles.DrawerItemTextContainer}>
            <Text
              onPress={() => navigation.navigate('FormsStack')}
              style={[styles.DrawerItemText,
                { color: activeItemKey === 'FormsStack' ? activeTintColor : inactiveTintColor }]}
            >
              {locali('navigation.titles.drawer.forms')}
            </Text>
          </View>
        </View>
        <View
        style={activeItemKey === 'screen3' ? styles.drawerActiveItem : styles.drawerInActiveItem}
        >
        <View style={styles.DrawerItemIconContainer}>
            <FontAwesomeIcon style={styles.DrawerItemIcon} name='user' />
          </View>
          <View style={styles.DrawerItemTextContainer}>
            <Text
              onPress={() => navigation.navigate('screen3')}
              style={[styles.DrawerItemText,
                { color: activeItemKey === 'screen3' ? activeTintColor : inactiveTintColor }]}
            >
              {locali('navigation.titles.drawer.my_account')}
            </Text>
          </View>
        </View>
        <View
        style={styles.drawerInActiveItem}
        >
        <View style={styles.DrawerItemIconContainer}>
          <SimpleLineIconsIcon style={styles.DrawerItemIcon} name='logout' />
          </View>
          <View style={styles.DrawerItemTextContainer}>
            <Text
              onPress={this.logout}
              style={[styles.DrawerItemText, { color: inactiveTintColor }]}
            >
              {locali('navigation.titles.drawer.log_out')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

DrawerContainer.defaultProps = {
  activeTintColor: '#2196f3',
  activeBackgroundColor: 'rgba(0, 0, 0, .04)',
  inactiveTintColor: 'rgba(0, 0, 0, .87)',
  inactiveBackgroundColor: 'transparent',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1E15E',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  drawerActiveItem: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  drawerInActiveItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    opacity: 0.62
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
