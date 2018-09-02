import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { onMessageChanged, sendMessage } from '../actions';
import { SECONDARY_COLOR } from '../constants';

class Chat extends Component {
    onSend(messages) {
        const messageContent = _.map(messages, (message) => {
            return { ...message, createdAt: new Date().toString() };
        });
        const appeandChat = [...messageContent, ...this.props.chat];
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


 renderName(props) {
const { name } = props.currentMessage.user;
    return (
        <Text>
        {name.substr(0, name.indexOf(' '))}
      </Text>
    );
}

    renderBubble = (props) => {
        const currentUserUid = firebase.auth().currentUser.uid;
        const { _id } = props.currentMessage.user;
        const isSelf = _id === currentUserUid;
        return (
            <View>
                <View style={isSelf ? styles.isSelf : styles.otherUser}>
                {this.renderName(props)}
                </View>
                <Bubble 
                {...props}
                wrapperStyle={{
                    right: {
                      backgroundColor: SECONDARY_COLOR
                    }
                  }}
                />
            </View>
        );
    };


    render() {
        const currentUserUid = firebase.auth().currentUser.uid;
        const { displayNames, friendlyLeagueAvatars } = this.props;
        return (
            <GiftedChat
                messages={this.props.chat}
                showAvatarForEveryMessage
                showUserAvatar
                renderBubble={this.renderBubble}
                renderFooter={() => this.renderFooter()}
                onInputTextChanged={text => this.props.onMessageChanged(text)}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: currentUserUid,
                    name: _.find(displayNames, (item) => item.uid === currentUserUid).displayName,
                    avatar: _.find(friendlyLeagueAvatars, (item) => item.uid === currentUserUid).avatarURL
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    const { chat, selectedFriendlyLeagueId,
        isTyping, displayNames,
        friendlyLeagueAvatars } = state.friendlyLeagues;

    return { chat, selectedFriendlyLeagueId, isTyping, displayNames, friendlyLeagueAvatars };
};

export default connect(mapStateToProps, { onMessageChanged, sendMessage })(Chat);

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
    isSelf: {
        marginRight: 10,
        alignSelf: 'flex-end'
    },
    otherUser: {
        marginLeft: 10,
        alignSelf: 'flex-start'
    }
});
