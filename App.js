import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import AuthLoadingScreen from './components/screens/Auth/AuthLoadingScreen';
import { AuthStack, HomeStack, ReservasStack, ProfileStack } from './components/app/Routes';
import React, {Component} from 'react';
import { Root, Icon } from "native-base";

const AppNavigator = createBottomTabNavigator({
	Home: {
        screen: HomeStack,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="home"
                    style={{color: tintColor}}
                    size={24}
                />
            )
        })
    },
	Reservas: {
        screen: ReservasStack,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="bookmarks"
                    style={{color: tintColor}}
                    size={24}
                />
            )
        })
    },
	Profile: {
        screen: ProfileStack,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="person"
                    style={{color: tintColor}}
                    size={24}
                />
            )
        })
    },
}, {
	initialRouteName: 'Home',
	navigationOptions: {
		tabBarVisible: true,
	},
	tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: 'white', // active icon color
        inactiveTintColor: '#8394f2',  // inactive icon color
        style: {
            backgroundColor: '#3F51B5' // TabBar background
        },
        keyboardHidesTabBar: true,
    }
});

const AppContainer = createAppContainer(createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppNavigator,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
));

export default () =>
<Root>
	<AppContainer />
</Root>
