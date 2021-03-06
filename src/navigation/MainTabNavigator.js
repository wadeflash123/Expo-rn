import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import MyHomeScreen from '../screens/home/';
import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/links/';
import SettingsScreen from '../screens/set/';
import OrderDetail from '../screens/orderdetail/';
import DrawerSiderUser from '../components/DrawerSiderUser';

const HomeScreen = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  OrderDetail: {
    screen: OrderDetail,
  },
}, {
  drawerType: 'slide'
});

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  headerMode: 'none'
});

HomeStack.navigationOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'ios-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: '游戏',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createDrawerNavigator({
  MainTabNavigator: createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack,
  }),
  OrderDetail: {
    screen: OrderDetail,
  },
  }, {
    contentComponent: DrawerSiderUser,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    drawerType: 'slide'
  }
);
