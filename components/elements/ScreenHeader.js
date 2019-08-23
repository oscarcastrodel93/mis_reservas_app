import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class ScreenHeader extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Header>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    {/* <Button transparent>
                    <Icon name='menu' />
                    </Button> */}
                </Right>
            </Header>
        );
    }
}