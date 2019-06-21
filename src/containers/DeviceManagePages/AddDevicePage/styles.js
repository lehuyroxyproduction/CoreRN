import { StyleSheet } from 'react-native';
import { Devices, Colors } from '../../../constants/constants';

const styles = StyleSheet.create({
  switchContain: {
    flexDirection: 'row',
    position: 'relative',
    height: 60 * Devices.displayScale,
  },

  actionsContain: {
    marginTop: 50 * Devices.displayScale,
    marginHorizontal: 10 * Devices.displayScale,
  },
});

export default styles;
