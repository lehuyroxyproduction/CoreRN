import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import { Hoshi } from 'react-native-textinput-effects';
import Image from 'react-native-scalable-image';
import { Devices } from '../constants/constants.js';

// MARK: - Constants
const padding = 10 * Devices.displayScale;
const inputHeight = 34 * Devices.displayScale;
const iconWidth = 20 * Devices.displayScale;

class ComponentHoshiTextInput extends Component {

    // #region Component Lifecycle
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
            inputStyle,
            text,
            errorText,
            bottomLineColor, 
            iconColor, 
            shouldShowError,
            keyboardType, 
            secureTextEntry, 
            autoCorrect, 
            value, 
            returnKeyType, 
            autoCapitalize, 
            onChangeText, 
            onSubmitEditing,
        } = this.props;
        return(
            <View style={[styles.container, style]} >
                <View style={[styles.inputContainer, bottomLineColor ? { borderBottomColor : bottomLineColor } : null, shouldShowError ? { borderBottomColor: 'red' } : null]} >
                    <Hoshi
                        ref={(ref) => this.textInput = ref}
                        label={text}
                        borderColor={'transparent'}
                        height={inputHeight}
                        style={[styles.input, inputStyle]}
                        labelStyle={styles.text}
                        inputStyle={styles.text}
                        value={value}
                        underlineColorAndroid='transparent'
                        blurOnSubmit={false}
                        multiline={false}
                        editable={true}
                        keyboardType={keyboardType}
                        secureTextEntry={this.state.shouldShowPassword}
                        autoCorrect={autoCorrect}
                        returnKeyType={returnKeyType}
                        autoCapitalize={autoCapitalize}
                        onChangeText={(text) => onChangeText ? onChangeText(text) : null}
                        onSubmitEditing={(event) => onSubmitEditing ? onSubmitEditing() : null}
                    />
                    { secureTextEntry === true ?
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => this.setState({...this.state, shouldShowPassword: !this.state.shouldShowPassword})} 
                        >
                            <Image
                                style={iconColor ? {tintColor: iconColor} : null}
                                source={this.state.shouldShowPassword ? require('../assets/images/ic_eye.png') : require('../assets/images/ic_eye_disable.png')}
                                width={iconWidth}
                            />
                        </TouchableOpacity>
                        : null 
                    }
                </View>
                { shouldShowError ?
                    <Text style={styles.errorText} >{errorText ? errorText : I18n.t('ThisFieldIsRequired')}</Text>
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

    // #endregion

    // #region Methods
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
    // #endregion

};

// #region Stylesheet
const styles = StyleSheet.create({

    container: {
        marginBottom: padding,
        width: Devices.width - (padding * 4),
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1 * Devices.displayScale,
        borderBottomColor: 'white',
    },

    text: {
        color: 'white',
        fontSize: 14 * Devices.displayScale,
    },

    input: {
        flex: 1,
    },

    iconContainer: {
        position: 'absolute',
        right: 0,
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
// #endregion

// #region PropTypes
ComponentHoshiTextInput.propTypes = {
    style: PropTypes.any,
    textStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    text: PropTypes.string,
    errorText: PropTypes.string,
    bottomLineColor: PropTypes.string,
    iconColor: PropTypes.string,
    shouldShowError: PropTypes.bool,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    value: PropTypes.string,
    returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
};
// #endregion

export default ComponentHoshiTextInput;