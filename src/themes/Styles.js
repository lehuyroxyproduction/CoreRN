import { Platform, StyleSheet } from 'react-native'
import { appConfig } from 'config'

const appStyle = {
  orientation: appConfig.orientation,
  drawUnderStatusBar: true,
  // statusBarTextColorScheme: 'light',
  ...Platform.select({
    android: { statusBarColor: 'transparent' || appConfig.appTheme } // android only
  })
}

const navigatorStyle = {
  navBarHidden: true,
  disabledBackGesture: false // ios only
}

// const tabbarStyle = {
//   orientation: appConfig.orientation,
//   tabBarBackgroundColor: 'white',
//   tabBarButtonColor: Colors.coolGrey,
//   forceTitlesDisplay: true,
//   tabBarSelectedButtonColor: Colors.coral
// }

const screenStyle = {
  statusBar: {
    style: 'light'
  }
}

const modalStyle = {
  // statusBarTextColorScheme: 'dark',
  // screenBackgroundColor: 'transparent',
  modalPresentationStyle: 'overCurrentContext',
  statusBar: {
    style: 'dark'
  },
  layout: {
    backgroundColor: 'transparent'
  }
  // screenBackgroundColor: 'transparent'
}

const input = StyleSheet.create({
  round: {
    borderRadius: 30,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    textAlign: 'center'
  }
})

const button = StyleSheet.create({
  next: {
    right: 24,
    position: 'absolute',
    alignSelf: 'flex-end'
  }
})

export default {
  appStyle,
  navigatorStyle,
  // tabbarStyle,
  modalStyle,
  input,
  button
}
