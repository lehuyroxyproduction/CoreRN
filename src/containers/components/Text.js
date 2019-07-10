import React from 'react'
import { Text as RNText } from 'react-native'

import { Colors, Fonts } from '../../constants/constants'
import { LayoutProps, TextProps } from '../libs/types'
import normalize from '../libs/normalizeSize'

type Props = {
  fontSize?: number,
  tiny?: boolean,
  xsmaller?: boolean,
  smaller?: boolean,
  small?: boolean,
  large?: boolean,
  larger?: boolean,
  xlarger?: boolean,
  xlarge?: boolean,
  xxlarge?: boolean,
  xxlarger?: boolean,
  xxxlarge?: boolean,
  bold?: boolean,
  demiBold?: boolean,
  medium?: boolean,
  color?: boolean,
  left?: boolean,
  right?: boolean,
  center?: boolean,
  children?: string,
  alignSelf?: boolean,
  style?: LayoutProps & TextProps,
  lineHeight?: number,
  verticalAlignCenter?: TextProps,
  verticalAlignBottom?: TextProps,
  verticalAlignTop?: TextProps
}

export const Text = (props: Props) => {
  const {
    fontSize,
    tiny,
    xsmaller,
    smaller,
    small,
    large,
    larger,
    xlarger,
    xlarge,
    xxlarge,
    xxlarger,
    xxxlarge,
    bold,
    medium,
    demiBold,
    color,
    center,
    right,
    style,
    lineHeight,
    alignSelf,
    verticalAlignCenter,
    verticalAlignBottom,
    verticalAlignTop,

    ...otherProps
  } = props
  const _fontSize =
    fontSize ||
    (tiny
      ? Fonts.size.tiny
      : xsmaller
      ? Fonts.size.xsmaller
      : smaller
      ? Fonts.size.smaller
      : small
      ? Fonts.size.small
      : large
      ? Fonts.size.large
      : larger
      ? Fonts.size.larger
      : xlarger
      ? Fonts.size.xlarger
      : xlarge
      ? Fonts.size.xlarge
      : xxlarge
      ? Fonts.size.xxlarge
      : xxlarger
      ? Fonts.size.xxlarger
      : xxxlarge
      ? Fonts.size.xxxlarge
      : Fonts.size.medium)
  // prettier-ignore
  const styles = {
    alignSelf: alignSelf ? 'center' : 'auto',
    color,
    fontSize: _fontSize,
    textAlign: center ? 'center' : right ? 'right' : 'left',
    fontFamily: bold ? Fonts.face.bold : demiBold ? Fonts.face.demiBold : medium ? Fonts.face.medium : Fonts.face.regular,
    includeFontPadding: false,
    textAlignVertical: verticalAlignCenter && 'center' || verticalAlignBottom && 'bottom' || verticalAlignTop && 'top' || 'auto',
    lineHeight: lineHeight
  }

  return (
    <RNText allowFontScaling={false} style={[styles, style]} {...otherProps}>
      {props.children}
    </RNText>
  )
}

Text.defaultProps = {
  color: Colors.black
}
