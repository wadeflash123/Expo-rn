import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { getIsLogin } from '../actions/user';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndicator: true
    };
    this._getUserStatus();
  }

  componentDidMount() {
    
  }

  // 登录状态检测
  _getUserStatus = () => { // async
    this.props.getIsLogin((res) => {
      this.setState({
        showIndicator: false
      })
      this.props.navigation.navigate(res.code === 0 ? 'App' : 'Auth');
    });
    // 模拟请求
    // const userToken = await AsyncStorage.getItem('userToken');
    // setTimeout(() => {
    //   this.setState({
    //     showIndicator: false
    //   })
    //   this.props.navigation.navigate(userToken ? 'Auth' : 'App');
    // }, 2000)
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

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, {
  getIsLogin
})(AuthLoading);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange'
  }
});