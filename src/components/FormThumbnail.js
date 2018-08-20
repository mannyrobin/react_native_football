import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { CardSection } from './common';


class FormThumbnail extends Component {

    render() {
        return (
            <CardSection>
                <View style={styles.container}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.title}>
                            12345
                    </Text>
                    </View>
                    <View style={styles.pressToOpenContainer}>
                        <View style={{ marginHorizontal: 5 }}>
                            <Text style={styles.title}>
                                Press To Open!
                    </Text>
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <Icon
                                name='hand-pointer-o'
                                type='font-awesome'
                            />
                        </View>
                    </View>
                    <View style={styles.betsContainer}>
                        <View style={styles.betCoinsContainer}>
                            <View>
                                <Text style={styles.title}>
                                    Bet Amount:
                              </Text>
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row'/* , borderWidth: 1, borderColor: 'black' */ }}>
                                <View style={{ marginHorizontal: 5, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={styles.title}>
                                        150
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: 5, alignSelf: 'center' }}>
                                    <Image
                                        source={require('../images/Currency2Small.png')}
                                        style={{ height: 35, width: 35 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkWonContainer}>
                            <Icon
                            size={40}
                                name='timer'
                                type='material-community'
                            />
                        </View>
                        <View style={styles.betExpectedCoinsContainer}>
                            <View>
                                <Text style={styles.title}>
                                    Winning Coins:
                              </Text>
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row'/* , borderWidth: 1, borderColor: 'black' */ }}>
                                <View style={{ marginHorizontal: 5, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={styles.title}>
                                        600
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: 5, alignSelf: 'center' }}>
                                    <Image
                                        source={require('../images/Currency2Small.png')}
                                        style={{ height: 35, width: 35 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </CardSection>
        );
    }


}

const styles = StyleSheet.create({
    container: {
/*         borderWidth: 1,
        borderColor: 'black', */
        flex: 1
    },
    dateContainer: {
/*         borderWidth: 1,
        borderColor: 'red', */
        alignSelf: 'center',
        marginVertical: 5
    },
    title: {
/*         borderWidth: 1,
        borderColor: 'black', */
        textAlign: 'center',
        fontSize: 18
    },
    pressToOpenContainer: {
        flexDirection: 'row',
/*         borderWidth: 1,
        borderColor: 'green', */
        justifyContent: 'center',
        marginBottom: 10
    },
    betsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    betCoinsContainer: {
        flex: 3,
/*         borderWidth: 1,
        borderColor: 'green' */
    },
    checkWonContainer: {
        flex: 1,
/*         borderWidth: 1,
        borderColor: 'red', */
        justifyContent: 'center'
    },
    betExpectedCoinsContainer: {
        flex: 3,
/*         borderWidth: 1,
        borderColor: 'black', */
    }
});

export default FormThumbnail;
