import React from 'react'
import PropTypes from 'prop-types'
import { Image, ImageBackground, Keyboard, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import ImagePicker from 'react-native-image-crop-picker'

import { Container, ActionSheet } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import { selectors } from 'reducers/app'
import { actions } from 'reducers/user'

import { Icons, Images } from 'images'
import { Colors, Metrics, Styles } from 'themes'

class Identification extends React.Component {
  state = {
    value: __DEV__ && '123456789',
    front: null,
    back: null,
    isUnvalid: false,
    isSelected: null,
    showPicker: false
  }

  onNext = () => {
    if (this.state.value.length < 9 || !this.state.front || !this.state.back) {
      this.setState({ isUnvalid: true })
    } else {
      this.props.setUserInfo({
        certificate_number: this.state.value,
        certificate_front: this.state.front,
        certificate_back: this.state.back
      })

      this.props.push({screen:'RegisterAvatar'})
    }
  }

  onClearText = () => {
    this.setState({ value: '' })
  }

  onChangeText = value => {
    this.setState({ value }, () => {
      if (this.state.value.length === 9) {
        this.setState({ isUnvalid: false })
      }
    })
  }

  renderImagePicker() {
    if (this.state.showPicker) {
      return (
        <ActionSheet
          options={[
            {
              title: 'Chụp ảnh',
              onPress: () => {
                ImagePicker.openCamera({
                  compressImageMaxWidth: 800,
                  compressImageQuality: 0.3,
                  includeBase64: true
                }).then(({ data, mime }) =>
                  this.setState({
                    [this.state.isSelected]: `data:${mime};base64,${data}`,
                    showPicker: false
                  })
                )
              }
            },
            {
              title: 'Chọn từ thư viện',
              onPress: () => {
                ImagePicker.openPicker({
                  compressImageMaxWidth: 800,
                  compressImageQuality: 0.3,
                  includeBase64: true
                }).then(({ data, mime }) =>
                  this.setState({
                    [this.state.isSelected]: `data:${mime};base64,${data}`,
                    showPicker: false
                  })
                )
              }
            }
          ]}
          onCancel={() => this.setState({ showPicker: false })}
        />
      )
    }
  }

  render() {
    return (
      <Container
        padding={38}
        buttons={{
          left: [{ icon: Icons.back, onPress: () => this.props.pop() }]
        }}
        frontComponent={this.renderImagePicker()}>
        <Text color={Colors.coral} bold center>
          Số CMND của bạn là gì?
        </Text>

        <TextInput
          ref="input"
          value={this.state.value}
          error={this.state.isUnvalid}
          errorText="Vui lòng nhập số CMND hợp lệ và cập nhật ảnh đầy đủ"
          style={[
            Styles.input.round,
            { backgroundColor: Colors.veryLightPink }
          ]}
          containerStyle={{ marginVertical: 24 }}
          keyboardType="numeric"
          returnKeyType="next"
          placeholder="Nhập số CMND"
          onClearText={this.onClearText}
          onChangeText={this.onChangeText}
        />

        <View
          row
          style={{ paddingHorizontal: 10, justifyContent: 'space-around' }}>
          <View>
            <Touchable
              style={{
                width: 100,
                height: 100,
                marginVertical: 12,
                borderRadius: 10
              }}
              onPress={() => {
                Keyboard.dismiss()
                this.setState({ isSelected: 'front', showPicker: true })
              }}>
              {this.state.front ? (
                <ImageBackground
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    justifyContent: 'center'
                  }}
                  source={{ uri: this.state.front }}>
                  <Image
                    style={{ alignSelf: 'center' }}
                    source={Icons.camera}
                  />
                </ImageBackground>
              ) : (
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain'
                  }}
                  source={Images.imagePicker}
                />
              )}
            </Touchable>

            <Text center small>
              Mặt trước
            </Text>
          </View>

          <View>
            <Touchable
              style={{
                width: 100,
                height: 100,
                marginVertical: 12,
                borderRadius: 10
              }}
              onPress={() => {
                Keyboard.dismiss()
                this.setState({ isSelected: 'back', showPicker: true })
              }}>
              {this.state.back ? (
                <ImageBackground
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    justifyContent: 'center'
                  }}
                  source={{ uri: this.state.back }}>
                  <Image
                    style={{ alignSelf: 'center' }}
                    source={Icons.camera}
                  />
                </ImageBackground>
              ) : (
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain'
                  }}
                  source={Images.imagePicker}
                />
              )}
            </Touchable>

            <Text center small>
              Mặt sau
            </Text>
          </View>
        </View>

        <Touchable
          style={[
            Styles.button.next,
            { bottom: this.props.keyboardHeight + 8 }
          ]}
          round={60}
          gradient={
            this.state.value.length === 9 && this.state.front && this.state.back
          }
          color={Colors.coolGrey}
          onPress={this.onNext}>
          <Image source={Icons.right} />
        </Touchable>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  keyboardHeight: selectors.getKeyboardHeight(state)
})

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Identification)
