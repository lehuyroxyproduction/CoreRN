import { Platform, Dimensions, PixelRatio } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const ScaleRatio = 1;
const iOSDisplayScale = !isIphoneX() ? (Dimensions.get('window').height / 667) : 1;
const androidDisplayScale = (Dimensions.get('window').height * PixelRatio.get()) > 1920
  ? 0.9
  : (Dimensions.get('window').height / 667);

const Devices = {
  displayScale: ((Platform.OS === 'ios') ? iOSDisplayScale : androidDisplayScale) * ScaleRatio,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default Devices;
