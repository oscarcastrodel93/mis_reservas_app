import { getCurrentDateDB, getCurrentTime, ToastService } from '../../../utils/Utils';
import { Container, Content, Picker, Item, Text, Button, Form } from 'native-base';
import SelectField from '../../../fields/SelectField';
import DateField from '../../../fields/DateField';
import Reactotron from 'reactotron-react-native';
import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import Modal from "react-native-modal";

export default class FiltroModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: props.modalVisible,
            filtro_zona: 'sur',
			filtro_fecha: getCurrentDateDB(),
			filtro_hora_inicio: getCurrentTime(0),
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.modalVisible !== prevState.modalVisible) {
            return { modalVisible: nextProps.modalVisible } // <- this is setState equivalent
        }
        return null;
    }

    filtrar = () => {
        this.props.getSedesActivas();
        this.setModalVisible(!this.state.modalVisible);
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
		this.props.setModalVisible(visible);
    }

    updateValue =  (name, value) => {
		this.setState({ [name]: value }, () => {
            this.props.updateValue(name, value);
        });
    }
    
    setForm = () => {
        let current_date = getCurrentDateDB();
        return (
            <Container style={{flex:1}}>
                <Content padder>
                    <Form>
                        <Item style={styles.formField}>
                            <SelectField 
                                label="Zona"
                                name="filtro_zona"
                                list_name="zonas_list"
                                selected_option={this.state.filtro_zona}
                                updateValue={this.updateValue}
                                />
                        </Item>
                        <Item style={styles.formField}>
                            <DateField 
                                label="Fecha"
                                name="filtro_fecha"
                                style={{width: 350}}
                                placeholder="Seleccione un dia"
                                minDate={current_date}
                                selected_date={this.state.filtro_fecha}
                                updateValue={this.updateValue}
                                />
                        </Item>
                        <Item style={styles.formField}>
                            <SelectField 
                                label="Hora"
                                name="filtro_hora_inicio"
                                list_name="horas_list"
                                selected_option={this.state.filtro_hora_inicio}
                                updateValue={this.updateValue}
                                />
                        </Item>
                        <Button primary block
                            style={styles.filterButton}
                            onPress={this.filtrar} >
                            <Text>Filtrar</Text>
                        </Button>
                        <Button light block 
                            style={styles.backButton}
                            onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                            <Text>Cancelar</Text>
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

const styles = StyleSheet.create({
	formField: {
		marginTop: 20,
	},
    filterButton: {
        marginTop: 40,
    },
	backButton: {
		marginTop: 20,
	},
});
