import React from 'react';
import {
  View,
  StatusBar,
  AsyncStorage
} from "react-native";
import {
  Container, Header, Button, Content, Text, Form, Item, Input, Label
} from 'native-base'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    let { username, password } = this.state
    return (
      <Container>
        <Header />
        <Content>
          <Text>{username}{password}</Text>
          <Form>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({username})}
                value={username}/>
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input onChangeText={(password) => this.setState({password})}
                value={password}/>
            </Item>
          </Form>
          <Button danger rounded full onPress={this._signInAsync}>
            <Text>Sign in</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}