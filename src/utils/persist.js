import AsyncStorage from '@react-native-community/async-storage'

const getConfig = (whitelist: Array<string>) => {
  return {
    key: 'root',
    version: '1',
    storage: AsyncStorage,
    blacklist: ['app', 'ui'],
    whitelist
  }
}

export default { getConfig }
