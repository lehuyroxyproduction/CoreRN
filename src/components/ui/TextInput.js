import React from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { Metrics, Colors, Fonts } from 'themes'
import { LayoutProps, TextProps } from 'themes/types'

type Props = {
  fontSize?: number,
  tiny?: boolean,
  smaller?: boolean,
  small?: boolean,
  large?: boolean,
  larger?: boolean,
  xlarge?: boolean,
  bold?: boolean,
  demiBold?: boolean,
  medium?: boolean,
  color?: boolean,
  left?: boolean,
  right?: boolean,
  center?: boolean,
  children?: string,
  alignSelf?: boolean,
  style?: LayoutProps & TextProps
}

export const TextInput = (props: Props) => {
  const {
    fontSize,
    tiny,
    smaller,
    small,
    large,
    larger,
    xlarge,
    bold,
    medium,
    demiBold,
    color,
    center,
    right,
    style,
    alignSelf,
    ...otherProps
  } = props
  const _fontSize =
    fontSize ||
    (tiny
      ? Fonts.size.tiny
      : smaller
        ? Fonts.size.smaller
        : small
          ? Fonts.size.small
          : large
            ? Fonts.size.large
            : larger
              ? Fonts.size.larger
              : xlarge
                ? Fonts.size.xlarge
                : Fonts.size.medium)
  // prettier-ignore
  const styles = {
    padding: 0,
    margin: 0,
    alignSelf: alignSelf ? 'center' : 'auto',
    color,
    fontSize: _fontSize,
    textAlign: center ? 'center' : right ? 'right' : 'left',
    fontFamily: bold ? Fonts.face.bold : demiBold ? Fonts.face.demiBold : medium ? Fonts.face.medium : Fonts.face.regular
  }

  return (
    <RNTextInput
      underlineColorAndroid="transparent"
      style={[styles, style]}
      {...otherProps}
    >
      {props.children}
    </RNTextInput>
  )
}

TextInput.defaultProps = {
  color: Colors.black
}
