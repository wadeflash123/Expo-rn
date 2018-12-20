import React from "react";
import { View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Icon } from "native-base";
import { createDrawerNavigator } from 'react-navigation';
import OrderDetail from '../orderdetail/'

class MyHomeScreen extends React.Component {

  beerBtnPress = () => {
    this.props.navigation.navigate('Notifications')
  }

  render() {
    let { beerBtnPress } = this
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="green" translucent={false}/>
        <View
          style={{
            alignItems: "center",
            marginBottom: 50,
            backgroundColor: "transparent"
          }}
        >
          <H3>aaa App to showcase</H3>
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
        </View>
      </Container>
    );
  }
}

const HomeScreen = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: OrderDetail,
  },
}, {
  drawerType: 'slide'
});

export default HomeScreen;
