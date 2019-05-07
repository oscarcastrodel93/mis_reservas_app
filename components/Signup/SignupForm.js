import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import Reactotron from 'reactotron-react-native'

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

    _signup(){
        if(!this._validateForm()) return;

        this.props.signUp(this.state);
    }

    _validateForm = () => {
		for (let i = 0; i < required_fields.length; i++) {
			const field = required_fields[i];
			
			if (!this.state[field] || this.state[field]===''){
				Alert.alert("Error", "Complete todos los campos");
				return false;
			}
		}

		if(this.state.password != this.state.repeat_password){
			Alert.alert("Error", "La contraseña no coincide");
			return false;
		}

		return true;
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
                    onChangeText={(nombres) => this.setState({nombres})}
					disabled={loading}
					autoCorrect={false}
                    />
                <TextInput 
                    style={styles.input}
					placeholder="Apellido" 
					autoCapitalize={'words'}
					placeholderTextColor="#9b9ea3"
                    onChangeText={(apellidos) => this.setState({apellidos})}
					disabled={loading}
					autoCorrect={false}
                    />
				<TextInput 
                    style={styles.input}
					placeholder="email electrónico" 
					autoCapitalize={'none'}
					placeholderTextColor="#9b9ea3"
                    onChangeText={(email) => this.setState({email})}
					disabled={loading}
					autoCorrect={false}
					keyboardType={'email-address'}
                    />
                <TextInput 
                    style={styles.input}
					placeholder="Número de celular" 
					placeholderTextColor="#9b9ea3"
                    onChangeText={(celular) => this.setState({celular})}
					disabled={loading}
					autoCorrect={false}
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
					autoCorrect={false}
                    />
                <TextInput 
                    style={styles.input}
					placeholder="Repita la contraseña" 
					placeholderTextColor="#9b9ea3"
					secureTextEntry={true} 
					autoCapitalize={'none'}
                    onChangeText={(repeat_password) => this.setState({repeat_password})}
					disabled={loading}
					autoCorrect={false}
                    />
                <TouchableOpacity style={styles.signButton} onPress={() => this._signup()} disabled={loading} >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const required_fields = ['nombres', 'apellidos', 'email', 'celular', 'password', 'repeat_password']

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
		color: '#000'
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