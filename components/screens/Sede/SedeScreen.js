import { Container, Content, Card, Button, Text, Spinner, CardItem } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import { getHumanDate, getBackendURL } from '../../utils/Utils';
import ModalReservar from './Reservar/ModalReservar';
import { StyleSheet } from 'react-native';
import HorariosList from './HorariosList';
import React, { Component } from 'react';
import SedeHeader from './SedeHeader';
import SedeInfo from './SedeInfo';

class SedeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: false,
            sede: false,
            filtro_fecha: false,
			horarios: [],
			selected_horario: {id: false},
			modalVisible: false,
        }
    }

    componentDidMount(){
		this.setState({
			sede: this.props.navigation.getParam('sede', false),
			filtro_fecha: this.props.navigation.getParam('filtro_fecha', false),
		});
		this._getToken();
	}

    _getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
		this.getHorarios();
	}

	getHorarios = () => {
		if(!this.state.sede) return;

		this.setState({loading: true});
		fetch(getBackendURL()+'/api/horarios_disponibles/'+this.state.sede.id, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				horarios: responseJson.success ? responseJson.data : [],
				loading: false,
			});
			if(!responseJson.success){
				ToastService.showToast(responseJson.message);
			}
		});
	}

	updateValue =  (name, value) => {
		this.setState({ [name]: value });
	}
	
	setModalVisible = (visible) => {
		this.setState({modalVisible: visible});
	}

    render() {
		const { sede } = this.state;
		let filtro_fecha = getHumanDate(this.state.filtro_fecha);
        return (
            <Container>
                <SedeHeader sede_name={sede.nombre}/>
				<Content>
					<Card transparent>
						<SedeInfo sede={sede}/>

						<CardItem header bordered>
							<Text>Horarios disponibles ({filtro_fecha}):</Text>
						</CardItem>
						{this.state.loading ? <Spinner color='83a7fc' /> : null}
						<HorariosList 
							horarios={this.state.horarios}
							selected_horario={this.state.selected_horario}
							updateValue={this.updateValue}
							filtro_fecha={this.state.filtro_fecha}
							/>
					</Card>
				</Content>
				<Content padder style={styles.reservarButton}>
					<Button block 
						disabled={!this.state.selected_horario.id} 
						onPress={() => {this.setModalVisible(!this.state.modalVisible)}} >
						<Text>{this.state.selected_horario.id ? 'Reservar' : 'Seleccione un horario'}</Text>
					</Button>
				</Content>
				<ModalReservar 
					sede={sede}
					horario={this.state.selected_horario}
					modalVisible={this.state.modalVisible}
					setModalVisible={this.setModalVisible}
					filtro_fecha={this.state.filtro_fecha}
					/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
	reservarButton: {
		position: 'absolute', 
		bottom: 0, 
		left:0, 
		right:0
	},
});

export default withNavigation(SedeScreen);