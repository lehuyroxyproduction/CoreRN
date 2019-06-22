import React from 'react'
import { Alert, BackHandler, Keyboard } from 'react-native'
import { Navigation } from 'react-native-navigation'
import store from 'store'
import { appActions, appSelectors } from 'reducers'
import { firebase } from 'services'

type Props = {}

export default Screen => {
  return class WrappedScreen extends React.Component<Props> {
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
        'Thoát ứng dụng ?',
        'Bạn có chắc chắn muốn thoát?',
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
        this.hideDrawer()
        this.dismissModal()
      }
      return true
    }
    static options = passProps => {
      const options = Screen.options ? Screen.options(passProps) : {}

      return {
        ...options
      }

      // return mergeOptions
    }

    bindNavigationEvents = context => {
      Navigation.events().bindComponent(context)
    }
    push = ({ componentId = this.props.componentId, screen, passProps, options }): void => {
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

    pop = () => {
      Keyboard.dismiss()
      Navigation.pop(this.props.componentId)
      global.componentId = this.props.previousComponentId
      store.dispatch(appActions.setCurrentScreen(null))
    }
    popToRoot = () => {
      Keyboard.dismiss()
      Navigation.popToRoot(this.props.componentId)
      global.componentId = this.props.previousComponentId
      store.dispatch(appActions.setCurrentScreen(null))
    }

    showModal = ({ screen, passProps, options }) => {
      const currentScreenId = appSelectors.getCurrentScreen(store.getState())
      console.log('Show Modal', currentScreenId, screen)
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
            ]
          }
        })

        store.dispatch(appActions.setCurrentScreen(screen))
      }
    }
    dismissModal = () => {
      Navigation.dismissModal(this.props.componentId)

      global.componentId = this.props.previousComponentId

      store.dispatch(appActions.setCurrentScreen(this.props.previousComponentId))
      // store.dispatch(appActions.setCurrentScreen(null))
    }

    showDrawer = () => {
      Navigation.mergeOptions('sideMenu', {
        sideMenu: {
          right: {
            visible: true,
            enabled: true
          }
        }
      })
    }

    hideDrawer = () => {
      Navigation.mergeOptions('sideMenu', {
        sideMenu: {
          right: {
            enabled: false,
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
}
