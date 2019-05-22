import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './components/screens/Auth/AuthLoadingScreen';
import LoginScreen from './components/screens/Login/LoginScreen';
import SignupScreen from './components/screens/Signup/SignupScreen';
import HomeScreen from './components/screens/Home/HomeScreen';

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
