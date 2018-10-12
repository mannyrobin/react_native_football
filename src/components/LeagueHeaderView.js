import React from 'react';
import { View, Text, Image } from 'react-native';

import { locali } from '../../locales/i18n';

export default ({ league, currentUser }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', marginRight: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {league.level ?
                    locali('main_leagues.league_level', { leagueLevel: league.level }) :
                    league.friendlyLeagueName}
            </Text>
        </View>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFAF40',
                borderRadius: 15,
                paddingVertical: 3,
                paddingHorizontal: 5
            }}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginRight: 5 }}>{
                league.participants
                    .find(participant =>
                        participant.uid === currentUser.uid)
                    .coins
            }</Text>
            <Image
                source={require('../images/Currency2Small.png')}
                style={{ height: 30, width: 30 }}
                resizeMode="contain"
            />
        </View>
    </View>
);
