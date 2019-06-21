import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';
import { Devices, Colors, DefaultProps, DisplayScale } from '../../../constants/constants.js';
import { FromEventObservable } from 'rxjs/observable/FromEventObservable';

//#region Constants
const padding = 50 * DisplayScale.displayScale;
const descriptionTextTop = 34 * Devices.displayScale;
const descriptionTextBottom = 44 * Devices.displayScale;
const pullIconWidth = 30 * Devices.displayScale;
const pullLineWidth = 20 * Devices.displayScale;
const pullLineHeight = 2 * Devices.displayScale;
const textColor = 'rgb(130,130,130)';
const pullColor = 'rgb(166,166,166)';
//#endregion

class ComponentEmptyState extends Component {

    //#region Component Lifecycle

    render() {
        const { style, descriptionText } = this.props;
        return(
            <View style={[styles.container, style]} >
                { descriptionText ?
                    <Text style={styles.descriptionText} >{descriptionText}</Text>
                    : null
                }
                <Image
                    style={styles.pullIcon}
                    source={require('../../../assets/images/pull.png')}
                    width={pullIconWidth}
                />
                <View style={styles.pullLine} ></View>
                <Text style={styles.pullText} >{I18n.t('PullDownToRefresh')}</Text>
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
        fontSize: 13 * Devices.displayScale,
        fontWeight: 'bold',
        color: textColor
    },

    pullIcon: {
        tintColor: pullColor,
    },

    pullLine: {
        width: pullLineWidth,
        height: pullLineHeight,
        backgroundColor: pullColor
    },

    pullText: {
        marginTop: padding,
        fontSize: 13 * Devices.displayScale,
        color: pullColor
    }

});
//#endregion

// MARK: - PropTypes
ComponentEmptyState.propTypes = {
    style: PropTypes.any,
    descriptionText: PropTypes.string,
};
//#endregion

export default ComponentEmptyState;