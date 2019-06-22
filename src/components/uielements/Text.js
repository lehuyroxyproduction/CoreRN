import React from 'react'
import {Text as RNText} from 'react-native'
import {Fonts, Colors} from 'themes'

export const Text = ({
  style,
  color,
  center,
  bold,
  underline,
  tiny,
  small,
  large,
  xlarge,
  children,
  ...props
}) => {
  return (
    <RNText
      style={[
        {
          color: color || (small || tiny ? Colors.steel : Colors.slate),
          fontSize: tiny
            ? Fonts.size.t
            : small
              ? Fonts.size.s
              : large
                ? Fonts.size.l
                : xlarge
                  ? Fonts.size.xl
                  : Fonts.size.m,
          fontFamily: bold ? Fonts.face.bold : Fonts.face.normal,
          textAlign: (center && 'center') || 'auto',
          textDecorationLine: (underline && 'underline') || 'none'
        },
        style
      ]}
      ellipsizeMode={'tail'}
      {...props}>
      {children}
    </RNText>
  )
}
