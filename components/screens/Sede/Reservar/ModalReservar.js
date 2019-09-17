import { Container, Content, Text, Button, Header, Body, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import { StyleSheet, Alert } from 'react-native';
import React, { Component } from 'react';
import Modal from "react-native-modal";

import { getHumanDate, getBackendURL, ToastService } from 'mis_reservas_app/components/utils/Utils';
import ResumenReserva from './ResumenReserva';

class ModalReservar extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: props.modalVisible,
            loading: false,
            user_id: false,
            access_token: false,
        }
    }

    componentDidMount(){
		this._getUserId();
		this._getToken();
    }
    
    _getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
	}

    _getUserId = async() => {
		const user_id = await AsyncStorage.getItem('user_id');
		this.setState({user_id});
	}

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.modalVisible !== prevState.modalVisible) {
            return { modalVisible: nextProps.modalVisible } // <- this is setState equivalent
        }
        return null;
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
		this.props.setModalVisible(visible);
    }

    reservarHorario = () => {
        this.setState({loading: true});
        fetch(getBackendURL()+'/api/reservar_horario/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				horario_id: this.props.horario.id,
				sede_id: this.props.sede.id,
				cliente_id: this.state.user_id,
				fecha: this.props.filtro_fecha,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.success){
                // Alert.alert("", "Reserva realizada! Recibirás un correo con los detalles de tu solicitud.");
                let self = this; 
                Alert.alert(
                    '', 'Reserva realizada! Recibirás un correo con los detalles de tu solicitud.',
                    [{text: 'OK', onPress: () => self.props.navigation.navigate('Home')}],
                    {cancelable: false},
                );
            }
			else{
                // Mostrar error al realizar la reserva
                this.setState({loading: false});
                Alert.alert(
                    '', responseJson.message,
                    [{text: 'OK', onPress: () => {
                        this.props.updateValue('selected_horario', {id: false}); // Limpiar el horario seleccionado
                        this.setModalVisible(false); // Ocultar el modal
                        this.props.getHorarios(); // Consultar de nuevo los horarios disponibles
                    }}],
                    {cancelable: false},
                );
			}
		}).catch((error) => {
            Alert.alert("", "Error al crear la reserva, intentalo de nuevo en un momento.");
            this.setState({loading: false});
        });
    }

    render() {
        let fecha_reserva = getHumanDate(this.props.filtro_fecha);
        return (
            <Modal isVisible={this.state.modalVisible}>
                <Container style={{flex:1}}>
                    <Header>
                        <Body padder>
                            <Title style={{paddingLeft: 10}}>Resumen</Title>
                        </Body>
                    </Header>
                    <ResumenReserva 
                        sede = {this.props.sede} 
                        horario = {this.props.horario}
                        fecha_reserva = {fecha_reserva}
                        />
                    <Content padder style={styles.contentButtons}>
                        <Button primary block
                            disabled={this.state.loading}
                            style={styles.reservarButton}
                            onPress={this.reservarHorario} >
                            <Text>{this.state.loading ? 'Procesando...' : 'Realizar reserva'}</Text>
                        </Button>
                        <Button light block
                            disabled={this.state.loading} 
                            style={styles.backButton}
                            onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                            <Text>Cancelar</Text>
                        </Button>
                    </Content>
                </Container>
            </Modal>
        )
    }
}

export default withNavigation(ModalReservar);

const styles = StyleSheet.create({
    reservarButton: {
        marginTop: 40,
    },
	backButton: {
		marginTop: 20,
    },
    contentButtons: {
		position: 'absolute', 
		bottom: 0, 
		left:0, 
		right:0
	},
});
