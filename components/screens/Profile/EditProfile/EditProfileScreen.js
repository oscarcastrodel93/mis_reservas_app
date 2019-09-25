import { Container, Content, Item, Input, Text, Button, Icon, Card, CardItem, Right, Left, Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';

import ScreenHeader from '../../../elements/ScreenHeader';
import FormEditProfile from './FormEditProfile';

class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <ScreenHeader title="Editar perfil" return_screen='Profile' />
                <Content>
                    <FormEditProfile />
                </Content>
            </Container>
        );
    }
}

export default withNavigation(EditProfileScreen);