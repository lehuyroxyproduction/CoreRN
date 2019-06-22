import React from 'react'
import { BackHandler, Keyboard, DeviceEventEmitter, Alert } from 'react-native'
import { Navigation } from 'react-native-navigation'
import store from 'store'
import { appActions, appSelectors } from 'reducers'
import { firebase } from 'services'
import I18n from 'react-native-i18n'

type Props = {}

export default Screen => {
  class WrappedScreen extends React.Component<Props> {
    constructor(props) {
      super(props)
      Navigation.events().bindComponent(this)
      global.componentId = this.props.componentId
    }

    componentDidMount() {
      this.navigationEventListener = Navigation.events().bindComponent(this)
      BackHandler.removeEventListener('hardwareBackPress')
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      // DeviceEventEmitter.
      // BackAndroid.addEventListener('backPress', this.handleBackPress)
      Navigation.setDefaultOptions({
        animations: {
          push: {
            waitForRender: true
          },
          showModal: {
            waitForRender: true
          }
        }
      })
    }

    componentWillUnmount() {
      this.navigationEventListener && this.navigationEventListener.remove()
      BackHandler.removeEventListener('hardwareBackPress')
      // BackAndroid.removeEventListener('backPress', this.handleBackPress)
    }

    componentDidAppear = ({ componentName }) => {
      firebase.analytics().setCurrentScreen(componentName)
    }

    // handleBackPress = () => {
    //   store.dispatch(appActions.setCurrentScreen(null))
    //
    //   this.pop()
    //   this.dismissModal()
    //   return true
    // }
    showAlertToExit = () => {
      Alert.alert(
        I18n.t('titleMessageExit'),
        I18n.t('contentMessageExit'),
        [{ text: 'OK', onPress: () => BackHandler.exitApp() }, { text: 'CANCEL', onPress: () => {} }],
        { cancelable: false }
      )
    }
    handleBackPress = () => {
      const currentScreen = appSelectors.getCurrentScreen(store.getState())
      if (currentScreen === null) {
        this.showAlertToExit()
      } else {
        this.pop()
      }
      return true
    }
    static options = passProps => {
      const options = Screen.options ? Screen.options(passProps) : {}

      const mergeOptions = {
        ...options
      }

      return mergeOptions
    }

    bindNavigationEvents = context => {
      Navigation.events().bindComponent(context)
    }
    push = ({ componentId: string = this.props.componentId, screen, passProps, options }): void => {
      const currentScreen = appSelectors.getCurrentScreen(store.getState())

      if (currentScreen !== componentId) {
        Navigation.push(componentId, {
          component: {
            name: screen,
            passProps: {
              ...passProps,
              previousComponentId: this.props.componentId
            },
            options
          }
        })
        store.dispatch(appActions.setCurrentScreen(componentId))
      }
    }

    pop = (callback = null) => {
      Keyboard.dismiss()
      Navigation.pop(this.props.componentId)
      global.componentId = this.props.previousComponentId
      store.dispatch(appActions.setCurrentScreen(null))
      callback && callback()
    }
    popToRoot = () => {
      Keyboard.dismiss()
      Navigation.popToRoot(this.props.componentId)
      global.componentId = this.props.previousComponentId
      store.dispatch(appActions.setCurrentScreen(null))
    }

    showModal = ({ screen, passProps, options }) => {
      const currentScreenId = appSelectors.getCurrentScreen(store.getState())

      if (currentScreenId !== screen) {
        Navigation.showModal({
          stack: {
            children: [
              {
                component: {
                  id: screen,
                  name: screen,
                  options,
                  passProps: {
                    ...passProps,
                    previousComponentId: this.props.componentId
                  }
                }
              }
            ],
            options: {
              topBar: {
                visible: false,
                drawBehind: true
              }
            }
          }
        })

        store.dispatch(appActions.setCurrentScreen(screen))
      }
    }
    dismissModal = () => {
      Navigation.dismissModal(this.props.componentId)

      global.componentId = this.props.previousComponentId

      store.dispatch(appActions.setCurrentScreen(null))
    }

    showDrawer = () => {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true,
            enabled: true
          }
        }
      })
    }

    hideDrawer = () => {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: false
          }
        }
      })

      store.dispatch(appActions.setCurrentScreen(null))
    }

    setStackRoot = ({ componentId = global.componentId, screen, passProps }) => {
      this.hideDrawer()

      Navigation.setStackRoot(componentId, {
        component: {
          name: screen,
          passProps
        }
      })
    }

    render() {
      return (
        <Screen
          {...this.props}
          push={this.push}
          pop={this.pop}
          showModal={this.showModal}
          dismissModal={this.dismissModal}
          showDrawer={this.showDrawer}
          hideDrawer={this.hideDrawer}
          setStackRoot={this.setStackRoot}
          bindNavigationEvents={this.bindNavigationEvents}
        />
      )
    }
  }

  return WrappedScreen
}
