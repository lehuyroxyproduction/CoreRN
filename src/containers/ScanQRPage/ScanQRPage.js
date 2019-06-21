import React, { Component } from 'react';
import { Vibration, Alert, Animated, Easing, View, Image, Text, ActivityIndicator,TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import QRCodeScanner from 'react-native-qrcode-scanner';
import I18n from 'react-native-i18n';
import { decodeBase64 } from '../../helpers/helperString/helperString.js';
import { Devices, StylesGlobal, DefaultProps } from '../../constants/constants.js';
import { URL_GENERATE_QR } from '../../constants/webServices.js';
import { postAPIClockInStart, updateCameraVisible } from '../../redux/actions/actionScanQR.js';
import store from '../../redux/store';
import { styles } from './styles.js';
import ViewFinder from 'react-native-view-finder'
import RNFlash from 'react-native-flash';

// #region Constants
export const padding = 10 * Devices.displayScale;
export const rectSize = Devices.width - (padding * 8);
export const rectWidth = (Devices.width - rectSize) / 2;
export const rectHeight = (Devices.height - rectSize) / 2;
const scanBarAnimateTime = 3000;
// #endregion

class ScanQRPage extends Component {

    // #region NavigationOptions
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: (props) => <Text {...props} style={StylesGlobal.headerTitle} >{I18n.t('ScanQR')}</Text>,
            headerStyle: StylesGlobal.header,
            headerTintColor: 'white',

        };
    }
    // #endregion

    // #region Component Lifecycle
    constructor(props) {
      super(props);
      this.state = { 
          animatedValue: new Animated.Value(0) ,
        loading:'true',
        flash:'false'
    }
    }
    

    componentDidMount() {
      store.dispatch(updateCameraVisible(true));  // Call Action: Show Camera
      this.scannerLineMove();
    }

    componentWillReceiveProps(nextProps) {
        const { isCameraVisible, isError, response } = nextProps;
        if (!isError && response && !this.props.response) {
            this.refs.toast.close();
            // this.refs.toast.show(response.text);

            Alert.alert(
                '',
                response.text,
                [
                    {text: I18n.t('OK'), onPress: () => this.scannerReactivate() },
                ],
                { cancelable: false }
            );
        }
        else if (isError && !this.props.response) {
            this.refs.toast.close();
        //   this.refs.toast.show(response.text);
            Alert.alert(
                '',
                response.text,
                [
                    {text: I18n.t('OK'), onPress: () => this.scannerReactivate() },
                ],
                { cancelable: false }
            );
        }

        if (isCameraVisible && !this.props.isCameraVisible) {
            this.scannerLineMove(true);
        }
    }


    render() {
        const { isCameraVisible, isLoading } = this.props;
        return (
            <View style={styles.container} >
                
                { isCameraVisible ?
                    <QRCodeScanner
                        ref={(ref) => { this.scanner = ref }}
                        cameraStyle={styles.camera}
                        topViewStyle={styles.zeroContainer}
                        bottomViewStyle={styles.zeroContainer}
                        showMarker={true}
                        customMarker={this.renderRect()}
                        onRead={(event) => this.onCaptureResult(event)}
                        reactivate={false}
                        fadeIn={false}
                        reactivateTimeout={1.0}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />
                    : null
                }
                { isLoading ?
                    <View style={StylesGlobal.loadingView} >
                        <ActivityIndicator
                        size='large'
                        color={'white'}
                        animating={isLoading}
                        />
                    </View>
                    : null
                }
                <View style={{position:'absolute',flex:1}}>
                    <Text style={{textAlign:'center',fontSize:15,color:'white',paddingLeft:50,paddingRight:50,marginTop:80}}>{I18n.t('WaittingScan')}</Text>
                    {/* <TouchableOpacity onPress={()=>this.onFlash} style={{borderColor: 'white',borderRadius:5,borderStyle:'solid'}} ><Text>Flash</Text></TouchableOpacity> */}
                </View>
                <ViewFinder backgroundColor="transparent" color="#fff" loading={false} style={{flex:1,opacity:0.3}}/>
                <Toast 
                    ref='toast'
                    style={StylesGlobal.toastContainer}
                    textStyle={StylesGlobal.toastText}
                    defaultCloseDelay={DefaultProps.toastDefaultCloseDelay}
                    position='top'
                    positionValue={padding * 2}
                />
            </View>
        );
    }

    //#region để sau làm tiếp 
    // onFlash=()=>{
    //     this.setState({flash:!this.state.flash});
    //     if(this.state.flash){
    //         RNFlash.hasFlash(function(){
    //             RNFlash.turnOnFlash();
    //         });
    //     }else {
    //         RNFlash.hasFlash(function(){
    //             RNFlash.turnOffFlash(); 
    //         })
    //     }
    //     console.log(this.state.flash)
    // }

    componentWillUnmount() {
        this.scanner = undefined;
    }

    // #endregion

    // #region Components
    renderRect() {
        const animatedStyle = {
            transform: [
                {translateY: this.state.animatedValue}
            ]
        };
        return (
            <View style={styles.cameraMarker}>
                <Animated.View style={[animatedStyle]} >
                    <Image
                        style={styles.scanBar}
                        source={require('../../assets/images/scanBar.png')} />
                </Animated.View>
            </View>
        );
    }
    // #endregion

    // #region Methods
    onCaptureResult(event) {
        this.scannerDisplayResult(event);
    }

    scannerDisplayResult(event) {
        Vibration.vibrate();
        // Alert.alert(
        //     'Scanced QR Code',
        //     event.data,
        //     [
        //         {text: I18n.t('OK'), onPress: () => this.onPressScannerResult(event.data) },
        //     ],
        //     { cancelable: false }
        // );
        this.onPressScannerResult(event.data);
    }

    scannerReactivate() {
        if (this.scanner != undefined) {
            this.scanner.reactivate();
        }
    }

    scannerLineMove(force = false) {
        // console.log('scannerLineMove invoked');
        if (!this.props.isCameraVisible && !force) {
            // console.log('Animation stopped');
            return; 
        }
        this.state.animatedValue.setValue(0);
        Animated.timing(this.state.animatedValue,
        {
            toValue: rectSize,
            duration: scanBarAnimateTime,
            easing: Easing.linear
        }).start(() => this.scannerLineMove());
    }

    onPressScannerResult = (result) => {
        const { domain, token } = this.props.user;

        try {
            const payload = {
                serial: result,
                domain,
                token
            }
            this.props.postAPIClockInStart(payload);
        } catch(e) {
            this.scannerReactivate();
        }
    }
    // #endregion

}

// #region Redux

function mapStateToProps(state) {
    return {
        user: state.app.user,
        isCameraVisible: state.scanQR.isCameraVisible,
        isLoading: state.scanQR.isLoading,
        isError: state.scanQR.isError,
        response: state.scanQR.response
    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        postAPIClockInStart,
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(ScanQRPage);

// #endregion