import { StyleSheet, Platform } from 'react-native';
import { Devices } from '../../../constants/constants';

export const padding = 18 * Devices.displayScale;

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listDevice: {
    flex: 1,
  },
  headerRight:{
    flex:1,
    flexDirection:'row',
    borderColor:'white',
    // borderRadius:5,
    // borderStyle:'solid',
    // borderWidth:1
  },
  textHeader:{
    // margin:0,
    // padding:2,
    // marginRight:5
  },
  modal: {
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 160,
    width: 300,
    borderRadius:10,
    padding:5
  },
  tabsContainerStyle: {
    height:30
  },
  tabTextStyle: {
    fontWeight:'bold'
  },
  btn: {
    width:100,
    borderRadius:5,
    marginTop: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  text:{
    margin:10,
    marginTop:5,
    fontWeight:'bold',
    fontSize:20
  }
  
});
