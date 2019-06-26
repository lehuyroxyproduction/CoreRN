import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export const Devices = {
    displayScale: Platform.OS === 'ios' ? (!isIphoneX() ? (Dimensions.get('window').height / 667) : 1) : (Dimensions.get('window').height * PixelRatio.get()) > 1920 ? 0.9 : (Dimensions.get('window').height / 667),
    wp: Dimensions.get('window').width,
    hp: Dimensions.get('window').height
}

export const DisplayScale = Devices.displayScale;

export const Colors = {
    main:'#e0e0e0',
    mainLine:'#B60969',
    mainWhite:'#ffffff',
    txtWhite:'#FCFDFE',
    txtBlack:'#000',
    txtDescript:'#9B9B9B',
    grayButton:'#4F5B73',
    buttonFooter:'#EEEEEE',
    lineFooter:'#979797',
    lineTag:'#E9E8E8',
    bgButton:'#D9D4D4',
    payButton:'#bdbdbd',
    progressBar:'#65B150',
    borderQRSuccess:'#76ff03',
    bgTitle:'#F4F6FE',
    btnAmount:'#4A4A4A'

}

export const Fonts = {
    RobotoBack:'../assets/fonts/Roboto-Black.ttf',
    RobotoBlackItalic:'../assets/fonts/Roboto-BlackItalic.ttf',
    RobotoBold: '../assets/fonts/Roboto-Bold.ttf',
    RobotoBoldItalic : '../assets/fonts/Roboto-BoldItalic.ttf',
    RobotoItalic:'../assets/fonts/Roboto-Italic.ttf',
    RobotoLight:'../assets/fonts/Roboto-Light.ttf',
    RobotoLightItalic:'../assets/fonts/Roboto-LightItalic.ttf',
    RobotoMedium:'../assets/fonts/Roboto-Medium.ttf',
    RobotoMediumItalic:'../assets/fonts/Roboto-MediumItalic.ttf',
    RobotoRegular : '../assets/fonts/Roboto-Regular.ttf',
    RobotoThin : '../assets/fonts/Roboto-Thin.ttf',
    RobotoThinItalic : '../assets/fonts/Roboto-ThinItalic.ttf'
}

export const StylesGlobal = StyleSheet.create({
    AppClass:{
        fontFamily:'AvenirNextCyr',
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

export const DefaultProps = {
    toastDefaultCloseDelay: 200,
    loadingIconSize: 50 * Devices.displayScale,
    defaultPadding: 10 * Devices.displayScale,
    defaultButtonWidth: 196 * Devices.displayScale,
    defaultButtonRadius: 17 * Devices.displayScale,
    segmentWidth: 80 * Devices.displayScale,
    segmentHeight: 32 * Devices.displayScale,
    iconHeaderUserProfileWidth: 32 * Devices.displayScale,
    iconHeaderNotificationWidth: 32 * Devices.displayScale,
    iconHeaderStarWidth: 25 * Devices.displayScale,
    iconLightContainerSize: 15 * Devices.displayScale,
    iconLightSize: 12 * Devices.displayScale,
    tabNavigatorDefaultHeight: 60 * Devices.displayScale,
}

export const BannerImage={
  
}
export const AppImages = {
   
};
  