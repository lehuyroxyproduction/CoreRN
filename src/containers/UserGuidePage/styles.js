import { StyleSheet } from 'react-native';
import { Devices, Colors } from '../../constants/constants.js';
import { imageSize } from './UserGuidePage';
// #region StyleSheet
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    customSlide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: imageSize,
        marginBottom: 30 * Devices.displayScale,
    },
    text: {
        color: 'black',
        fontSize: 20 * Devices.displayScale,
        textAlign: 'center',
        marginBottom: 20 * Devices.displayScale,
    },
    button: {
        color: Colors.main,
        fontSize: 20 * Devices.displayScale,
        textAlign: 'center'
    }
});