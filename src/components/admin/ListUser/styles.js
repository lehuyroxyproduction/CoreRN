import {StyleSheet , Dimensions} from 'react-native'
import { Colors,Devices,Fonts } from "../../../constants/constants";

export const styles=StyleSheet.create({
    header:{
        backgroundColor:Colors.main,
        height:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:Devices.width
       },
    HeaderBodyTxt:{
        fontFamily:'Roboto',
        textAlign:'center',
        // fontWeight:'',
        textAlignVertical: "center",
        fontSize:20,
        // margin:5,
        padding:0,
        color:'#4A4A4A'
        },
    iconHeader:{
        width:30,
        height:30,
        margin:10
        },
    viewCartSubTotal:{
        padding:15,
        backgroundColor:Colors.main
    },
    viewCartInfor:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    txtCartInfor:{
        color:Colors.grayButton,
        fontFamily:Fonts.RobotoMedium,
        fontSize:18,
        letterSpacing:0.5
    },
    viewPRcode:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:5
    },
    txtPRcode:{
        color:Colors.mainLine,
        fontFamily:Fonts.RobotoMedium,
        fontSize:18,
        letterSpacing:0.5
    },
    viewFooter:{
        height:50,
        backgroundColor:Colors.mainLine,
        justifyContent:'center'
    },
    touchFooter:{
        paddingLeft:10,
        paddingRight:20 ,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    txtFooter:{
        fontFamily:Fonts.RobotoBold,
        color:Colors.txtWhite,
        fontSize:19
    },
    viewTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:50,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:Colors.main,
        marginBottom:5
    },
    txtTitle:{
        color:Colors.txtBlack,
        fontFamily:Fonts.RobotoMedium,
        fontSize:18,
        letterSpacing:0.5,
        textAlignVertical:'center'
    },
    btnSelectDish:{
        width: (((Devices.width*0.95)*0.6)-((((Devices.width*0.95)*0.4)-((Devices.width*0.95)*0.32))))/2,
    },
    imageDish:{
        width:60,
        height:60,
        borderRadius:5,
    },
    containerDish:{
        // height:80,
        padding:20,
        width:Devices.width,
        flexDirection:'row',
        marginBottom:10,
        backgroundColor:Colors.mainWhite,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
          }
})