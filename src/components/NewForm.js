import { Container, Header, Content, Icon, Picker, Form, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { fetchMatches, selectedPickerCountry, selectedPickerLeauge, reduxNav } from '../actions';
import MatchContainer from './MatchContainer';
import { Spinner } from './common';
import { locali } from '../../locales/i18n';

class NewForm extends Component {
  static navigationOptions = {
    header: null,
  };
  componentWillMount() {
    this.props.fetchMatches();
  }

  onValueChangeCountry(value) {
    const { matchesLeagues } = this.props;
    this.props.selectedPickerCountry(value, matchesLeagues);
  }
  onValueChangeLeauge(value) {
    const { matchesLeagues, pickerSelectedCountry } = this.props;
    this.props.selectedPickerLeauge(value, matchesLeagues, pickerSelectedCountry);
  }

  pickerItemLeague() {
    const { pickerSelectedCountry } = this.props;
    if (pickerSelectedCountry === 'England') {
      return <Picker.Item label={locali('countries.england.leagues.championship')} value="Championship" />;
    }
    return <Picker.Item label={locali('countries.france.leagues.ligue2')} value="Ligue 2" />;
  }


  handleCountryPicker() {
    return (
      <Picker
        mode="dropdown"
        style={{ width: undefined }}
        placeholder='Select a country...'
        itemTextStyle={{ fontSize: 18, color: 'white' }}
        selectedValue={this.props.pickerSelectedCountry}
        onValueChange={this.onValueChangeCountry.bind(this)}
      >
        <Picker.Item label={locali('countries.countryPicker')} value='countryPlaceholder' />
        <Picker.Item label={locali('countries.england.countryName')} value="England" />
        <Picker.Item label={locali('countries.france.countryName')} value="France" />
      </Picker>
    );
  }

  handleLeaguePicker() {
    const { pickerSelectedCountry, pickerSelectedLeauge } = this.props;
    return (
      <Picker
        mode="dropdown"
        style={{ width: undefined }}
        placeholder="Select a leauge..."
        enabled={(!pickerSelectedCountry || pickerSelectedCountry === 'countryPlaceholder') ? false : true}
        selectedValue={pickerSelectedLeauge}
        onValueChange={this.onValueChangeLeauge.bind(this)}
      >
        <Picker.Item label={locali('countries.leaguePicker')} value="leaugePlaceholder" />
        {this.pickerItemLeague()}
      </Picker>
    );
  }

  handlePickers() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.handleCountryPicker()}
        {this.handleLeaguePicker()}
      </View>
    );
  }

  render() {
    const { matchesToShow } = this.props;
    if (matchesToShow.length > 0) {
      const formFilled = this.props.newForm.length > 0;
      return (
        <View style={{ flex: 1 }}>
          {this.handlePickers()}
          <View style={styles.container}>
            <View style={styles.MatchesContainer}>
              <FlatList
                data={matchesToShow}
                renderItem={({ item }) =>
                  <MatchContainer match={item} />
                }
                keyExtractor={match => match.uid}
              />
            </View>
            <View style={styles.ButtonContainer}>
              <RkButton
                rkType='xlarge'
                onPress={() => this.props.reduxNav('ReviewForm')}
                disabled={!formFilled}
                style={!formFilled ? styles.buttonDisabled : ''}
              >
                {locali('forms.matches.review_form_button')}
              </RkButton>
            </View>
          </View>
        </View>
      );
    } return (
      <View style={{ height: 500 }}>
        <Spinner size="large" />
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 6,
      backgroundColor: '#fff',
      padding: 20
    },
    MatchesContainer: {
      flex: 12,
      marginBottom: 10
    },
    ButtonContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonDisabled: {
      backgroundColor: '#B7BABC'
    }
  });
  

  const mapStateToProps = state => {
    const { newForm } = state.forms;
    const { matchesLeagues, pickerSelectedCountry, matchesToShow, pickerSelectedLeauge } = state.matches;

    return { matchesLeagues, newForm, pickerSelectedCountry, matchesToShow, pickerSelectedLeauge };
  };

  export default connect(mapStateToProps, { reduxNav, fetchMatches, selectedPickerCountry, selectedPickerLeauge })(NewForm);
