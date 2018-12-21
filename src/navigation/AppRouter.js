import { createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator'
import OrderList from '../screens/orders/orderList';

export default createStackNavigator({
    MainTabNavigator: MainTabNavigator,
    OrderList: OrderList
  }, {
    initialRouteName: 'MainTabNavigator'
  }
)