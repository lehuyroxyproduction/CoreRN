import { Dimensions, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import normalize from '../normalizeSize'

const { width, height } = Dimensions.get('window')



const Metrics = {
  Spacing: {
    xSmall: 4,
    small: 8,
    medium: 12,
    big: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32
  },
  statusBar: {
    height: getStatusBarHeight()
  },
  topBar: Platform.select({
    ios: {
      height: 64
    },
    android: {
      height: 54
    }
  })
}
const STATUS_BAR_STYLE = {
  DARK: 'dark-content',
  LIGHT: 'light-content'
}
// export const statusBarStyle =
//   (hasNotch && STATUS_BAR_STYLE.DARK) || STATUS_BAR_STYLE.LIGHT
export {  Metrics  }
