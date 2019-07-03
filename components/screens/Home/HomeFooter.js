import React, { Component } from 'react';
import { Footer, FooterTab, Icon, Text, Button } from 'native-base';

export default class HomeFooter extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button active>
                        <Icon active name="home" size={24}  />
                        {/* <Text active>Inicio</Text> */}
                    </Button>
                    <Button>
                        <Icon name="person" size={24} />
                    </Button>
                    <Button>
                        <Icon name="log-out" size={24} onPress={this.props.logOut} />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}