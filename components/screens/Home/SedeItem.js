import { Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';

class SedeItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            sede: props.sede
        }
    }

    render() {
        let sede = this.state.sede;
        return (
            <Content>
                <ListItem thumbnail >
                    <Left>
                        <Thumbnail square source={require('../../../src/logo.png')} />
                    </Left>
                    <Body>
                        <Text>{sede.nombre}</Text>
                        <Text note numberOfLines={1}>
                            {sede.direccion}
                        </Text>
                        <Text note numberOfLines={1}>
                            Zona {sede.zona}
                        </Text>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => {
                                this.props.navigation.navigate('Sede', {
                                    sede: sede,
                                });
                              }}
                            >
                            <Text>Ver</Text>
                        </Button>
                    </Right>
                </ListItem>
            </Content>
        )
    }
}

export default withNavigation(SedeItem);