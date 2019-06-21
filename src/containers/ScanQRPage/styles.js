import { StyleSheet } from 'react-native';
import { Devices, Colors } from '../../constants/constants.js';
import { rectHeight, rectWidth, rectSize, padding } from './ScanQRPage.js';
// MARK: - StyleSheet
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    zeroContainer: {
        flex: 0,
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    cameraMarker: {
        width: Devices.width,
        height: Devices.height,
        backgroundColor: 'transparent',
        borderColor: Colors.blackBlur,
        borderTopWidth: rectHeight,
        borderBottomWidth: rectHeight,
        borderLeftWidth: rectWidth,
        borderRightWidth: rectWidth,
    },
    scanBar: {
        width: rectSize - (padding * 2),
        height: 2 * Devices.displayScale,
        alignSelf: 'center'
    },
    finder:{
        opacity:0.3
    }
});