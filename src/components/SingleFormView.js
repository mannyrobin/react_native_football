import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import { Button, Avatar } from 'react-native-elements';
import { locali } from '../../locales/i18n';

import { SECONDARY_COLOR, COMPONENT_COLOR } from '../constants';

class SingleFormView extends Component {

  render() {
    const { bets, totalCoins, totalOdd, coins, won } = this.props.form;
    return bets ? (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={require('../images/Form.png')}
              style={{ height: '100%', width: '100%' }}
              resizeMode='cover'
            >
              <View style={styles.matchesContainer}>
                {bets
                  .map(({ match, bet }) =>
                    <View style={styles.teamsContainer}>
                      <View style={styles.teamsSection}>
                        <View style={styles.teamLogoSection}>
                          <Image
                            style={{ height: 40, width: 40, alignSelf: 'center' }}
                            source={require('../images/Real_Madrid.png')}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.teamLabelSection}>
                          <Text style={styles.titleStyle}>
                            {match.hometeamName}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.middleSection}>
                        <View style={styles.timeContainer}>
                          <Text style={[styles.titleStyle, { textAlign: 'center' }]}>
                            {
                              match.date + ' ' + match.time
                              //timestamp
                              /* new Date(timestamp * 1000).toLocaleString() */
                            }
                          </Text>
                        </View>
                        <View style={styles.oddsContainer}>
                          <View style={styles.oddsSection}>

                            <RkButton
                              style={bet === '1' ? styles.oddButtonSelected : styles.oddButton}
                              rkType='circle outline'
                            >
                              <Text style={styles.oddButtonLable}>{match.hometeamOdd.toFixed(2)}</Text>
                            </RkButton>
                          </View>
                          <View style={[styles.oddsSection, { flex: 2 }]}>
                            <RkButton
                              style={bet === 'x' ? styles.oddButtonSelected : styles.oddButton}
                              rkType='circle outline'
                            >
                              <Text style={styles.oddButtonLable}>{match.drawOdd.toFixed(2)}</Text>
                            </RkButton>
                          </View>
                          <View style={styles.oddsSection}>
                            <RkButton
                              style={bet === '2' ? styles.oddButtonSelected : styles.oddButton}
                              rkType='circle outline'
                            >
                              <Text style={styles.oddButtonLable}>{match.awayteamOdd.toFixed(2)}</Text>
                            </RkButton>
                          </View>
                        </View>
                      </View>
                      <View style={styles.teamsSection}>
                        <View style={styles.teamLogoSection}>
                          <Image
                            style={{ height: 40, width: 40, alignSelf: 'center' }}
                            source={require('../images/Real_Madrid.png')}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.teamLabelSection}>
                          <Text style={styles.titleStyle}>
                            {match.awayteamName}
                          </Text>
                        </View>
                      </View>
                    </View>

                  )}
              </View>
              <View style={styles.formDescription}>


                <Button
                  style={{ flex: 1 }}
                  fontWeight='bold'
                  large
                  backgroundColor={SECONDARY_COLOR}
                  icon={{ name: 'local-atm' }}
                  title={locali('forms.display_form.total_odd') + totalOdd.toFixed(2)}
                />
                <Button
                  style={{ flex: 1 }}
                  fontWeight='bold'
                  large
                  backgroundColor={SECONDARY_COLOR}
                  icon={{ name: 'local-atm' }}
                  title={'סכום הימור: ' + coins}
                />
                <Button
                  style={{ flex: 1 }}
                  fontWeight='bold'
                  large
                  backgroundColor={SECONDARY_COLOR}
                  icon={{ name: 'local-atm' }}
                  title={locali('forms.display_form.possible_win') + totalCoins.toFixed(2)}
                />
              </View>
              <View style={styles.formWon}>
                <Avatar
                  large
                  icon={
                    won === 1 ? { name: 'check', type: 'entypo' } :
                      won === 0 ? { name: 'cross', type: 'entypo' } :
                        { name: 'timer', type: 'materialIcons' }}
                  overlayContainerStyle={
                    won === 1 ? { backgroundColor: 'green' } :
                      won === 0 ? { backgroundColor: 'red' } :
                        { backgroundColor: 'grey' }}
                  rounded
                  activeOpacity={0.7}
                />
              </View>
            </ImageBackground>

          </View>
        </ScrollView>

      </View>) : null;
  }
}
const styles = StyleSheet.create({
  timeContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  teamsContainer: {
    flexDirection: 'row',
    height: 100
  },
  teamsSection: {
    flexDirection: 'column',
    flex: 3,
    marginVertical: 5,
  },
  teamLogoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  teamLabelSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    color: COMPONENT_COLOR
  },
  middleSection: {
    flex: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  oddsContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  oddsSection: {
    flex: 5,
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  oddButton: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
    width: 40,
    height: 40,
    backgroundColor: SECONDARY_COLOR,
    alignSelf: 'center',
    borderWidth: 0,
  },
  oddButtonSelected: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
    width: 40,
    height: 40,
    backgroundColor: '#FFAF40',
    alignSelf: 'center',
    borderWidth: 0,
  },
  oddButtonLable: {
    color: COMPONENT_COLOR,
    fontWeight: 'bold',
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COMPONENT_COLOR,
    textAlign: 'center',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  formDescription: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  formWon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchesContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});


export default SingleFormView;
