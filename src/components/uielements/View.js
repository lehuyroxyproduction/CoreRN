import React from 'react'
import PropTypes from 'prop-types'

import { View as RNView, ImageBackground, ScrollView } from 'react-native'

import { isValidColor } from 'utils/colors'

class MyView extends React.Component {
  static propTypes = {
    onLocation: PropTypes.func
  }

  static defaultProps = {
    onLocation: () => {}
  }

  onLayout = e => {
    this.props.onLocation({
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    })

    // console.log(e.nativeEvent.layout.width, true)
    // console.log(e.nativeEvent.layout.height, true)
    // console.log(e.nativeEvent.layout.x, true)
    // console.log(e.nativeEvent.layout.y, true)
  }

  render() {
    const { style, source, children } = this.props

    if (source) {
      return (
        <ImageBackground
          style={[{ width: '100%', height: '100%' }, style]}
          source={source}
          onLayout={this.onLayout}>
          {children}
        </ImageBackground>
      )
    } else {
      return (
        <RNView style={style} onLayout={this.onLayout}>
          {children}
        </RNView>
      )
    }
  }
}

export const View = ({
  absolute,
  background,
  padding,
  center,
  centerVertical,
  centerHorizontal,
  fill,
  fillVertical,
  fillHorizontal,
  flex,
  row,
  style,
  onLocation,
  children
}) => {
  const Layout = MyView

  return (
    <Layout
      style={[
        {
          flex: flex ? (typeof flex !== 'boolean' ? flex : 1) : null,
          paddingHorizontal: padding ? padding : 0,
          backgroundColor: isValidColor(background) ? background : 'transparent'
        },
        {
          flexDirection: (row && 'row') || 'column',
          width: (fill && '100%') || (fillHorizontal && '100%'),
          height: (fill && '100%') || (fillVertical && '100%'),

          alignItems:
            (center && 'center') || (centerHorizontal && 'center') || 'stretch',
          justifyContent:
            (center && 'center') ||
            (centerVertical && 'center') ||
            'flex-start',
          position: (absolute && 'absolute') || 'relative',

          ...(absolute && center
            ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }
            : null)
        },
        style
      ]}
      source={!isValidColor(background) && background}
      onLocation={onLocation}
      showsVerticalScrollIndicator={false}>
      {children}
    </Layout>
  )
}
