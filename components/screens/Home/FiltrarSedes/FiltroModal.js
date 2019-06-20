import { Container, Content, Picker, Input, Text, Button, Form } from 'native-base';
import SelectField from '../../../fields/SelectField';
import InputText from '../../../fields/InputText';
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
                    {/* <Form>
                        <Text>Zona</Text>
                        <Picker
                            {...this.props}
                            mode="dropdown"
                            // style={{ width: 120 }}
                            placeholder="Zona"
                            selectedValue={this.state.filtro_zona}
                            onValueChange={(filtro_zona) => this.setState({filtro_zona})}
                        >
                            <Picker.Item label="Norte" value="norte" />
                            <Picker.Item label="Sur" value="sur" />
                            <Picker.Item label="Oriente" value="oriente" />
                            <Picker.Item label="Occidente" value="occidente" />
                        </Picker>
                    </Form> */}
                    <SelectField 
                        name="filtro_zona"
                        label="Zona"
                        list_name="zonas_list"
                        selected_option={this.state.filtro_zona}
                        updateValue={this.updateValue}
                        />
                    <Button onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                        <Text>Filtrar</Text>
                    </Button>
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
