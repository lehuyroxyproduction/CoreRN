import { StyleSheet, Dimensions } from 'react-native'
import { wp, hp, isAndroid } from 'constant'

import { Colors, Metrics, Themes } from 'themes'

export const styles = StyleSheet.create({
  ModalContainner: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  Containner: {
    width: Metrics.screen.width * 0.67,
    backgroundColor: 'white',
    borderRadius: 8
  },
  Header: {
    padding: 30,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
