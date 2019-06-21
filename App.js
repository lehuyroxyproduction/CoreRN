 import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from 'native-base';
import I18n from 'react-native-i18n';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Colors } from './src/constants/constants';
import { AppStackNavigator } from './src/navigators/stackNavigators/index';
import en from './src/locales/en';
import store from './src/redux/store';

console.disableYellowBox = true;
I18n.fallbacks = true
I18n.translations = {
  en    
};
I18n.locale = 'en';
Text.defaultProps.allowFontScaling = false;

class App extends Component {

  //#region Component Lifecycle

  render() {
    if (!isIphoneX()) {
      return (
        <View style={styles.container} >
          <AppStackNavigator />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.containeriPhoneX}>
        <AppStackNavigator />
      </SafeAreaView>
    );
  }

  //#endregion
}

//#region Stylesheet
const styles = StyleSheet.create({
  
  container: {
    flex: 1
  },

  containeriPhoneX: {
    flex: 1,
    backgroundColor: Colors.main
  },

});
//#endregion

//#region Redux
const mapStateToProps = (state) => ({

});

function dispatchToProps(dispatch) {
  return bindActionCreators({
    
  }, dispatch);
}

const AppWithNavigation = connect(mapStateToProps, dispatchToProps)(App);

export default () => (
  <Provider store={store}>
    <AppWithNavigation />
  </Provider>
);
//#endregion
