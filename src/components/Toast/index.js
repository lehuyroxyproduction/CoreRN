import React from 'react'
import { connect } from 'react-redux'
import { Animated, Easing, StyleSheet } from 'react-native'

import { actions, selectors } from 'redux/reducers/reducerApp'

import { Metrics } from 'themes'
import {Text} from 'components/uielements'

const { height } = Metrics.toast

class Toast extends React.Component {
  constructor() {
    super()
    this.state = { opacityLevel: 0, bottomPosition: -height }
    this.animatedValue = new Animated.Value(0)
  }

  static defaultProps = {
    bottom: false,
    toast: { message: 'Something went wrong', time: 0 },
    backgroundColor: '#rgba(0,0,0,0.5)', // '#rgba(251, 190, 38, .9)',
    callback: () => {}
  }

  componentWillReceiveProps() {
    this.animate()
    this.setState({ opacityLevel: 1, bottomPosition: 0 })
  }

  animate() {
    this.animatedValue.setValue(0)

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }).start(() => {
      this.setState({ opacityLevel: 0, bottomPosition: -height })
    })
  }

  render() {
    const { bottom, bottomPosition = 50, toast, backgroundColor } = this.props

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.2, 0.3, 0.4, 0.6, 1],
      outputRange: [this.state.opacityLevel, 1, 1, 1, 1, 0]
    })

    const marginBottom = this.animatedValue.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [this.state.bottomPosition, 0, -height]
    })

    const style1 = [
      styles.style1,
      {
        marginBottom,
        backgroundColor
      }
    ]

    const style2 = [
      styles.style2,
      {
        opacity,
        backgroundColor
      }
    ]

    if (toast.message) {
      return (
        <Animated.View
          style={[
            styles.toastContainer,
            bottom ? style1 : style2,
            { bottom: bottomPosition }
          ]}>
          <Text color="white" center>
            {toast.message}
          </Text>
        </Animated.View>
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  toast: selectors.getToast(state)
})

const mapDispatchToProps = dispatch => ({
  setToast: () => dispatch(actions.setToast(null))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast)

const styles = StyleSheet.create({
  toastContainer: {
    zIndex: 0,
    position: 'absolute',
    justifyContent: 'center'
  },
  style1: {
    width: '100%',
    height,
    left: 0,
    bottom: 0,
    right: 0,
    paddingLeft: 12
  },
  style2: {
    height,
    bottom: 10,
    borderRadius: 36,
    marginHorizontal: 24,
    // paddingVertical: 30,
    paddingHorizontal: 24,
    alignSelf: 'center',
    alignItems: 'center'
  }
})
