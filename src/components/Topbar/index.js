import React from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Themes } from 'themes'

type Button = {
  icon?: any,
  onPress: Function,
  disabled: boolean
}

type Props = {
  title?: string,
  titleColor?: string,

  backgroundColor?: string,

  leftButtons?: Array<Button>,
  rightButtons?: Array<Button>
}

export const Topbar = ({ title, leftButtons, rightButtons }: Props) => {
  return (
    <View style={[styles.topbar]}>
      <View style={styles.leftButtons}>
        {leftButtons.map(({ icon, onPress, disabled }, index) => {
          return (
            <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
              <Image source={icon} style={{ tintColor: 'black' }} resizeMode="contain" />
            </TouchableOpacity>
          )
        })}
      </View>

      {title &&
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>}

      {rightButtons.map(({ icon, onPress, disabled }, index) => {
        return (
          <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
            <Image source={icon} style={{ tintColor: 'black' }} resizeMode="contain" />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

Topbar.defaultProps = {
  title: 'Title',

  leftButtons: new Array(2).fill(true),
  rightButtons: []
}

const styles = StyleSheet.create({
  topbar: {
    width: '100%',
    height: Themes.Metrics.topBar.height,

    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    width: '70%',

    top: 16,
    position: 'absolute',

    fontSize: 18,
    textAlign: 'center'
  },
  button: {
    height: '100%',

    padding: 16,
    justifyContent: 'center'
  },
  leftButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
