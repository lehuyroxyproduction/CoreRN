import React, { Component } from 'react';
// @flow

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Devices from '../../Devices';

// //BASE_FONT = 'YOUR_CUSTOM_FONTS_FAMILY';
// AppButton.PropTypes = {
//   // On Press something
//   onPress: PropTypes.func,
// };
type Props = {
  style: StyleSheet.Styles,
  imageStyle: StyleSheet.Styles,
  onPress: Function,
  source: String,
}

class ImageButtonView extends Component<Props> {
  render() {
    const { style, imageStyle, onPress, source } = this.props;

    return (
      <TouchableOpacity 
        style={[styles.container, style]}
        onPress={onPress}
      >
        <Image
          style={[imageStyle]}
          source={source}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 15 * Devices.displayScale,
  },
});

export default ImageButtonView;
