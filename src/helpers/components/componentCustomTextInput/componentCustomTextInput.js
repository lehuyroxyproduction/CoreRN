import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import Image from 'react-native-scalable-image';
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';

// MARK: - Constants
const inputHeight = 50 * Devices.displayScale;
const padding = DefaultProps.defaultPadding;
const iconWidth = 20 * Devices.displayScale;

class ComponentCustomTextInput extends Component {

    //#region Component Lifecycle
    constructor(props) {
        super(props);
        this.state = {
            shouldShowPassword: this.props.secureTextEntry,
        }
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        const { 
            style,
            inputHeight,
            textStyle, 
            inputStyle, 
            errorTextStyle,
            textAlign,
            text, 
            placeholderText,
            errorText,
            bottomLineColor, 
            iconColor, 
            shouldShowError,
            shouldAlignRight,
            editable,
            keyboardType, 
            secureTextEntry, 
            shouldHideEyeIcon,
            autoCorrect, 
            shouldShowClearButton,
            value, 
            returnKeyType, 
            autoCapitalize, 
            onChangeText, 
            onSubmitEditing,
            onClear,
            customElement
        } = this.props;
        return(
            <View style={[styles.container, style]} >
                <View style={[styles.inputContainer, bottomLineColor ? { borderBottomColor : bottomLineColor } : null, shouldShowError ? { borderBottomColor: 'red' } : null]} >
                    { text ? 
                        <Text style={[styles.text, textStyle]} >{text}</Text>
                        : null
                    }
                    <TextInput
                        ref={(ref) => this.textInput = ref}
                        style={[styles.input, inputStyle, {textAlign: shouldAlignRight ? 'right' : 'left'}, !text ? {textAlign: textAlign ? textAlign : 'center'} : null, shouldShowError ? { color: 'red' } : null, inputHeight ? {height: inputHeight} : null]}
                        value={value}
                        placeholder={placeholderText}
                        placeholderTextColor='gray'
                        underlineColorAndroid='transparent'
                        blurOnSubmit={false}
                        multiline={false}
                        editable={editable != undefined ? editable : (!customElement ? true : false)}
                        keyboardType={keyboardType}
                        secureTextEntry={this.state.shouldShowPassword}
                        autoCorrect={autoCorrect}
                        returnKeyType={returnKeyType}
                        autoCapitalize={autoCapitalize}
                        onChangeText={(text) => onChangeText ? onChangeText(text) : null}
                        onSubmitEditing={(event) => onSubmitEditing ? onSubmitEditing() : null}
                    />
                    { customElement ?
                        customElement : null
                    }
                    { secureTextEntry && !shouldHideEyeIcon ?
                        <TouchableOpacity 
                            style={styles.iconContainer}
                            onPress={() => this.setState({...this.state, shouldShowPassword: !this.state.shouldShowPassword})} >
                            <Image
                                style={iconColor ? {tintColor: iconColor} : null}
                                source={this.state.shouldShowPassword ? require('../../../assets/images/ic_eye.png') : require('../../../assets/images/ic_eye_disable.png')}
                                width={iconWidth}
                            />
                        </TouchableOpacity>
                        : shouldShowClearButton ? 
                        <TouchableOpacity 
                            style={styles.iconContainer}
                            onPress={() => {
                                this.textInput.clear(); 
                                onClear ? onClear() : null;
                            }} 
                        >
                            <Image
                                style={iconColor ? {tintColor: iconColor} : null}
                                source={require('../../../assets/images/icon_cleartext.png')}
                                width={iconWidth}
                            />
                        </TouchableOpacity>
                        : null 
                    }
                </View>
                { shouldShowError ?
                    <Text style={[styles.errorText, errorTextStyle ? errorTextStyle : null]} >{errorText ? errorText : I18n.t('ThisFieldIsRequired')}</Text>
                    : null
                }
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
    focus() {
        if (this.textInput) {
            this.textInput.focus();
        }
    }

    blur() {
        if (this.textInput) {
            this.textInput.blur();
        }
    }
    //#endregion

};

//#region Stylesheet
const styles = StyleSheet.create({

    container: {
        width: Devices.width - (padding * 4),
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    inputContainer: {
        height: inputHeight,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1 * Devices.displayScale,
        borderBottomColor: Colors.defaultTintColor,
    },

    text: {
        width: 100 * Devices.displayScale,
        color: Colors.defaultTintColor,
        fontSize: 14 * Devices.displayScale,
    },

    input: {
        flex: 1,
        padding: 0,
        color: Colors.defaultTintColor,
        fontSize: 14 * Devices.displayScale,
    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    errorText: {
        marginTop: padding,
        color: 'red',
        textAlign: 'center',
        fontSize: 14 * Devices.displayScale,
    },

});
//#endregion

//#region PropTypes
ComponentCustomTextInput.propTypes = {
    style: PropTypes.any,
    inputHeight: PropTypes.number,
    textStyle: PropTypes.any,
    inputStyle: PropTypes.any,
    errorTextStyle: PropTypes.any,
    textAlign: PropTypes.string,
    text: PropTypes.string,
    placeholderText: PropTypes.string,
    errorText: PropTypes.string,
    bottomLineColor: PropTypes.string,
    iconColor: PropTypes.string,
    shouldShowError: PropTypes.bool,
    shouldAlignRight: PropTypes.bool,
    editable: PropTypes.bool,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    shouldHideEyeIcon: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    shouldShowClearButton: PropTypes.bool,
    value: PropTypes.string,
    returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onClear: PropTypes.func,
    customElement: PropTypes.element,
};
//#endregion

export default ComponentCustomTextInput;