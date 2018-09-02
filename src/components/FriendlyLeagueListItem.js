import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { openFriendlyLeague } from '../actions';
import { AppComponent } from './common';

class ListItem extends Component {
	render() {
		console.log('friendlyLeagueBefore', this.props.friendlyLeague);
		const friendlyLeague = this.props.friendlyLeague;
		const { currentUser } = firebase.auth();
		friendlyLeague.participants = _.orderBy(friendlyLeague.participants, user => user.coins, 'desc');
		const coins = _.find(friendlyLeague.participants, user => user.uid === currentUser.uid).coins;
		const rank = Number(_.findKey(friendlyLeague.participants, user => user.uid === currentUser.uid)) + 1;
		console.log('friendlyLeagueAfter', this.props.friendlyLeague);
		return (
			<TouchableOpacity
				onPress={() => this.props.openFriendlyLeague(friendlyLeague, this.props.navigation)}
			>
				<AppComponent>
					<View style={styles.contentContainer}>
						<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
							<View style={styles.leaugeNameContainer}>
								<Text style={styles.titleStyle}>
									{friendlyLeague.friendlyLeagueName}
								</Text>
							</View>
							<Image
								source={require('../images/DefaultThumbnail.png')}
								style={{ height: 70, width: 70 }}
								resizeMode="contain"
							/>
						</View>

						<View style={{ flex: 1.5, justifyContent: 'center' }}>
							<View>
								<Text style={[styles.titleStyle, { fontSize: 15 }]}>
									דירוג:
									</Text>
							</View>
							<View style={{ alignItems: 'center', paddingVertical: 5 }}>
									<Avatar
										size="medium"
										rounded
										title={'#' + (rank)}
										activeOpacity={0.7}
									/>
								</View>
							<View style={[styles.contentSection, { flexDirection: 'row' }]}>
								<View style={[styles.coinsIconContainer, { flexDirection: 'row' }]}>
									<Image
										source={require('../images/Currency2Small.png')}
										style={{ height: 30, width: 30 }}
										resizeMode="contain"
									/>
									<Text style={[styles.titleStyle, { textAlign: 'left', marginLeft: 5 }]}>
										{!coins ? null : coins}
									</Text>
								</View>
							</View>
						</View>
						<View style={{ flex: 1.5, flexDirection: 'row' }}>
							<View style={[styles.coinsIconContainer, { flexDirection: 'row' }]}>
								<Image
									source={require('../images/Currency2Small.png')}
									style={{ height: 30, width: 30 }}
									resizeMode="contain"
								/>
								<Text style={[styles.titleStyle, { textAlign: 'left', marginLeft: 5 }]}>
									{!coins ? null : coins}
								</Text>
							</View>
						</View>
					</View>
				</AppComponent>
			</TouchableOpacity>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 22,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	leaugeNameContainer: {
		justifyContent: 'center'
	},
	contentContainer: {
		flex: 5,
		flexDirection: 'row',
	},
	coinsTextContainer: {
		flex: 3,
		justifyContent: 'center',
		marginHorizontal: 3,
	},
	coinsIconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
};

export default connect(null, { openFriendlyLeague })(ListItem);
