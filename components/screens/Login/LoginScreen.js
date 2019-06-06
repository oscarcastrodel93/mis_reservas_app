import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import { ToastService } from '../../utils/Utils';

export default class LoginScreen extends Component {

	static navigationOptions = {
		header: null,
	};

	constructor(props){
		super(props);
		this.state = {
			loading: false,
			access_token: false,
		}
	}

	_setToken = async(token) => {
		await AsyncStorage.setItem('access_token', token);
	}
	
	_setUserId = async(user_id) => {
		await AsyncStorage.setItem('user_id', user_id);
    	this.props.navigation.navigate('App');
	}

	_getToken = () => {
		// Obtener el token al inicio de sesion
		this.setState({loading: true})
        fetch('http://192.168.0.27:8000/oauth/token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'password',
                client_id: '2',
                client_secret: 'jY1ZJ8yM1OjC7JaHKqbjk5fRqMQjkRTC6yudAelP',
                username: 'reservas@correo.com',
                password: 'reservas',
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
				loading: false,
				access_token: responseJson.access_token,
			})
			this._setToken(responseJson.access_token);
        });
	}

	componentDidMount(){
		this._getToken();
	}

	logIn = (formData) => {
		this.setState({loading: true});
		fetch('http://192.168.0.27:8000/api/login/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				celular: formData.celular,
				password: formData.password,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			let data = responseJson;
			if(responseJson.success){
				this._setUserId(responseJson.data.id ? responseJson.data.id : false);
			}
			else{
				ToastService.showToast("Datos incorrectos");
			}
			this.setState({loading: false});
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<LoginHeader />
				<LoginForm logIn={this.logIn} loading={this.state.loading}/>
				<View style={styles.signupContainer}>
					<Text style={styles.signupText}>No tienes una cuenta? </Text>
					<Text 
						onPress={() => this.props.navigation.navigate('Signup')}
						style={styles.signupLink}>Regístrate</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3498db',
		alignItems: 'center',
		justifyContent: 'center',
	},
	signupContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	signupText: {
		color: '#fff',
		opacity: 0.5,
		fontSize: 16,
	},
	signupLink: {
		color: '#fff',
		fontSize: 16,
	},
});