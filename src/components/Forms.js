import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchCurrentForms, openForm } from '../actions';
import FormThumbnail from './FormThumbnail';
import { BACKGROUND_COLOR } from '../constants';

class Forms extends Component {

  componentWillMount() {
    this.props.fetchCurrentForms();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <FlatList
          data={this.props.selectedLeagueForms}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.openForm(this.props.navigation, item.uid)}
            >
              <FormThumbnail form={item} />
            </TouchableOpacity>
          )
          }
          keyExtractor={form => form.uid.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ forms, friendlyLeagues }) => {
  const { currentForms } = forms;
  const selectedLeagueForms = [];
  if (currentForms.length > 0) {
    currentForms.forEach(form => {
      if (form.leagueUid === friendlyLeagues.selectedFriendlyLeagueId) {
        selectedLeagueForms.push(form);
      }
    });
  }
  return { currentForms, selectedLeagueForms };
};

export default connect(mapStateToProps, { fetchCurrentForms, openForm })(Forms);
