import { Container, Content, Card } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';
import HorariosList from './HorariosList';
import SedeHeader from './SedeHeader';
import SedeInfo from './SedeInfo';

class SedeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: false,
            sede: false,
			horarios: [],
			selected_horario: false,
        }
    }

    componentDidMount(){
		this.setState({sede: this.props.navigation.getParam('sede', false)});
		this._getToken();
	}

    _getToken = async() => {
		const access_token = await AsyncStorage.getItem('access_token');
		this.setState({access_token});
		this.getHorarios();
	}

	getHorarios = () => {
		if(!this.state.sede) return;

		this.setState({loading: true});
		fetch('http://192.168.0.27:8000/api/horarios_disponibles/'+this.state.sede.id, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+this.state.access_token,
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				horarios: responseJson.success ? responseJson.data : [],
				loading: false,
			});
			if(!responseJson.success){
				ToastService.showToast(responseJson.message);
			}
		});
	}

	updateValue =  (name, value) => {
		this.setState({ [name]: value });
    }

    render() {
        const { sede } = this.state;
        return (
            <Container>
                <SedeHeader sede_name={sede.nombre}/>
				<Content>
					<Card transparent>
						<SedeInfo sede={sede}/>
						<HorariosList 
							horarios={this.state.horarios}
							selected_horario={this.state.selected_horario}
							updateValue={this.updateValue}
							/>
						
					</Card>
				</Content>
            </Container>
        )
    }
}

export default withNavigation(SedeScreen);