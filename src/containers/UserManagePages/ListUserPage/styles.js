import { StyleSheet, Platform } from 'react-native';
import { Devices } from '../../../constants/constants';
import { HelperDimens, HelperColors } from '../../../helpers/HelperStyles';

export const padding = 18 * Devices.displayScale;
const SIZE_KEY = 15 * Devices.displayScale;

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  listUser: {
    flex: 1,
  },

  key: {
    tintColor: HelperColors.basic.amber,
    width: SIZE_KEY,
    height: SIZE_KEY,
  }
});
