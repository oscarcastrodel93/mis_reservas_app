import { createStackNavigator, } from 'react-navigation';
import React, {Component} from 'react';

import ReservasScreen from '../screens/Reservas/ReservasScreen';
import PerfilScreen from '../screens/Perfil/PerfilScreen';
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
},{
	headerMode: 'none',
	navigationOptions: {
	  headerVisible: false,
	}
});

export const PerfilStack = createStackNavigator({ 
	Perfil: PerfilScreen,
},{
	headerMode: 'none',
	navigationOptions: {
	  headerVisible: false,
	}
});

export const AuthStack = createStackNavigator({ 
	Login: LoginScreen,
	Signup: SignupScreen,
});