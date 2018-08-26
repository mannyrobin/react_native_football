import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import { locali } from '../../locales/i18n';


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320, height: 320, resizeMode: 'contain'
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },

});

const slides = [
  {
    key: 'page1',
    title: locali('intro.page1.title'),
    text: locali('intro.page1.content'),
    image: require('../images/IntroPage1.png'),
    imageStyle: styles.image,
    colors: ['#63E2FF', '#B066FE'],
  }
];

export default class App extends Component {
  static navigationOptions = {
    header: null,
};

  _renderItem = props => (
    <LinearGradient
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }} end={{ x: 0.1, y: 1 }}
    >
      <Image
        style={props.imageStyle}
        source={props.image}
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={() => this.props.navigation.navigate('Login')}
        onSkip={() => this.props.navigation.navigate('Login')}
        skipLabel={locali('intro.button_skip')}
        nextLabel={locali('intro.button_next')}
        doneLabel={locali('intro.button_done')}
        bottomButton
        showSkipButton
      />
    );
  }
}
