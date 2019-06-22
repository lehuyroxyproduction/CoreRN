import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'

import { Button } from 'components'

import { Metrics } from 'themes'

import timer from 'react-native-timer-mixin'

export class ActionSheet extends Component {
  state = {
    isShown: true,
    focusedAnim: new Animated.Value(0)
  }

  static propTypes = {
    options: PropTypes.array
  }

  static defaultProps = {
    options: [
      { title: 'A', onPress: undefined },
      { title: 'B', onPress: undefined },
      { title: 'C', onPress: undefined },
      { title: 'D', onPress: undefined }
    ],
    onCancel: () => {}
  }

  activeAnimation() {
    Animated.timing(this.state.focusedAnim, {
      toValue: this.state.isShown ? 1 : 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }

  render() {
    this.activeAnimation()

    const { options, onCancel } = this.props

    const bottom = this.state.focusedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 2]
    })

    var color = this.state.focusedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, .1)', 'rgba(0, 0, 0, .3)']
    })

    return (
      <Animated.View style={[styles.container, { backgroundColor: color }]}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() =>
            this.setState({ isShown: false }, () =>
              timer.setTimeout(() => onCancel(), 150)
            )
          }>
          <Animated.View style={{ bottom }}>
            <View>
              {options.map(({ title, onPress }, index) => (
                <Button
                  key={index}
                  style={[
                    styles.button,
                    {
                      marginVertical: 0.5,
                      borderTopLeftRadius: index === 0 ? 10 : 0,
                      borderTopRightRadius: index === 0 ? 10 : 0,
                      borderBottomLeftRadius:
                        index === options.length - 1 ? 10 : 0,
                      borderBottomRightRadius:
                        index === options.length - 1 ? 10 : 0
                    }
                  ]}
                  label={title}
                  onPress={onPress}
                />
              ))}
            </View>

            <Button
              style={styles.button}
              label="Hủy"
              bold
              color="white"
              onPress={() => {
                this.setState({ isShown: false }, () =>
                  timer.setTimeout(() => onCancel(), 150)
                )
              }}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Metrics.screen.width,
    height: Metrics.screen.height,
    bottom: 0,
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    width: Metrics.screen.width - 32,
    height: 54,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.9)'
  }
})
