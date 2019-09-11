import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Spinner } from 'native-base';
import { withNavigationFocus } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import React, {Component} from 'react';

import { ToastService, getBackendURL } from '../../utils/Utils';
import ScreenHeader from '../../elements/ScreenHeader';
import ReservasList from './ReservasList';

class ReservasScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: false,
            user_id: false,
            reservas: []
        };
    }

    componentDidMount(){
        this._getToken();
    }
    
    componentWillReceiveProps(next_props) {
		if (next_props.isFocused && this.props.isFocused === false) {
			this.getReservas();
		}
	}

	_getToken = async() => {
        if(!this.state.access_token){
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({access_token});
        }
        this.getReservas();
    }

    _getUserId = async() => {
        if(!this.state.user_id){
		    const user_id = await AsyncStorage.getItem('user_id');
            this.setState({user_id});
        }
	}
    
    getReservas = () => {
		this.setState({loading: true});
		fetch(getBackendURL()+'/api/consultar_reservas/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
			body: JSON.stringify({
				cliente_id: this.state.user_id,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
            // Reactotron.log(responseJson.data);
            this.setState({
				reservas: responseJson.success ? responseJson.data : [],
				loading: false,
			});
			if(!responseJson.success){
				ToastService.showToast(responseJson.message);
			}
		}).catch((error) => {
			Reactotron.log(error);
			this.setState({loading: false});
			ToastService.showToast("Error al cargar las reservas.");
		});
	}

    render() {
        return (
            <Container>
                <ScreenHeader title="Mis Reservas"/>
                <Content>
                    <ReservasList reservas={this.state.reservas}/>

                    {this.state.loading ? <Spinner color='83a7fc' /> : null}
                </Content>
            </Container>
        );
    }
}

export default withNavigationFocus(ReservasScreen);