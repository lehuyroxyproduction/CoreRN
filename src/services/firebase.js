import { Platform } from 'react-native'

import RNFirebase from 'react-native-firebase'

const firebase = Platform.select({
  ios: RNFirebase,
  android: RNFirebase,
})

export default firebase

export const withMessagingPermission = async callback => {
  try {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      // user has permissions
      return callback && (await callback())
    } else {
      // user doesn't have permission
      await firebase.messaging().requestPermission()
      return callback && (await callback())
    }
  } catch (error) {
    // Alert.alert('Permission required', error.message)
  }
}

export const logEvent = (...args) => firebase.analytics().logEvent(...args)
