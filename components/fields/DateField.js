import DatePicker from 'react-native-datepicker';
import Reactotron from 'reactotron-react-native';
import { StyleSheet } from 'react-native';
import { Text, Content } from 'native-base';
import React, { Component } from 'react';
 
export default class DateField extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected_date: props.selected_date,
        }
    }

    updateValue =  (name, value) => {
        this.setState({ [name]: value }, () => {
            this.props.updateValue(name, value);
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selected_date !== prevState.selected_date) {
            return { selected_date: nextProps.selected_date } // <- this is setState equivalent
        }
        return null;
    }
    
    render(){
        return (
            <Content>
                <Text>{this.props.label}</Text>
                <DatePicker
                    {...this.props}
                    // maxDate="2016-06-01"
                    mode={this.props.mode ? this.props.mode : "date"}
                    date={this.state.selected_date}
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            right: 0,
                            top: 4,
                            marginRight: 0
                        },
                        dateInput: {
                            marginRight: 36,
                            marginTop: 15,
                        }
                    }}
                    onDateChange={(selected_date) => this.updateValue(this.props.name, selected_date)}
                />
            </Content>
        )
    }
}

const styles = StyleSheet.create({
	dateInput: {
		marginTop: 5,
	},
});