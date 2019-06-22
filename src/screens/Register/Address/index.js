import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import { Container } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import { Icons } from 'images'
import { Colors, Metrics, Styles } from 'themes'

import { actions } from 'reducers/user'
import { selectors as appSelectors } from 'reducers/app'

class Address extends React.Component {
  state = { value: '', isUnvalid: false }

  onNext = () => {
    if (!this.state.value) {
      this.setState({ isUnvalid: true })
    } else {
      this.props.setUserInfo({ current_address: this.state.value })
      this.props.push({screen:'RegisterIdentification'})
    }
  }

  onClearText = () => this.setState({ value: '' })

  onChangeText = value => {
    if (!this.state.value) {
      this.props.push({screen:'SearchAddress', passProps:{
        value,
        callback: value => this.setState({ value, isUnvalid: false })
      }})
    } else {
      this.setState({ value }, () => {
        if (this.state.value.trim()) {
          this.setState({ isUnvalid: false })
        }
      })
    }
  }

  render() {
    return (
      <Container
        padding={38}
        buttons={{
          left: [{ icon: Icons.back, onPress: () => this.props.pop() }]
        }}>
        <Text color={Colors.coral} bold center>
          Hiện tại bạn đang ở đâu?
        </Text>

        <TextInput
          ref="input"
          autoFocus
          value={this.state.value}
          error={this.state.isUnvalid}
          errorText="Vui lòng nhập địa chỉ"
          style={[
            Styles.input.round,
            { backgroundColor: Colors.veryLightPink }
          ]}
          containerStyle={{ marginVertical: 24 }}
          returnKeyType="next"
          placeholder="Nhập địa chỉ hiện tại"
          onClearText={this.onClearText}
          onChangeText={this.onChangeText}
        />

        <Text tiny center>
          Bạn có thể thay đổi trong mục thông tin cá nhân
        </Text>

        <Touchable
          style={[
            Styles.button.next,
            { bottom: this.props.keyboardHeight + 8 }
          ]}
          round={60}
          gradient={this.state.value}
          color={Colors.coolGrey}
          onPress={this.onNext}>
          <Image source={Icons.right} />
        </Touchable>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  keyboardHeight: state.app.deviceKeyboardHeight
})

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address)
