import { StyleSheet } from 'react-native';
import { Devices, DisplayScale, Colors } from '../../../constants/constants';

export default StyleSheet.create({

    container: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white',
        // height: 30 * DisplayScale,
        borderRadius: 20 * DisplayScale,
        borderWidth: 1 * DisplayScale,

        padding: 8 * DisplayScale,
    },

    text: {
        fontSize: 12 * DisplayScale,
    },

});