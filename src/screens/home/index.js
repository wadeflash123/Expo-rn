import React from "react";
import { connect, bindActionCreators } from 'react-redux';
import { Platform, View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Icon } from "native-base";
import { getIsLogin } from '../../actions/user';

class MyHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      (Platform.OS === 'android') && StatusBar.setBackgroundColor('#6a51ae');
    });
    console.log('props ', this.props.islogin)
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  beerBtnPress = () => {
    this.props.navigation.openDrawer();
  }

  listBtnPress = () => {
    this.props.navigation.navigate('OrderList')
  }

  render() {
    let { beerBtnPress, listBtnPress } = this
    let { islogin } = this.props
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" translucent={false}/>
        <View
          style={{
            alignItems: "center",
            marginBottom: 50,
            backgroundColor: "transparent"
          }}
        >
          <H3>pppp App to showcase</H3>
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
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user } = state
  console.log(state)
  return {
    islogin: user.islogin
  }
}

export default connect(mapStateToProps, {
  getIsLogin
})(MyHomeScreen);
