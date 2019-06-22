import React from 'react'
import { connect } from 'react-redux'
import { Image, Keyboard } from 'react-native'

import { Container } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import { actions, selectors } from 'redux/reducers/user'
import {
  actions as authActions,
  selectors as authSelectors
} from 'redux/reducers/auth'

import { actions as appActions, selectors as appSelectors } from 'redux/reducers/reducerApp'

import { Icons, Images } from 'images'
import { Colors, Styles } from 'themes'

class Login extends React.PureComponent {
  state = {
    value: '84934777708',
    password: '',
    isUnValid: false,
    isUnValidPassword: false
  }

  validate = phoneNumber => {
    // const vnPhoneRegex = /0+([0-9]{9,10})\b/g

    // return vnPhoneRegex.test(phoneNumber)
    return true
  }

  requestOtp = phoneNumber => {
    this.props.login(phoneNumber)
  }

  onNext = () => {
    const { value } = this.state

    if (this.validate(value)) {
      Keyboard.dismiss()

      //   this.requestOtp(value)
      //   this.props.push('Verify', { phoneNumber: value })

      if (this.state.password === '123456') {
        this.login(value)

        this.setState({ isUnValid: false })
      } else {
        alert('Mật khẩu không đúng, vui lòng kiểm tra lại.')
      }
    } else {
      this.setState({ isUnValid: true })
    }
  }

  onClearText = () => {
    this.setState({ value: '' })
  }

  login = phoneNumber => {
    this.props.setUserInfo({ phone_number: phoneNumber })

    this.props.login({ phoneNumber })
  }

  onChangeText = value => {
    this.setState({ value }, () => {
      if (this.validate(value)) {
        this.setState({ isUnValid: false })
      }
    })
  }

  render() {
    const { value, isUnValid } = this.state

    return (
      <Container
        padding={38}
        background={Images.loginBackground}
        isDrawnUnderNavbar>
        <Text center bold color="white" style={{ marginTop: 40 }}>
          Nhập số điện thoại
        </Text>

        <Text
          center
          small
          color="white"
          style={{ marginTop: 8, marginBottom: 24 }}>
          Dùng số điện thoại để đăng ký và sử dụng các dịch vụ ưu đãi của Ezjob
        </Text>

        <TextInput
          ref="input"
          autoFocus
          value={this.state.value}
          style={Styles.input.round}
          errorTextColor="white"
          keyboardType="numeric"
          placeholder="Nhập số điện thoại"
          error={isUnValid}
          errorText="Vui lòng nhập số điện thoại hợp lệ"
          onClearText={this.onClearText}
          onChangeText={this.onChangeText}
        />

        <TextInput
          ref="input"
          autoFocus
          secureTextEntry
          value={this.state.password}
          style={[Styles.input.round, { marginTop: 16 }]}
          errorTextColor="white"
          keyboardType="numeric"
          placeholder="Nhập mật khẩu"
          onChangeText={password => this.setState({ password })}
        />

        <Touchable
          style={[
            Styles.button.next,
            { bottom: this.props.keyboardHeight + 8 }
          ]}
          round={60}
          color={!this.validate(value) ? Colors.dark : 'white'}
          onPress={this.onNext}>
          <Image
            style={{
              tintColor: this.validate(value) ? Colors.tomato : 'white'
            }}
            source={Icons.right}
          />
        </Touchable>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  netInfo: appSelectors.getNetInfo(state),
  status: authSelectors.getStatus(state),
  isLoading: authSelectors.getLoading(state),
  serverConnection: appSelectors.getServerConnection(state),
  keyboardHeight: appSelectors.getKeyboardHeight(state)
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(authActions.login(user)),
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
