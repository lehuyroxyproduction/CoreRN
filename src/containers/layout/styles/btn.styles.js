import {StyleSheet} from 'react-native'
import { Metrics } from '../../libs/themes'

export const styles = StyleSheet.create({
  button: {
    minHeight: Metrics.Spacing.small * 5,
    borderRadius: 8
  },
  touchStyle: {
    flex: 1,
    alignSelf: 'stretch'
  },
  circular: {
    width: Metrics.Spacing.xSmall * 14,
    height: Metrics.Spacing.xSmall * 14,
    borderRadius: Metrics.Spacing.xSmall * 7
  },
  buttonContent: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  textTitle:{
    marginHorizontal:Metrics.Spacing.xSmall * 3
  }
})