import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from 'react-native-scalable-image';
import { Devices, DefaultProps } from '../../../constants/constants.js';
import { NOTIFICATIONS_MAX_UNVIEW_COUNT } from '../../../constants/webServices.js';

//#region Constants
const padding = 7 * Devices.displayScale;
const radius = 5 * Devices.displayScale;
//#endregion

class ComponentNotificationsRing extends Component {

    //#region Component Lifecycle

    render() {
        const { style, iconColor, onPress, responseUnViewNotifications } = this.props;
        return(
            <TouchableOpacity 
                style={[styles.container, style]} 
                onPress={() => onPress ? onPress() : null}
            >
                <Image
                    style={{tintColor: iconColor}} // iOS required
                    tintColor={iconColor} // Android required
                    source={require('../../../assets/images/icon_notification.png')}
                    width={DefaultProps.iconHeaderNotificationWidth}
                />
                { responseUnViewNotifications > 0 ?
                    <Text style={styles.text} >{responseUnViewNotifications > NOTIFICATIONS_MAX_UNVIEW_COUNT ? `${NOTIFICATIONS_MAX_UNVIEW_COUNT}+` : `${responseUnViewNotifications}`}</Text>
                    :
                    null
                }
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

    text: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: padding,
        backgroundColor: 'white',
        borderRadius: radius,
        overflow: 'hidden',
        color: 'black',
        fontSize: 10 * Devices.displayScale,
        fontWeight: 'bold'
    }

});
//#endregion

//#region Redux
const mapStateToProps = (state) => ({
    responseUnViewNotifications: state.notifications.responseUnViewNotifications,
});
  
function dispatchToProps(dispatch) {
    return bindActionCreators({
        
    }, dispatch);
}
  
export default connect(mapStateToProps, dispatchToProps)(ComponentNotificationsRing);
//#endregion