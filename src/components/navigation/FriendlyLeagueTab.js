import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';

import { locali } from '../../../locales/i18n';

import Forms from '../Forms';
import SingleForm from '../SingleForm';
import NewForm from '../NewForm';
import ReviewForm from '../ReviewForm';
import ScoreBoard from '../ScoreBoard';

const FormsViewStack = createStackNavigator({
    Forms: { screen: Forms },
    Form: { screen: SingleForm }
});

const FillFormStack = createStackNavigator({
    NewForm: {
        screen: NewForm,
        navigationOptions: {
            headerMode: 'none'
        }
    },
    ReviewForm: { screen: ReviewForm }
}, {
        // Default config for all screens
        initialRouteName: 'NewForm',
        navigationOptions: {
            headerStyle: { backgroundColor: '#C1E15E' },
            headerTintColor: 'black'
        }
    }
);

const FriendlyLeagueTab = createBottomTabNavigator({
    ScoreBoard: {
        screen: ScoreBoard,
        navigationOptions: {
            title: 'טבלת ניקוד'
        }
    },
    FormsViewStack: {
        screen: FormsViewStack,
        navigationOptions: {
            title: locali('navigation.titles.forms.forms')
        }
    },
    FillFormStack: {
        screen: FillFormStack,
        navigationOptions: {
            title: locali('navigation.titles.forms.fill_form')
        }
    }
}, {
        // Default config for all screens
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor, inactiveTintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'FormsViewStack') {
                    iconName = 'wpforms';
                } else if (routeName === 'FillFormStack') {
                    iconName = 'plus-circle';
                } else if (routeName === 'ScoreBoard') {
                    iconName = 'table';
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return (
                    <FontawesomeIcon
                        name={iconName}
                        size={30}
                        color={focused ? tintColor : inactiveTintColor}
                    />
                );
            }
        }),

        // Default config for all screens
        initialRouteName: 'ScoreBoard',
        tabBarOptions: {
            activeTintColor: '#2196f3',
            inactiveTintColor: '#000',
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            tabStyle: {
                backgroundColor: '#C1E15E'
            },
            style: {
                height: 65
            }
        },
    }
);

export default FriendlyLeagueTab;
