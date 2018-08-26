import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { CardSection } from './common';
import { openFriendlyLeague } from '../actions';

class ListItem extends Component {
	render() {
		const friendlyLeague = this.props.friendlyLeague;

		return (
			<TouchableWithoutFeedback
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
							<View style={styles.contentSection}>
								<Text>
									תמונה
							</Text>
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
										title="#12"
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
										3000
	</Text>
								</View>
							</View>

						</View>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>
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

		/* marginHorizontal: 3 */
	}
};

export default connect(null, { openFriendlyLeague })(ListItem);
