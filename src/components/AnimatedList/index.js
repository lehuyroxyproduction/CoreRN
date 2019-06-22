import React from 'react'
import { Platform, Animated, View, ScrollView, StyleSheet } from 'react-native'

import { Text } from 'components/uielements'

import { Metrics } from 'themes'

const NAVBAR_HEIGHT = Metrics.navbar.height
const STATUS_BAR_HEIGHT = 0 // Platform.select({ ios: 20, android: 24 })

const AnimatedListView = Animated.createAnimatedComponent(ScrollView)

export default class extends React.Component {
  constructor(props) {
    super(props)

    const scrollAnim = new Animated.Value(0)
    const offsetAnim = new Animated.Value(0)

    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp'
          }),
          offsetAnim
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
      )
    }
  }

  _clampedScrollValue = 0
  _offsetValue = 0
  _scrollValue = 0

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue
      this._scrollValue = value
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
      )
    })

    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value
    })
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250)
  }

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer)
  }

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
        ? this._offsetValue + NAVBAR_HEIGHT
        : this._offsetValue - NAVBAR_HEIGHT

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start()
  }

  render() {
    const { clampedScroll } = this.state

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp'
    })

    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    const arr = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ]

    return (
      <View style={{ flex: 1 }}>
        <AnimatedListView
          style={{ paddingTop: NAVBAR_HEIGHT }}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true }
          )}>
          {arr.map(i => (
            <Text style={{ margin: 10 }} key={i}>
              {i}
            </Text>
          ))}
        </AnimatedListView>

        <Animated.View
          style={[
            styles.navbar,
            { transform: [{ translateY: navbarTranslate }] }
          ]}>
          <Animated.Text style={[styles.title, { opacity: navbarOpacity }]}>
            PLACES
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT
  },
  title: {
    color: '#333333'
  }
})
