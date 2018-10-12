import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCurrentForms, openForm } from '../actions';
import FormThumbnail from './FormThumbnail';
import { BACKGROUND_COLOR } from '../constants';

class Forms extends Component {

  componentWillMount() {
    this.props.fetchCurrentForms();
  }

  render() {
    const leagueParam = this.props.screenProps.league;

    const league = leagueParam.level ? 
      this.props.mainLeague :
      this.props.friendlyLeagues.find(({ uid }) => uid === leagueParam.uid);
    const selectedLeagueForms = this.props.currentForms
      .filter(form => form.leagueUid === league.uid);

    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <FlatList
          data={selectedLeagueForms}
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

const mapStateToProps = ({ forms, mainLeagues, friendlyLeagues }) => {
  const { currentForms } = forms;

  return {
    currentForms,
    mainLeague: mainLeagues.league,
    friendlyLeagues: friendlyLeagues.friendlyLeaguesListFetch
  };
};

export default connect(mapStateToProps, { fetchCurrentForms, openForm })(Forms);
