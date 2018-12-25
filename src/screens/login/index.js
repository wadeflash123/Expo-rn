import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StatusBar,
  AsyncStorage
} from "react-native";
import {
  Container, Header, Button, Content, Text, Form, Item, Input, Label
} from 'native-base';
import { userLoginIn } from '../../actions/user';
import { getCaptcha } from '../../middleware/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      j_username: '',
      j_password: '',
      validateCode: '1234'
    };
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  _signInAsync = () => {
    this.props.userLoginIn({...this.state, ua: 'android'}, (res) => {
      console.log(res)
      if (res.code === 0) {
        this.props.navigation.navigate('App');
      }
    });
    // await AsyncStorage.setItem('userToken', 'abc');
    // this.props.navigation.navigate('App');
  };

  componentDidMount() {
    getCaptcha()
  }

  render() {
    let { j_username, j_password } = this.state
    return (
      <Container>
        <Header />
        <Content>
          <Text>{j_username}{j_password}</Text>
          <Form>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input onChangeText={(j_username) => this.setState({j_username})}
                value={j_username}/>
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input onChangeText={(j_password) => this.setState({j_password})}
                value={j_password}/>
            </Item>
          </Form>
          <Button danger rounded full onPress={this._signInAsync}>
            <Text>SignIn</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, {
  userLoginIn
})(Login);