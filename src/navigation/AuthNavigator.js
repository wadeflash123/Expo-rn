import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AppRouter from './AppRouter';
import AuthLoading from './AuthLoading';
import Login from '../screens/login/';

const AuthStack = createStackNavigator({ SignIn: Login });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppRouter,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);