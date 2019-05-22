import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import HomeHeader from './HomeHeader';
import { getCurrentDateDB, getCurrentTime } from '../../utils/Utils';
import Reactotron from 'reactotron-react-native';

export default class HomeScreen extends Component {

	constructor(props){
		super(props);
		this.state = {
			access_token: false,
			filtro_zona: 'sur',
			// filtro_fecha: getCurrentDateDB(),
			// filtro_hora_inicio: getCurrentTime(0),
			filtro_fecha: '2019-05-22',
			filtro_hora_inicio: 19,
		}
	}

	_logOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	getSedesActivas = () => {
		this.setState({loading: true});
		fetch('http://192.168.0.27:8000/api/sedes_activas/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				zona: this.state.filtro_zona,
				fecha: this.state.filtro_fecha,
				hora_inicio: this.state.filtro_hora_inicio,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			let data = responseJson;
			Reactotron.log(data);
			this.setState({loading: false});
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
				<List>
					<ListItem thumbnail>
						<Left>
							<Thumbnail square source={require('../../../src/logo.png')} />
						</Left>
						<Body>
							<Text>Sankhadeep</Text>
							<Text note numberOfLines={1}>Its time to build a difference . .</Text>
						</Body>
						<Right>
							<Button transparent>
							<Text>View</Text>
							</Button>
						</Right>
					</ListItem>
				</List>
				{/* <Button 
					title="Cerrar sesión"
					onPress={this._logOut} 
					/> */}
				
				<Button onPress={this.getSedesActivas} >
					<Text>Buscar</Text>
				</Button>
				</Content>
				
			</Container>
		);
	}
}
