import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Label, Text  } from 'native-base';
import Reactotron from 'reactotron-react-native'
import InputText from '../../fields/InputText';
import { ToastService } from '../../utils/Utils';

export default class SignupForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            nombres: '',
            apellidos: '',
            email: '',
            celular: '',
            password: '',
            repeat_password: '',
			ciudad: 'Cali',
		}
	}
	
	updateValue =  (name, value) => {
		// Reactotron.log("SignupForm", name, value);
		this.setState({ [name]: value });
    }

    _signup(){
        if(!this._validateForm()) return;

        this.props.signUp(this.state);
    }

    _validateForm = () => {
		for (let i = 0; i < required_fields.length; i++) {
			const field = required_fields[i];
			
			if (!this.state[field] || this.state[field]===''){
				ToastService.showToast("Complete todos los campos", "danger");
				return false;
			}
		}

		if(this.state.password != this.state.repeat_password){
			ToastService.showToast("La contraseña no coincide", "danger");
			return false;
		}

		return true;
	}

    render() {
		let loading = this.props.loading;
		let invalid_email = this.props.invalid_email;
        return (
			<Container>
				<Content padder>
					<Form>
						<InputText 
							label="Nombre"
							name="nombres"
							autoCapitalize={'words'}
							maxLength={20}
							updateValue={this.updateValue}
							/>
						<InputText 
							label="Apellido"
							name="apellidos"
							autoCapitalize={'words'}
							maxLength={20}
							updateValue={this.updateValue}
							/>
						<InputText 
							label="Correo electrónico"
							name="email"
							autoCapitalize={'none'}
							keyboardType={'email-address'}
							maxLength={40}
							onBlur={() => this.props.verifyEmail(this.state.email)}
							error={invalid_email}
							updateValue={this.updateValue}
							/>
						<InputText 
							label="Número celular"
							name="celular"
							keyboardType={'phone-pad'}
							maxLength={10}
							updateValue={this.updateValue}
							/>
						<InputText 
							label="Contraseña"
							name="password"
							secureTextEntry={true} 
							maxLength={12}
							updateValue={this.updateValue}
							/>
						<InputText 
							label="Repita la contraseña"
							name="repeat_password"
							secureTextEntry={true} 
							maxLength={12}
							updateValue={this.updateValue}
							/>
					</Form>
					<Button block onPress={() => this._signup()} disabled={loading} style={styles.signButton}>
						<Text>Registrarse</Text>
					</Button>
				</Content>
			</Container>
        )
    }
}

const required_fields = ['nombres', 'apellidos', 'email', 'celular', 'password', 'repeat_password'];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	signButton: {
		backgroundColor: '#2980b9',
		marginTop: 150,
	},
});