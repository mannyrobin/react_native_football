import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { locali } from '../../locales/i18n';

export default class FriendlyLeagues extends Component {

  render() {
    RkTheme.setType('RkButton', 'fillScreen', {
      container: {
         marginBottom: 10
      },
      content: {
          flex: 1
      }
    });

    return (
      <View style={styles.container}>
        
        <RkButton
          rkType="xlarge fillScreen"
          style={{ justifyContent: 'center' }}
          onPress={() => this.props.navigation.navigate('NewFriendlyLeague')}  
        >
          <FontAwesomeIcon name='trophy' color="white" size={30} />
          {locali('friendly_leagues.button_create_new')}
        </RkButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  }
});
