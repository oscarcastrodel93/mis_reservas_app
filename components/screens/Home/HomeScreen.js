import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Item, Input, Text, Button } from 'native-base';
import HomeHeader from './HomeHeader';
import SedesList from './SedesList';
import { getCurrentDateDB, getCurrentTime, ToastService } from '../../utils/Utils';
import Reactotron from 'reactotron-react-native';

export default class HomeScreen extends Component {

	constructor(props){
		super(props);
		this.state = {
			access_token: false,
			filtro_zona: 'sur',
			filtro_fecha: getCurrentDateDB(),
			filtro_hora_inicio: getCurrentTime(0),

			sedes: [],
		}
	}

	_logOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	getSedesActivas = () => {
		Reactotron.log("getCurrentDateDB()", getCurrentDateDB());
		this.setState({loading: true});
		fetch('http://192.168.0.27:8000/api/sedes_activas/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				// zona: this.state.filtro_zona,
				fecha: this.state.filtro_fecha,
				hora_inicio: this.state.filtro_hora_inicio,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			// Reactotron.log(responseJson.data);
			this.setState({
				sedes: responseJson.success ? responseJson.data : [],
				loading: false,
			});
			if(!responseJson.success){
				ToastService.showToast(responseJson.message);
			}
		});
	}

	_getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
		this.getSedesActivas();
	}

	componentDidMount(){
		this._getToken();
	}

	render() {
		return (
			<Container>
				<HomeHeader />
				<Content>
					<Item regular>
						<Input placeholder='Buscar' />
					</Item>
					
					<SedesList sedes={this.state.sedes}/>
					
					
					<Button onPress={this.getSedesActivas} >
						<Text>Buscar</Text>
					</Button>
					<Button onPress={this._logOut} >
						<Text>Cerrar sesión</Text>
					</Button>
				</Content>
				
			</Container>
		);
	}
}
