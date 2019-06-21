import { StyleSheet } from 'react-native';
import { Devices, Colors, DefaultProps } from '../../constants/constants.js';

export const padding = 10 * Devices.displayScale;
export const containerAvatarHeight = 200 * Devices.displayScale;
// #region Stylesheet

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvatar: {
        height: containerAvatarHeight,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.main,
        paddingTop: 20 * Devices.displayScale,
    },
    avatarRounded: {
        marginBottom: padding,
        width: DefaultProps.avatarSize,
        height: DefaultProps.avatarSize,
        borderRadius: DefaultProps.avatarSize / 2,
    },
    textUserName: {
        marginLeft: padding,
        marginRight: padding,
        color: 'white',
        fontSize: 15 * Devices.displayScale,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        marginTop: padding,
    },
    componentUserInformationAction: {
        marginBottom: padding,
        paddingTop: padding * 1.5,
        paddingBottom: padding * 1.5,
    }
});