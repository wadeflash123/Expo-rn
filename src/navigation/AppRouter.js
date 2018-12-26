import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import OrderList from '../screens/orders/orderList';

export default createStackNavigator({
    MainTabNavigator: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        header: null
      })
    },
    OrderList: OrderList
  }, {
    initialRouteName: 'MainTabNavigator',
    headerMode: 'none'
  }
)