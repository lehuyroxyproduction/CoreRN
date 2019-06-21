import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';
import { ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_CONTRACTOR, ROLE_TRAINER } from '../../../constants/webServices.js';

//#region Constants
const padding = DefaultProps.defaultPadding;
const radius = 5 * Devices.displayScale;
//#endregion

class ComponentUserRole extends Component {

    //#region Component Lifecycle

    render() {
        const { style, textStyle, role } = this.props;
        return(
            <View 
                style={[styles.container, 
                {
                    backgroundColor: role === ROLE_SUPER_ADMIN ? 'red' :
                    role === ROLE_ADMIN ? 'red' :
                    role === ROLE_CONTRACTOR ? 'rgba(242, 153, 74, 0.75)' :
                    role === ROLE_TRAINER ? 'red':
                    null
                }, 
                style]} 
            >
                <Text style={[styles.text, textStyle]} >
                {
                    role === ROLE_SUPER_ADMIN ? I18n.t('SuperAdmin') :
                    role === ROLE_ADMIN ? I18n.t('Admin') :
                    role === ROLE_CONTRACTOR ? I18n.t('Contractor') :
                    role === ROLE_TRAINER ? I18n.t('Trainer'):
                    null
                }
                </Text>
            </View>
        );
    }

    //#endregion
};

//#region Stylesheet
const styles = StyleSheet.create({

    container: {
        paddingHorizontal: padding / 2,
        paddingVertical: padding / 4,
        borderRadius: radius,
        borderWidth: 0
    },

    text: {
        color: 'white',
        fontSize: 12 * Devices.displayScale,
        fontWeight: 'bold',
    }

});
//#endregion

export default ComponentUserRole;