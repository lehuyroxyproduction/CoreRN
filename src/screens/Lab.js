import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import { Container } from 'components'
// import { View } from 'components/uielements'

import AnimatedList from 'components/AnimatedList'

export default class Lab extends React.Component {
  componentDidMount() {}

  onLayout = e => {
    // console.log(e.nativeEvent.layout.x, true)
    // console.log(e.nativeEvent.layout.y, true)
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    })
  }

  render() {
    return (
      <Container isDrawnUnderNavbar>
        <View
          style={{ flex: 1, backgroundColor: 'powderblue' }}
          onLayout={this.onLayout}
        />
      </Container>
    )
  }
}
