import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { fetchChat, onMessageChanged, sendMessage } from '../actions';

class Chat extends Component {

    componentWillMount() {
        this.props.fetchChat(this.props.selectedFriendlyLeagueId);
    }

    onSend(messages) {
        console.log('messages', messages);
        const messageContent = _.map(messages, (message) => {
            return { ...message, createdAt: new Date().toString() };
        });
        console.log('messageContent', messageContent);
        const appeandChat = [...messageContent, ...this.props.chat];
        console.log('appeandChat', appeandChat);
		firebase.database().ref(`/friendlyLeagues/${this.props.selectedFriendlyLeagueId}/chat`)
		.set(appeandChat);
    }
    renderFooter() {
        if (this.props.isTyping) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.props.isTyping + ' מקליד'}
                    </Text>
                </View>
            );
        }
        return null;
}

    render() {
    return (
        <GiftedChat
            messages={this.props.chat}
            renderFooter={() => this.renderFooter()}
            onInputTextChanged={text => this.props.onMessageChanged(text)}
            onSend={messages => this.onSend(messages)}
            user={{
                _id: firebase.auth().currentUser.uid,
                name: 'EtayRock'
            }}
        />
    );
  }
}

const mapStateToProps = state => {
const { chat, selectedFriendlyLeagueId, isTyping } = state.friendlyLeagues;

return { chat, selectedFriendlyLeagueId, isTyping };
};

export default connect(mapStateToProps, { fetchChat, onMessageChanged, sendMessage })(Chat);

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});
