import { Container, Content, Card, CardItem, H2, Right, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import NumberFormat from 'react-number-format';
import React, {Component} from 'react';

import { ToastService, getBackendURL } from '../../../utils/Utils';
import ScreenHeader from '../../../elements/ScreenHeader';
import { system_enums } from '../../../utils/Enums';
import ReservasList from '../ReservasList';

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
    
    verPrecio = (reserva) => {
        if(reserva.horario){
            return <NumberFormat 
                value={reserva.horario.precio} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'} 
                decimalScale={0}
                renderText={value => <Text>{value}</Text>}/>
        }
        else{
            return null;
        }
    }

    render() {
        let reserva = this.state.reserva;
        return (
            <Container>
                <ScreenHeader 
                    title="Detalle Reserva"
                    return_screen='DetalleReserva'/>
                <Content>
                    <Card transparent>
                        <CardItem bordered header>
                            <H2>Reserva #{reserva.consecutivo}</H2>
                        </CardItem>
                        <CardItem>
                            <Text>Sede: {reserva.sede ? reserva.sede.nombre : null }</Text>
                        </CardItem>
                        <CardItem>
                            <Text>Estado: {system_enums['estado_reserva_js'][reserva.estado]}</Text>
                        </CardItem>
                        <CardItem bordered header>
                            <Text>Precio: </Text>
                            <Right>
                                {this.verPrecio(reserva)}
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default withNavigation(DetalleReservaScreen)