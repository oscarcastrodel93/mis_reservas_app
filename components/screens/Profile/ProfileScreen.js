import { Container, Content, Item, Input, Text, Button, Icon, Card, CardItem, Right, Left, Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { ToastService, getBackendURL } from '../../utils/Utils';
import ScreenHeader from '../../elements/ScreenHeader';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            access_token: false,
            user_id: false,
            cliente: {}
        };
    }
    
    componentDidMount(){
        this._getToken();
    }

    _logOut = () => {
        Alert.alert(
            '', 'Desea salir de la aplicación?',
            [{
                text: 'OK', onPress: async () => {
                    await AsyncStorage.clear();
                    this.props.navigation.navigate('Auth');
                }
            }, 
            {
                text: 'Cancelar',
                style: 'cancel',
            }],
            {cancelable: true},
        );
    };

	_getToken = async() => {
        if(!this.state.access_token){
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({access_token});
        }
        this._getUserId();
    }

    _getUserId = async() => {
        if(!this.state.user_id){
		    const user_id = await AsyncStorage.getItem('user_id');
            this.setState({user_id});
        }
        this.getUserData();
	}
    
    getUserData = () => {
		this.setState({loading: true});
		fetch(getBackendURL()+'/api/get_datos_cliente/'+this.state.user_id, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
            // Reactotron.log(responseJson.data);
            this.setState({
				cliente: responseJson.success ? responseJson.data : {},
				loading: false,
			});
			if(!responseJson.success){
				ToastService.showToast(responseJson.message);
			}
		}).catch((error) => {
			Reactotron.log(error);
			this.setState({loading: false});
			ToastService.showToast("Error al cargar los datos.");
		});
    }

    render() {
        let { cliente } = this.state;
        return (
        <Container>
            <ScreenHeader title="Mi Perfíl"/>
            <Content>
                <Card transparent>
                    <CardItem bordered header>
                        {this.state.loading ? <Text>Cargando...</Text> : 
                        <Text>{cliente.nombres} {cliente.apellidos}</Text> }
                    </CardItem>
                    <CardItem bordered>
                        <Text>Email:</Text>
                        <Right>
                            <Text>{cliente.email}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Text>Celular:</Text>
                        <Right>
                            <Text>{cliente.celular}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered button onPress={() => this.props.navigation.navigate('EditProfile')}>
                        <Icon active name="create" />
                        <Text>Editar perfil</Text>
                    </CardItem>
                    <CardItem bordered button>
                        <Icon active name="create" />
                        <Text>Cambiar contraseña</Text>
                    </CardItem>
                </Card>
            </Content>
            <Content padder style={styles.logoutButton}>
                <Button iconLeft block light onPress={this._logOut}>
                    <Icon active name="log-out" />
                    <Text>Salir</Text>
                </Button>
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
	logoutButton: {
		position: 'absolute', 
		bottom: 0, 
		left:0, 
		right:0
	},
});

export default withNavigation(ProfileScreen);