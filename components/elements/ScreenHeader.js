import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';

class ScreenHeader extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Header>
                {this.props.return_screen ? 
                <Left>
                    <Button transparent
                        onPress={() => this.props.navigation.navigate(this.props.return_screen)}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                : null}
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

export default withNavigation(ScreenHeader);