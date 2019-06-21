import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { updateCameraVisible } from '../../redux/actions/actionScanQR';
import { Devices } from '../../constants/constants';
import store from '../../redux/store';
import UserProfilePage from '../../containers/UserProfilePage';
import ScanQRPage from '../../containers/ScanQRPage';

const ICON_SIZE = 25 * Devices.displayScale;
const ITEM_TINT_COLOR = '#6F6F6F';
const ITEM_TINT_FOCUS_COLOR = 'black';

const UserTabNavigator = createBottomTabNavigator({
  ScanQR: { screen: ScanQRPage },
  UserProfile: { screen: UserProfilePage },
},
{
  backBehavior: 'none', // Disable Back button on Tab
  navigationOptions: ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      tabBarIcon: (focused, tintColor) => {
        // ======== Render TAB ICON =============

        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ScanQR') {
          iconName = require('../../assets/images/ic_qr.png');
        } else if (routeName === 'UserProfile') {
          iconName = require('../../assets/images/ic_user.png');
        }
       
        return (
          <Image
            source={iconName}
            resizeMode="contain"
            style={[
              styles.imageStyle,
              { tintColor: focused ? ITEM_TINT_FOCUS_COLOR : ITEM_TINT_COLOR },
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

export default UserTabNavigator;
