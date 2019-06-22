import DeviceInfo from 'react-native-device-info'
import * as R from 'ramda'
import { reducerFactory } from './reducerFactory'
import { STATUS_BAR_STYLE } from 'constant'
import { PixelRatio, StatusBar } from 'react-native'
import numeral from 'numeral'


export { reducerFactory }

export const isFalse = value => value === false

export const isTrue = value => value === true

export const isTrueOrNil = R.complement(isFalse)

export const isEmailValid = email => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(String(email).toLowerCase())
}
export const hasNotch = DeviceInfo.hasNotch()
export const statusBarStyle =
  (hasNotch && STATUS_BAR_STYLE.DARK) || STATUS_BAR_STYLE.LIGHT
export const isIphoneX = DeviceInfo.getModel() === 'iPhone X'
export const hasBottomBar =
  DeviceInfo.getModel() === 'iPhone X' ||
  DeviceInfo.getModel() === 'iPhone XS Max' ||
  DeviceInfo.getModel() === 'iPhone XS'
export const configStatusBar = barStyle => {
  StatusBar.setBackgroundColor('transparent', false)
  StatusBar.setTranslucent(true)
  StatusBar.setBarStyle(barStyle, false)
}
export const formatNumber = (number) => numeral(number).format('0,0')
export const urlValid = (url) => {
  const pattern = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
  return pattern.test(url)
}
export function createUUID () {
  let dt = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}


