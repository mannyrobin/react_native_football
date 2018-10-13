import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { logout, reduxNav, openAccount, chooseDrawerRoute, openMainLeague } from '../../actions';
import { locali } from '../../../locales/i18n';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants';

class DrawerContainer extends Component {

  render() {
    const {
      activeTintColor,
      inactiveTintColor,
      drawerRoute
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.openMainLeague(this.props.currentUserMainLeague);
            this.props.chooseDrawerRoute('MainLeague');
          }}
        >
          <View
            style={drawerRoute === 'MainLeague' ?
            styles.drawerActiveItem :
            styles.drawerInActiveItem}
          >

            <View style={styles.DrawerItemIconContainer}>
              <FontAwesomeIcon style={styles.DrawerItemIcon} name='trophy' />
            </View>
            <View style={styles.DrawerItemTextContainer}>
              <Text
                style={[styles.DrawerItemText,
                { color: drawerRoute === 'MainLeague' ? activeTintColor : inactiveTintColor }]}
              >
                {locali('navigation.titles.drawer.main_league')}
              </Text>
            </View>

          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.reduxNav('FriendlyLeaguesStack');
            this.props.chooseDrawerRoute('FriendlyLeaguesStack');
          }}
        >
          <View
            style={drawerRoute === 'FriendlyLeaguesStack' ?
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
                    color: drawerRoute === 'FriendlyLeaguesStack' ?
                      activeTintColor : inactiveTintColor
                  }]}
              >
                {locali('navigation.titles.drawer.friendly_leagues')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.openAccount(this.props.user.uid, this.props.myDisplayName);
            this.props.chooseDrawerRoute('Account');
          }}
        >
          <View
            style={drawerRoute === 'Account' ? styles.drawerActiveItem : styles.drawerInActiveItem}
          >
            <View style={styles.DrawerItemIconContainer}>
              <FontAwesomeIcon style={styles.DrawerItemIcon} name='user' />
            </View>
            <View style={styles.DrawerItemTextContainer}>
              <Text
                style={[styles.DrawerItemText,
                { color: drawerRoute === 'Account' ? activeTintColor : inactiveTintColor }]}
              >
                {locali('navigation.titles.drawer.my_account')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.logout()}
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

const mapStateToProps = ({ mainLeagues, helpers }) => {
  const currentUser = firebase.auth().currentUser;
  const currentUserMainLeague = mainLeagues.league;
  const drawerRoute = helpers.drawerRoute;

  return {
    user: currentUser,
    myDisplayName: currentUser && currentUser.displayName,
    currentUserMainLeague,
    drawerRoute
  };
};

export default connect(mapStateToProps, {
  logout,
  reduxNav,
  openAccount,
  chooseDrawerRoute,
  openMainLeague
})(DrawerContainer);

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
