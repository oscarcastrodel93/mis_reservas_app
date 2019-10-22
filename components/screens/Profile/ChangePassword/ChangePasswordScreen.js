import { Container, Content, Form, Text, Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import { Alert, StyleSheet } from 'react-native';
import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';

import { ToastService, getBackendURL } from 'mis_reservas_app/components/utils/Utils';
import InputTextField from 'mis_reservas_app/components/fields/InputTextField';
import ScreenHeader from '../../../elements/ScreenHeader';

class ChangePasswordScreen extends Component {

    constructor(props){
		super(props);
		this.state = {
			loading: false,
			access_token: false,
			
			profile_id: false,
			password: '',
            repeat_password: '',
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.navigation.getParam('profile_id', {})){
            return { profile_id: nextProps.navigation.getParam('profile_id', false) } // <- this is setState equivalent
        }
        return null;
    }

	componentDidMount(){
		this._getToken();
	}

	_getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
	}

	_save(){
        if(!this._validateForm()) return;

        this.savePassword();
    }

    _validateForm = () => {
		if(this.state.password != this.state.repeat_password){
			ToastService.showToast("La contraseña no coincide", "danger");
			return false;
		}
		return true;
	}

	updateValue =  (name, value) => {
		this.setState({ [name]: value });
    }

	savePassword = () => {
		let formData = {
			profile_id: this.state.profile_id,
			password: this.state.password,
            repeat_password: this.state.repeat_password,
		}
		this.setState({loading: true});
		fetch(getBackendURL()+'/api/update_profile/', {
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
				ToastService.showToast("Contraseña actualizada", "success");
				this.props.navigation.navigate('Profile');
			}
			else{
				Alert.alert("Error", "Se produjo un error al cambiar la contraseña. Intentalo nuevamente en unos minutos.");
			}
			this.setState({loading: false});
		});
	}

    render() {
        return (
            <Container>
                <ScreenHeader title="Cambiar contraseña" return_screen='Profile' />
                <Content padder>
					<Form>
						<InputTextField 
							label="Nueva contraseña"
							name="password"
							secureTextEntry={true} 
							maxLength={12}
							updateValue={this.updateValue}
							/>
						<InputTextField 
							label="Repita la contraseña"
							name="repeat_password"
							secureTextEntry={true} 
							maxLength={12}
							updateValue={this.updateValue}
							/>
					</Form>
				</Content>
				<Content padder style={styles.saveButton}>
					<Button block onPress={() => this._save()} disabled={this.state.loading} >
						<Text>Guardar</Text>
					</Button>
				</Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
	saveButton: {
		position: 'absolute', 
		bottom: 0, 
		left:0, 
		right:0
	},
});

export default withNavigation(ChangePasswordScreen);