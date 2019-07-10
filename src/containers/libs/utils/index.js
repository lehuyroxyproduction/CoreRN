import DeviceInfo from 'react-native-device-info'
import {STATUS_BAR_STYLE} from '../../../constants/constants'

// const hasNotch = DeviceInfo.hasNotch()
const statusBarStyle =
  (
    // hasNotch && 
    STATUS_BAR_STYLE.DARK) || STATUS_BAR_STYLE.LIGHT
const hasBottomBar =
  DeviceInfo.getModel() === 'iPhone X' ||
  DeviceInfo.getModel() === 'iPhone XS Max' ||
  DeviceInfo.getModel() === 'iPhone XS'

export { 
  // hasNotch , 
  statusBarStyle , 
  hasBottomBar }