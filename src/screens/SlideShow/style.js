import {StyleSheet , Dimensions} from 'react-native'
import {wp, hp, isAndroid} from 'constant'

import {Themes} from "themes";

export const styles = StyleSheet.create({
stylesContent:{
    flex: 1,
    flexDirection: 'column',
    justifyContent:"space-between"
},
stylesHeader:{
    height: hp(10) - Themes.Metrics.statusBar.height,
    marginRight:10,flexDirection: 'row',
    justifyContent:"space-between"
},
stylesHeaderTextLeft:{ },
stylesHeaderTextRight:{
    fontFamily:Themes.Fonts.face.bold,
    color:Themes.Colors.white,
    fontSize:17,
    
},
stylesMainContent:{
    paddingBottom:40,
    marginLeft:30
}, 
stylesMainTextTitle:{
    fontFamily:Themes.Fonts.face.bold,
    color:Themes.Colors.white,
    fontSize:36
},
stylesMainTextTitleHightLight:{
    fontFamily:Themes.Fonts.face.bold,
    color:Themes.Colors.electricBlue,
    fontSize:36
},
stylesMainContentDescription:{
    width:"75%"
},
styleMainContentDescriptionText:{
    fontFamily:Themes.Fonts.face.regular,
    color:Themes.Colors.white,
    fontSize:17,
    marginTop:16,
    opacity:0.7
},
stylesQuestion:{
    marginTop:20,
    flexDirection:"row"
},
stylesQuestionText:{
    color:Themes.Colors.white,
    fontSize:14,fontFamily:Themes.Fonts.face.regular
}
})