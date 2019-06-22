import { Platform, Keyboard } from 'react-native'

import store from 'store'
import { actions } from 'reducers/app'

const { showEvent, hideEvent } = Platform.select({
  ios: { showEvent: 'keyboardWillShow', hideEvent: 'keyboardWillHide' },
  android: { showEvent: 'keyboardDidShow', hideEvent: 'keyboardDidHide' }
})

const onChange = height => {
  store.dispatch(actions.updateKeyboard(height))
  if (height > 0) {
    store.dispatch(actions.updateDeviceKeyboardHeight(height))
  }
}

const listenKeyboard = () => {
  Keyboard.addListener(showEvent, e => onChange(e.endCoordinates.height))
  Keyboard.addListener(hideEvent, () => onChange(0))
}

export default listenKeyboard
