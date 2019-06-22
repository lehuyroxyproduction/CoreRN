import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Text, Touchable } from 'components/uielements'
import { isLightColor } from 'utils/colors'

export const Button = ({
  label,
  labelColor,
  bold,
  radius,
  gradient,
  color = 'white',
  isLoading,
  style,
  onPress = () => {}
}) => {
  contentColor = labelColor
    ? labelColor
    : isLightColor(color)
      ? 'black'
      : 'white'

  return (
    <Touchable
      style={[
        {
          width: '100%',
          height: 45,
          flexDirection: 'row'
        },
        style
      ]}
      //   rippleStyle={{
      //     width: '100%',
      //     height: 45,
      //     flexDirection: 'row'
      //   }}
      color={color}
      radius={radius}
      rippleCentered={false}
      gradient={gradient}
      onPress={!isLoading ? onPress : () => {}}>
      {isLoading ? (
        <ActivityIndicator
          color={contentColor}
          style={{ marginHorizontal: 12 }}
        />
      ) : (
        <Text color={contentColor} bold={bold} small>
          {label}
        </Text>
      )}
    </Touchable>
  )
}
