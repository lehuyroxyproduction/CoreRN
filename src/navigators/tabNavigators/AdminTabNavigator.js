import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { updateCameraVisible } from '../../redux/actions/actionScanQR';
import { Devices, Colors } from '../../constants/constants';
import store from '../../redux/store';
import UserProfilePage from '../../containers/UserProfilePage';
import ListUserPage from '../../containers/UserManagePages/ListUserPage';
import ListDevicePage from '../../containers/DeviceManagePages/ListDevicePage';
import ScanQRPage from '../../containers/ScanQRPage';
import Logstime from '../../containers/DeviceManagePages/LogsTime'

const ICON_SIZE = 25 * Devices.displayScale;
const ICON_SIZE_FOCUSED = 35 * Devices.displayScale;
const ITEM_TINT_COLOR = '#777';
const ITEM_TINT_FOCUS_COLOR = Colors.main;

const AdminTabNavigator = createBottomTabNavigator({
  UserProfile: { screen: UserProfilePage },
  ListUser: { screen: ListUserPage },
  ListDevice: { screen: ListDevicePage },
  Logs : { screen : Logstime},
  ScanQR: { screen: ScanQRPage },
},
{
  backBehavior: 'none', // Disable Back button on Tab
  navigationOptions: ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      tabBarIcon: (value) => {
        const { focused, tintColor } = value;
        // ======== Render TAB ICON =============

        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'UserProfile':
            iconName = require('../../assets/images/ic_user_small.png');
            break;
          case 'ListUser':
            iconName = require('../../assets/images/ic_list_user.png');
            break;
          case 'ListDevice':
            iconName = require('../../assets/images/ic_list_device.png');
            break;
          case 'Logs' :
            iconName = require('../../assets/images/ic_logs.png');
            break;
          case 'ScanQR':
            iconName = require('../../assets/images/ic_qr.png');
            break;
          default:
            iconName = require('../../assets/images/ic_user.png');
            break;
        }
       
        return (
          <Image
            source={iconName}
            resizeMode="contain"
            style={[
              styles.imageStyle,
              {
                tintColor: focused ? ITEM_TINT_FOCUS_COLOR : ITEM_TINT_COLOR,
                width: focused ? ICON_SIZE_FOCUSED : ICON_SIZE,
              },
            ]}
          />
        );
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        // ========== Run function when select ScanQR Tab ==========
        // const parentNavigation = navigation.dangerouslyGetParent();
        // let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
        const nextRoute = navigation.state;
        
        if (nextRoute.routeName === 'ScanQR') {
          store.dispatch(updateCameraVisible(true)); // Call Action: Show Camera
        } else {
          store.dispatch(updateCameraVisible(false)); // Call Action: hide Camera
        }

        defaultHandler(); // action selected
      },
    };
  },
  tabBarOptions: {
    activeTintColor: ITEM_TINT_FOCUS_COLOR,
    inactiveTintColor: ITEM_TINT_COLOR,
  },
});

/* AdminTabNavigator.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
}; */

// #region - StyleSheet
const styles = StyleSheet.create({

  titleStyle: {
    marginBottom: 5 * Devices.displayScale,
    fontSize: 10 * Devices.displayScale,
  },

  imageStyle: {
    width: ICON_SIZE,
  },

});
// #endregion

export default AdminTabNavigator;
