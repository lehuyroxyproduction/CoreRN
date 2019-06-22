import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const getFontSize = size => {
  if (width > 375) {
    return size + 2
  }

  if (width > 360 && width <= 375) {
    return size + 1
  }

  if (width > 340) {
    return size
  }

  return size - 2
}
