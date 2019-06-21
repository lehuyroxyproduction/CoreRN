import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode';
import Image from 'react-native-scalable-image';
import Toast, {DURATION} from 'react-native-easy-toast';
import ComponentDropDownButton from '../../components/componentDropDownButton';
import ComponentModalFlatList from '../../components/componentModalFlatList';
import I18n from 'react-native-i18n';
import { encodeBase64 } from '../../helpers/helperString/helperString.js';
import { Devices, Colors, StylesGlobal, DefaultProps } from '../../constants/constants.js';
import { URL_DOMAIN, URL_GENERATE_QR } from '../../constants/webServices.js';
import { saveUser, getAPIUserStart, updateUserLocation } from '../../redux/actions/actionApp.js';

// #region Constants
const padding = 10 * Devices.displayScale;
const qrContainerHeight = 350 * Devices.displayScale;
const iconLoadingSize = 30 * Devices.displayScale;
const dropDownButtonContainerHeight = 60 * Devices.displayScale;
const dropDownButtonWidth = Devices.width - (padding * 2);
const dropDownButtonHeight = 40 * Devices.displayScale;
const qrSize = 250 * Devices.displayScale;
const guideGifWidth = Devices.width - (padding * 10);
// #endregion

class ComponentGenerateQR extends Component {

    // #region NavigationOptions
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: (props) => <Text {...props} style={StylesGlobal.headerTitle} >{I18n.t('GenerateQR')}</Text>,
            headerStyle: StylesGlobal.header,
            headerTintColor: 'white',
        };
    }
    // #endregion

    // #region Component Lifecycle

    constructor(props) {
        super(props);
        this.state = {
            isGenerating: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        const { user } = this.props;
        this.props.getAPIUserStart({id: user.id});
        if (user.avatars && user.avatars.length > 0) {
            FastImage.preload([
                {
                    uri: URL_DOMAIN + user.avatars
                },
            ])
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isLoadingUser, user } = nextProps;
        if (!isLoadingUser && this.props.isLoadingUser) {
            // console.log(user);
            this.props.saveUser(user);
            this.setState({...this.state, refreshing: false});
        }
    }

    render() {
        const { isLoadingUser, user, userLocation } = this.props;
        const { isGenerating, refreshing } = this.state;
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor={Colors.main} barStyle='light-content' />
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            colors={[Colors.main]}
                        />
                    }
                    scrollEnabled={true}
                    keyboardShouldPersistTaps='handled'
                >
                    { user && user.location.length > 1 ?
                        <View style={styles.dropDownButtonContainer} >
                            <ComponentDropDownButton
                                style={styles.dropDownButton}
                                text={userLocation.building_name}
                                onPress={this.onPressDropDownButton}
                            />
                        </View>
                        : null
                    }
                    <View style={styles.qrContainer} >
                        { user && user.location.length > 0 ?
                            <QRCode
                                // value={URL_GENERATE_QR + encodeBase64(`${user.id}_${userLocation.id_location}`)}
                                value={encodeBase64(`${user.id}_${userLocation.id_location}`)}
                                size={qrSize}
                                bgColor='transparent'
                                fgColor='white'
                            />
                            // { isGenerating ?
                            //     <Image
                            //         style={styles.qr}
                            //         source={require('../../assets/images/loading.gif')}
                            //         width={iconLoadingSize}
                            //     />
                            //     : null
                            // }
                            : <Text style={styles.text} >You're not assigned to any location</Text>
                        }
                    </View>
                    <View style={{height: padding, width: Devices.width, backgroundColor: Colors.background}} />
                    <View style={styles.guideContainer} >
                        <Text style={styles.text} >How To Use</Text>
                        <Text style={styles.text} >1. Select ‘QR code’ on door lock screen.</Text>
                        <Text style={styles.text} >2. Hold your phone up to door lock, with QR code on your screen facing the door lock’s camera.</Text>
                        <Image
                            style={styles.guideGif}
                            source={require('../../assets/images/demo.gif')}
                            width={guideGifWidth}
                        />
                        <Text style={styles.text} >If you still face problems unlocking with the QR code, please contact staff for assistance.</Text>
                    </View>
                </ScrollView>
                <ComponentModalFlatList
                    onRef={ref => (this.modalFlatList = ref)}
                    title={I18n.t('SelectLocation')}
                    dataList={user.location}
                    data={userLocation}
                    onPressData={item => {
                        this.modalFlatList.close();
                        this.props.updateUserLocation(item)
                    }}
                />
                { isLoadingUser && !refreshing ?
                    <View style={StylesGlobal.loadingView} >
                        <ActivityIndicator
                        size='large'
                        color={'white'}
                        animating={isLoadingUser && !refreshing}
                        />
                    </View>
                    : null
                }

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

    // #endregion
  
    // #region Methods
    onRefresh = () => {
        const { user } = this.props;
        const { refreshing } = this.state;
        if (refreshing) { return; }
        this.setState({...this.state, refreshing: true});
        this.props.getAPIUserStart({id: user.id});
    }

    onPressDropDownButton = () => {
        this.modalFlatList.open();
    }
    // #endregion

}

// #region Stylesheet
const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    
    scrollView: {
        flexGrow : 1, 
        alignItems : 'center',
    },

    qrContainer: {
        width: Devices.width,
        height: qrContainerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    qr: {
        marginTop: padding * 3,
        width: qrSize,
        height: qrSize
    },

    guideContainer: {
        marginTop: padding,
        marginBottom: padding * 2,
        width: Devices.width - (padding * 2),
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },

    guideGif: {
        alignSelf: 'center'
    },

    text: {
        fontSize: 15 * Devices.displayScale,
        color: 'black',
    },

    textBold: {
        fontSize: 15 * Devices.displayScale,
        fontWeight: 'bold',
        color: 'black',
    },

    dropDownButtonContainer: {
        width: Devices.width,
        height: dropDownButtonContainerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    dropDownButton: {
        width: dropDownButtonWidth,
        height: dropDownButtonHeight
    },

});
// #endregion

// #region Redux
const mapStateToProps = (state) => ({
    isLoadingUser: state.app.isLoadingUser,
    user: state.app.user,
    isErrorUser: state.app.isErrorUser,
    userLocation: state.app.userLocation
});
  
function dispatchToProps(dispatch) {
    return bindActionCreators({
        saveUser,
        getAPIUserStart,
        updateUserLocation
    }, dispatch);
}
  
export default connect(mapStateToProps, dispatchToProps)(ComponentGenerateQR);
// #endregion
