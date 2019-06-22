import React from 'react'
import { Image, Platform, TouchableHighlight, View, WebView } from 'react-native'
// import { GOLDEN_COLOR, STATUSBAR_HEIGHT } from 'constants'
import { wp, hp } from 'constants'
import { Colors } from 'themes'
import { Icons } from 'images'
import LoadingView from 'loading/LoadingView'

export default class MyWebView extends React.PureComponent {
  onBackPress = () => {
    this.props.onBackPress()
  }

  renderLoading = () => <LoadingView  />

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
          // paddingTop: Platform.select({ios: STATUSBAR_HEIGHT, android: 0})
        }}>
        <WebView
          source={{ uri: this.props.url }}
          style={{ marginTop: 85 }}
          useWebKitrr
          allowsInlineMediaPlayback
          mixedContentMode="compatibility"
          renderLoading={this.renderLoading}
          startInLoadingState
        />
        <TouchableHighlight style={{
          width: wp(10), height: wp(10),
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: Platform.select({ ios: hp(3), android: hp(3) }),
          left: wp(2),
          backgroundColor: 'transparent',
          borderRadius: 50,
          zIndex: 1
        }} underlayColor={Colors.coral} onPress={this.onBackPress}>
          <Image source={Icons.back}/>
        </TouchableHighlight>
      </View>
    )
  }
}
