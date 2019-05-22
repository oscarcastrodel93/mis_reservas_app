import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class HomeHeader extends Component {
    render() {
        return (
            <Header>
                {/* <Left>
                    <Button transparent>
                    <Icon name='arrow-back' />
                    </Button>
                </Left> */}
                <Body>
                    <Title>Sedes disponibles</Title>
                </Body>
                <Right>
                    <Button transparent>
                    <Icon name='menu' />
                    </Button>
                </Right>
            </Header>
        );
    }
}