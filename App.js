import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './components/Auth/AuthLoadingScreen';
import LoginScreen from './components/Login/LoginScreen';
import SignupScreen from './components/Signup/SignupScreen';
import HomeScreen from './components/Home/HomeScreen';

const AppStack = createStackNavigator({ 
	Home: HomeScreen 
});
const AuthStack = createStackNavigator({ 
	Login: LoginScreen,
	Signup: SignupScreen,
});

export default createAppContainer(createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
));
