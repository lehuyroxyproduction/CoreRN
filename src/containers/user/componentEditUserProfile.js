import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, Text, TouchableOpacity, ActivityIndicator, Keyboard, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import I18n from 'react-native-i18n';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import { Subject } from 'rxjs';
import ComponentCustomTextInput from '../../components/componentCustomTextInput.js';
import ComponentRoundedButton from '../../components/componentRoundedButton.js';
import { Devices, Colors, StylesGlobal, DefaultProps, EventListenerName } from '../../constants/constants.js';
import { URL_DOMAIN } from '../../constants/webServices.js';
import { validateTextInputEmail, validateTextInputPassword, validateTextInputPhoneNumber, validateTextInputName } from '../../helpers/helperString/helperString.js';
import { saveUser, updateTabbarVisible, postAPIUpdateUserStart, postAPIUploadUserAvatarStart } from '../../redux/actions/actionApp.js';

// #region Constants
const padding = 18 * Devices.displayScale;
const actionsheetButtonCancelIndex = 0;
const actionsheetButtonTakePhotoIndex = 1;
const actionsheetButtonChoosePhotoFromLibraryIndex = 2;
const compressImageMaxWidth = 1242;
const compressImageMaxHeight = 1242;
const cropImageMaxWidth = 1242;
const cropImageMaxHeight = 1242;
const textInputAllTag = -1;
const textInputPhoneNumberTag = 0;
const textInputNameTag = 1;
const textInputEmailTag = 2;
const textInputPasswordTag = 3;
// #endregion

class ComponentEditUserProfile extends Component {
  
    // #region NavigationOptions
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerLeft:  <HeaderBackButton tintColor='white' onPress={params.onGoBack} />,
            headerTitle: (props) => <Text {...props} style={StylesGlobal.headerTitle} >{I18n.t('EditUserProfile')}</Text>,
            headerRight: <View />,
            headerStyle: StylesGlobal.headerEmpty,
            headerTintColor: 'white',
        };
    };
    // #endregion

    // #region Component Lifecycle

    constructor(props) {
        super(props);
        this.props.navigation.setParams({ onGoBack: this.onGoBack });
        this.state = {
            selectedIndexActionSheet: actionsheetButtonCancelIndex,
            callingCode: '65',
            phoneNumber: props.user.phone_number,
            name: props.user.user_name,
            email: props.user.email,
            password: '',
            shouldShowErrorArray: [false, false, false, false],
            errorArray: [undefined, undefined, undefined, undefined],
            shouldEnableScroll: false
        };
        this.subjectEditUserProfileButton = new Subject();
    }

    componentDidMount() {
        if (Platform.OS == 'android') {
            BackHandler.addEventListener(EventListenerName.AndroidHardwareBackPress, this.onGoBack);
        }
        this.props.updateTabbarVisible(false);

        this.subjectEditUserProfileButton.subscribe({
            next: value => this.onPressButtonEditUserProfile()
        });
    }

    componentWillReceiveProps(nextProps) {
        const { isError, response, isUploadError, responseUpload } = nextProps;
        if (!isError && response && !this.props.response) {
            this.props.saveUser(response);
            this.onGoBack(true);
        }
        else if (isError && !this.props.response) {
            this.refs.toast.close();
            this.refs.toast.show(response.text);
        }

        if (!isUploadError && responseUpload && !this.props.responseUpload) {
            this.props.saveUser(responseUpload);
        }
        else if (isUploadError && !this.props.responseUpload) {
            this.refs.toast.close();
            this.refs.toast.show(responseUpload.text);
        }
    }

    render() {
        const { user, isLoading, isUploading } = this.props;
        const { phoneNumber, name, email, password, shouldShowErrorArray, errorArray, shouldEnableScroll } = this.state;
        return (
            <ImageBackground 
                style={styles.backgroundImage} 
                source={require('../../assets/images/bg.jpg')} 
                pointerEvents={!isLoading ? 'auto' : 'none'}
            >
                <KeyboardAwareScrollView
                    enableOnAndroid={true} // android:windowSoftInputMode="adjustPan"
                    innerRef={ref => {this.scroll = ref}}
                    style={styles.container}
                    contentContainerStyle={styles.scrollView}
                    keyboardOpeningTime={0}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={shouldEnableScroll}
                    // iOS only
                    onKeyboardWillShow={frame =>
                        this.setState({...this.state, shouldEnableScroll: true})
                    }
                    onKeyboardWillHide={frame =>
                        this.setState({...this.state, hideResults: true, shouldEnableScroll: false})
                    }
                    // Android only
                    onKeyboardDidShow={frame =>
                        this.setState({...this.state, shouldEnableScroll: true})
                    }
                    onKeyboardDidHide={frame =>
                        this.setState({...this.state, hideResults: true, shouldEnableScroll: false})
                    }
                    keyboardShouldPersistTaps='handled'
                >
                
                <TouchableOpacity
                    style={styles.logoContainer}
                    onPress={() => this.actionSheet.show()}
                >
                    <FastImage
                        style={[styles.avatarRounded, {backgroundColor: user.avatars && user.avatars.length > 0 ? 'black' : 'transparent'}]}
                        source={user.avatars && user.avatars.length > 0 ? {uri: URL_DOMAIN + user.avatars} : require('../../assets/images/ic_user_avatar.png')}
                    />
                </TouchableOpacity>
                
                <View style={styles.inputContainer} >
                    <ComponentCustomTextInput
                        onRef={ref => (this.textInputPhoneNumber = ref)}
                        // shouldAlignRight={true}
                        text={'+' + this.state.callingCode}
                        placeholderText={I18n.t('PhoneNumber')}
                        value={phoneNumber}
                        shouldShowError={shouldShowErrorArray[textInputPhoneNumberTag]}
                        errorText={errorArray[textInputPhoneNumberTag]}
                        keyboardType='phone-pad'
                        returnKeyType='next'
                        autoCapitalize='none'
                        onChangeText={text => this.validateTextInput(textInputPhoneNumberTag, text)}
                        onSubmitEditing={() => this.textInputName.focus()}
                    />

                    <ComponentCustomTextInput
                        onRef={ref => (this.textInputName = ref)}
                        // shouldAlignRight={true}
                        text={I18n.t('YourName')}
                        placeholderText={I18n.t('YourName')}
                        value={name}
                        shouldShowError={shouldShowErrorArray[textInputNameTag]}
                        errorText={errorArray[textInputNameTag]}
                        keyboardType='default'
                        returnKeyType='next'
                        autoCapitalize='words'
                        onChangeText={text => this.validateTextInput(textInputNameTag, text)}
                        onSubmitEditing={() => this.textInputEmail.focus()}
                    />
                    
                    <ComponentCustomTextInput
                        onRef={ref => (this.textInputEmail = ref)}
                        // shouldAlignRight={true}
                        editable={false}
                        text={I18n.t('Email')}
                        placeholderText={I18n.t('Email')}
                        value={email}
                        shouldShowError={shouldShowErrorArray[textInputEmailTag]}
                        errorText={errorArray[textInputEmailTag]}
                        keyboardType='email-address'
                        returnKeyType='next'
                        autoCapitalize='none'
                        onChangeText={text => this.validateTextInput(textInputEmailTag, text)}
                        onSubmitEditing={() => this.textInputPassword.focus()}
                    />
                
                    <ComponentCustomTextInput
                        onRef={ref => (this.textInputPassword = ref)}
                        // shouldAlignRight={true}
                        text={I18n.t('Password')}
                        placeholderText={I18n.t('Password')}
                        value={password}
                        iconColor={'white'}
                        shouldShowError={shouldShowErrorArray[textInputPasswordTag]}
                        errorText={errorArray[textInputPasswordTag]}
                        secureTextEntry={true}
                        returnKeyType='next'
                        autoCapitalize='none'
                        onChangeText={text => this.validateTextInput(textInputPasswordTag, text)}
                        onSubmitEditing={() => this.subjectEditUserProfileButton.next()}
                    />
                </View>

                <View style={styles.buttonContainer} >
                    <ComponentRoundedButton
                        style={styles.saveContainer}
                        buttonTitle={I18n.t('Save')}
                        buttonTitleColor={Colors.main}
                        onPress={() => this.subjectEditUserProfileButton.next()}
                    />
                </View>

                </KeyboardAwareScrollView >

                <ActionSheet
                    ref={(ref) => this.actionSheet = ref}
                    title={I18n.t('SelectPhoto')}
                    options={[I18n.t('Cancel'), I18n.t('TakePhoto'), I18n.t('ChooseFromLibrary')]}
                    cancelButtonIndex={actionsheetButtonCancelIndex}
                    onPress={this.onPressActionsheet}
                />

                { isLoading || isUploading ?
                    <View style={StylesGlobal.loadingView} >
                        <ActivityIndicator
                        size='large'
                        color={'white'}
                        animating={isLoading || isUploading}
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
            </ImageBackground>
        );
    }

    componentWillUnmount() {
        if (Platform.OS == 'android') {
            BackHandler.removeEventListener(EventListenerName.AndroidHardwareBackPress, this.onGoBack);
        }

        this.subjectEditUserProfileButton.unsubscribe();
        this.subjectEditUserProfileButton = undefined;
    }

    // #endregion

    // #region Methods

    onGoBack = (force = false) => {
        const { isLoading, isUploading } = this.props;
        if ((isLoading || isUploading) && force === false) { return true; }
        this.props.updateTabbarVisible(true);
        this.props.navigation.goBack();
        return true;
    }

    onPressActionsheet = (index) => {
        this.setState({...this.state, selectedIndexActionSheet: index});
        const options = {
            // cropperToolbarTitle: 'Move and Scale', // Android only
            hideBottomControls: true,
            showCropGuidelines: false,
            cropping: true,
            cropperCircleOverlay: true,
            width: cropImageMaxWidth,
            height: cropImageMaxHeight,
            compressImageQuality: 1,
            compressImageMaxWidth: compressImageMaxWidth,
            compressImageMaxHeight: compressImageMaxHeight,
            includeBase64: true,
            includeExif: true,
        }

        switch (index) {
            case actionsheetButtonTakePhotoIndex:
                this.onTakePhoto(options)
                break;
            case actionsheetButtonChoosePhotoFromLibraryIndex:
                this.onChoosePhotoFromLibrary(options)
                break;
        }
    }
    
    onTakePhoto(options) {
        const { user } = this.props;
        ImagePicker.openCamera(options)
        .then(image => {
            const payload = {
                id: user.id,
                source: image
            }
            this.props.postAPIUploadUserAvatarStart(payload);
        }).catch(e => console.log(e));
    }

    onChoosePhotoFromLibrary(options) {
        const { user } = this.props;
        ImagePicker.openPicker(options)
        .then(image => {
            const payload = {
                id: user.id,
                source: image
            }
            this.props.postAPIUploadUserAvatarStart(payload);
        }).catch(e => console.log(e));
    }

    onPressButtonEditUserProfile = () => {
        const { phoneNumber, name, email, password } = this.state;
        if (Platform.OS === 'ios') {
            this.scroll.props.scrollToPosition(0, 0);
        }
        
        const isValid = this.validateTextInput(textInputAllTag);
        if (isValid) {
            Keyboard.dismiss();
            const payload = {email: email, password: password, name: name, phonenumber: phoneNumber};
            this.props.postAPIUpdateUserStart(payload);
        }
    }

    validateTextInput = (textInputIndex, text = undefined) => {
        const { phoneNumber, name, email, password, shouldShowErrorArray, errorArray } = this.state;
        let newShouldShowErrorArray = shouldShowErrorArray;
        let newErrorArray = errorArray;

        switch(textInputIndex) {
            case textInputPhoneNumberTag: {
                const validateTextInputPhoneNumberResult = validateTextInputPhoneNumber(text);
                newShouldShowErrorArray[textInputPhoneNumberTag] = !validateTextInputPhoneNumberResult.isValid;
                newErrorArray[textInputPhoneNumberTag] = validateTextInputPhoneNumberResult.errorMessage;
                this.setState({...this.state, phoneNumber: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
                return validateTextInputPhoneNumberResult.isValid;
            }

            case textInputNameTag: {
                const validateTextInputNameResult = validateTextInputName(text);
                newShouldShowErrorArray[textInputNameTag] = !validateTextInputNameResult.isValid;
                newErrorArray[textInputNameTag] = validateTextInputNameResult.errorMessage;
                this.setState({...this.state, name: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
                return validateTextInputNameResult.isValid;
            }

            case textInputEmailTag: {
                const validateTextInputEmailResult = validateTextInputEmail(text);
                newShouldShowErrorArray[textInputEmailTag] = !validateTextInputEmailResult.isValid;
                newErrorArray[textInputEmailTag] = validateTextInputEmailResult.errorMessage;
                this.setState({...this.state, email: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
                return validateTextInputEmailResult.isValid;
            }

            case textInputPasswordTag: {
                const validateTextInputPasswordResult = validateTextInputPassword(text);
                newShouldShowErrorArray[textInputPasswordTag] = !validateTextInputPasswordResult.isValid;
                newErrorArray[textInputPasswordTag] = validateTextInputPasswordResult.errorMessage;
                this.setState({...this.state, password: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
                return validateTextInputPasswordResult.isValid;
            }

            default: {
                const validateTextInputPhoneNumberResult = validateTextInputPhoneNumber(phoneNumber);
                const validateTextInputNameResult = validateTextInputName(name);
                const validateTextInputEmailResult = validateTextInputEmail(email);
                let validateTextInputPasswordResult = validateTextInputPassword(password);
                if (password.trim().length === 0) {
                    validateTextInputPasswordResult.isValid = true;
                }
                newShouldShowErrorArray[textInputPhoneNumberTag] = !validateTextInputPhoneNumberResult.isValid;
                newErrorArray[textInputPhoneNumberTag] = validateTextInputPhoneNumberResult.errorMessage;
                newShouldShowErrorArray[textInputNameTag] = !validateTextInputNameResult.isValid;
                newErrorArray[textInputNameTag] = validateTextInputNameResult.errorMessage;
                newShouldShowErrorArray[textInputEmailTag] = !validateTextInputEmailResult.isValid;
                newErrorArray[textInputEmailTag] = validateTextInputEmailResult.errorMessage;
                newShouldShowErrorArray[textInputPasswordTag] = !validateTextInputPasswordResult.isValid;
                newErrorArray[textInputPasswordTag] = validateTextInputPasswordResult.errorMessage;
                this.setState({...this.state, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
                return validateTextInputPhoneNumberResult.isValid &&
                    validateTextInputNameResult.isValid &&
                    validateTextInputEmailResult.isValid &&
                    validateTextInputPasswordResult.isValid;
            }
        }
    }
    
    // #endregion

}

// #region Stylesheet
const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },

    container: {
        flex: 1,
    },

    scrollView: {
        flexGrow : 1, 
        justifyContent : 'center',
    },

    logoContainer: {
        flex: 1, 
        marginTop: padding,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    avatarRounded: {
        width: DefaultProps.avatarSize,
        height: DefaultProps.avatarSize,
        borderRadius: DefaultProps.avatarSize / 2,
    },

    inputContainer: {
        flex: 1,
        marginTop: padding,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    autoCompleteInput: {
        backgroundColor: 'transparent',
    },

    autoCompleteList: {
        margin: 0,
        paddingHorizontal: padding / 2,
    },

    autoCompleteItem: {
        marginVertical: padding / 2,
        color: 'black',
        fontSize: 14 * Devices.displayScale,
    },

    buttonContainer: {
        flex: 1,
        marginTop: padding,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    saveContainer: {
        marginBottom: padding,
        width: DefaultProps.buttonDefaultWidth,
        backgroundColor: 'white'
    },

});
// #endregion

// #region Redux
const mapStateToProps = (state) => ({
    user: state.app.user,
    isLoading: state.app.isLoading,
    isError: state.app.isError,
    response: state.app.response,
    isUploading: state.app.isUploading,
    isUploadError: state.app.isUploadError,
    responseUpload: state.app.responseUpload
});

function dispatchToProps(dispatch) {
    return bindActionCreators({
        saveUser,
        updateTabbarVisible,
        postAPIUpdateUserStart,
        postAPIUploadUserAvatarStart
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(ComponentEditUserProfile);
// #endregion