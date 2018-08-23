import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import { Button, Avatar } from 'react-native-elements';
import { locali } from '../../locales/i18n';

class SingleFormView extends Component {

  render() {
    const { bets, timestamp, totalCoins, totalOdd, won } = this.props.form;
    console.log(bets);
    return bets ? ( 
      <View style={{ width: '100%' }}>

        <ImageBackground
          source={require('../images/Form.png')}
          style={{ height: '100%' }}
          resizeMode='cover'
          position='absolute'
        >
        <ScrollView /* contentContainerStyle={{ height: '130%' }} */>

          {bets
            .map(({ match, bet }) =>
              <View style={{ flex: 1 }}>
                <View style={styles.timeContainer}>
                  <Text style={[styles.titleStyle, { textAlign: 'center' }, { margin: 20 }]}>
                    {new Date(timestamp * 1000).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.teamsContainer}>
                  <View style={styles.teamsSection}>
                    <View style={styles.teamLogoSection}>
                      <Image
                        style={{ flex: 1, height: 40, width: 40, alignSelf: 'center' }}
                        source={require('../images/Real_Madrid.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.teamLabelSection}>
                      <Text style={styles.titleTeamsStyle}>
                        {match.hometeamName}
                      </Text>
                    </View>
                    {/*                     <View style={styles.oddsContainer}>
                      <View style={styles.oddsSection}>
                        <Text>
                          1234
                      </Text>
                      </View>
                    </View> */}

                  </View>
                  <View style={styles.vsSection}>
                    <Text style={styles.titleStyle}>
                      {locali('forms.matches.vs')}
                    </Text>
                  </View>

                  <View style={styles.teamsSection}>
                    <View style={styles.teamLogoSection}>
                      <Image
                        style={{ flex: 1, height: 40, width: 40, alignSelf: 'center' }}
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
                <View style={styles.oddsContainer}>
                  <View style={styles.oddForOne}>
                    <RkButton
                      style={bet === '1' ? styles.oddButtonSelected : styles.oddButton}
                      rkType='circle outline'
                      onPress={() => ''}
                    >
                      <Text style={styles.oddButtonLable}>{match.hometeamOdd.toFixed(2)}</Text>
                    </RkButton>
                  </View>
                  <View style={styles.oddForX}>
                  <RkButton
                      style={bet === 'x' ? styles.oddButtonSelected : styles.oddButton}
                      rkType='circle outline'
                      onPress={() => ''}
                  >
                      <Text style={styles.oddButtonLable}>{match.drawOdd.toFixed(2)}</Text>
                    </RkButton>
                  </View>
                  <View style={styles.oddForOne}>
                  <RkButton
                      style={bet === '2' ? styles.oddButtonSelected : styles.oddButton}
                      rkType='circle outline'
                      onPress={() => ''}
                  >
                      <Text style={styles.oddButtonLable}>{match.awayteamOdd.toFixed(2)}</Text>
                    </RkButton>
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
                title={locali('forms.display_form.total_odd') + totalOdd.toFixed(2)}
              />
              <Button
                style={{ flex: 1 }}
                fontWeight='bold'
                large
                backgroundColor='#C1E15E'
                icon={{ name: 'local-atm' }}
                title={locali('forms.display_form.possible_win') + totalCoins.toFixed(2)}
              />
            
            <View style={styles.timeContainer}>
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
           

          </View>
          </ScrollView> 
          </ImageBackground>
        
      </View>) : null;
  }
}
const styles = StyleSheet.create({
  oddForX: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 5,
    flex: 1 
  },
  oddForOne: {
    marginTop: 5,
    flex: 4 

  },

  timeContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5
    
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
/*     flex: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'green',
    justifyContent: 'center', */
 flexDirection: 'row' 
    
  },
  oddsSection: {
   /*  justifyContent: 'flex-start', */
         borderWidth: 1,
        borderColor: 'black',
        
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
    backgroundColor: '#C1E15E',
    alignSelf: 'center',
  },
  oddButtonLable: {
    color: '#004d26',
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
