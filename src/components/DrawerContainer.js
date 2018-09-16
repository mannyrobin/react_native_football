import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { logout, reduxNav, openAccount } from '../actions';
import { locali } from '../../locales/i18n';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants';

class DrawerContainer extends Component {

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
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.props.reduxNav('Main')}
        >
          <View
            style={activeItemKey === 'Main' ? styles.drawerActiveItem : styles.drawerInActiveItem}
          >

            <View style={styles.DrawerItemIconContainer}>
              <FontAwesomeIcon style={styles.DrawerItemIcon} name='trophy' />
            </View>
            <View style={styles.DrawerItemTextContainer}>
              <Text
                style={[styles.DrawerItemText,
                { color: activeItemKey === 'Main' ? activeTintColor : inactiveTintColor }]}
              >
                {locali('navigation.titles.drawer.main_league')}
              </Text>
            </View>

          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.reduxNav('FriendlyLeaguesStack')}
        >
          <View
            style={activeItemKey === 'FriendlyLeaguesStack' ?
              styles.drawerActiveItem : styles.drawerInActiveItem}
          >
            <View style={styles.DrawerItemIconContainer}>
              <FontAwesomeIcon style={styles.DrawerItemIcon} name='trophy' />
            </View>
            <View style={styles.DrawerItemTextContainer}>
              <Text
                style={[
                  styles.DrawerItemText,
                  {
                    color: activeItemKey === 'FriendlyLeaguesStack' ?
                      activeTintColor : inactiveTintColor
                  }]}
              >
                {locali('navigation.titles.drawer.friendly_leagues')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.openAccount(this.props.user.uid, this.props.myDisplayName)}
        >
          <View
            style={activeItemKey === 'Account' ? styles.drawerActiveItem : styles.drawerInActiveItem}
          >
            <View style={styles.DrawerItemIconContainer}>
              <FontAwesomeIcon style={styles.DrawerItemIcon} name='user' />
            </View>
            <View style={styles.DrawerItemTextContainer}>
              <Text
                style={[styles.DrawerItemText,
                { color: activeItemKey === 'Account' ? activeTintColor : inactiveTintColor }]}
              >
                {locali('navigation.titles.drawer.my_account')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.logout(this.props.user)}
        >
          <View
            style={styles.drawerInActiveItem}
          >
            <View style={styles.DrawerItemIconContainer}>
              <SimpleLineIconsIcon style={styles.DrawerItemIcon} name='logout' />
            </View>
            <View style={styles.DrawerItemTextContainer}>
              <Text
                style={[styles.DrawerItemText, { color: inactiveTintColor }]}
              >
                {locali('navigation.titles.drawer.log_out')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

DrawerContainer.defaultProps = {
  activeTintColor: SECONDARY_COLOR,
  activeBackgroundColor: 'rgba(0, 0, 0, .04)',
  inactiveTintColor: 'rgba(0, 0, 0, .87)',
  inactiveBackgroundColor: 'transparent',
};

const mapStateToProps = ({ auth, friendlyLeagues }) => {
  const { user } = auth;
  const { displayNames } = friendlyLeagues;
  let myDisplayName = displayNames.length > 0 ?
    displayNames.find(element =>
      element.uid === user.uid)
    : '';
    if (myDisplayName) myDisplayName = myDisplayName.displayName;
    else myDisplayName = '';
  return { user, myDisplayName };
};

export default connect(mapStateToProps, { logout, reduxNav, openAccount })(DrawerContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
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
