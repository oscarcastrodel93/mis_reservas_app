import { Icon, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Alert } from 'react-native';
import React, { Component } from 'react';

import { getHumanDate } from '../../utils/Utils';
import { enums } from '../../utils/Enums';

class ReservaItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            reserva: props.reserva
        }
    }

    verDetalles = () => {
        this.props.navigation.navigate('DetalleReserva', {
            reserva: this.state.reserva,
        });
    }

    render() {
        let reserva = this.state.reserva;
        return (
            <ListItem onPress={this.verDetalles}>
                <Body>
                    <Text>{reserva.sede.nombre}</Text>
                    <Text note numberOfLines={1}>
                        {getHumanDate(reserva.fecha)}
                    </Text>
                    <Text note numberOfLines={1}>
                        {reserva.horario.nombre}
                    </Text>
                </Body>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        )
    }
}

export default withNavigation(ReservaItem);