import {StyleSheet , Dimensions} from 'react-native'
import { Colors,Devices,Fonts, wp } from "../../../constants/constants";

export const styles=StyleSheet.create({
    itemList:{
        height:60,
        padding:5,
        marginHorizontal:10,
        marginBottom:10,
        backgroundColor:Colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    }
})