import { Container, Content, Item, Input, Text, Button, Icon, Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import React, {Component} from 'react';

import { getCurrentDateDB, getCurrentTime, ToastService, getBackendURL } from '../../utils/Utils';
import ScreenHeader from '../../elements/ScreenHeader';
import FiltroModal from './FiltrarSedes/FiltroModal';
import SedesList from './SedesList';

class HomeScreen extends Component {

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

	componentWillReceiveProps(next_props) {
		if (next_props.isFocused && this.props.isFocused === false) {
			this.getSedesActivas();
		}
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
		fetch(getBackendURL()+'/api/sedes_activas/', {
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
		}).catch((error) => {
			Reactotron.log(error);
			this.setState({loading: false});
			ToastService.showToast("Error al cargar las sedes.");
		});
	}

	setModalVisible = (visible) => {
		this.setState({modalVisible: visible});
	}

	updateValue =  (name, value) => {
		this.setState({ [name]: value });
    }

	render() {
		return (
			<Container>
				<ScreenHeader title="Sedes disponibles" />

				<Content>
					<Item regular>
						<Icon name='search' style={{color: "lightgray"}}/>
						<Input placeholder='Escribe el nombre de la sede' onChangeText={(filtro) => this.setState({filtro})}/>
						<Icon name='funnel' onPress={() => {this.setModalVisible(!this.state.modalVisible)}}/>
					</Item>

					<FiltroModal 
						modalVisible={this.state.modalVisible}
						setModalVisible={this.setModalVisible}
						getSedesActivas={this.getSedesActivas}
						updateValue={this.updateValue}
						/>
					
					<SedesList 
						sedes={this.state.sedes} 
						filtro={this.state.filtro}
						filtro_fecha={this.state.filtro_fecha}
						/>
						
					{this.state.loading ? <Spinner color='83a7fc' /> : null}
				</Content>
				
			</Container>
		);
	}
}

export default withNavigationFocus(HomeScreen)