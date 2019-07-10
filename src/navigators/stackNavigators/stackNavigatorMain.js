// In App.js in a new project

import { createStackNavigator, createAppContainer } from "react-navigation";
import ListUser from '../../components/admin/ListUser'


const AppNavigator = createStackNavigator({
  ListUser: {
    screen: ListUser,
  },
  
});

export default createAppContainer(AppNavigator);