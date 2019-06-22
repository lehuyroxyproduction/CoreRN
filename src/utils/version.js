import { AsyncStorage } from 'react-native'
import VersionNumber from 'react-native-version-number'

import store from 'store'
import { actions } from 'redux/reducers/app'

export const getAppVersion = () => {
  // console.log('version_name', VersionNumber.appVersion)
  // console.log('version_code', VersionNumber.buildVersion)

  return {
    name: VersionNumber.appVersion || 0,
    code: VersionNumber.buildVersion || 0
  }
  //   console.log(VersionNumber.bundleIdentifier, true)
}
