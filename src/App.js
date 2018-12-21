import { createAppContainer } from "react-navigation";
import AuthNavigator from './navigation/AuthNavigator';

const AppNavigator = createAppContainer(
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthNavigator
);

export default AppNavigator