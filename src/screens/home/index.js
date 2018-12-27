import React from "react";
import { connect, bindActionCreators } from 'react-redux';
import { Platform, View, StatusBar, ScrollView, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Icon } from "native-base";
import { userBalance, platformNotices } from '../../actions/user';
// import { DangerZone } from 'expo';
// let { Lottie } = DangerZone;

const data = new Array(100).fill(0);

class MyHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: null,
    }
  }

  componentWillMount() {
    // this._playAnimation();
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      (Platform.OS === 'android') && StatusBar.setBackgroundColor('#6a51ae');
    });
    this.init()
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  componentWillReceiveProps(nextprops) {
    console.log(nextprops.userInfo)
    let { userId } = nextprops.userInfo.user
    console.log('user uid', userId)
    if (userId !== undefined) {
      this.props.userBalance({ data: { userId }, cb: (res) => {
        console.log('balance 2', res)
      }})
    }
  }

  init = () => {
    this.props.platformNotices({ cb: (res) => {
      console.log('notices', res)
    } })
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = await fetch(
      'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json'
    )
    .then(data => {
      return data.json();
    })
    .catch(error => {
      console.error(error);
    });
    this.setState({ animation: result }, this._playAnimation);
  };

  beerBtnPress = () => {
    this.props.navigation.openDrawer();
  }

  listBtnPress = () => {
    this.props.navigation.navigate('OrderList');
  }

  renderList = () => {
    return data.map((item, index) => {
      return <View style={{ height: 50 }}>
        <Text style={{ textAlign: 'center' }}>Item {index} qqq</Text>
      </View>
    });
  }

  render() {
    let { beerBtnPress, listBtnPress } = this
    let { islogin, userInfo } = this.props
    return (
      <ScrollView
      alwaysBounceVertical={true}
      showsVerticalScrollIndicator={false}
      bounces={true}
      >
        <Container>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" translucent={false}/>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            {
              islogin ? <Text>已登录</Text> : <H3>未登录</H3>
            }
            <View style={{ marginTop: 8 }} />
            <H3>gggg NativeBase components </H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button danger rounded full
              onPress={beerBtnPress}
            >
              <Icon name='beer' />
              <Text>KKKK Lets Go!cca</Text>
            </Button>
            <View style={{ marginTop: 8 }} />
            <Button danger rounded full
              onPress={listBtnPress}
            >
              <Icon name='beer' />
              <Text>go list </Text>
            </Button>
          </View>
          <View style={styles.animationContainer}>
            {this.state.animation &&
              <Lottie
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 400,
                  height: 400,
                  backgroundColor: '#eee',
                }}
                source={this.state.animation}
              />}
            <View style={styles.buttonContainer}>
              <Button title="Restart Animation" onPress={this._playAnimation} />
            </View>
          </View>
        </Container>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user } = state
  return {
    islogin: user.islogin,
    userInfo: user.userInfo
  }
}

export default connect(mapStateToProps, {
  userBalance,
  platformNotices
})(MyHomeScreen);

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
