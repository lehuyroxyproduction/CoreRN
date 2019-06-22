import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import timer from 'react-native-timer-mixin'
import Ripple from 'react-native-material-ripple'

export const Touchable = ({
  style,
  flex,
  row,
  round,
  color,
  radius = 0,
  gradient,
  gradientType = 1,
  gradientStyle,
  disabled,
  rippleColor,
  rippleStyle,
  rippleCentered = true,
  onPress = () => {},
  children
}) => {
  const width = round ? round : '100%'
  const height = round ? round : '100%'

  return (
    <TouchableOpacity
      style={[
        round && !flex
          ? {
            width: round,
            height: round,
            borderRadius: round / 2
          }
          : null,
        {
          flex: flex ? (typeof flex !== 'boolean' ? flex : 1) : null,
          backgroundColor: color
        },
        styles.center,
        style
      ]}>
      <Ripple
        style={[
          {
            width,
            height,
            flexDirection: row ? 'row' : 'column'
          },
          styles.center,
          rippleStyle
        ]}
        disabled={disabled}
        rippleColor={rippleColor ? rippleColor : gradient ? 'white' : 'black'}
        rippleCentered={rippleCentered}
        rippleSequential
        rippleContainerBorderRadius={round ? round / 2 : 0}
        onPress={() => timer.setTimeout(() => onPress(), 150)}>
        {gradient ? (
          <LinearGradient
            start={gradientType === 1 ? { x: 0.1, y: 0.6 } : { x: 0.0, y: 0.0 }}
            end={gradientType === 1 ? { x: 0.8, y: 1.0 } : { x: 0.4, y: 0.1 }}
            colors={['rgba(251,190,38,1)', 'rgba(234,100,66,1)']}
            style={[
              {
                width,
                height,
                borderRadius: round ? round / 2 : radius
              },
              styles.center,
              gradientStyle
            ]}>
            {children}
          </LinearGradient>
        ) : (
          children
        )}
      </Ripple>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
