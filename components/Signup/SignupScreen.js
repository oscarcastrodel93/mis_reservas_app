import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SignupForm from './SignupForm';

export default class SignupScreen extends Component {

	static navigationOptions = {
		title: 'Registrarse',
	};

	constructor(){
		super();
		this.state = {
			loading: false,
			access_token: false,
		}
	}

	signUp = (formData) => {
		this.setState({loading: true});
		fetch('http://192.168.0.27:8000/api/signup/', {
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
			if(responseJson.success){
				this._setUserId(responseJson.data.id ? responseJson.data.id : false);
			}
			else{
				Alert.alert("Error", "Datos incorrectos");
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

	render() {
		return (
			<View style={styles.container}>
				<SignupForm signUp={this.signUp} loading={this.state.loading}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
