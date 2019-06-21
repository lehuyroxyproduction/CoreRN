import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-scalable-image';
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';

//#region Constants
const padding = DefaultProps.defaultPadding;
const iconWidth = 30 * Devices.displayScale;
//#endregion

class ComponentCustomButton extends Component {

    //#region Component Lifecycle

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        const { style, titleColor, disableShadow, icon, title, onPress } = this.props;
        return(
            <TouchableOpacity 
                style={[styles.container, disableShadow == true ? null : styles.containerShadow, style]} 
                onPress={() => onPress ? onPress() : null}
            >
                { icon != undefined ?
                    <Image
                        style={styles.icon}
                        source={
                            icon === 'icon-key' ? require('../../../assets/images/icon-key.png') :
                            icon === 'icon-book' ? require('../../../assets/images/icon-book.png') :
                            icon === 'icon-feedback' ? require('../../../assets/images/icon-feedback.png') :
                            icon === 'icon-info' ? require('../../../assets/images/icon-info.png') :
                            icon === 'icon-logout' ? require('../../../assets/images/icon-logout.png') :
                            icon === 'icon-access-log' ? require('../../../assets/images/icon-access-log.png') :
                            require('../../../assets/images/icon-key.png')
                        }
                        width={iconWidth}
                    />
                    : null
                }
                <Text style={[styles.title, titleColor ? {color: titleColor} : null]} >{title}</Text>
            </TouchableOpacity>
        );
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    //#endregion

};

//#region StyleSheet
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: 'white',
    },

    containerShadow: {
        borderWidth: 0.1 * Devices.displayScale,
        shadowOffset: { width: 0, height: 1 * Devices.displayScale },
        shadowOpacity: 0.2,
        shadowColor: 'black',
        elevation: 4
    },

    icon: {
        marginHorizontal: padding,
    },

    title: {
        marginHorizontal: padding,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 15 * Devices.displayScale,
    },
    
});
//#endregion

//#region PropTypes
ComponentCustomButton.propTypes = {
    style: PropTypes.any,
    titleColor: PropTypes.string,
    disableShadow: PropTypes.bool,
    icon: PropTypes.oneOf(['icon-key', 'icon-book', 'icon-feedback', 'icon-info', 'icon-logout', 'icon-access-log']),
    title: PropTypes.string,
    onPress: PropTypes.func,
};
//#endregion

export default ComponentCustomButton;