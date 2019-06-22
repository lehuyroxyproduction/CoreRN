import React from 'react'
import { View as RNView } from 'react-native'

import { LayoutProps } from 'themes/types'
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'

export type ViewProps = {
  row?: boolean,
  alignCenter?: boolean,
  justifyCenter?: boolean,
  justifySpaceAround?: boolean,
  justifySpaceBetween?: boolean,
  justifyEnd?: boolean,
  centerSelf?: boolean,
  centerItems?: boolean,
  style?: LayoutProps,
  alignEnd?: ViewStyleProp,
  alignStart?: ViewStyleProp,
  opacity?: number
}

type Props = LayoutProps & ViewProps

export const View = (props: Props) => {
  const {
    row,
    alignCenter,
    justifyCenter,
    centerSelf,
    centerItems,
    onLayout,
    justifySpaceAround,
    justifySpaceBetween,
    justifyEnd,
    alignEnd,
    alignStart,
    style,
    flex,
    alignSelf,
    opacity,
    ...otherProps
  } = props

  const styles = {
    flexDirection: row ? 'row' : 'column',
    flex: flex ? 1 : null,
    alignSelf: alignSelf || centerSelf ? 'center' : 'auto',
    alignItems:
      centerItems || alignCenter
        ? 'center'
        : alignEnd
          ? 'flex-end'
          : alignStart
            ? 'flex-start'
            : 'stretch',
    justifyContent:
      centerItems || justifyCenter
        ? 'center'
        : justifySpaceAround
          ? 'space-around'
          : justifySpaceBetween
            ? 'space-between'
            : justifyEnd
              ? 'flex-end'
              : 'flex-start',
    opacity: opacity || 1
  }

  return (
    <RNView style={[styles, style]} {...otherProps}>
      {props.children}
    </RNView>
  )
}
