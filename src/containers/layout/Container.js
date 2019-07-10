import React from 'react'
import {
  ActivityIndicator,
  Keyboard,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import { LayoutProps } from '../libs/types'
import FastImage from 'react-native-fast-image'
import { Colors } from '../../constants/constants'
import { 
  hasBottomBar, 
  // hasNotch, 
  statusBarStyle } from '../libs/utils'
import { View } from '../components/View'

type Props = {
  style: LayoutProps,
  containerStyle: LayoutProps,
  touchableWithoutFeedback?: boolean,
  barStyle?: StatusBarProps,
  backgroundColor?: LayoutProps,
  statusBarBackgroundColor?: LayoutProps,
  transparent?: LayoutProps,
  isLoading?: boolean
}

export const Container = (props: Props) => {
  const {
    style,
    touchableWithoutFeedback,
    containerStyle,
    barStyle,
    backgroundColor,
    transparent,
    statusBarBackgroundColor,
    isLoading,
    ...otherProps
  } = props

  const RootView = props.source ? FastImage : View
  const loadingView = (
    <View backgroundColor="black" opacity={0.75} flex centerItems style={StyleSheet.absoluteFill}>
      <ActivityIndicator color="white" size="large" />
    </View>
  )

  const styles = {
    flex: 1,
    backgroundColor: (transparent && 'transparent') || backgroundColor || Colors.white
  }
  // const sbstyle = barStyle || statusBarStyl
  return touchableWithoutFeedback ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <RootView style={[styles, containerStyle]} {...otherProps}>
        <StatusBar translucent backgroundColor={statusBarBackgroundColor} barStyle={barStyle || statusBarStyle} />
        {props.children}
        {isLoading && loadingView}
      </RootView>
    </TouchableWithoutFeedback>
  ) : (
    <RootView style={[styles, containerStyle]} {...otherProps}>
      <StatusBar backgroundColor={statusBarBackgroundColor} barStyle={barStyle || statusBarStyle} />
        {props.children}
      {isLoading && loadingView}
    </RootView>
  )
}

Container.defaultProps = {
  barStyle: 'light-content',
  statusBarBackgroundColor:"transparent"

}
