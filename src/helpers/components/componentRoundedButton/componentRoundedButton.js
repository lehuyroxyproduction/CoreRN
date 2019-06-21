import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Devices, Colors } from '../../../constants/constants.js';

class ComponentRoundedButton extends Component {

    //#region Component Lifecycle

    render() {
        const { style, shouldDisabled, borderColor, borderRadius, buttonTitle, buttonTitleColor, buttonDisabledTitleColor } = this.props;
        return(
            <TouchableOpacity 
                style={[styles.container, style, borderColor ? {borderColor: borderColor} : null, borderRadius ? {borderRadius: borderRadius} : null]}
                disabled={shouldDisabled}
                onPress={() => this.props.onPress != undefined ? this.props.onPress() : null}
            >
                <Text style={[styles.text, {color: !shouldDisabled ? (buttonTitleColor != undefined ? buttonTitleColor : 'white') : buttonDisabledTitleColor != undefined ? buttonDisabledTitleColor : Colors.grayBlur}]} >{buttonTitle}</Text>
            </TouchableOpacity>
        );
    }

    //#endregion
};

//#region Stylesheet
const styles = StyleSheet.create({

    container: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'transparent',
        height: 34 * Devices.displayScale,
        borderRadius: 17 * Devices.displayScale,
        borderWidth: 1 * Devices.displayScale,
        borderColor: 'transparent',
        shadowOffset: { width: 0, height: 1 * Devices.displayScale },
        shadowOpacity: 0.2,
        shadowColor: 'black',
        elevation: 4
    },

    text: {
        fontSize: 13 * Devices.displayScale,
        fontWeight:'bold'
    },

});
//#endregion

// MARK: - PropTypes
ComponentRoundedButton.propTypes = {
    style: PropTypes.any,
    shouldDisabled: PropTypes.bool,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    buttonTitle: PropTypes.string,
    buttonTitleColor: PropTypes.string,
    buttonDisabledTitleColor: PropTypes.string,
    onPress: PropTypes.func,
};
//#endregion

export default ComponentRoundedButton;