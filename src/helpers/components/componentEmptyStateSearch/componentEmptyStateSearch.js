import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';
import { Devices, Colors, DefaultProps, DisplayScale } from '../../../constants/constants.js';
import { FromEventObservable } from 'rxjs/observable/FromEventObservable';

//#region Constants
const descriptionTextTop = 50 * Devices.displayScale;
const descriptionTextBottom = 20 * Devices.displayScale;
const textColor = 'rgb(130,130,130)';
const backButtonColor = 'rgb(79,79,79)';
//#endregion

class ComponentEmptyStateSearch extends Component {

    //#region Component Lifecycle

    render() {
        const { style, descriptionText, onPressBackButton } = this.props;
        return(
            <View style={[styles.container, style]} >
                <Text style={styles.descriptionText} >{descriptionText}</Text>
                <TouchableOpacity onPress={() => onPressBackButton ? onPressBackButton() : null} >
                    <Text style={styles.backButtonText} >{I18n.t('Back')}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //#endregion
};

//#region Stylesheet
const styles = StyleSheet.create({

    container: {
        width: Devices.width,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    descriptionText: {
        marginTop: descriptionTextTop,
        marginBottom: descriptionTextBottom,
        fontSize: 18 * Devices.displayScale,
        fontWeight: 'bold',
        color: textColor
    },

    backButtonText: {
        fontSize: 14 * Devices.displayScale,
        fontWeight: 'bold',
        color: backButtonColor
    }

});
//#endregion

// MARK: - PropTypes
ComponentEmptyStateSearch.propTypes = {
    style: PropTypes.any,
    descriptionText: PropTypes.string,
    onPressBackButton: PropTypes.func,
};
//#endregion

export default ComponentEmptyStateSearch;