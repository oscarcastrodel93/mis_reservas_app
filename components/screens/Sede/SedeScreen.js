import { Container, Content, Card, Button, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
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
			selected_horario: false,
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
		fetch('http://192.168.0.27:8000/api/horarios_disponibles/'+this.state.sede.id, {
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

    render() {
        const { sede } = this.state;
        return (
            <Container>
                <SedeHeader sede_name={sede.nombre}/>
				<Content>
					<Card transparent>
						<SedeInfo sede={sede}/>
						<HorariosList 
							horarios={this.state.horarios}
							selected_horario={this.state.selected_horario}
							updateValue={this.updateValue}
							filtro_fecha={this.state.filtro_fecha}
							/>
					</Card>
				</Content>
				<Content padder style={styles.reservarButton}>
					<Button block disabled={!this.state.selected_horario}>
						<Text>{this.state.selected_horario ? 'Reservar' : 'Seleccione un horario'}</Text>
					</Button>
				</Content>
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