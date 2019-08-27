import AsyncStorage from '@react-native-community/async-storage';
import { ToastService, getBackendURL } from '../../utils/Utils';
import { Container, Header, Content } from 'native-base';
import Reactotron from 'reactotron-react-native';
import React, {Component} from 'react';
import { Alert } from 'react-native';
import SignupForm from './SignupForm';

// To Do: Hacer mas parametrizable la verificacion de campos

export default class SignupScreen extends Component {

	static navigationOptions = {
		title: 'Registrarse',
	};

	constructor(){
		super();
		this.state = {
			loading: false,
			access_token: false,
			
			invalid_email: false,
			invalid_celular: false,
		}
	}

	signUp = (formData) => {
		if(this.state.invalid_email){
			ToastService.showToast("Email ya registrado", "danger");
			return;
		}
		else if(this.state.invalid_celular){
			ToastService.showToast("Celular ya registrado", "danger");
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

	verifyField = (field, value) => {
		if(value=='') return;
		let invalid  = false;
		let field_validate = 'invalid_'+field;
		this.setState({loading: true, [field_validate]: invalid});
		fetch(getBackendURL()+'/api/verify_field/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				field: field,
				value: value,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(!responseJson.success){
				ToastService.showToast(responseJson.message, "danger");
				invalid  = true;
			}
			this.setState({loading: false, [field_validate]: invalid});
		});
	}

	render() {
		return (
			<Container>
				<SignupForm 
					signUp={this.signUp} 
					verifyField={this.verifyField} 
					invalid_email={this.state.invalid_email} 
					invalid_celular={this.state.invalid_celular} 
					loading={this.state.loading}
					/>
			</Container>
		);
	}
}