import { Container, Content, Item, Input, Text, Button, Icon, Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';

class PerfilScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _logOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

    render() {
        return (
        <Container>
            <Content>
                <Button
                    onPress={this._logOut}>
                    <Text>Cerrar sesión</Text>
                </Button>
            </Content>
        </Container>
        );
    }
}

export default withNavigation(PerfilScreen);