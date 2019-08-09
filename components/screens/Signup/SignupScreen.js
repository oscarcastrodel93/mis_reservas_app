import AsyncStorage from '@react-native-community/async-storage';
import { ToastService, getBackendURL } from '../../utils/Utils';
import { Container, Header, Content } from 'native-base';
import Reactotron from 'reactotron-react-native';
import React, {Component} from 'react';
import { Alert } from 'react-native';
import SignupForm from './SignupForm';

export default class SignupScreen extends Component {

	static navigationOptions = {
		title: 'Registrarse',
	};

	constructor(){
		super();
		this.state = {
			loading: false,
			invalid_email: false,
			access_token: false,
		}
	}

	signUp = (formData) => {
		if(this.state.invalid_email){
			ToastService.showToast("Email no disponible", "danger");
			return;
		}

		this.setState({loading: true});
		fetch(getBackendURL()+'/api/signup/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				data: formData
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			let data = responseJson;
			if(data.success){
				Alert.alert("", "Registro completado, revisa tu correo para activar la cuenta");
				this.props.navigation.navigate('Login');
			}
			else{
				Alert.alert("Error", "Se produjo un error al crear la cuenta. Intentalo nuevamente en unos minutos.");
			}
			this.setState({loading: false});
		});
	}

	_getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
	}

	componentDidMount(){
		this._getToken();
	}

	verifyEmail = (email) => {
		let invalid  = false;
		this.setState({loading: true, invalid_email: invalid});
		fetch(getBackendURL()+'/api/verifyemail/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				email: email
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(!responseJson.success){
				ToastService.showToast("Email no disponible", "danger");
				invalid  = true;
			}
			this.setState({loading: false, invalid_email: invalid});
		});
	}

	render() {
		return (
			<Container>
				<SignupForm 
					signUp={this.signUp} 
					verifyEmail={this.verifyEmail} 
					invalid_email={this.state.invalid_email} 
					loading={this.state.loading}
					/>
			</Container>
		);
	}
}