import { Picker, Text, Form } from 'native-base';
import Reactotron from 'reactotron-react-native';
import React, { Component } from 'react';
import { enums } from '../utils/Enums';

export default class SelectField extends Component {

    constructor(props){
        super(props);
        this.state={
            selected_option: props.selected_option,
        }
    }

    updateValue =  (name, value) => {
        this.setState({ [name]: value }, () => {
            this.props.updateValue(name, value);
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selected_option !== prevState.selected_option) {
            return { selected_option: nextProps.selected_option } // <- this is setState equivalent
        }
        return null;
    }

    render() {
        let mode = this.props.mode ? this.props.mode : "dropdown";
        let list_options = this.props.list_options ? this.props.list_options : enums[this.props.list_name];
        
        return (
            <Form>
                <Text>{this.props.label}</Text>
                <Picker
                    {...this.props}
                    mode={mode}
                    selectedValue={this.state.selected_option}
                    onValueChange={(selected_option) => this.updateValue(this.props.name, selected_option)}
                >
                    {list_options.map((option, i) => {
                        return <Picker.Item key={option.key} label={option.label} value={option.key} />
                    })}
                </Picker>
            </Form>
        )
    }
}