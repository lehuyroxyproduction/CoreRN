import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-scalable-image';
import { Devices } from '../../../constants/constants.js';

//#region Constants
const iconWidthDefault = 30 * Devices.displayScale;
//#endregion

class ComponentRoundedImageButton extends Component {

    //#region Component Lifecycle

    render() {
        const { style, iconWidth, iconColor, icon, onPress } = this.props;
        return(
            <TouchableOpacity 
                style={[styles.container, style]} 
                onPress={() => onPress ? onPress() : null}
            >
                <Image
                    style={[{borderRadius: iconWidth / 2}, iconColor ? {tintColor: iconColor} : null]}
                    source={
                        icon === 'notification' ? require('../../../assets/images/icon_notification.png') :
                        icon === 'avatar' ? require('../../../assets/images/avatar.png') :
                        icon === 'arrowdown' ? require('../../../assets/images/icon_arrowdown.png') :
                        icon === 'arrowup' ? require('../../../assets/images/icon_arrowup.png') :
                        icon === 'star' ? require('../../../assets/images/icon_star.png') :
                        icon === 'star_empty' ? require('../../../assets/images/icon_star_empty.png') :
                        icon === 'trash' ? require('../../../assets/images/trash.png') :
                        require('../../../assets/images/avatar.png')
                    }
                    width={iconWidth ? iconWidth : iconWidthDefault}
                />
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
    },

});
//#endregion

//#region PropTypes
ComponentRoundedImageButton.propTypes = {
    style: PropTypes.any,
    iconWidth: PropTypes.number,
    iconColor: PropTypes.string,
    icon: PropTypes.oneOf(['notification', 'avatar', 'arrowdown', 'arrowup', 'star', 'star_empty', 'trash']),
    onPress: PropTypes.func,
};
//#endregion

export default ComponentRoundedImageButton;