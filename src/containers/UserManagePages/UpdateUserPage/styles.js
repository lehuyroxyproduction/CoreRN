import { StyleSheet } from 'react-native';
import { Devices } from '../../../constants/constants';

const styles = StyleSheet.create({
  userName: {
    fontSize: 20 * Devices.displayScale,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  isAdmin: {
    flexDirection: 'row',
    position: 'relative',
    height: 60 * Devices.displayScale,
  },

  actionsContain: {
    marginTop: 50 * Devices.displayScale,
    marginHorizontal: 10 * Devices.displayScale,
  }
});

export default styles;
