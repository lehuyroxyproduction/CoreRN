import { Alert } from 'react-native'
import I18n from 'react-native-i18n'

type Buttons = Array<{
  text?: string,
  onPress?: ?Function,
  style?: string
}>

type Options = {
  cancelable?: ?boolean,
  onDismiss?: ?Function
}

export class AlertUtils extends Alert {
  static isShowing = false
  static defaultOptions = {
    cancelable: false,
    onDismiss: () => {
      // AlertUtils.isShowing = false;
    }
  }

  static alert(
    title: ?string = I18n.t('Alert_Title').toUpperCase(),
    message?: ?string,
    buttons?: Buttons,
    options?: Options = this.defaultOptions
  ) {
    try {
      if (!AlertUtils.isShowing) {
        if (buttons && buttons.length > 0) {
          for (let button of buttons) {
            const originalOnPress = button.onPress
            button.onPress = () => {
              AlertUtils.isShowing = false
              if (button.onPress) {
                originalOnPress()
              }
            }
          }
        } else {
          buttons = [
            {
              text: 'OK',
              onPress: () => {
                AlertUtils.isShowing = false
              }
            }
          ]
        }
        super.alert(title, message, buttons, options)
        AlertUtils.isShowing = true
      }
    } catch (error) {}
  }
}
