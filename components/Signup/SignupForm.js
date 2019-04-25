import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

export default class SignupForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            correo: '',
            celular: '',
            password: '',
            repeat_password: '',
        }
    }

    _signup(){
        if(!this._validateForm()) return;

        this.props.signUp(this.state);
    }

    _validateForm = () => {
		for (let i = 0; i < required_fields.length; i++) {
			const field = required_fields[i];
			
			if (!this.state[field] || this.state[field]===''){
				Alert.alert("Error", "Complete todos los campos");
				return;
			}
		}
	}

    render() {
        let loading = this.props.loading;
        return (
            <View>
                <TextInput 
                    style={styles.input}
					placeholder="Nombre" 
					autoCapitalize={'words'}
					placeholderTextColor="#9b9ea3"
                    onChangeText={(nombre) => this.setState({nombre})}
                    disabled={loading}
                    />
				<TextInput 
                    style={styles.input}
					placeholder="Correo electrónico" 
					autoCapitalize={'none'}
					placeholderTextColor="#9b9ea3"
                    onChangeText={(correo) => this.setState({correo})}
					disabled={loading}
					keyboardType={'email-address'}
                    />
                <TextInput 
                    style={styles.input}
					placeholder="Número de celular" 
					placeholderTextColor="#9b9ea3"
                    onChangeText={(celular) => this.setState({celular})}
                    disabled={loading}
                    keyboardType={'phone-pad'}
                    />
                <TextInput 
                    style={styles.input}
					placeholder="Contraseña" 
					placeholderTextColor="#9b9ea3"
					secureTextEntry={true} 
					autoCapitalize={'none'}
                    onChangeText={(password) => this.setState({password})}
                    disabled={loading}
                    />
                <TextInput 
                    style={styles.input}
					placeholder="Repita la contraseña" 
					placeholderTextColor="#9b9ea3"
					secureTextEntry={true} 
					autoCapitalize={'none'}
                    onChangeText={(repeat_password) => this.setState({repeat_password})}
                    disabled={loading}
                    />
                <TouchableOpacity style={styles.signButton} onPress={() => this._signup()} disabled={loading} >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const required_fields = ['nombre', 'correo', 'celular', 'password', 'repeat_password']

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 50,
		width: 300,
		marginBottom: 20,
		paddingHorizontal: 10,
		backgroundColor: '#f2f6fc',
		color: '#fff'
	},
	signButton: {
		backgroundColor: '#2980b9',
		width: 300,
		marginVertical: 10,
		paddingVertical: 15,
	},
	buttonText: {
		textAlign: 'center',
		color: '#ffffff',
		fontWeight: '700',
	},
});