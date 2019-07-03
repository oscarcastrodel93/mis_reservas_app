import { Container, Content, Item, Input, Text, Button, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';
import SedeHeader from './SedeHeader';

class SedeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: false,
            horarios: []
        }
    }

    componentDidMount(){
		this._getToken();
	}

    _getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
		// this.getSedesActivas();
	}

	getHorarios = () => {
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
            
			// this.setState({
			// 	sedes: responseJson.success ? responseJson.data : [],
			// 	loading: false,
			// });
			// if(!responseJson.success){
			// 	ToastService.showToast(responseJson.message);
			// }
		});
	}

    render() {
        const sede_id = this.props.navigation.getParam('id', 'NO-ID');
        const sede_name = this.props.navigation.getParam('name', '');
        return (
            <Container>
                <SedeHeader sede_name={sede_name}/>
                <Text> Horarios disponibles </Text>
            </Container>
        )
    }
}

export default withNavigation(SedeScreen);