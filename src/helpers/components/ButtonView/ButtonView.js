import React, { Component } from 'react';
// @flow

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Devices from '../../Devices';

// //BASE_FONT = 'YOUR_CUSTOM_FONTS_FAMILY';
// AppButton.PropTypes = {
//   // On Press something
//   onPress: PropTypes.func,
// };
type Props = {
  style: StyleSheet.Styles,
  onPress: Function,
}

class ButtonView extends Component<Props> {
  render() {
    const { style, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.container, style]}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 15 * Devices.displayScale,
    color: 'black',
  },
});

export default ButtonView;
