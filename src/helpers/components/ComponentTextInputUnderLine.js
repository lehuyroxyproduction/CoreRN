import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet } from 'react-native';
import { DisplayScale } from '../../constants/constants';

class TextInputUnderLine extends Component {
  render() {
    
    return (
      <TextInput style={[styles.container, this.props.style]}
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        underlineColorAndroid='transparent'
        autoCorrect={false}
      />
    );
  }
}

const styles = StyleSheet.create({
    container: {
      fontSize: 18 * DisplayScale,
      flex: 1,
      padding: 0,
      borderBottomWidth: 1 * DisplayScale,
      borderColor: '#000',
    }
})

export {TextInputUnderLine};
