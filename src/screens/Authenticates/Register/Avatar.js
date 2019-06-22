import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import ImagePicker from 'react-native-image-crop-picker'

import { Container, Button, ActionSheet } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import { actions } from 'redux/reducers/user'

import { Icons, Images } from 'images'
import { Colors, Metrics, Styles } from 'themes'

class Avatar extends React.Component {
  state = { path: null, showPicker: false }

  onNext = () => {
    if (this.state.path) {
      this.props.setUserInfo({ avatar: this.state.path })
      this.props.push({screen:'RegisterFirstGuard'})
    }
  }

  renderActionSheet() {
    if (this.state.showPicker) {
      return (
        <ActionSheet
          options={[
            {
              title: 'Chụp ảnh',
              onPress: () => {
                ImagePicker.openCamera({
                  width: 640,
                  height: 640,
                  cropping: true,
                  compressImageQuality: 0.3,
                  includeBase64: true
                }).then(({ data, mime }) =>
                  this.setState({
                    path: `data:${mime};base64,${data}`,
                    showPicker: false
                  })
                )
              }
            },
            {
              title: 'Chọn từ thư viện',
              onPress: () => {
                ImagePicker.openPicker({
                  width: 640,
                  height: 640,
                  cropping: true,
                  compressImageQuality: 0.3,
                  includeBase64: true
                }).then(({ data, mime }) =>
                  this.setState({
                    path: `data:${mime};base64,${data}`,
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
        centerHorizontal
        buttons={{
          left: [{ icon: Icons.back, onPress: () => this.props.pop() }]
        }}
        frontComponent={this.renderActionSheet()}>
        <Text color={Colors.coral} bold center>
          Ảnh chân dung của bạn là gì?
        </Text>

        <Touchable
          round={100}
          style={{ marginVertical: 72 }}
          onPress={() => this.setState({ showPicker: true })}>
          {this.state.path ? (
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50
              }}
              source={{ uri: this.state.path }}
            />
          ) : (
            <View
              center
              style={{
                width: 150,
                height: 150
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50
                }}
                source={Images.defaultAvatar}
              />

              <Image
                style={{
                  width: 40,
                  height: 40,
                  bottom: 20,
                  right: 20,
                  position: 'absolute'
                }}
                source={Icons.add}
              />
            </View>
          )}
        </Touchable>

        <Text tiny center>
          Ảnh chân dung của bạn phải thấy rõ mặt.
        </Text>

        <Touchable
          style={{ marginVertical: 46 }}
          round={60}
          gradient={this.state.path}
          color={Colors.coolGrey}
          onPress={this.onNext}>
          <Image source={Icons.right} />
        </Touchable>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  null,
  mapDispatchToProps
)(Avatar)
