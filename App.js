import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './components/screens/Auth/AuthLoadingScreen';
import SignupScreen from './components/screens/Signup/SignupScreen';
import LoginScreen from './components/screens/Login/LoginScreen';
import HomeScreen from './components/screens/Home/HomeScreen';
import SedeScreen from './components/screens/Sede/SedeScreen';
import React, {Component} from 'react';
import { Root } from "native-base";

const AppStack = createStackNavigator({ 
	Home: HomeScreen,
	Sede: SedeScreen,
},{
	headerMode: 'none',
	navigationOptions: {
	  headerVisible: false,
	}
});
const AuthStack = createStackNavigator({ 
	Login: LoginScreen,
	Signup: SignupScreen,
});

const AppContainer = createAppContainer(createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppStack,
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
