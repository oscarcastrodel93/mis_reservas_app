import { Container, Content, Item, Text, Button, Form, Header, Body, Title, Card, CardItem, H2, Right } from 'native-base';
import { getHumanDate } from '../../utils/Utils';
import Reactotron from 'reactotron-react-native';
import NumberFormat from 'react-number-format';
import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import Modal from "react-native-modal";

export default class ModalReservar extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: props.modalVisible,
        }
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
        
    }

    render() {
        let sede = this.props.sede; 
        let horario = this.props.horario; 
        let fecha_reserva = getHumanDate(this.props.filtro_fecha);
        return (
            <Modal isVisible={this.state.modalVisible}>
                <Container style={{flex:1}}>
                    <Header>
                        <Body padder>
                            <Title style={{paddingLeft: 10}}>Resumen</Title>
                        </Body>
                    </Header>
                    <Content>
                        <Card transparent>
                            <CardItem>
                                <Text>Sede: {sede.nombre}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text>Dirección: {sede.direccion} (Zona {sede.zona})</Text>
                            </CardItem>
                            <CardItem>
                                <Text>Fecha: {fecha_reserva}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text>Horario: {horario.nombre}</Text>
                            </CardItem>
                            <CardItem bordered header>
                                <H2>Precio: </H2>
                                <Right>
                                    <NumberFormat 
                                        value={horario.precio} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        prefix={'$'} 
                                        decimalScale={0}
                                        renderText={value => <H2>{value}</H2>}/>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>
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
