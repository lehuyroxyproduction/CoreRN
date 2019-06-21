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
});
