import { StyleSheet } from 'react-native';
import { Devices, DefaultProps } from '../../../constants/constants';
import { HelperDimens } from '../../../helpers/HelperStyles';

export const padding = HelperDimens.spacing.medium;
export const containerAvatarHeight = 200 * Devices.displayScale;

const styles = StyleSheet.create({
  isAdmin: {
    flexDirection: 'row',
    position: 'relative',
    height: 60 * Devices.displayScale
  },

  actionsContain: {
    marginTop: 50 * Devices.displayScale,
    marginHorizontal: padding,
  },

  avatarContain: {
    alignItems: 'center',
    padding,
  },
  avatarRounded: {
    marginBottom: padding,
    width: DefaultProps.avatarSize,
    height: DefaultProps.avatarSize,
    borderRadius: DefaultProps.avatarSize / 2,
  },
});

export default styles;
