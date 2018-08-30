import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

class CustomHeader extends Component {
    render() {
        const renderCoinsSection = () => {
            if (this.props.coins !== '') {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFAF40', borderRadius: 15, paddingVertical: 3, paddingHorizontal: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginRight: 5 }}>{this.props.coins}</Text>
                        <Image
                            source={require('../images/Currency2Small.png')}
                            style={{ height: 30, width: 30 }}
                            resizeMode="contain"
                        />
                    </View>
                );
            }
            return null;
        };

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                <View style={{ justifyContent: 'center', marginRight: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.customHeaderTitle}</Text>
                </View>
                {renderCoinsSection()}
            </View>
        );
    }
}

const mapStateToProps = ({ friendlyLeagues }) => {
    const { currentUser } = firebase.auth();
    let customHeaderTitle;
    let coins;
    if (friendlyLeagues.selectedFriendlyLeagueId) {
        const league = friendlyLeagues.friendlyLeaguesListFetch.find(leagueItem =>
            leagueItem.uid === friendlyLeagues.selectedFriendlyLeagueId);
        customHeaderTitle = league.friendlyLeagueName;
        const currentLeagueUser = league.participants.find(participant =>
            participant.uid === currentUser.uid);
        coins = currentLeagueUser.coins;
    } else {
        customHeaderTitle = 'בט מאסטרס';
        coins = '';
    }

    return { customHeaderTitle, coins };
};

export default connect(mapStateToProps)(CustomHeader);
