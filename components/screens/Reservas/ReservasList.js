import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';
import { List } from 'native-base';

import ReservaItem from './ReservaItem';

export default class ReservasList extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let reservas_list = this.props.reservas;
        return (
            <List>
                {reservas_list.map((reserva, i) => {
                    return <ReservaItem 
                                key={reserva.id} 
                                reserva={reserva} 
                                />
                })}
            </List>
        )
    }
}
