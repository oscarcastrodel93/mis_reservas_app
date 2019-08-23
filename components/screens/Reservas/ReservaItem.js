import { Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';

class ReservaItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            reserva: props.reserva
        }
    }

    render() {
        let reserva = this.state.reserva;
        return (
            <ListItem thumbnail >
                <Left>
                    {/* <Thumbnail square source={require('../../../src/logo.png')} /> */}
                </Left>
                <Body>
                    <Text>{reserva.fecha}</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>Ver</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
}

export default withNavigation(ReservaItem);