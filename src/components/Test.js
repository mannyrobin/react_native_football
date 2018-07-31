import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Test extends Component {
    render() {
        return (
            <View>
                <Text>Hello World!</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const {
      email,
      password
    } = state.auth;
  
    return {
      email,
      password
    };
  };

export default connect(mapStateToProps)(Test);
