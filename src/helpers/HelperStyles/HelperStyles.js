import { StyleSheet } from 'react-native';
import HelperDimens from './HelperDimens';
import HelperColors from './HelperColors';
import Devices from '../Devices';

const BUTTON_ACTION_SIZE = 30 * Devices.displayScale;
const BUTTON_INFO_SIZE = 18 * Devices.displayScale;

export default {
  global: StyleSheet.create({
    inline: {
      flexDirection: 'row',
    },
    1: { flex: 1 },
    2: { flex: 2 },
    3: { flex: 3 },
    4: { flex: 4 },
    5: { flex: 5 },
    6: { flex: 6 },
    7: { flex: 7 },
    8: { flex: 8 },
    9: { flex: 9 },
    10: { flex: 10 },
  }),

  // ========= TEXT =========
  text: StyleSheet.create({
    h1: { 
      fontSize: HelperDimens.text.h1,
      fontWeight: 'normal',
    },
    h2: {
      fontSize: HelperDimens.text.h2,
      fontWeight: 'normal',
    },
    h3: {
      fontSize: HelperDimens.text.h3,
      fontWeight: 'normal',
    },
    h4: {
      fontSize: HelperDimens.text.h4,
      fontWeight: 'normal',
    },
    h5: {
      fontSize: HelperDimens.text.h5,
      fontWeight: 'normal',
    },
    h6: {
      fontSize: HelperDimens.text.h6,
      fontWeight: 'bold',
      color: HelperColors.text.light.base
    },
    h7: {
      fontSize: HelperDimens.text.h7,
      fontWeight: 'bold',
      color: HelperColors.text.light.base
    },
    subtitle_1: {
      fontSize: HelperDimens.text.subtitle_1,
      fontWeight: 'normal',
    },
    subtitle_2: {
      fontSize: HelperDimens.text.subtitle_2,
      fontWeight: 'bold',
    },
    body_1: {
      fontSize: HelperDimens.text.body_1,
      fontWeight: 'normal',
    },
    body_2: {
      fontSize: HelperDimens.text.body_2,
      fontWeight: 'normal',
    },
    button: {
      fontSize: HelperDimens.text.button,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: HelperDimens.text.caption,
      fontWeight: 'normal',
    },
    overline: {
      fontSize: HelperDimens.text.overline,
      fontWeight: 'normal',
    },
  }),

  // ========= BUTTON =========
  button: StyleSheet.create({

    add: {
      tintColor: HelperColors.basic.green,
      width: BUTTON_ACTION_SIZE,
      height: BUTTON_ACTION_SIZE,
    },
    edit: {
      tintColor: HelperColors.basic.orange,
      width: BUTTON_ACTION_SIZE,
      height: BUTTON_ACTION_SIZE,
    },
    delete: {
      tintColor: HelperColors.basic.red,
      width: BUTTON_ACTION_SIZE,
      height: BUTTON_ACTION_SIZE,
    },
  }),

  // ========= LIST =========
  listItem: StyleSheet.create({
    container: {
      flexDirection: 'row',
    },

    // ---- left ------
    left: {
      paddingHorizontal: HelperDimens.spacing.large,
      justifyContent: 'center',
    },

    // ----- Body: contain center-right ----
    body: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: HelperDimens.spacing.large,
      borderBottomWidth: 1,
      borderColor: HelperColors.app.dividers,
    },

    // ---- right ------
    right: {
      flexDirection: 'row',
      paddingHorizontal: HelperDimens.spacing.large,
      alignItems: 'center',
    },
    right_button: {
      paddingVertical: HelperDimens.spacing.large,
      paddingHorizontal: HelperDimens.spacing.small,
    },

    // ---- center ------
    center: {
      flex: 1,
    },
  }),

  // ========= FORM =========
};
