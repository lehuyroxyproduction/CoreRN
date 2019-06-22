import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Colors } from 'themes'
import { HEADER_HEIGHT } from 'Constants/constant'
import { View } from 'components/uielements'
import PropTypes from 'prop-types'
export default class LoadingView extends React.PureComponent<LoadingViewProps> {
  render() {
    let { small, style, background, color } = this.props
    return (
      <View background={background || 'transparent'} absolute center style={[styles.container, style]}>
        <ActivityIndicator color={color || Colors.coral} size={small ? 'small' : 'large'} />
      </View>
    )
  }
}

LoadingView.propTypes = {
  style: PropTypes.any,
  small: PropTypes.any,
  background: PropTypes.string,
  color: PropTypes.string
}
const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: HEADER_HEIGHT,
    bottom: 0
    // opacity: 0.5,
  }
})
