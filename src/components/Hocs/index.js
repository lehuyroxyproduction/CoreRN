import React from 'react'

import store from 'store'
import { Alert, BackHandler } from 'react-native'

import { Toast, Button } from 'components'
import { View, Text } from 'components/uielements'

import { actions, selectors } from 'reducers/app'

import { modals } from 'screens'
import { Styles } from 'themes'

import App from 'App'

const tabScreen = {
  FindJob: '',
  MyJob: '',
  More: ''
}

export const ScreenWrapper = Component => {
  return class Wrapper extends React.Component {
    navigator = this.props.navigator

    componentDidMount() {
      this.props.navigator.setOnNavigatorEvent(event => {
        switch (event.id) {
          case 'willAppear':
            if (this.props.testID === 'Notis') {
              this.props.navigator.setTabBadge({
                tabIndex: 3,
                badge: null
              })
            }

            this.backHandler = BackHandler.addEventListener(
              'hardwareBackPress',
              handleBackPress
            )
            
            break
          case 'willDisappear':
            this.backHandler.remove()
            break
          default:
            break
        }
      })

      handleBackPress = () => {
        if (this.props.testID === 'RegisterName') {
          Alert.alert('', 'Bạn muốn thay đổi số điện thoại?', [
            {
              text: 'Hủy',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => App.startLogin()
            }
          ])
        } else {
          this.navigator.pop()
        }

        // react native navigation's bug on android
        return true
      }
    }

    push = (screen: String, passProps: Object) => {
      const isPushing = selectors.getPush(store.getState())

      if (!isPushing) {
        const next = {
          screen,
          passProps,
          navigatorStyle: {
            ...Styles.modalStyle,
            ...Styles.navigatorStyle,
            disabledBackGesture: screen === 'Verify'
          },
          animationType: 'none'
        }

        !modals.hasOwnProperty(screen)
          ? this.navigator.push(next)
          : this.navigator.showModal(next)

        store.dispatch(actions.push())
      }
    }

    pop = () => {
      !modals.hasOwnProperty(this.props.testID)
        ? this.navigator.pop()
        : this.navigator.dismissModal({ animationType: 'none' })
    }

    popToRoot = () => {
      !modals.hasOwnProperty(this.props.testID)
        ? this.navigator.popToRoot()
        : this.navigator.dismissAllModals()
    }

    showDrawer = () => {
      this.navigator.toggleDrawer({
        side: 'right',
        animated: true
      })
    }

    hideDrawer = () => {
      this.navigator.toggleDrawer({
        side: 'right',
        animated: true,
        to: 'closed'
      })
    }

    renderForceUpdate() {
      return (
        <View flex absolute center background="#rgba(0,0,0,0.5)">
          <Text color="white"> Vui lòng cập nhật app để tiếp tục sử dụng</Text>
        </View>
      )
    }

    render() {
      return (
        <View fill>
          <Component
            {...this.props}
            push={this.push}
            pop={this.pop}
            popToRoot={this.popToRoot}
            showDrawer={this.showDrawer}
            hideDrawer={this.hideDrawer}
          />

          <Toast
            bottomPosition={
              tabScreen.hasOwnProperty(this.props.testID) ? 10 : 50
            }
          />

          {/* {this.renderForceUpdate()} */}
        </View>
      )
    }
  }

  // return ComponentdWithCustomNavigator
}
