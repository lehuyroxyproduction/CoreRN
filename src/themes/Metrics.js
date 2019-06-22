import { Dimensions, Platform, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')
const navbarHeight = Platform.OS === 'ios' ? 84 : 44 + StatusBar.currentHeight

export const Metrics = {
  screen: {
    width,
    height,
    innerHeight: height - navbarHeight
  },
  navbar: {
    height: navbarHeight
  },
  toast: {
    height: 48
  },
  icons: {
    tiny: '',
    s: '',
    m: '',
    l: '',
    x: '',
    xl: '',
    xxl: '',
    xxxl: ''
  }
}
