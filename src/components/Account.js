import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class Account extends Component {
  static navigationOptions = {
    drawerLabel: 'My Account',
    drawerIcon: () => (
      <FontAwesomeIcon style={styles.drawerItemIcon} name='user' />
    )
  }

  render() {
    const selectedAccountData = this.props.selectedAccountData;
    console.log(`selectedAccountData ${selectedAccountData}`);
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.headerContainer}
          source={require('../images/SoccerFieldDarker.jpg')}
          resizeMode='cover'
        >
          <View style={styles.headerSection}>
            <Image
              style={styles.accountAvatar}
              source={require('../images/DefaultThumbnail.png')}
            />
          </View>
          <View style={[styles.headerSection, { height: 20 }]}>
            <Text style={styles.titleText}>{selectedAccountData.displayName}</Text>
          </View>
          <View style={[styles.headerSection, { height: 70 }]}>
            <Text style={styles.titleText}>Total Forms Won | Total Forms Lost</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: 250
  },
  headerSection: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  accountAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: '#fff'
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  drawerItemIcon: {
    fontSize: 25
  }
});

const mapStateToProps = state => {
  const { selectedAccountData } = state.helpers;

  return { selectedAccountData };
};

export default connect(mapStateToProps)(Account);
