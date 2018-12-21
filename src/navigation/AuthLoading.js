import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoading extends React.Component {
  constructor() {
    super();
    this.state = {
      showIndicator: true
    }
    this._getUserStatus()
  }

  // 登录状态检测
  _getUserStatus = async () => {
    // 模拟请求
    const userToken = await AsyncStorage.getItem('userToken');
    setTimeout(() => {
      this.setState({
        showIndicator: false
      })
      this.props.navigation.navigate(userToken ? 'Auth' : 'App');
    }, 3000)
  }

  render() {
    let {showIndicator} = this
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={showIndicator} />
        <StatusBar />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange'
  }
})