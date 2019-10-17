import { Container, Content, Item, Input, Text, Button, Icon, Card, CardItem, Right, Left, Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import { Alert, StyleSheet } from 'react-native';
import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';

import { ToastService, getBackendURL } from 'mis_reservas_app/components/utils/Utils';
import ScreenHeader from '../../../elements/ScreenHeader';
import FormEditProfile from './FormEditProfile';

class EditProfileScreen extends Component {

    constructor(props){
		super(props);
		this.state = {
			loading: false,
			access_token: false,
			
			profile: {},
			invalid_email: false,
			invalid_celular: false,
		}
	}

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.navigation.getParam('profile', {})){
            return { profile: nextProps.navigation.getParam('profile', {}) } // <- this is setState equivalent
        }
        return null;
    }

	saveProfile = (formData) => {
		if(this.state.invalid_email){
			ToastService.showToast("Email ya registrado", "danger");
			return;
		}
		else if(this.state.invalid_celular){
			ToastService.showToast("Celular ya registrado", "danger");
			return;
		}

		this.setState({loading: true});
		fetch(getBackendURL()+'/api/save_profile/', {
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
		Reactotron.log("this.props.navigation.getParam('profile', {})", this.props.navigation.getParam('profile', {}));
        return (
            <Container>
                <ScreenHeader title="Editar perfil" return_screen='Profile' />
                <FormEditProfile 
                    profile={this.state.profile} 
                    saveProfile={this.saveProfile} 
					verifyField={this.verifyField} 
					invalid_email={this.state.invalid_email} 
					invalid_celular={this.state.invalid_celular} 
					loading={this.state.loading}
                    />
            </Container>
        );
    }
}

export default withNavigation(EditProfileScreen);