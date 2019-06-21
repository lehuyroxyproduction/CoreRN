import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import FastImage from 'react-native-fast-image';
import Image from 'react-native-scalable-image';
import ComponentCustomTextInput from '../../reuseable/componentCustomTextInput/componentCustomTextInput.js';
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';
import { validateTextInputName, validateTextInputEmail, validateTextInputPhoneNumber } from '../../../helpers/helperString/helperString.js';
import { DEFAULT_CALLING_CODE, URL_IMAGE_DOMAIN } from '../../../constants/webServices.js';

//#region Constants
const padding = DefaultProps.defaultPadding;
const iconWidth = 100 * Devices.displayScale;
const iconCameraWidth = 30 * Devices.displayScale;
const textInputAllTag = -1;
const textInputNameTag = 0;
const textInputEmailTag = 1;
const textInputPhoneNumberTag = 2;
//#endregion

class ComponentViewAndEditProfile extends Component {

    //#region Component Lifecycle
    
    constructor(props) {
        super(props);
        this.state = {
            name: props.user.name,
            email: props.user.email,
            phoneNumber: props.user.phonenumber,
            shouldShowErrorArray: [false, false, false],
            errorArray: [undefined, undefined, undefined],
        }
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        const { style, isEditMode, onChangeHeight, user, onPressUserAvatar } = this.props;
        const { name, email, phoneNumber, shouldShowErrorArray, errorArray } = this.state;
        return (
            <View 
                style={[styles.container, style]}
                onLayout={(event) => {
                    const {x, y, width, height} = event.nativeEvent.layout;
                    onChangeHeight ? onChangeHeight(height) : null;
                }}
            >
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={() => onPressUserAvatar ? onPressUserAvatar() : null}
                >
                    <FastImage
                        style={[styles.avatar, {backgroundColor: user.avatar && user.avatar.length > 0 ? 'black' : 'transparent'}]}
                        source={user.avatar && user.avatar.length > 0 ? {uri: URL_IMAGE_DOMAIN + user.avatar} : require('../../../assets/images/avatar.png')}
                    />
                    { isEditMode ?
                        <View style={styles.iconCamera} >
                            <Image
                                style={{tintColor: Colors.main}}
                                source={require('../../../assets/images/camera.png')}
                                width={iconCameraWidth}
                            />
                        </View>
                        : null
                    }
                </TouchableOpacity>
                <View style={styles.contentContainer} >
                    { !isEditMode ?
                        <Text style={styles.textNameStyle} >{user.name}</Text> :
                        <ComponentCustomTextInput
                            onRef={ref => (this.textInputName = ref)}
                            inputStyle={styles.inputNameStyle}
                            placeholderText={I18n.t('YourName')}
                            value={name}
                            bottomLineColor={'black'}
                            errorTextStyle={styles.errorTextStyle}
                            shouldShowError={shouldShowErrorArray[textInputNameTag]}
                            errorText={errorArray[textInputNameTag]}
                            keyboardType='default'
                            returnKeyType='next'
                            autoCapitalize='none'
                            onChangeText={text => this.validateTextInput(textInputNameTag, text)}
                            onSubmitEditing={() => this.textInputEmail.focus()}
                        />
                    }
                    { !isEditMode ?
                        <Text style={styles.textStyle} >{user.email}</Text> :
                        <ComponentCustomTextInput
                            onRef={ref => (this.textInputEmail = ref)}
                            inputStyle={styles.inputStyle}
                            placeholderText={I18n.t('Email')}
                            value={email}
                            bottomLineColor={'black'}
                            errorTextStyle={styles.errorTextStyle}
                            shouldShowError={shouldShowErrorArray[textInputEmailTag]}
                            errorText={errorArray[textInputEmailTag]}
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCapitalize='none'
                            onChangeText={text => this.validateTextInput(textInputEmailTag, text)}
                            onSubmitEditing={() => this.textInputPhoneNumber.focus()}
                        />
                    }
                    { !isEditMode ?
                        <Text style={styles.textStyle} >{`+${DEFAULT_CALLING_CODE}${user.phonenumber}`}</Text> :
                        <ComponentCustomTextInput
                            onRef={ref => (this.textInputPhoneNumber = ref)}
                            inputStyle={styles.inputStyle}
                            placeholderText={I18n.t('PhoneNumber')}
                            value={phoneNumber}
                            bottomLineColor={'black'}
                            errorTextStyle={styles.errorTextStyle}
                            shouldShowError={shouldShowErrorArray[textInputPhoneNumberTag]}
                            errorText={errorArray[textInputPhoneNumberTag]}
                            keyboardType='phone-pad'
                            returnKeyType='done'
                            autoCapitalize='none'
                            onChangeText={text => this.validateTextInput(textInputPhoneNumberTag, text)}
                            onSubmitEditing={() => this.validateAllTextInput()}
                        />
                    }
                </View>
            </View>
        );
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    //#endregion

    //#region Methods

    validateAllTextInput = () => {
        return this.validateTextInput(textInputAllTag);
    }

    validateTextInput = (textInputIndex, text = undefined) => {
        const { name, email, phoneNumber, shouldShowErrorArray, errorArray } = this.state;
        let newShouldShowErrorArray = shouldShowErrorArray;
        let newErrorArray = errorArray;
    
        switch(textInputIndex) {
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

            case textInputPhoneNumberTag: {
                const validateTextInputPhoneNumberResult = validateTextInputPhoneNumber(text);
                newShouldShowErrorArray[textInputPhoneNumberTag] = !validateTextInputPhoneNumberResult.isValid;
                newErrorArray[textInputPhoneNumberTag] = validateTextInputPhoneNumberResult.errorMessage;
                this.setState({...this.state, phoneNumber: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
                return validateTextInputPhoneNumberResult.isValid;
            }
        
            default: {
                const validateTextInputNameResult = validateTextInputName(name);
                const validateTextInputEmailResult = validateTextInputEmail(email);
                const validateTextInputPhoneNumberResult = validateTextInputPhoneNumber(phoneNumber);
                newShouldShowErrorArray[textInputNameTag] = !validateTextInputNameResult.isValid;
                newErrorArray[textInputNameTag] = validateTextInputNameResult.errorMessage;
                newShouldShowErrorArray[textInputEmailTag] = !validateTextInputEmailResult.isValid;
                newErrorArray[textInputEmailTag] = validateTextInputEmailResult.errorMessage;
                newShouldShowErrorArray[textInputPhoneNumberTag] = !validateTextInputPhoneNumberResult.isValid;
                newErrorArray[textInputPhoneNumberTag] = validateTextInputPhoneNumberResult.errorMessage;
                this.setState({...this.state, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
                return validateTextInputNameResult.isValid && validateTextInputEmailResult.isValid && validateTextInputPhoneNumberResult.isValid;
            }
        }
    }

    getCurrentState = () => {
        return this.state;
    }

    //#endregion

}

//#region StyleSheet
const styles = StyleSheet.create({

    container: {
        alignItems:'center',
    },

    avatarContainer: {
        marginTop: padding * 2,
    },

    avatar: {
        width: iconWidth,
        height: iconWidth,
        borderRadius: iconWidth / 2
    },

    iconCamera: {
        position: 'absolute',
        bottom: 0,
        right: padding / 2,
        backgroundColor: 'white',
        borderRadius: iconCameraWidth / 2
    },

    contentContainer: {
        alignItems:'center',
        marginBottom: padding * 2,
    },

    textNameStyle: {
        color: 'black',
        fontSize: 20 * Devices.displayScale,
        fontWeight: 'bold',
        marginVertical: padding / 2
    },

    textStyle: {
        color: 'black',
        fontSize: 15 * Devices.displayScale,
        marginVertical: padding / 2
    },

    inputNameStyle: {
        color: 'black',
        fontSize: 20 * Devices.displayScale,
        fontWeight: 'bold'
    },

    inputStyle: {
        color: 'black',
        fontSize: 15 * Devices.displayScale
    },

    errorTextStyle: {
        marginTop: 0,
        fontSize: 15 * Devices.displayScale,
        fontWeight: 'normal'
    }
    
});
//#endregion

//#region Redux
const mapStateToProps = (state) => ({
    user: state.app.user,
});

function dispatchToProps(dispatch) {
    return bindActionCreators({
        // saveUser
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(ComponentViewAndEditProfile);
//#endregion