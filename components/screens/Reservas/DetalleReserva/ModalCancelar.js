import { Container, Content, Text, Button, Header, Body, Title, Card, CardItem } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import { StyleSheet, Alert } from 'react-native';
import React, { Component } from 'react';
import Modal from "react-native-modal";

import { getHumanDate, getBackendURL, ToastService } from 'mis_reservas_app/components/utils/Utils';

class ModalCancelar extends Component {

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
		this._getToken();
    }
    
    _getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
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

    cancelarReserva = () => {
        this.setState({loading: true});
        fetch(getBackendURL()+'/api/cancelar_reserva/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				reserva_id: this.props.reserva.id,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
            // Reactotron.log(responseJson);
            if(responseJson.success){
				this.props.navigation.navigate('Reservas');
            }
            else{
                Alert.alert("", "Error al cancelar la reserva, intentalo de nuevo en un momento.");
                this.setState({loading: false});
            }
		}).catch((error) => {
            Alert.alert("", "Error al cancelar la reserva, intentalo de nuevo en un momento.");
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <Modal isVisible={this.state.modalVisible}>
                <Container style={{flex:1}}>
                    <Header>
                        <Body padder>
                            <Title style={{paddingLeft: 10}}>Cancelar reserva</Title>
                        </Body>
                    </Header>
                    <Content>
                        <Card transparent>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Este proceso no tiene ningún costo pero es irreversible. Desea continuar con la cancelación de la reserva?
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                    <Content padder style={styles.contentButtons}>
                        <Button primary block
                            disabled={this.state.loading}
                            style={styles.cancelarButton}
                            onPress={this.cancelarReserva} >
                            <Text>{this.state.loading ? 'Procesando...' : 'Confirmar'}</Text>
                        </Button>
                        <Button light block
                            disabled={this.state.loading} 
                            style={styles.backButton}
                            onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                            <Text>Cerrar</Text>
                        </Button>
                    </Content>
                </Container>
            </Modal>
        )
    }
}

export default withNavigation(ModalCancelar);

const styles = StyleSheet.create({
    cancelarButton: {
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
