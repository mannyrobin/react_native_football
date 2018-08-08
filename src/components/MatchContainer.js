import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { updateNewForm } from '../actions';
import { Spinner } from './common';
import { locali } from '../../locales/i18n';

class MatchContainer extends Component {
    render() {
        const {
            hometeamName,
            awayteamName,
            timestamp,
            hometeamOdd,
            awayteamOdd,
            drawOdd,
            uid
        } = this.props.match;
        if (hometeamName && awayteamName && timestamp && hometeamOdd && awayteamOdd && drawOdd) {
                let buttonSelected;
                if (this.props.newForm.length > 0) {
                    if (this.props.newForm.find((element) => element.matchUid === uid)) {
                        buttonSelected = this.props.newForm.find((element) =>
                        element.matchUid === uid).bet.toString();
                    }
                }
            return (
                <LinearGradient
                style={styles.container}
                colors={['#2196F3', '#2230F3', '#0914AF']}
                start={{ x: 0, y: 0.1 }} end={{ x: 0.1, y: 1 }}
                >
                    <View style={styles.timeContainer}>
                        <Text style={[styles.titleStyle, { textAlign: 'center' }]}>
                            {timestamp}
                        </Text>
                    </View>
                    <View style={styles.teamsContainer}>
                        <View style={styles.teamsSection}>
                            <View style={styles.teamLogoSection}>
                                <Image
                                    style={{ flex: 1, height: undefined, width: undefined }}
                                    source={require('../images/Real_Madrid.png')}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.teamLabelSection}>
                                <Text style={styles.titleStyle}>
                                    {hometeamName}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.vsSection}>
                            <Text style={styles.titleStyle}>
                            {locali('forms.matches.vs')}
                            </Text>
                        </View>
                        <View style={styles.teamsSection}>
                            <View style={styles.teamLogoSection}>
                                <Image
                                    style={{ flex: 1, height: undefined, width: undefined }}
                                    source={require('../images/Real_Madrid.png')}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.teamLabelSection}>
                                <Text style={styles.titleStyle}>
                                    {awayteamName}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.oddsContainer}>
                        <View style={styles.oddsSection}>
                        
                            <RkButton
                                style={buttonSelected === '1' ? styles.oddButtonSelected : styles.oddButton}
                                rkType='circle outline'
                                onPress={() => this.props.updateNewForm(this.props.newForm, uid, '1')}
                            >
                                <Text style={styles.oddButtonLable}>{hometeamOdd}</Text>
                            </RkButton>
                        </View>
                        <View style={[styles.oddsSection, { flex: 2 }]}>
                            <RkButton
                            style={buttonSelected === 'x' ? styles.oddButtonSelected : styles.oddButton}
                            rkType='circle outline'
                            onPress={() => this.props.updateNewForm(this.props.newForm, uid, 'x')}
                            >
                                <Text style={styles.oddButtonLable}>{drawOdd}</Text>
                            </RkButton>
                        </View>
                        <View style={styles.oddsSection}>
                            <RkButton 
                            style={buttonSelected === '2' ? styles.oddButtonSelected : styles.oddButton}
                            rkType='circle outline'
                            onPress={() => this.props.updateNewForm(this.props.newForm, uid, '2')}
                            >
                                <Text style={styles.oddButtonLable}>{awayteamOdd}</Text>
                            </RkButton>
                        </View>
                    </View>
                </LinearGradient>
            );
        }
        return (
            <LinearGradient
                style={styles.container}
                colors={['#2196F3', '#2230F3', '#2230F3']}
                start={{ x: 0, y: 0.1 }} end={{ x: 0.1, y: 1 }}
            >
                <Spinner size="large" />
            </LinearGradient>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'column',
        height: 150,
        borderRadius: 25,

        //IOS Shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 2,

		//Android Shadow
        elevation: 5,

        marginBottom: 15
    },
    timeContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    teamsContainer: {
        flexDirection: 'row',
        flex: 3,
    },
    teamsSection: {
        flexDirection: 'column',
        flex: 5,
        marginVertical: 5,
    },
    teamLogoSection: {
        flex: 1,
        justifyContent: 'center',
    },
    teamLabelSection: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    vsSection: {
        flex: 2,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    oddsContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    oddsSection: {
        flex: 5,
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    oddButton: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
        width: 40,
        height: 40,
        backgroundColor: '#B7BABC',
        alignSelf: 'center',
    },
    oddButtonSelected: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
        width: 40,
        height: 40,
        backgroundColor: '#FFAF40',
        alignSelf: 'center',
    },
    oddButtonLable: {
        color: '#E20A17',
        fontWeight: 'bold'
    },
	titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
	}
};

const mapStateToProps = state => {
    const { newForm } = state.forms;

    return { newForm };
};

export default connect(mapStateToProps, { updateNewForm })(MatchContainer);
