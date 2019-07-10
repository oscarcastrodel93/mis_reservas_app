import { Text, List, Content, CardItem } from 'native-base';
import Reactotron from 'reactotron-react-native';
import { getHumanDate } from '../../utils/Utils';
import React, { Component } from 'react';
import HorarioItem from './HorarioItem';

export default class HorariosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_horario: props.selected_horario,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selected_horario !== prevState.selected_horario) {
            return { selected_horario: nextProps.selected_horario } // <- this is setState equivalent
        }
        return null;
    }

    selectHorario = (selected) => {
        // Reactotron.log("opcion", selected);
        this.props.updateValue('selected_horario', selected);
	}

    render() {
        let horarios_list = this.props.horarios;
        let filtro_fecha = getHumanDate(this.props.filtro_fecha);
        return (
            <Content>
                <CardItem header bordered>
                    <Text>Horarios disponibles ({filtro_fecha}):</Text>
                </CardItem>
                <List>
                    {horarios_list.map((horario, i) => {
                        let selected = horario.id===this.state.selected_horario ? true : false;
                        return <HorarioItem 
                                    key={horario.id} 
                                    horario={horario} 
                                    selectHorario={this.selectHorario}
                                    selected={selected}
                                    />
                    })}
                </List>
            </Content>
        );
    }
}
