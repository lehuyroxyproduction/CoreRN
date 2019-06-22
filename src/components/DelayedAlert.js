/**
 * This component display alerts after a certain amount of time.
 * This is needed in case alert is messing up with react-native-navigation.
 */
import { Alert } from 'react-native'

export default {
  alert: (...args) => {
    setTimeout(() => Alert.alert(...args), 200)
  }
}
