import { Metrics, Themes } from 'themes'
import { Platform, PixelRatio, Dimensions } from 'react-native'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export const wp = widthPercent => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}
export const hp = heightPercent => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}

export const isAndroid = Platform.OS === 'android'
export const TYPE_VIRTUALRACE = 3

export const DEFAULT_MAP_ZOOM = 18
export const STATUS_CODE = {
  SUCCESS: 1000,
  UNAUTHENTICATED: 1111,
  EMAIL_DUPLICATED: 1113,
  ERROR: 1103,
  SESSION_FINISHED: 1127 // Session is finished
}
export const STATUS_BAR_STYLE = {
  DARK: 'dark-content',
  LIGHT: 'light-content'
}
export const POST_PUT_API_CONFIG = {
  params: {
    context: 2,
    data: 3
  }
}
export const LOCALE = {
  EN: 'en',
  VI: 'vi'
}
export const AsyncStorageItem = {
  User: 'User',
};