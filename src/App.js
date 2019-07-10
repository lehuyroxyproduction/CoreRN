import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Provider} from 'react-redux'
import AppNavigator from './navigators/stackNavigators/stackNavigatorMain.js'
import I18n from 'react-native-i18n'
import en from './locales/en'
import {StylesGlobal} from './constants/constants'
import store from './redux/store/store.js'
// import config from './constants/config'

// if (config.Reactotron.enable) {
//   import('./constants/ReactotronConfig').then(() => console.log('Reactotron Configured'))
// }

console.disableYellowBox = true;
I18n.fallbacks = true
I18n.translations = {
  en    
};
I18n.locale = 'en';

export class App extends Component {
  render() {
    return (
      <View style={StylesGlobal.AppClass}>
        <AppNavigator/>
      </View>
    )
  }
}

export default  () => (
  <Provider store={store}>
      <App/>
  </Provider>
);