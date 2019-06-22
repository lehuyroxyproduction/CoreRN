import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Image, TouchableOpacity } from 'react-native'

import { Container } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import { selectors as appSelectors } from 'redux/reducers/reducerApp'
import { actions } from 'redux/reducers/user'

import { Icons, Images } from 'images'
import { Colors } from 'themes'

class Verify extends React.Component {
  box = new Array(5).fill(0)

  state = { value: __DEV__ ? '12345' : null, time: 15 }

  static propTypes = {
    phoneNumber: PropTypes.string
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyboardHeight === 0) {
      this.refs.hidden.blur()
    }
  }

  startTimer() {
    this.timer = setInterval(
      () =>
        this.setState(prevState => ({
          time: prevState.time - 1
        })),
      1000
    )
  }

  clearTimer() {
    clearInterval(this.timer)
  }

  shouldComponentUpdate(nextProps, nextState) {
    switch (nextState.time) {
      case 0:
        this.clearTimer()
        break
      //   case 15:
      //     this.startTimer()
      //     break
    }

    return true
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
        onPress: () => this.props.pop()
      }
    ])
  }

  onNext = () => {
    if (this.state.value && this.state.value.length === 5) {
      this.props.push({screen:'RegisterName'})

      this.props.setUserInfo({ phoneNumber: this.props.phoneNumber })
    }
  }

  renderTimer() {
    let onPress = () => {}
    let title = `Vui lòng chờ trong ${this.state.time}`

    if (this.state.time === 0) {
      onPress = () =>
        this.setState({ time: 15, value: '' }, () => this.startTimer())
      title = 'Gửi lại mã'
    }

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={{ marginVertical: 24 }} color="white" center>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { value } = this.state

    return (
      <Container
        padding={38}
        background={Images.loginBackground}
        isDrawnUnderNavbar>
        <Text center bold color="white" style={{ marginTop: 40 }}>
          Nhập mã xác thực
        </Text>

        <Text center small color="white" style={{ marginVertical: 8 }}>
          Nhập mã gồm 4 chữ số đã được gửi đến số {`\n`}
          {this.props.phoneNumber}
        </Text>

        <TouchableOpacity
          style={{ marginBottom: 24 }}
          onPress={this.onChangePhoneNumber}>
          <Text color="white" bold underline center>
            Đổi SĐT
          </Text>
        </TouchableOpacity>

        <TextInput
          ref="hidden"
          style={{
            width: 0,
            height: 0,
            padding: 0
          }}
          maxLength={5}
          keyboardType="numeric"
          onChangeText={value => this.setState({ value })}
        />

        <View row style={{ justifyContent: 'space-around' }}>
          {this.box.map((i, idx) => (
            <Touchable
              key={idx}
              style={{ width: 44, height: 44, borderRadius: 8 }}
              color="white"
              onPress={() => this.refs.hidden.focus()}>
              <Text bold>
                {value && value.length >= idx + 1 ? value[idx] : ''}
              </Text>
            </Touchable>
          ))}
        </View>

        <View
          row
          absolute
          centerHorizontal
          style={{
            left: 24,
            right: 24,
            bottom: this.props.keyboardHeight + 12,
            justifyContent: 'space-between'
          }}>
          {this.renderTimer()}

          <Touchable
            round={60}
            color={value && value.length === 5 ? 'white' : Colors.dark}
            onPress={this.onNext}>
            <Image
              style={{
                tintColor: !(value && value.length === 5)
                  ? 'white'
                  : Colors.tomato
              }}
              source={Icons.right}
            />
          </Touchable>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  keyboardHeight: appSelectors.getKeyboardHeight(state)
})

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify)
