import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import normalize from '../containers/libs/normalizeSize'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const Devices = {
    displayScale: Platform.OS === 'ios' ? (!isIphoneX() ? (Dimensions.get('window').height / 667) : 1) : (Dimensions.get('window').height * PixelRatio.get()) > 1920 ? 0.9 : (Dimensions.get('window').height / 667)
}
const isAndroid = Platform.OS === 'android'
const DisplayScale = Devices.displayScale

const wp = widthPercent => {
    //check value is string or number
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}
const hp = heightPercent => {
    //check value is string or number
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}

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
const StylesGlobal = StyleSheet.create({
    AppClass:{
        flex:1
    },
    header: {
        height: 48 * Devices.displayScale,
        backgroundColor: Colors.main
    },

    headerTitle: {
        color: 'white',
        fontSize: 17 * Devices.displayScale,
        fontWeight: 'bold'
    },

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

    dateTimePicker: {
        margin: 0,
        padding: 0,
        width: Devices.width,
        height: 40 * Devices.displayScale,
        borderColor: '#E0E0E0',
        borderTopWidth: 1 * Devices.displayScale,
        borderBottomWidth: 1 * Devices.displayScale,
        justifyContent: 'center',
        alignItems: 'center'
    },

    dateTimePickerTextInput: {
        margin: 0,
        padding: 0,
        marginRight: 20 * Devices.displayScale,
        borderWidth: 0,
        alignItems: 'flex-end',
    },

});


const BannerImage={
  
}
const AppImages = {
   
}
const Icons = {

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
  

const STATUS_BAR_STYLE = {
  DARK: 'dark-content',
  LIGHT: 'light-content'
}
export { 
    screenHeight , 
    screenWidth,
    Fonts,
    BannerImage,
    AppImages,
    Icons,
    wp,
    hp,
    StylesGlobal,
    DisplayScale,
    Colors,
    isAndroid,
    STATUS_BAR_STYLE
}