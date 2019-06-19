import { Container, Content, Item, Input, Text, Button, Form } from 'native-base';
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
                <Container style={{flex:1}}>
                    <Content padder>
                        <Form>
                            <InputText 
                                label="Nombre"
                                name="nombres"
                                autoCapitalize={'words'}
                                maxLength={20}
                                updateValue={this.updateValue}
                                />
                        </Form>
                        <Button onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                            <Text>Filtrar</Text>
                        </Button>
				    </Content>
                </Container>
            </Modal>
        )
    }
}
