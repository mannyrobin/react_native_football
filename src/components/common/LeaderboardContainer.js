import React from 'react';
import { View } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import { Spinner } from './';

const LeaderboardContainer = ({ data, ...rest }) => {
	if (data) {
		return (
			<Leaderboard
				data={data}
				{...rest}
			/>
		);
	}
	return (
		<View style={{ height: 120 }}>
			<Spinner size="large" />
		</View>
	);
};

export { LeaderboardContainer };
