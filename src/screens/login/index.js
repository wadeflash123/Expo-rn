import React from 'react';
import {
  View,
  StatusBar,
  AsyncStorage
} from "react-native";
import {
  Button,
  Text
} from 'native-base'

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button danger rounded full onPress={this._signInAsync}>
          <Text>Sign in</Text>
        </Button>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}