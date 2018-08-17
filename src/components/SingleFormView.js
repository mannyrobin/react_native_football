import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const SingleFormView = ({ form }) => {
    const { bets, timestamp, coins, totalCoins, totalOdd, won } = form; 

    return (
        <View style={styles.container}>
            <View>
                    <Text style={styles.titleStyle}>
                        {timestamp}
                    </Text>
                    <Text style={styles.titleStyle}>
                        {coins}
                    </Text>
                    <Text style={styles.titleStyle}>
                        {totalCoins}
                    </Text>
                    <Text style={styles.titleStyle}>
                        {totalOdd}
                    </Text>
                    <Text style={styles.titleStyle}>
                        {won}
                    </Text>
                    {bets
                        .map(({ match }) =>
                         (<Text>{ match.awayteamName + ' VS ' + match.hometeamName}</Text>))}
            </View>           
        </View>
    );     
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {

        fontSize: 18,
        paddingLeft: 15
    },
    timeContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
export { SingleFormView };
