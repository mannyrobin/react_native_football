import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchCurrentForms, openForm } from '../actions';


class Forms extends Component {

  componentWillMount() {
    this.props.fetchCurrentForms();
  }

  render() {
    console.log(this.props.currentForms);
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

const mapStateToProps = state => {
  const { currentForms } = state.forms;
  
  return { currentForms };
};

export default connect(mapStateToProps, { fetchCurrentForms, openForm })(Forms);
