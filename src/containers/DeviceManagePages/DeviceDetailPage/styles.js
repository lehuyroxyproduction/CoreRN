import { StyleSheet } from 'react-native';
import { Devices, Colors } from '../../../constants/constants';

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
  }
});

export default styles;
