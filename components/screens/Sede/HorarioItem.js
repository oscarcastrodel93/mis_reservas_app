import { Text, List, ListItem, Left, Right, Icon } from 'native-base';
import NumberFormat from 'react-number-format';
import React, { Component } from 'react';

export default class HorarioItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selected !== prevState.selected) {
            return { selected: nextProps.selected } // <- this is setState equivalent
        }
        return null;
    }

    selectHorario = (selected) => {
        this.props.selectHorario(selected);
	}

    render() {
        const horario = this.props.horario;
        return (
            <ListItem onPress={() => this.selectHorario(horario)} selected={this.state.selected}>
                <Left>
                    <Text>{horario.nombre}</Text>
                </Left>
                <Right>
                    <NumberFormat 
                        value={horario.precio} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$'} 
                        decimalScale={0}
                        renderText={value => <Text>{value}</Text>}/>
                </Right>
                <Right>
                    <Icon name={"checkmark"+(this.state.selected ? "-circle":"")} />
                </Right>
            </ListItem>
        );
    }
}
