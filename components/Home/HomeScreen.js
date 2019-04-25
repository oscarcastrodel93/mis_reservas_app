import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends Component {

	_logOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Página principal</Text>
				<Button 
					title="Cerrar sesión"
					onPress={this._logOut} 
					/>
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
	},
});
