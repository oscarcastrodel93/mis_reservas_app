import React, { Component } from 'react';
import { Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class SedesList extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let zona = '';
        return (
            <List>
                {this.props.sedes.map((sede, i) => {
                return(
                    <Content key={sede.id}>
                        {sede.zona!=zona ? 
                        <ListItem itemDivider>
                            <Text>Zona {sede.zona}</Text>
                        </ListItem> 
                        : null }
                        <ListItem thumbnail >
                            <Left>
                                <Thumbnail square source={require('../../../src/logo.png')} />
                            </Left>
                            <Body>
                                <Text>{sede.nombre}</Text>
                                <Text note numberOfLines={1}>{sede.direccion}</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                <Text>Ver</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    </Content>
                )
                }
                )}
            </List>
        )
    }
}
