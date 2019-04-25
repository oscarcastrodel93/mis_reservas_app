import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            celular: '',
			password: '',
        }
    }

    _login(){
        this.props.logIn(this.state);
    }

    render() {
        let loading = this.props.loading;
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    placeholder="Número de celular" 
                    onChangeText={(celular) => this.setState({celular})}
                    disabled={loading}
                    keyboardType={'phone-pad'}
                    />
                <TextInput 
                    style={styles.input}
                    placeholder="Contraseña" 
                    secureTextEntry={true} 
                    onChangeText={(password) => this.setState({password})}
                    disabled={loading}
                    />
                <TouchableOpacity style={styles.loginButton} onPress={() => this._login()} disabled={loading} >
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
		flexGrow: 1,
		backgroundColor: '#3498db',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 50,
		width: 300,
		marginBottom: 20,
		paddingHorizontal: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		color: '#fff'
	},
	loginButton: {
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