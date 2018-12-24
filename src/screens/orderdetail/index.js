import React from "react";
import { createDrawerNavigator } from 'react-navigation';
import { View, StyleSheet, Image, SafeAreaView, Button, Text } from "react-native";

export default class OrderDetail extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../resources/images/aaa.jpg')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <Button
            onPress={() => this.props.navigation.navigate('Home')}
            title="Go back home"><Text>asdfdf</Text></Button>
          <Text>OrderDetail</Text>
          <Text>Hello World!</Text>
        </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});