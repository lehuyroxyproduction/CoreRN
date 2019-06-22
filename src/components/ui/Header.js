import React from 'react'

import { LayoutProps } from 'themes/types'
import { hp, wp } from 'constant'
import { Metrics } from 'themes'
import { Text, View } from 'components/ui'
import { Image, TextProps, TouchableOpacity } from 'react-native'
import { hasNotch } from 'utils'
import type { ImageStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'

export interface HeaderProps {
  row?: boolean;
  style?: LayoutProps;
  justifyCenter?: boolean;
  alignCenter?: boolean;
  onLeftIconPress?: () => void;
  onRightIcPress?: () => void;
  leftIcon?: LayoutProps;
  rightIcon?: LayoutProps;
  title?: LayoutProps;
  titleColor?: LayoutProps;
  icLeftTintColor?: ImageStyleProp;
  icRightTintColor?: ImageStyleProp;
  textColor?: TextProps;
  textRight?: LayoutProps;
  textLeft?: LayoutProps;
  textColorRight?: LayoutProps;
  textColorLeft?: LayoutProps;
}

type Props = LayoutProps & HeaderProps

export const Header = (props: Props) => {
  const {
    style,
    row,
    textColor,
    justifyCenter,
    alignCenter,
    onLeftIconPress,
    leftIcon,
    title,
    icLeftTintColor,
    onRightIcPress,
    rightIcon,
    icRightTintColor,
    titleColor,
    textLeft,
    textColorLeft,
    textRight,
    textColorRight,
    ...otherProps
  } = props
  const styles = {
    flexDirection: row ? 'row' : 'column',
    height: hasNotch ? hp(10) : Metrics.statusBar.height + hp(6),
    justifyContent: 'space-between',
    alignItems: alignCenter ? 'center' : 'flex-end',
    // paddingHorizontal: wp(3.7),
    backgroundColor: 'transparent'
  }
  const icLeftColor = icLeftTintColor || 'black'
  const icRightColor = icRightTintColor || 'black'
  return (
    <View row alignCenter style={[styles, style]} {...otherProps}>
      <TouchableOpacity
        style={{
          width: wp(10),
          height: wp(10),
          left: wp(3.7),
          justifyContent: 'center'
        }}
        onPress={onLeftIconPress}>
        {textLeft === undefined ? (
          <Image source={leftIcon} style={{ alignSelf: 'center', tintColor: icLeftColor }} />
        ) : (
          <Text style={{ color: textColorLeft, textAlign: 'left' }}>{textLeft}</Text>
        )}
      </TouchableOpacity>
      <Text color={textColor} bold larger>
        {title}
      </Text>

      {textRight === undefined ? (
        <TouchableOpacity
          style={{
            width: wp(10),
            height: wp(10),
            justifyContent: 'center',
            right: wp(3.7)
          }}
          onPress={onRightIcPress}>
          <Image source={rightIcon} style={{ alignSelf: 'center', tintColor: icRightColor }} />
        </TouchableOpacity>
      ) : (
        <Text bold large color={textColorRight} onPress={onRightIcPress} style={{ right: wp(3.7) }}>
          {textRight}
        </Text>
      )}

      {props.children}
    </View>
  )
}

Header.defaultProps = {
  row: true,
  onPress: () => {}
}
