import { StyleSheet } from 'react-native';
import { Devices, Colors } from '../../constants/constants';


export const padding = 10 * Devices.displayScale;
export const margin = 5 * Devices.displayScale;
const IMAGE_HEIGHT = 100 * Devices.displayScale;
const SCREEN_PADDING = 15 * Devices.displayScale;

const styles = StyleSheet.create({
  switchContain: {
    flexDirection: 'row',
    position: 'relative',
    height: 60 * Devices.displayScale,
  },

  actionsContain: {
    marginHorizontal: SCREEN_PADDING,
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    marginBottom: SCREEN_PADDING,
  },

  imageContainer: {
    width: '100%', 
    height: IMAGE_HEIGHT,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },

  infoContainer: {
    marginTop: SCREEN_PADDING,
    marginHorizontal: SCREEN_PADDING,
  },
  componentUserInformationAction: {
      marginBottom: padding,
      paddingTop: padding * 1.5,
      paddingBottom: padding * 1.5,
      fontWeight:'bold'
  },
  inforText:{
    margin:margin,
    paddingBottom:padding,
    paddingLeft:margin,
    fontWeight:'bold',
    fontStyle:'italic'
  }
});

export default styles;
