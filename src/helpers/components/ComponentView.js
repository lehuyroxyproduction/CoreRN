import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/constants';

//BASE_FONT = 'YOUR_CUSTOM_FONTS_FAMILY';

export class AppView extends Component {
  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>{this.props.children}</View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
});