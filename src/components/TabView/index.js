import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { Animated, View, Dimensions } from 'react-native'

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

export class TabView extends Component {
  state = {
    index: 0,
    routes: this.props.routes.map(({ key, title }) => ({ key, title }))
  }

  static propTypes = {
    routes: Proptypes.arrayOf(
      Proptypes.shape({
        key: Proptypes.string,
        title: Proptypes.string,
        scene: Proptypes.func
      })
    )
  }

  static defaultProps = {
    style: {
      elevation: 0
      //   backgroundColor: 'salmon'
    },
    indicatorStyle: {
      backgroundColor: 'white'
    },
    textTop: null,
    indexColor: 'white',
    inputIndexColor: 'white',
    renderTopText: false,
    routes: [
      { key: 'first', title: 'Tab A', scene: () => <View /> },
      { key: 'second', title: 'Tab B', scene: () => <View /> }
    ]
  }

  initialLayout = {
    height: 0,
    width: Dimensions.get('window').width
  }

  renderScene = SceneMap(
    Object.assign(
      ...this.props.routes.map(({ key, scene }) => ({ [key]: scene }))
    )
  )

  handleIndexChange = index => this.setState({ index })

  renderLabel = props => ({ route, index }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)

    const outputRange = inputRange.map(inputIndex =>
      inputIndex === index ? this.props.inputIndexColor : this.props.indexColor
    )

    const color = props.position.interpolate({
      inputRange,
      outputRange
    })

    return (
      <View style={{ alignItems: 'center' }}>
        {this.props.textTop ? (
          <Animated.Text style={{ fontSize: 17, color }} small>
            {this.props.textTop}
          </Animated.Text>
        ) : null}

        <Animated.Text style={{ fontSize: 17, color }}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  renderHeader = props => (
    <TabBar
      {...props}
      style={this.props.style}
      indicatorStyle={this.props.indicatorStyle}
      getLabelText={({ route }) => route.title}
      renderLabel={this.renderLabel(props)}
    />
  )

  render() {
    return (
      <TabViewAnimated
        style={{ flex: 1 }}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
        initialLayout={this.initialLayout}
        useNativeDriver
      />
    )
  }
}
