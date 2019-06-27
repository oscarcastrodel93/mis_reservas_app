import { Container, Content, Picker, Input, Text, Button, Form } from 'native-base';
import SelectField from '../../../fields/SelectField';
import DateField from '../../../fields/DateField';
import React, { Component } from 'react';
import Modal from "react-native-modal";
import { View } from 'react-native';

export default class FiltroModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: props.modalVisible,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.modalVisible !== prevState.modalVisible) {
            return { modalVisible: nextProps.modalVisible } // <- this is setState equivalent
        }
        return null;
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
		this.props.setModalVisible(visible);
    }

    updateValue =  (name, value) => {
		this.setState({ [name]: value });
    }
    
    setForm = () => {
        return (
            <Container style={{flex:1}}>
                <Content padder>
                    <Form>
                        <SelectField 
                            label="Zona"
                            name="filtro_zona"
                            list_name="zonas_list"
                            selected_option={this.state.filtro_zona}
                            updateValue={this.updateValue}
                            />
                        <DateField 
                            label="Fecha"
                            name="filtro_fecha"
                            style={{width: 300}}
                            placeholder="Seleccione un dia"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            selected_date={this.state.filtro_fecha}
                            updateValue={this.updateValue}
                            />
                        <Button onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                            <Text>Filtrar</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }

    render() {
        return (
            <Modal
                onBackdropPress={() => {this.setModalVisible(false)}}
                isVisible={this.state.modalVisible}
                swipeDirection="right"
                onSwipeComplete={() => {this.setModalVisible(false)}}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                >
                {this.setForm()}
            </Modal>
        )
    }
}
