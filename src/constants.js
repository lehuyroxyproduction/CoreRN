import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Platform } from 'react-native'
import _ from 'lodash'

export const HEADER_HEIGHT = 85
export const isAndroid = Platform.OS === 'android'
export const hp = value => {
  return heightPercentageToDP(value.toString() + '%')
}
export const wp = value => {
  return widthPercentageToDP(value.toString() + '%')
}
export const isNilOrEmpty = value =>{
  return _.isNil(value) || _.isEmpty(value)
}
