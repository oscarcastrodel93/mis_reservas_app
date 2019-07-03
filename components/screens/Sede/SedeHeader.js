import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';

class SedeHeader extends Component {
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.sede_name}</Title>
                </Body>
            </Header>
        );
    }
}

export default withNavigation(SedeHeader);