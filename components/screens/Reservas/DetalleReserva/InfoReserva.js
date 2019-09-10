import { Container, Content, Card, CardItem, H2, Right, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import NumberFormat from 'react-number-format';
import React, {Component} from 'react';

import { system_enums } from '../../../utils/Enums';
import { getHumanDate } from '../../../utils/Utils';

class InfoReserva extends Component {
    constructor(props) {
        super(props);
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
        let reserva = this.props.reserva;
        return (
            <Card transparent>
                <CardItem bordered header>
                    <H2>Reserva #{reserva.consecutivo}</H2>
                </CardItem>
                <CardItem>
                    <Text>Sede:</Text>
                    <Right>
                        <Text>{reserva.sede ? reserva.sede.nombre : null }</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Text>Dirección:</Text>
                    <Right>
                        <Text>{reserva.sede ? reserva.sede.direccion : null }</Text>
                    </Right>
                </CardItem>
                <CardItem bordered>
                    <Text>Teléfonos:</Text>
                    <Right>
                        <Text>{reserva.sede ? reserva.sede.telefono+' - '+reserva.sede.celular : null }</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Text>Fecha:</Text>
                    <Right>
                        <Text>{getHumanDate(reserva.fecha)}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Text>Horario:</Text>
                    <Right>
                        <Text>{reserva.horario ? reserva.horario.nombre : null }</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Text>Cancha:</Text>
                    <Right>
                        <Text>{reserva.cancha ? reserva.cancha.nombre : null }</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Text>Estado:</Text>
                    <Right>
                        <Text>{system_enums['estado_reserva_js'][reserva.estado]}</Text>
                    </Right>
                </CardItem>
                <CardItem bordered header>
                    <Text>Precio: </Text>
                    <Right>
                        {this.verPrecio(reserva)}
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

export default withNavigation(InfoReserva)