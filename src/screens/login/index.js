import React from 'react';
import { connect } from 'react-redux';
import {
  StatusBar,
  ImageBackground,
  ToastAndroid,
  View,
  Platform
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
      j_username: 'wede01',
      j_password: 'abc12345',
      validateCode: '1234'
    };
  }

  static navigationOptions = {
    // title: 'Please sign in',
    header: null
  };

  _signInAsync = () => {
    console.log(this.state)
    let { j_username, j_password, validateCode } = this.state
    this.props.userLoginIn({ data: { j_username, j_password, validateCode }, cb: (res) => {
      if (res.code === 0) {
        this.props.navigation.navigate('App');
      } else {
        ToastAndroid.show(res.message || '网络异常，请稍后重试!', ToastAndroid.SHORT);
      }
    }});
    // await AsyncStorage.setItem('userToken', 'abc');
    // this.props.navigation.navigate('App');
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('light-content');
      (Platform.OS === 'android') && StatusBar.setBackgroundColor('transparent');
    });
    getCaptcha()
  }

  render() {
    let { j_username, j_password } = this.state
    return (
      <ImageBackground source={require('../../resources/images/login_bg.jpg')} style={{width: '100%', height: '100%'}}>
        <Content>
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
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, {
  userLoginIn
})(Login);
