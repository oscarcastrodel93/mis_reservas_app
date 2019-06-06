import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './components/screens/Auth/AuthLoadingScreen';
import LoginScreen from './components/screens/Login/LoginScreen';
import SignupScreen from './components/screens/Signup/SignupScreen';
import HomeScreen from './components/screens/Home/HomeScreen';
import { Root } from "native-base";
import React, {Component} from 'react';

const AppStack = createStackNavigator({ 
	Home: HomeScreen 
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
