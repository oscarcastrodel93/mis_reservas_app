import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class LoginHeader extends Component {
    render() {
        return (
            <View style={styles.logoContainer}>
                <Image 
                    style={styles.logo}
                    source={require('../../../src/logo.png')}
                    />
                <Text style={styles.title}>Reservas App</Text>
                <Text style={styles.subtitle}>Haz tus reservas fácil y rápido</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3498db',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logoContainer:{
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	logo: {
		width: 100,
		height: 100,
	},
	title: {
		color: '#fff',
		marginTop: 10,
		width: 160,
		textAlign: 'center',
		opacity: 0.9,
		fontSize: 18,
	},
	subtitle: {
		color: '#fff',
		marginTop: 10,
		width: 160,
		textAlign: 'center',
		opacity: 0.5,
	},
});
