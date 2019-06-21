import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Image from 'react-native-scalable-image'
import { Devices, Colors, SunStyles } from '../../constants/constants.js';
import PropTypes from 'prop-types';

//#region Constants
const iconSize = 10 * Devices.displayScale;
//#endregion

type Props = {
    style: PropTypes.style, 
    text: Text, 
    onPress: PropTypes.func, 
    disable: boolean
};
class DropDownButton extends Component<Props> {
    

    //#region Component Lifecycle
    constructor(props) {
        super(props);
    }

    render() {
        const { style, text, onPress, disable } = this.props;

        if (!disable) {
            // Enable
            return(
                <TouchableOpacity 
                    style={[styles.container, SunStyles.border_bottom, style]}
                    onPress={() => onPress ? onPress() : null} 
                > 
                    <Text style={styles.text} >{text}</Text>
                    <Image
                        style={styles.icon}
                        source={require('../../assets/images/icon_triangledown.png')} 
                        width={iconSize} 
                    />
                </TouchableOpacity>
            );
        } else {
            // Disable
            return(
                <View 
                    style={[styles.container, SunStyles.border_bottom, style]}
                > 
                    <Text style={styles.text_disable} >{text}</Text>
                    <Image
                        style={styles.icon}
                        source={require('../../assets/images/icon_triangledown.png')} 
                        width={iconSize} 
                    />
                </View>
            );
        }
    }

    //#endregion
};

//#region StyleSheet
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 0,
        margin: 0,
    },

    text: {
        color: 'black',
        fontSize: 15 * Devices.displayScale,
        marginBottom: 5 * Devices.displayScale
    },

    text_disable: {
        color: Colors.grayBlur,
        fontSize: 15 * Devices.displayScale,
        marginBottom: 5 * Devices.displayScale
    },

    icon: {
        
    },

});
//#endregion

//#region PropTypes
DropDownButton.propTypes = {
    style: PropTypes.any,
    text: PropTypes.string,
    onPress: PropTypes.func,
};
//#endregion

export {DropDownButton};