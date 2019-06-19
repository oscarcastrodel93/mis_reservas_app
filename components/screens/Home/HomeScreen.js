import { getCurrentDateDB, getCurrentTime, ToastService } from '../../utils/Utils';
import { Container, Content, Item, Input, Text, Button, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { StyleSheet } from 'react-native';
import FiltroModal from './FiltrarSedes/FiltroModal';
import React, {Component} from 'react';
import HomeHeader from './HomeHeader';
import SedesList from './SedesList';

export default class HomeScreen extends Component {

	constructor(props){
		super(props);
		this.state = {
			access_token: false,
			filtro_zona: 'sur',
			filtro_fecha: getCurrentDateDB(),
			filtro_hora_inicio: getCurrentTime(0),

			sedes: [],
			filtro: '',
			modalVisible: false,
		}
	}

	componentDidMount(){
		this._getToken();
	}

	_logOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	_getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
		this.getSedesActivas();
	}

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

	setModalVisible = (visible) => {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<Container>
				<HomeHeader />
				<Content>
					<Item regular>
						<Input placeholder='Filtrar' onChangeText={(filtro) => this.setState({filtro})}/>
						<Icon name='funnel' onPress={() => {this.setModalVisible(!this.state.modalVisible)}}/>
					</Item>

					<FiltroModal 
						modalVisible={this.state.modalVisible}
						setModalVisible={this.setModalVisible}
						/>
					
					<SedesList 
						sedes={this.state.sedes} 
						filtro={this.state.filtro}
						/>
					
					
					{/* <Button onPress={this.getSedesActivas} >
						<Text>Buscar</Text>
					</Button> */}
					<Button onPress={this._logOut} >
						<Text>Cerrar sesión</Text>
					</Button>
				</Content>
				
			</Container>
		);
	}
}
