import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Image from 'react-native-scalable-image'
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';
import PropTypes from 'prop-types';

//#region Constants
const padding = DefaultProps.defaultPadding;
const iconSize = 12 * Devices.displayScale;
//#endregion

class ComponentDropdownButton extends Component {

    //#region Component Lifecycle
    constructor(props) {
        super(props);
    }

    render() {
        const { style, text, onPress } = this.props;
        return(
            <TouchableOpacity 
                style={[styles.container, style]}
                onPress={() => onPress ? onPress() : null}
            >
                <Text style={styles.text} >{text}</Text>
                <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icon_triangledown.png')} 
                    width={iconSize} 
                />
            </TouchableOpacity>
        );
    }

    //#endregion
};

//#region StyleSheet
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderColor: '#E5E5E5',
        borderWidth: 1 * Devices.displayScale,
        borderRadius: 5 * Devices.displayScale
    },

    text: {
        marginHorizontal: padding,
        color: 'black',
        fontSize: 14 * Devices.displayScale,
    },

    icon: {
        marginRight: padding
    },

});
//#endregion

//#region PropTypes
ComponentDropdownButton.propTypes = {
    style: PropTypes.any,
    text: PropTypes.string,
    onPress: PropTypes.func,
};
//#endregion

export default ComponentDropdownButton;