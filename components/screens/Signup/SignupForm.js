import { Container, Header, Content, Form, Item, Input, Button, Label, Text  } from 'native-base';
import InputTextField from '../../fields/InputTextField';
import { ToastService } from '../../utils/Utils';
import { StyleSheet, Alert } from 'react-native';
import Reactotron from 'reactotron-react-native'
import React, { Component } from 'react'

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
						<InputTextField 
							label="Nombre"
							name="nombres"
							autoCapitalize={'words'}
							maxLength={20}
							updateValue={this.updateValue}
							/>
						<InputTextField 
							label="Apellido"
							name="apellidos"
							autoCapitalize={'words'}
							maxLength={20}
							updateValue={this.updateValue}
							/>
						<InputTextField 
							label="Correo electrónico"
							name="email"
							autoCapitalize={'none'}
							keyboardType={'email-address'}
							maxLength={40}
							onBlur={() => this.props.verifyEmail(this.state.email)}
							error={invalid_email}
							updateValue={this.updateValue}
							/>
						<InputTextField 
							label="Número celular"
							name="celular"
							keyboardType={'phone-pad'}
							maxLength={10}
							updateValue={this.updateValue}
							/>
						<InputTextField 
							label="Contraseña"
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
				<Content padder style={styles.signButton}>
					<Button block onPress={() => this._signup()} disabled={loading} >
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
		position: 'absolute', 
		bottom: 0, 
		left:0, 
		right:0
	},
});