import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Card, CardSection } from './common';
import { locali } from '../../locales/i18n';

export default class NewFriendlyLeague extends Component {

  render() {
    return (
        <Card>
            <RkTextInput
              label={<FontAwesomeIcon style={styles.textInputIcon} name='trophy' />}
              placeholder={locali('friendly_leagues.new_friendly_leagues.name_placeholder')}
            />
            <CardSection>
                <RkButton
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                >
                    {locali('friendly_leagues.new_friendly_leagues.button_create')}
                </RkButton>
            </CardSection>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  },
  textInputIcon: {
    fontSize: 20,
    color: '#0000003a',
    marginLeft: 15
  }
});
