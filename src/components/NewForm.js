import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { fetchMatches } from '../actions';
import MatchContainer from './MatchContainer';
import { Spinner } from './common';
import { locali } from '../../locales/i18n';

class NewForm extends Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    this.props.fetchMatches();
  }

  render() {
    if (this.props.matchesLeagues.length > 0) {
      const formFilled = this.props.newForm.length > 0;
      return (
        <View style={styles.container}>
          <View style={styles.MatchesContainer}>
            <FlatList 
              data={this.props.matchesLeagues[0].matches}
              renderItem={({ item }) =>
                  <MatchContainer match={item} />
              }

              keyExtractor={match => match.uid}
            />
          </View>
          <View style={styles.ButtonContainer}>
            <RkButton 
              rkType='xlarge'
              onPress={() => this.props.navigation.navigate('ReviewForm')}
              disabled={!formFilled}
              style={!formFilled ? styles.buttonDisabled : ''}
            >
              {locali('forms.matches.review_form_button')}
            </RkButton>
          </View>
        </View>
      );
    }
    return (
    <View style={{ height: 500 }}>
			<Spinner size="large" />
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
  MatchesContainer: {
    flex: 6,
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
  const { matchesLeagues } = state.matches;

  return { matchesLeagues, newForm };
};

export default connect(mapStateToProps, { fetchMatches })(NewForm);
