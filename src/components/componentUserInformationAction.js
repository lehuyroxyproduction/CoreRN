import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Switch } from 'react-native';
import Image from 'react-native-scalable-image';
// import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import { Devices, Colors } from '../constants/constants.js';

// #region Constants
const padding = 10 * Devices.displayScale;
const iconDefaultWidth = 30 * Devices.displayScale;
// #endregion

class ComponentUserInformationAction extends Component {

    // #region Component Lifecycle
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        const { style, imageStyle, disableShadow, enableSwitch, switchValue, icon, title, content, image, onPress, onChangeSwitch } = this.props;
        return(
            <TouchableOpacity 
                style={[styles.container, disableShadow == true ? null : styles.containerShadow, style]} 
                onPress={() => onPress != undefined ? onPress() : null}
            >
                { icon != undefined ?
                    <Image
                        style={styles.icon}
                        source={
                            icon == 'calenda' ? require("../assets/images/ic_calenda.png") : 
                            icon == 'license' ? require("../assets/images/icons8-certificate-24.png"):
                            icon == 'software' ? require("../assets/images/ic_software.png") :
                            icon == 'userGuide' ? require('../assets/images/ic_user_guide.png') :
                            icon == 'serviceTel' ? require('../assets/images/ic_service_tel.png') :
                            icon == 'settings' ? require('../assets/images/ic_setting.png') :
                            icon == 'logout' ? require('../assets/images/ic_logout.png') :
                            require('../assets/images/ic_logout.png')
                        }
                        width={iconDefaultWidth}
                    />
                    : null
                }
                <Text style={styles.title} >{title}</Text>
                { enableSwitch == true ?
                    <Switch
                        style={styles.switch}
                        onTintColor={Colors.main}
                        value={switchValue}
                        onValueChange={(value) => onChangeSwitch != undefined ? onChangeSwitch(value) : null}
                    />
                    // : image != undefined?
                    // <FastImage
                    //     style={[styles.image, imageStyle]}
                    //     source={{uri: image}}
                    // />
                    : content != undefined ? 
                    <Text style={styles.content} numberOfLines={1} >{content}</Text>
                    : null
                }
            </TouchableOpacity>
        );
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    // #endregion
};

// #region Stylesheet
const styles =  StyleSheet.create({

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
        marginLeft: padding,
    },

    title: {
        marginLeft: padding * 2,
        marginRight: padding,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 14 * Devices.displayScale,
    },

    content: {
        flex: 1,
        marginRight: padding,
        color: Colors.main,
        fontSize: 14 * Devices.displayScale,
        textAlign: 'right',
    },

    switch: {
        position: 'absolute',
        right: 0,
        marginRight: padding,
    },

    image: {
       position: 'absolute',
       right: 0,
       marginRight: padding,
    },
    
});
// #endregion

// #region PropTypes
ComponentUserInformationAction.propTypes = {
    style: PropTypes.any,
    imageStyle: PropTypes.object,
    disableShadow: PropTypes.bool,
    enableSwitch: PropTypes.bool,
    switchValue: PropTypes.bool,
    icon: PropTypes.oneOf(['userGuide', 'serviceTel', 'settings', 'logout']),
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    onPress: PropTypes.func,
    onChangeSwitch: PropTypes.func,
};
// #endregion

export default ComponentUserInformationAction;