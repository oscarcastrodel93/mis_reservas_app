import { Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';
import { getHumanDate } from '../../utils/Utils';
import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';
import SedeItem from './SedeItem';

export default class SedesList extends Component {

    constructor(props){
        super(props);
    }

    filtrarSedes = () => {
        let list_sedes = [];
        let filtro = this.props.filtro.toLowerCase();
		if (filtro!==undefined && filtro.length > 0) {
			list_sedes = this.props.sedes.filter(sede => {
				return sede.nombre.toLowerCase().includes(filtro)
			});
		}
		else{
			list_sedes = this.props.sedes;
		}
		return list_sedes;
	}

    render() {
        let sedes_list = this.filtrarSedes();
        let filtro_fecha = getHumanDate(this.props.filtro_fecha);
        return (
            <List>
                <ListItem itemDivider>
                    <Text style={{ color: "#8d8d8d", fontSize: 12 }}>Disponibles para el {filtro_fecha}</Text>
                </ListItem>
                {sedes_list.map((sede, i) => {
                    return <SedeItem 
                                key={sede.id} 
                                sede={sede} 
                                filtro_fecha={this.props.filtro_fecha}
                                />
                })}
            </List>
        )
    }
}
