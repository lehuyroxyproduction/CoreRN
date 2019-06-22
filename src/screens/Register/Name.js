import React from 'react'
import { connect } from 'react-redux'
import { Alert, Image, StyleSheet } from 'react-native'

import PropTypes from 'prop-types'

import { Container } from 'components'
import { Text, TextInput, Touchable } from 'components/uielements'

import { actions } from 'reducers/user'
import { actions as authActions } from 'reducers/auth'

import { Icons } from 'images'
import { Colors, Styles } from 'themes'

import convert from 'utils/converter'

class Name extends React.Component {
  state = {
    value: __DEV__ ? 'tran trung ton' : '',
    isUnvalid: false
  }

  onNext = () => {
    let full_name = this.state.value

    if (!full_name) {
      this.setState({ isUnvalid: true })
    } else {
      full_name = convert.toCapital(this.state.value.trim())

      const name = full_name.split(' ')
      const first_name = name[name.length - 2]

      this.props.setUserInfo({
        first_name,
        last_name: full_name.replace(first_name, '')
      })

      this.props.push({screen:'RegisterDob'})
    }
  }

  onClearText = () => {
    this.setState({ value: '' })
  }

  onChangeText = value => {
    this.setState({ value }, () => {
      if (this.state.value.trim()) {
        this.setState({ isUnvalid: false })
      }
    })
  }

  onChangePhoneNumber = () => {
    Alert.alert('', 'Bạn muốn thay đổi số điện thoại?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => this.props.logout()
      }
    ])
  }

  render() {
    return (
      <Container
        padding={38}
        buttons={{
          left: [{ icon: Icons.back, onPress: this.onChangePhoneNumber }]
        }}>
        <Text color={Colors.coral} bold center>
          Bạn tên gì ?
        </Text>

        <TextInput
          ref="input"
          autoFocus
          value={this.state.value}
          error={this.state.isUnvalid}
          errorText="Vui lòng nhập họ và tên hợp lệ"
          style={[
            Styles.input.round,
            { backgroundColor: Colors.veryLightPink }
          ]}
          containerStyle={{ marginVertical: 24 }}
          returnKeyType="next"
          placeholder="Nhập họ và tên"
          onClearText={this.onClearText}
          onChangeText={this.onChangeText}
        />

        <Text tiny center>
          Dùng tên thật giúp nhà tuyển dụng dễ dàng nhận ra bạn
        </Text>

        <Touchable
          style={[
            Styles.button.next,
            { bottom: this.props.keyboardHeight + 8 }
          ]}
          round={60}
          gradient={this.state.value.trim()}
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
  logout: () => dispatch(authActions.logout()),
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name)
