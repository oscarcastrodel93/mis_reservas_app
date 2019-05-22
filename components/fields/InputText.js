import React, { Component } from 'react';
import { Container, Item, Input, Label, Text  } from 'native-base';
import Reactotron from 'reactotron-react-native'

export default class InputText extends Component {

    constructor(props){
        super(props);
        this.state={
            
        }
    }

    updateValue =  (name, value) => {
        this.setState({ [name]: value }, () => {
            this.props.updateValue(name, value);
        });
    }

    render() {
        return (
            <Item floatingLabel>
                <Label>{this.props.label}</Label>
                <Input
                    {...this.props}
                    onChangeText={(inputValue) => this.updateValue(this.props.name, inputValue)}
                    />
            </Item>
        )
    }
}
