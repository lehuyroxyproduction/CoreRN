import * as React from 'react'
import { StyleSheet, ActivityIndicator, Modal, View } from 'react-native'
import Timer from 'react-native-timer-mixin'
export interface LoaderProps {
  fullscreen?: boolean;
}
export class Loader extends React.PureComponent<LoaderProps> {
  state = {
    shouldShowModal: false
  }

  componentDidMount() {
    if (this.props.fullscreen) {
      Timer.setTimeout(() => this.setState({ shouldShowModal: true }), 200)
    }
  }

  render() {
    if (!this.props.fullscreen) {
      return <ActivityIndicator size="large" {...this.props} />
    } else {
      return (
        <Modal
          transparent
          visible={this.state.shouldShowModal}
          //   animationType="fade"
          //   onRequestClose={() => {}}
        >
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" {...this.props} />
          </View>
        </Modal>
      )
    }
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
})
