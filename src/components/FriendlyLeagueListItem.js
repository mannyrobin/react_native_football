import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
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
					<CardSection>
						<Text style={styles.titleStyle}>
							{friendlyLeague.friendlyLeagueName}
						</Text>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>
		);
	}
} 

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
};

export default connect(null, { openFriendlyLeague })(ListItem);
