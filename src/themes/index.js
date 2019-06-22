import { Dimensions, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import normalize from 'utils/normalizeSize'

const { width, height } = Dimensions.get('window')

const Colors = {
  primary: '#B3D669',
  secondary: '#3A3A3C',
  tertiary: '#BE1A29',
  white: '#ffffff',
  black: '#000',
  electricBlue: '#rgba(0, 74, 255,1)',
  splashScreen: '#0043E7',
  blackBg: '#rgb(35,35,35)',
  brownGrey: '#rgb(144,144,144)',
  brownishGrey: '#rgb(102,102,102)',
  vermillion: '#rgb(251,22,22)',
  blackThree: '#rgb(43,43,43)',
  yellowBrow: '#rgb(255,160,0)',
  cyanWhite: '#rgb(53,197,170) ',
  blackOverlay0_7: 'rgba(0, 0, 0, 0.7)',
  lightGrey: 'rgb(208,208,208)',
  grey241: '#rgb(241,241,241)',
  grey235: '#rgb(235,235,235)',
  jadeGreen: '#rgb(53,197,170)',
  orange: '#rgb(255,160,0)',
  blackBgInfo: 'rgba(40, 40, 40, 0.9)',
  headerOverplay: 'rgba(0, 0, 0, 0.1)'
}

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
  screen: {
    width,
    height
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

const Fonts = {
  size: {
    tiny: normalize(10),
    xsmaller: normalize(11),
    smaller: normalize(12),
    small: normalize(14),
    medium: normalize(16),
    large: normalize(18),
    larger: normalize(20),
    xlarger: normalize(24),
    xlarge: normalize(30),
    xxlarge: normalize(40),
    xxlarger: normalize(48),
    xxxlarge: normalize(64)
  },
  face: {
    regular: 'AvenirNext-Regular',
    medium: 'AvenirNext-Medium',
    demiBold: 'AvenirNext-DemiBold',
    bold: 'AvenirNext-Bold',
    AncuuBold: 'Ancuu-Bold',
    AncuuNormal: 'Ancuu-Normal'
  }
}
export const Themes = { Colors, Fonts, Metrics }
export { Colors, Fonts, Metrics }
