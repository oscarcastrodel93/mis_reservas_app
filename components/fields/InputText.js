import { Container, Item, Input, Label, Text, Icon  } from 'native-base';
import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';

export default class InputText extends Component {

    constructor(props){
        super(props);
        this.state={
            error: props.error ? props.error : false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.error !== prevState.error) {
            return { error: nextProps.error } // <- this is setState equivalent
        }
        return null;
    }

    updateValue =  (name, value) => {
        this.setState({ [name]: value }, () => {
            this.props.updateValue(name, value);
        });
    }

    render() {
        return (
            <Item floatingLabel error={this.state.error}>
                <Label>{this.props.label}</Label>
                <Input
                    {...this.props}
                    onChangeText={(inputValue) => this.updateValue(this.props.name, inputValue)}
                    />
                {/* {this.state.error ? <Icon name='close-circle' /> : null} */}
            </Item>
        )
    }
}
