import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchCurrentForms, openForm } from '../actions';
import SingleFormView from './SingleFormView';
import { locali } from '../../locales/i18n';


class Forms extends Component {

  componentWillMount() {
    this.props.fetchCurrentForms();
  }

  render() {
    return (
      <FlatList
      data={this.props.currentForms}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => this.props.openForm(this.props.navigation, item.uid)}
        >
        <View>
          <Text>
            {item.timestamp}
          </Text>
        </View>
        </TouchableOpacity>
      )
    }
      keyExtractor={form => form.uid.toString()} 
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  }
});

const mapStateToProps = state => {
  const { currentForms } = state.forms;
  
  return { currentForms };
};

export default connect(mapStateToProps, { fetchCurrentForms, openForm })(Forms);
