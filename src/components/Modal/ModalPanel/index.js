import React from 'react'
import Modal from 'react-native-modal'
import { styles } from './styles'
import { Text, View } from 'components/ui'

export interface ModalProps {
  isVisible?: boolean;
  title?: string;
}
export default class ModalPanel extends React.PureComponent<ModalProps> {
  render() {
    const { isVisible, title, ...otherProps } = this.props
    return (
      <Modal isVisible={isVisible} {...otherProps}>
        <View style={styles.Containner}>
          <Text style={styles.Header}>{title}</Text>
          {this.props.children}
        </View>
      </Modal>
    )
  }
}
