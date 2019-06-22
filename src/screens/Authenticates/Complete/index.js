import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Image, StyleSheet } from 'react-native'

import moment from 'moment'

import { Container, Button } from 'components'
import { View, Text, Touchable } from 'components/uielements'

import { Colors, Metrics } from 'themes'

import { Icons, Images } from 'images'

import { actions, selectors } from 'redux/reducers/user'

const none = 'Chưa cập nhật'

class Complete extends React.Component {
  onComplete = () => {
    const { user, updateUserInfo } = this.props

    updateUserInfo(user)
  }

  render() {
    const {
      first_name,
      last_name,
      avatar,
      certificate_number,
      certificate_front,
      certificate_back,
      birth_date,
      gender,
      current_address
    } = this.props.user

    return (
      <Container
        scrollable
        titleColor="black"
        navbarColor="transparent"
        buttons={{
          left: [{ icon: Icons.back, onPress: () => this.props.pop() }]
        }}
        isDrawnUnderNavbar>
        <Image
          source={Images.review}
          style={{ marginTop: 60, alignSelf: 'center' }}
        />

        <Text center bold large style={{ marginTop: 36 }}>
          PHIẾU ĐĂNG KÝ {'\n'} EZJOB
        </Text>

        <Text
          center
          small
          style={{
            lineHeight: 23,
            marginTop: 25,
            marginBottom: 20,
            marginHorizontal: 36
          }}>
          Vui lòng xem lại thông tin bạn đã đăng ký bên dưới. Các mục không bắt
          buộc bạn có thể cập nhật sau trong mục thông tin cá nhân.
        </Text>

        <View
          flex
          style={{
            paddingVertical: 24,
            paddingHorizontal: 12,
            marginHorizontal: 24,
            borderWidth: 0.5,
            borderRadius: 10,
            borderColor: '#rgba(0,0,0,.1)'
          }}>
          {avatar ? (
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: 'center'
              }}
              source={{ uri: avatar }}
            />
          ) : (
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: 'center'
              }}
              background="salmon"
            />
          )}

          <View style={{ marginVertical: 12, marginTop: 24 }}>
            <Text small>
              Họ và tên
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {last_name + first_name || none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Năm sinh
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {moment.unix(birth_date).format('DD/MM/YYYY') || none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Giới tính
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {gender === 0 ? 'Nữ' : 'Nam' || none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Địa chỉ hiện tại
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {current_address || none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>Địa chỉ thường trú:</Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>Công việc hiện tại:</Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              CMND
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {certificate_number || none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>Mặt trước:</Text>

            {certificate_front ? (
              <Image
                style={{ width: '100%', height: 223, marginTop: 2 }}
                background="salmon"
                source={{ uri: certificate_front }}
              />
            ) : (
              <View
                style={{ width: '100%', height: 223, marginTop: 2 }}
                background="salmon"
              />
            )}
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>Mặt sau:</Text>

            {certificate_back ? (
              <Image
                style={{ width: '100%', height: 223, marginTop: 2 }}
                background="salmon"
                source={{ uri: certificate_back }}
              />
            ) : (
              <View
                style={{ width: '100%', height: 223, marginTop: 2 }}
                background="salmon"
              />
            )}
          </View>
        </View>

        <View
          flex
          style={{
            margin: 24,
            paddingVertical: 24,
            paddingHorizontal: 12,
            borderWidth: 0.5,
            borderRadius: 10,
            borderColor: '#rgba(0,0,0,.1)'
          }}>
          <Text center bold small color={Colors.coral}>
            Người thân
          </Text>

          <Text bold small>
            Người thân 1
          </Text>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Họ và tên
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[0].name
                  : none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Quan hệ
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[0].title
                  : none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Năm sinh
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[0].year_of_birth
                  : none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Số điện thoại
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[0].phone_number
                  : none}
              </Text>
            </View>
          </View>

          <Text bold small>
            Người thân 2
          </Text>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Họ và tên
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[1].name
                  : none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Quan hệ
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[1].title
                  : none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Năm sinh
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[1].year_of_birth
                  : none}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Số điện thoại
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <View
              style={{ marginTop: 2, padding: 12, paddingHorizontal: 12 }}
              background={Colors.veryLightPink}>
              <Text bold small>
                {this.props.user.guardians
                  ? this.props.user.guardians[1].phone_number
                  : none}
              </Text>
            </View>
          </View>
        </View>

        <Text small color="white" style={{ margin: 24 }}>
          Tôi đồng ý với các
          <Text small underline color="white">
            Điều khoản dịch vụ
          </Text>
          của Ezjob
        </Text>

        <Button
          bold
          gradient
          label="HOÀN TẤT ĐĂNG KÝ"
          labelColor="white"
          isLoading={this.props.isLoading}
          onPress={this.onComplete}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  isLoading: selectors.getLoading(state, 'updateUserInfo')
})

const mapDispatchToProps = dispatch => ({
  updateUserInfo: userInfo =>
    dispatch(actions.updateUserInfo({ userInfo, isFirstUpdate: true }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Complete)
