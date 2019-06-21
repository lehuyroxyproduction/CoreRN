import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SplashPage  from '../../containers/SplashPage';
import SignInPage from '../../containers/SignInPage';
import UserTabNavigator from '../tabNavigators/UserTabNavigator';
import UserGuidePage from '../../containers/UserGuidePage';
import ChangePasswordPage from '../../containers/ChangePasswordPage';
import AdminTabNavigator from '../tabNavigators/AdminTabNavigator';
import { StylesGlobal } from '../../constants/constants';
import AddUserPage from '../../containers/UserManagePages/AddUserPage';
import UpdateUserPage from '../../containers/UserManagePages/UpdateUserPage';
import AddDevicePage from '../../containers/DeviceManagePages/AddDevicePage/AddDevicePage';
import DeviceDetailPage from '../../containers/DeviceManagePages/DeviceDetailPage/DeviceDetailPage';
import DeviceUserPage from '../../containers/DeviceManagePages/DeviceUserPage/DeviceUserPage';
import UpdateDevicePage from '../../containers/DeviceManagePages/UpdateDevicePage/UpdateDevicePage';
import ForgetPassword from '../../containers/user/componentForgetPassword.js';
import SoftwareInfor from '../../containers/SoftwareInformation/SoftwareInformation.js';
import LogsTime from '../../containers/DeviceManagePages/LogsTime/LogsTime'
const AppStackNavigator = createStackNavigator({
    
  Splash: {
    screen: SplashPage,
    navigationOptions: {
      header: null,
    },
  },
  Logstime:{
    screen:LogsTime
  },
  Software:{
    screen : SoftwareInfor,

  },
  // #region Account
  SignIn: {
    screen: SignInPage,
    navigationOptions: {
      header: null,
    },
  },

  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      header: null,
    },
  },

  UserGuide: {
    screen: UserGuidePage,
  },

  ChangePassword: {
    screen: ChangePasswordPage,
  },
  // #endregion


  // #region USER
  AddUser: {
    screen: AddUserPage,
  },
  UpdateUser: {
    screen: UpdateUserPage,
  },
  // #endregion


  // #region DEVICE
  AddDevice: {
    screen: AddDevicePage,
  },
  UpdateDevice: {
    screen: UpdateDevicePage,
  },
  DeviceDetail: {
    screen: DeviceDetailPage,
  },
  DeviceUser: {
    screen: DeviceUserPage,
  },
  // #endregion


  // #region Role
  UserTabNavigatorMain: {
    screen: UserTabNavigator,
    navigationOptions: {
      header: null,
    },
  },

  AdminTabNavigatorMain: {
    screen: AdminTabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  // #endregion
},
{
  initialRouteName: 'Splash',
  // initialRouteName: 'ChangePassword',
  /* headerMode: 'float', */
  /* headerMode: 'none', */
  navigationOptions: {
    gesturesEnabled: false, /* Turn off swipe */
    headerStyle: StylesGlobal.header,
    headerTintColor: 'white',
  },
  transitionConfig: () => ({
    screenInterpolator: (sceneProps) => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };
      const slideFromBottom = { transform: [{ translateY }] };

      return slideFromRight;
    },
  }),
});
    
export default AppStackNavigator;
