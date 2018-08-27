import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { CardSection } from './common';
import { openFriendlyLeague } from '../actions';

class ListItem extends Component {
	render() {
		const friendlyLeague = this.props.friendlyLeague;
		const { currentUser } = firebase.auth();
		friendlyLeague.participants = _.orderBy(friendlyLeague.participants, user => user.coins, 'desc');
		const coins = _.find(friendlyLeague.participants, user => user.uid === currentUser.uid).coins;
		const rank = Number(_.findKey(friendlyLeague.participants, user => user.uid === currentUser.uid)) + 1;
		return (
			<TouchableOpacity
				onPress={() => this.props.openFriendlyLeague(friendlyLeague, this.props.navigation)}
			>
				<View>
					<CardSection style={{ height: 120 }}>
						<View style={styles.leaugeNameContainer}>
							<Text style={styles.titleStyle}>
								{friendlyLeague.friendlyLeagueName}
							</Text>
						</View>
						<View style={styles.contentContainer}>
							<View style={[styles.contentSection, { alignItems: 'center', justifyContent: 'center' }]}>
								<Image
									source={require('../images/DefaultThumbnail.png')}
									style={{ height: 50, width: 50 }}
									resizeMode="contain"
								/>
							</View>

							<View style={[styles.contentSection, { justifyContent: 'flex-start' }]}>
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
							</View>
							<View style={[styles.contentSection, { flexDirection: 'row' }]}>
								<View style={[styles.coinsIconContainer, { flexDirection: 'row' }]}>
									<Image
										source={require('../images/Currency2Small.png')}
										style={{ height: 30, width: 30 }}
										resizeMode="contain"
									/>
									<Text style={[styles.titleStyle, { textAlign: 'left', marginLeft: 5 }]}>
										{coins}
									</Text>
								</View>
							</View>

						</View>
					</CardSection>
				</View>
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
		flex: 3,
		justifyContent: 'center'
	},
	contentContainer: {
		flex: 5,
		flexDirection: 'row',
	},
	contentSection: {
		flex: 1,
	},
	coinsTextContainer: {
		flex: 3,
		justifyContent: 'center',
		marginHorizontal: 3,
	},
	coinsIconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export default connect(null, { openFriendlyLeague })(ListItem);
