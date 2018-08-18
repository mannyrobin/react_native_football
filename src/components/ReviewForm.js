import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Slider from 'react-native-slider';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { submitForm } from '../actions';
import { SingleFormView } from './SingleFormView';

class ReviewForm extends Component {
    state = { sliderValue: '0' };
    
    render() {
        return (
            
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <SingleFormView form={this.props.form} />
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
                <View style={styles.buttonContainer}>
                    <RkButton 
                        rkType='xlarge'
                        onPress={() => this.props.submitForm(this.props.newForm, `${this.state.sliderValue}`, this.props.navigation)}
                    >
                        שלח טופס
                    </RkButton>
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
        flex: 5,
    },
    sliderContainer: {
        flex: 1,
        flexDirection: 'row' 
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        
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

  const fetchMatch = (matchUid, matches) => {
    const allMatches = _.flatMap(matches.matchesLeagues, league => league.matches);
    
    return allMatches.find(match => match.uid === matchUid);
};

  const mapStateToProps = ({ forms, matches }) => {
    const form = forms.newForm;

    form.bets = form.map(bet => ({
        ...bet,
        match: fetchMatch(bet.matchUid, matches)
    }));

    return {
        form
    };
};

export default connect(mapStateToProps, { submitForm })(ReviewForm);
