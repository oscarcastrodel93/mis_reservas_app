import { Container, Header, Content, Form, Item, Input, Button, Label, Text  } from 'native-base';
import InputTextField from 'mis_reservas_app/components/fields/InputTextField';
import { ToastService } from 'mis_reservas_app/components/utils/Utils';
import { StyleSheet, Alert } from 'react-native';
import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';

/* 
	TODO:
	- Cuando se abra el teclado, el boton de guardar quede abajo
*/

export default class FormEditProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            nombres: '',
            apellidos: '',
            email: '',
            celular: '',
		}
	}
	
	componentDidMount(){
		this.setState({ ...this.props.profile })
	}
	
	updateValue =  (name, value) => {
		// Reactotron.log("FormEditProfile", name, value);
		this.setState({ [name]: value });
    }

    _save(){
        if(!this._validateForm()) return;

        this.props.saveProfile(this.state);
    }

    _validateForm = () => {
		for (let i = 0; i < required_fields.length; i++) {
			const field = required_fields[i];
			
			if (!this.state[field] || this.state[field]===''){
				ToastService.showToast("Complete todos los campos", "danger");
				return false;
			}
		}

		return true;
	}

    render() {
		let loading = this.props.loading;
		let invalid_email = this.props.invalid_email;
		let invalid_celular = this.props.invalid_celular;
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
							value={this.state.nombres}
							/>
						<InputTextField 
							label="Apellido"
							name="apellidos"
							autoCapitalize={'words'}
							maxLength={20}
							updateValue={this.updateValue}
							value={this.state.apellidos}
							/>
						<InputTextField 
							label="Correo electrónico"
							name="email"
							autoCapitalize={'none'}
							keyboardType={'email-address'}
							maxLength={40}
							onBlur={() => this.props.verifyField('email', this.state.email)}
							error={invalid_email}
							updateValue={this.updateValue}
							value={this.state.email}
							/>
						<InputTextField 
							label="Número celular"
							name="celular"
							keyboardType={'phone-pad'}
							maxLength={10}
							onBlur={() => this.props.verifyField('celular', this.state.celular)}
							error={invalid_celular}
							updateValue={this.updateValue}
							value={String(this.state.celular)}
							/>
					</Form>
				</Content>
				<Content padder style={styles.signButton}>
					<Button block onPress={() => this._save()} disabled={loading} >
						<Text>Guardar</Text>
					</Button>
				</Content>
			</Container>
        )
    }
}

const required_fields = ['nombres', 'apellidos', 'email', 'celular'];

const styles = StyleSheet.create({
	signButton: {
		position: 'absolute', 
		bottom: 0, 
		left:0, 
		right:0
	},
});