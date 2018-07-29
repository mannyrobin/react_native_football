import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Test1 extends Component {
    static navigationOptions = () => {
        return {
            title: 'Title!@#',
            drawerLabel: 'title!!!'
        };
  };

    render() {
        return (
            <View>
                <Text>Hello World! 1</Text>
            </View>
        );
    }
}

export default Test1;
