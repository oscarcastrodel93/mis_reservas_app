import { Container, Content, Button, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import { StyleSheet, Alert } from 'react-native';
import React, {Component} from 'react';

import ScreenHeader from '../../../elements/ScreenHeader';
import ModalCancelar from './ModalCancelar';
import InfoReserva from './InfoReserva';

class DetalleReservaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reserva: {},
        };
    }

    componentDidMount(){
		this.setState({
			reserva: this.props.navigation.getParam('reserva', {}),
		});
    }

    setModalVisible = (visible) => {
		this.setState({modalVisible: visible});
	}

    render() {
        return (
            <Container>
                <ScreenHeader title="Detalle Reserva" return_screen='Reservas' />
                <Content>
                    <InfoReserva reserva={this.state.reserva} />
                </Content>
                <Content padder style={styles.buttons}>
					<Button block light style={styles.button}>
						<Text>Calificar</Text>
					</Button>
                    <Button block warning 
                        onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                        style={styles.button}>
						<Text>Cancelar Reserva</Text>
					</Button>

                    <ModalCancelar 
                        reserva={this.state.reserva}
                        modalVisible={this.state.modalVisible}
                        setModalVisible={this.setModalVisible}
                        />
				</Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
	buttons: {
		position: 'absolute', 
		bottom: 0, 
		left:0, 
		right:0
	},
	button: {
		marginTop: 10,
	},
});

export default withNavigation(DetalleReservaScreen)