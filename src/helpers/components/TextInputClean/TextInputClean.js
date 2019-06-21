import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet } from 'react-native';
import Devices from '../../Devices';

type Props = {
  editable: boolean,
  value: any,
  focus: Function,
  onChangeText: Function,
}
class TextInputClean extends Component<Props> {
  // Inherit Focus
  focus() {
    this.input.focus();
  }

  render() {
    const { editable, value } = this.props;
    return (
      <TextInput
        ref={(input) => { this.input = input; }}
        style={[styles.container, this.props.style]}
        value={value}
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        underlineColorAndroid="transparent"
        returnKeyType="next"
        onChangeText={this.props.onChangeText}
        editable={editable}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 0,
  },
});

export default TextInputClean;
