import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, ImageBackground } from 'react-native';
import Slider from 'react-native-slider';

class ReviewForm extends Component {
    state = { sliderValue: '0' };
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <ImageBackground
                        source={require('../images/Form.png')}
                        style={{ height: '100%', paddingTop: 30 }}
                        resizeMode='cover'
                    >
                    <Text>test</Text>
                    </ImageBackground>
                </View>
                <View style={styles.sliderContainer}>
                    <View style={styles.sliderSection}>
                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            step={5}
                            onValueChange={value => this.setState({ sliderValue: value })}
                            thumbImage={require('../images/Currency2Small.png')}
                        />
                    </View>
                    <View style={styles.sliderLabel}>
                        <TextInput
                            style={styles.sliderLabelText}
                            value={`${this.state.sliderValue}`}
                            //currently does not working because value is determined by the Slider.
                            //need to find another way to update value both from textInput
                            //and Slider.
                            //onChangeText={(text) => console.log(text)}
                        />
                    </View>
                </View>
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
    formContainer: {
        flex: 6
    },
    sliderContainer: {
        flex: 1,
        flexDirection: 'row' 
    },
    sliderLabel: {
        justifyContent: 'center',
        flex: 1
    },
    sliderSection: {
        flex: 6
    },
    sliderLabelText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        color: 'red'
    }
  });
/*
const mapStateToProps = state => {

};
export default connect(mapStateToProps, { sliderValueChanged })(ReviewForm);
*/
export default ReviewForm;
