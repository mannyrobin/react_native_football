import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchCurrentForms, openForm } from '../actions';
import FormThumbnail from './FormThumbnail';

class Forms extends Component {

  componentWillMount() {
    this.props.fetchCurrentForms();
  }

  render() {
    return (
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

    );
  }
}

const mapStateToProps = ({ forms, friendlyLeagues }) => {
  const { currentForms } = forms;
  const selectedLeagueForms = [];
  currentForms.forEach(form => {
    if (form.leagueUid === friendlyLeagues.selectedFriendlyLeagueId) {
      selectedLeagueForms.push(form);
    }
  });
  return { currentForms, selectedLeagueForms };
};

export default connect(mapStateToProps, { fetchCurrentForms, openForm })(Forms);
