import React from "react";
import { connect } from 'react-redux';
import { Animated, Platform, View, StatusBar, ScrollView, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Icon } from "native-base";
import { A_userBalance, A_platformNotices } from '../../actions/user';
import { A_sysLottery } from '../../actions/lot';
// import { DangerZone } from 'expo';
// let { Lottie } = DangerZone;

const data = new Array(100).fill(0);

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    title: '首页',
  };

  constructor(props) {
    super(props);
    this.state = {
      animation: null,
      noticeItemOneMT: new Animated.Value(0)
    }
  }

  componentWillMount() {
    // this._playAnimation();
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setTranslucent(false);
      StatusBar.setBarStyle('light-content');
      (Platform.OS === 'android') && StatusBar.setBackgroundColor('#6a51ae');
    });
    this.init()
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  componentWillReceiveProps(nextprops) {
    let { userId } = nextprops.userInfo.user || {}
    if (userId !== undefined) {
      this.props.A_userBalance({ data: { userId }})
    }
  }

  init = () => {
    this.props.A_platformNotices({})
    this.props.A_sysLottery({ data: { isOuter: 0 }})
    this.noticeLoop()
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

  // 公告栏滚动
  noticeLoop = () => {
    let { platformNotices } = this.props
    // 滚动中的数组，长度1（不滚动）或更多，最多保持5个，少于5个可以继续添加到5个
    let barArr = []
    // 所有notices数组，动态往barArr末尾添加当前指到的元素
    let notices = platformNotices.pageColumns || []
    Animated.timing(                  // Animate over time
      this.state.noticeItemOneMT,            // The animated value to drive
      {
        toValue: -50,                   // Animate to opacity: 1 (opaque)
        duration: 3000,              // Make it take a while
      }
    ).start();
  }

  render() {
    let { beerBtnPress, listBtnPress } = this
    let { islogin, platformNotices } = this.props
    let { noticeItemOneMT } = this.state
    let notices = platformNotices.pageColumns || []
    // 
    return (
      <ScrollView
      alwaysBounceVertical={true}
      showsVerticalScrollIndicator={false}
      bounces={true}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 50,
            backgroundColor: "transparent"
          }}
        >
          {
            islogin ? <Text>已登录a</Text> : <H3>未登录</H3>
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
        <View style={styles.noticeWrapper}>
          <View style={styles.noticeInner}>
            {
              notices.map((item, index) => {
                return <Animated.View style={{...styles.noticeItem, marginTop: index === 0 ? noticeItemOneMT : 0}} key={index + '_' + item.id}>
                  <Text style={styles.noticeInText}>Item {index} qqq</Text>
                </Animated.View>
              })
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user } = state
  return {
    islogin: user.islogin,
    userInfo: user.userInfo,
    platformNotices: user.platformNotices
  }
}

export default connect(mapStateToProps, {
  A_userBalance,
  A_platformNotices,
  A_sysLottery
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
  noticeWrapper: {
    position: 'relative',
    height: 50,
    overflow: 'hidden',
    backgroundColor: 'green'
  },
  noticeInner: {
  },
  noticeItem: {
    height: 50
  },
  noticeInText: {
    textAlign: 'center',
    lineHeight: 50 
  }
});
