import { Text, Card, CardItem, H2, Right } from 'native-base';
import NumberFormat from 'react-number-format';
import React, { Component } from 'react';

export default class ResumenReserva extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let sede = this.props.sede; 
        let horario = this.props.horario; 
        let fecha_reserva = this.props.fecha_reserva;
        return (
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
        )
    }
}