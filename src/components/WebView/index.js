import React from 'react'
import WebView from 'react-native-webview'
import { Loader } from 'components/ui'

export interface WebViewProps {
  url?: string;
}
export default class extends React.PureComponent<WebViewProps> {
  render() {
    let { url } = this.props
    console.log('=============WEBVIEW===========', url)
    return (
      <WebView
        cacheEnabled={false}
        useWebKit
        mixedContentMode="compatibility"
        startInLoadingState
        renderLoading={() => <Loader />}
        source={{ uri: url }}
        {...this.props}
      />
    )
  }
}
