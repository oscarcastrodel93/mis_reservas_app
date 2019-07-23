import { Container, Content, Text, Button, Header, Body, Title } from 'native-base';
import { getHumanDate } from 'mis_reservas_app/components/utils/Utils';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import ResumenReserva from './ResumenReserva';
import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import Modal from "react-native-modal";

export default class ModalReservar extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: props.modalVisible,
            loading: false,
            user_id: false,
        }
    }

    componentDidMount(){
		this._getUserId();
	}

    _getUserId = async() => {
		const user_id = await AsyncStorage.getItem('user_id');
		this.setState({user_id});
		this.getHorarios();
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
        /* this.setState({loading: true});
        fetch(getBackendURL()+'/api/reservar_horario/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				horario: this.props.horario.id,
				sede: this.props.sede.id,
				user_id: formData.password,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.success){
				
			}
			else{
				ToastService.showToast("Datos incorrectos");
			}
			this.setState({loading: false});
		}); */
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
                            style={styles.reservarButton}
                            onPress={this.reservarHorario} >
                            <Text>Realizar reserva</Text>
                        </Button>
                        <Button light block 
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
