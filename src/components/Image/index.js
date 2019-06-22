import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors, Metrics } from 'themes'
import { hp } from 'Constants/constant'
import { View } from 'components/ui'

// export const ImageContent = (props: Props) => {
//   const { style, ...otherProps } = props

//   const loadingView = (
//     <View opacity={0.75} flex centerItems style={style}>
//       <ActivityIndicator color="white" size="large" />
//     </View>
//   )
//   // const sbstyle = barStyle || statusBarStyle
//   let isLoading = false

//   return (
//     <FastImage
//       style={style}
//       {...otherProps}
//       onLoadStart={() => (isLoading = true)}
//       onLoad={() => (isLoading = false)}
//       onError={() => (isLoading = false)}>
//       {isLoading && loadingView}
//     </FastImage>
//   )
// }

export default class ImageContent extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    isLoading: false
  }

  _render_loadingView = () => {
    console.log('test isLoading: ', this.state.isLoading)
    if (this.state.isLoading) {
      return (
        <View backgroundColor="black" flex centerItems style={this.props.style} opacity={0.4}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )
    }
    return null
  }
  render() {
    return (
      <FastImage
        {...this.props}
        style={[{ flex: 1 }, this.props.style]}
        onLoadStart={() => this.setState({ isLoading: true })}
        onLoad={() => this.setState({ isLoading: false })}
        onError={() => this.setState({ isLoading: false })}>
        {this._render_loadingView()}
        {this.props.children}
      </FastImage>
    )
  }
}
