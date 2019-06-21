import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';

//#region Constants
const padding = 250 * Devices.displayScale;
//#endregion

class ComponentLoading extends Component {

    //#region Component Lifecycle

    render() {
        const { style, marginTop } = this.props;
        return(
            <View style={[styles.container, style]} >
                <Image
                    style={[styles.loadingIcon, marginTop ? {marginTop: marginTop} : null]}
                    source={require('../../../assets/images/loading.gif')}
                    width={DefaultProps.loadingIconSize}
                />
            </View>
        );
    }

    //#endregion
};

//#region Stylesheet
const styles = StyleSheet.create({

    container: {
        width: Devices.width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    loadingIcon: {
        marginTop: padding
    },

});
//#endregion

// MARK: - PropTypes
ComponentLoading.propTypes = {
    style: PropTypes.any,
};
//#endregion

export default ComponentLoading;