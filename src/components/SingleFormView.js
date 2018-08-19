import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { locali } from '../../locales/i18n';

class SingleFormView extends Component {
  render() {
    const { bets, timestamp, totalCoins, totalOdd } = this.props.form;
    return ( 
      <View style={{ width: '100%' }}>
        <ImageBackground
          source={require('../images/Form.png')}
          style={{ height: '100%' }}
          resizeMode='cover'
          position='absolute'
        >
          {bets
            .map(({ match }) =>
              <View style={{ flex: 1 }}>
                <View style={styles.timeContainer}>
                  <Text style={[styles.titleStyle, { textAlign: 'center' }]}>
                    {timestamp}
                  </Text>
                </View>
                <View style={styles.teamsContainer}>
                  <View style={styles.teamsSection}>
                    <View style={styles.teamLogoSection}>
                      <Image
                        style={{ flex: 1, height: undefined, width: undefined }}
                        source={require('../images/Real_Madrid.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.teamLabelSection}>
                      <Text style={styles.titleTeamsStyle}>
                        {match.hometeamName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.vsSection}>
                    <Text style={styles.titleStyle}>
                      {locali('forms.matches.vs')}
                    </Text>
                  </View>
                  <View style={styles.teamsSection}>
                    <View style={styles.teamLogoSection}>
                      <Image
                        style={{ flex: 1, height: undefined, width: undefined }}
                        source={require('../images/Real_Madrid.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.teamLabelSection}>
                      <Text style={styles.titleTeamsStyle}>
                        {match.awayteamName}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

            )}
          <View style={[styles.timeContainer, { flexDirection: 'column', paddingTop: 30 }]}>
            
              <Button
                style={{ flex: 1 }}
                fontWeight='bold'
                large
                backgroundColor='#C1E15E'
                icon={{ name: 'local-atm' }}
                title={locali('forms.display_form.possible_win') + totalCoins.toFixed(2)}
              />
              <Button
                style={{ flex: 1 }}
                fontWeight='bold'
                large
                backgroundColor='#C1E15E'
                icon={{ name: 'local-atm' }}
                title={'Total Odd: ' + totalOdd.toFixed(2)}
              />
            
            <View style={styles.timeContainer}>
              <Avatar
                large
                icon={{ name: 'timer', type: 'MaterialIcons' }}
                rounded
                activeOpacity={0.7}
              />
            </View>

          </View>
        </ImageBackground>
      </View>
      
    );
  }
}     
  const styles = StyleSheet.create({
    timeContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    TeamsNames: {
      fontSize: 18,
      textAlign: 'center'
    },
    container: {
      flexDirection: 'column',
      height: 150,
      borderRadius: 25,

      //IOS Shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 2,

      //Android Shadow
      elevation: 5,

      marginBottom: 15
    },
    teamsContainer: {
      flexDirection: 'row',
      flex: 3,
    },
    teamsSection: {
      flexDirection: 'column',
      flex: 5,
      marginVertical: 5,
    },
    teamLogoSection: {
      flex: 1,
      justifyContent: 'center',
    },
    teamLabelSection: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 5
    },
    vsSection: {
      flex: 2,
      justifyContent: 'center',
      alignSelf: 'center'
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
      backgroundColor: '#B7BABC',
      alignSelf: 'center',
    },
    oddButtonSelected: {
      paddingHorizontal: 0,
      marginHorizontal: 0,
      width: 40,
      height: 40,
      backgroundColor: '#FFAF40',
      alignSelf: 'center',
    },
    oddButtonLable: {
      color: '#E20A17',
      fontWeight: 'bold'
    },
    titleStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
    },
    titleTeamsStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
    }
  });

export default SingleFormView;
