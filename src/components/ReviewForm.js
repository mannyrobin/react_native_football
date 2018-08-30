import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { RTLCustomSlider } from './common';
import { submitForm, sliderValueChanged } from '../actions';
import SingleFormView from './SingleFormView';

class ReviewForm extends Component {
    state = { sliderValue: '0' };

    render() {
        let fullForm = {};
        if (this.props.form.bets.length > 0) {
        const totalOdd =
                this.props.form.bets.map(item => item.odd).reduce((prev, next) => prev * next);
        const coins = this.props.sliderValue;
        const totalCoins = totalOdd * this.props.sliderValue;
        const timestamp = Math.floor(new Date().getTime() / 1000);
            fullForm = {
                coins,
                timestamp,
                totalOdd,
                totalCoins,
                won: -1,
                bets: this.props.form.bets
            };
        }
        return (
            
            <View style={styles.container}>
            
                <View style={styles.formContainer}>
                    <SingleFormView form={fullForm} />
                </View>
                <View style={styles.sliderContainer}>
                    <View style={styles.sliderSection}>
                        <RTLCustomSlider
                            minimumValue={0}
                            maximumValue={this.props.currentLeagueUser.coins}
                            step={5}
                            onValueChange={value => this.props.sliderValueChanged(value)}
                            thumbImage={require('../images/Currency2Small.png')}
                            thumbStyle={{ width: 40, height: 40, borderWidth: 0 }}
                            thumbImageStyle={{ flex: 1, height: undefined, width: undefined }}
                            minimumTrackTintColor='#13a9d6'
                            thumbTintColor='#0c6692'
                        />
                    </View>
                    <View style={styles.sliderLabel}>
                        <TextInput
                            style={styles.sliderLabelText}
                            value={`${this.props.sliderValue}`}
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
                        onPress={() => this.props.submitForm(
                            this.props.newForm,
                            `${this.props.sliderValue}`,
                            this.props.league.uid,
                            this.props.navigation)}
                            disabled={!this.props.sliderValue > 0}
                            style={!this.props.sliderValue > 0 ? styles.buttonDisabled : ''}
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
    },
    buttonDisabled: {
        backgroundColor: '#B7BABC'
      }
});

const fetchMatch = (matchUid, matches) => {
    const allMatches = _.flatMap(matches.matchesLeagues, league => league.matches);

    return allMatches.find(match => match.uid === matchUid);
};

const mapStateToProps = ({ forms, matches, friendlyLeagues }) => {
    const { currentUser } = firebase.auth();
    const { newForm, sliderValue } = forms;
    const league = friendlyLeagues.friendlyLeaguesListFetch.find(leagueItem =>
        leagueItem.uid === friendlyLeagues.selectedFriendlyLeagueId);
    const currentLeagueUser = league.participants.find(participant =>
    participant.uid === currentUser.uid);
    const form = [];

    form.bets = newForm.map(bet => ({
        ...bet,
        match: fetchMatch(bet.matchUid, matches)
    }));

    return {
        form, newForm, league, currentLeagueUser, forms, sliderValue
    };
};

export default connect(mapStateToProps, { submitForm, sliderValueChanged })(ReviewForm);
