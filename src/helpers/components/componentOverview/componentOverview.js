import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';
import { 
    DEVICE_STATUS_OFFLINE, 
    DEVICE_STATUS_ONLINE, 
} from '../../../constants/webServices.js';

//#region Constants
const padding = DefaultProps.defaultPadding;
//#endregion

class ComponentOverview extends Component {

    //#region Component Lifecycle

    render() {
        const { style, title, detail, status } = this.props;
        return(
            <View style={[styles.container, style]} >
                <Text style={styles.text} >{title}</Text>
                <View style={styles.detail} >
                    <Text style={styles.text} >{detail}</Text>
                    { status ?
                        <View style={[styles.iconLightContainer, {backgroundColor: status === DEVICE_STATUS_ONLINE ? Colors.iconOnlineBorderColor : Colors.iconOfflineBorderColor}]} >
                            <View style={[styles.iconLight, {backgroundColor: status === DEVICE_STATUS_ONLINE ? Colors.iconOnlineBackgroundColor : Colors.iconOfflineBackgroundColor}]} />
                        </View>
                        : null
                    }
                </View>
            </View>
        );
    }

    //#endregion
};

//#region Stylesheet
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        backgroundColor: Colors.gold,
        padding: padding,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    text: {
        color: 'black',
        fontSize: 14 * Devices.displayScale,
    },

    detail: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconLightContainer : {
        marginLeft: padding,
        width: DefaultProps.iconLightContainerSize * 1.5, 
        height: DefaultProps.iconLightContainerSize * 1.5,
        borderRadius: DefaultProps.iconLightContainerSize * 1.5 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconLight : {
        width: DefaultProps.iconLightSize * 1.5, 
        height: DefaultProps.iconLightSize * 1.5,
        borderRadius: DefaultProps.iconLightSize * 1.5 / 2,
    },

});
//#endregion

export default ComponentOverview;