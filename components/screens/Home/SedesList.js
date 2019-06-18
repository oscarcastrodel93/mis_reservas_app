import { Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
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
        return (
            <List>
                {sedes_list.map((sede, i) => {
                    return <SedeItem key={sede.id} sede={sede} />
                })}
            </List>
        )
    }
}
