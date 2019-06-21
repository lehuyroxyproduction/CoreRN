import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet } from 'react-native';
import { DisplayScale } from '../../constants/constants';

class TextInputBorder extends Component {
  render() {
    
    return (
      <TextInput style={[styles.container, this.props.style]}
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        multiline = {true}
        underlineColorAndroid='transparent'
      />
    );
  }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1 * DisplayScale,
        borderColor: '#000',
        textAlignVertical: "top",
        marginBottom: 8,
    }
})

export {TextInputBorder};
