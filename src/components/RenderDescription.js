import React, { Component } from 'react';
import { View, Text, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchMatchsPerForm } from '../actions';


class RenderDescription extends Component {

componentWillMount() {
        this.props.form.forEach((item) => {
            this.props.fetchMatchsPerForm(item.matchUid, this.props.currentMatchsPerForm);
        });
    }

    renderMatches() {
        /* this.props.currentMatchsPerForm.forEach((item) => { */
            /* const { hometeamName, awayteamName, hometeamOdd, awayteamOdd, drawOdd } = item; */
            return (
                <FlatList
                data={this.props.currentMatchsPerForm}
                renderItem={MatchPerForm => {
                    console.log(MatchPerForm);
                    return <Text> {MatchPerForm.item.awayteamName} </Text>;
            }}
                keyExtractor={MatchPerForm => '1'} 
                />
          
              );
            }

    render() {
        return (
            
            <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../images/Form.png')}
                style={{ width: '100%' }}
            >
            {this.renderMatches()}
       </ImageBackground>
       </View>
        );
    }
}

const mapStateToProps = state => {
    const { currentMatchsPerForm } = state.forms;
    return { currentMatchsPerForm };
};

export default connect(mapStateToProps, { fetchMatchsPerForm })(RenderDescription);
