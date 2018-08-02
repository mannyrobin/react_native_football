import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';

class ListItem extends Component {
onRowPress() {
	this.props.navigation.navigate('FriendlyLeague', {
        friendlyLeagueId: this.props.friendlyLeague.uid,
        friendlyLeagueName: this.props.friendlyLeague.friendlyLeagueName
    });
}

	render() {
		const { friendlyLeagueName } = this.props.friendlyLeague;

		return (
			<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
				<View>
					<CardSection>
						<Text style={styles.titleStyle}>
							{friendlyLeagueName}
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

export default ListItem;
