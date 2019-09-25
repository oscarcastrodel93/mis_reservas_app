import { createStackNavigator, } from 'react-navigation';
import React, {Component} from 'react';

import DetalleReservaScreen from '../screens/Reservas/DetalleReserva/DetalleReservaScreen';
import ReservasScreen from '../screens/Reservas/ReservasScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfile/EditProfileScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SedeScreen from '../screens/Sede/SedeScreen';

export const HomeStack = createStackNavigator({ 
	Home: HomeScreen,
	Sede: SedeScreen,
},{
	headerMode: 'none',
	navigationOptions: {
	  	headerVisible: false,
	}
});

export const ReservasStack = createStackNavigator({ 
	Reservas: ReservasScreen,
	DetalleReserva: DetalleReservaScreen,
},{
	headerMode: 'none',
	navigationOptions: {
	  	headerVisible: false,
	}
});

export const ProfileStack = createStackNavigator({ 
	Profile: ProfileScreen,
	EditProfile: EditProfileScreen,
},{
	headerMode: 'none',
	navigationOptions: {
	  	headerVisible: false,
	}
});

ProfileStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if(navigation.state.routes[navigation.state.index].routeName === 'EditProfile'){
		tabBarVisible = false;
	} 
    return {
      	tabBarVisible,
    };
};

export const AuthStack = createStackNavigator({ 
	Login: LoginScreen,
	Signup: SignupScreen,
});