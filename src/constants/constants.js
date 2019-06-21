import {
  Platform, Dimensions, PixelRatio, StyleSheet, StatusBar,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export const Devices = {
  displayScale: Platform.OS === 'ios' 
    ? (!isIphoneX() ? (Dimensions.get('window').height / 667) : 1) 
    : (Dimensions.get('window').height * PixelRatio.get()) > 1920 
      ? 0.9 
      : (Dimensions.get('window').height / 667),
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const Colors = {
  main: '#005083',
  background: '#F6F6F6',
  blackBlur: '#00000088',
  grayBlur: '#969696',
};

export const DefaultProps = {
  navigationBarDefaultHeight: 44 * Devices.displayScale,
  logoDefaultWidth: 150 * Devices.displayScale,
  buttonDefaultWidth: 196 * Devices.displayScale,
  tabNavigatorDefaultHeight: 60 * Devices.displayScale,
  toastDefaultCloseDelay: 200,
  loadingIconSize: 50 * Devices.displayScale,
  avatarSize: 120 * Devices.displayScale,
  iconHeaderUserProfileWidth: 32 * Devices.displayScale,
  iconHeaderNotificationWidth: 32 * Devices.displayScale,
  iconHeaderStarWidth: 25 * Devices.displayScale,
};

export const StylesGlobal = StyleSheet.create({

  // #region Header
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },

  header: {
    height: DefaultProps.navigationBarDefaultHeight,
    backgroundColor: Colors.main,
    paddingHorizontal: 16 * Devices.displayScale,
  },

  headerEmpty: {
    height: DefaultProps.navigationBarDefaultHeight,
    backgroundColor: Colors.main,
    borderBottomWidth: 0,
    elevation: 0,
  },

  headerTitle: {
    flex: 1,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 17 * Devices.displayScale,
    fontWeight: 'bold',
  },
  // #endregion


  // #region Button
  buttonAction: {
    width: 32 * Devices.displayScale,
    height: 32 * Devices.displayScale,
  },
  // #endregion


  // #region ERROR 
  errorContain: {
    borderColor: 'transparent',
  },
  errorText: {
    color: 'red', alignSelf: 'flex-start',
  },
  // #endregion


  loadingView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    backgroundColor: Colors.blackBlur,
  },

  toastContainer: {
    marginHorizontal: 50 * Devices.displayScale,
    borderRadius: 3 * Devices.displayScale,
    backgroundColor: 'black',
  },
  
  toastText: {
    paddingVertical: 5 * Devices.displayScale,
    paddingHorizontal: 10 * Devices.displayScale,
    textAlign: 'center',
    color: 'white',
    fontSize: 14 * Devices.displayScale,
    fontWeight: 'bold',
  },

  contentContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});

export const EventListenerName = {
  AndroidHardwareBackPress: 'hardwareBackPress',
};

export const AsyncStorageItem = {
  User: 'User',
};

export const AppImages = {
  ICON_ADD: require('../assets/images/ic_add.png'),
  ICON_USER: require('../assets/images/ic_user.png'),
  ICON_REMOVE: require('../assets/images/ic_remove.png'),
  ICON_EDIT: require('../assets/images/ic_edit.png'),
  ICON_DEVICE: require('../assets/images/ic_device_big.png'),
  ICON_ADMIN: require('../assets/images/ic_admin.png'),
  ICON_USER_DEFAULT: require('../assets/images/ic_user_avatar.png'),
  ICON_CHECK: require('../assets/images/ic_check.png'),
  ICON_CANCEL: require('../assets/images/ic_cancel.png'),
  ICON_LOGIN: require('../assets/images/ic_login.png'),
  ICON_DOOR : require('../assets/images/ic_door.png'),
  ICON_FILTER : require('../assets/images/ic_filter.png')
};
