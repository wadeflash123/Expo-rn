import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator'
import OrderList from '../screens/orders/orderList';
import MyHomeScreen from '../screens/home/';
import OrderDetail from '../screens/orderdetail/';


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

export default createStackNavigator({
    HomeScreen: HomeScreen,
    MainTabNavigator: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        header: null
      })
    },
    OrderList: OrderList
  }, {
    initialRouteName: 'MainTabNavigator'
  }
)