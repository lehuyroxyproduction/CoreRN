import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, DisplayScale } from '../../constants/constants';

//BASE_FONT = 'YOUR_CUSTOM_FONTS_FAMILY';

export class AppText extends Component {
  render() {
    const { style } = this.props;

    return (
      <Text {...this.props} style={[styles.container, style,]}>{this.props.children}</Text>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    // fontFamily: BASE_FONT,
    fontSize: 15 * DisplayScale,
    color: Colors.black,
  },
});