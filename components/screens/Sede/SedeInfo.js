import { Container, Content, Card, CardItem, Text } from 'native-base';
import React, { Component } from 'react';

export default class SedeInfo extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        let sede = this.props.sede;
        return (
            <Content>
                <CardItem header bordered>
                    <Text>Info:</Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Dirección: {sede.direccion} (Zona {sede.zona})
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Teléfono: {sede.telefono} - {sede.celular}
                    </Text>
                </CardItem>
            </Content>
        )
    }
}