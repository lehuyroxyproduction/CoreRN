import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import moment from 'moment'

import {
  Container,
  Button,
  DateTimePicker,
  DropDown,
  ImagePicker
} from 'components'
import { View, Text } from 'components/uielements'

import { Colors, Fonts, Metrics } from 'themes'
import { Icons } from 'images'

import { actions, selectors } from 'reducers/user'
import { selectors as appSelectors } from 'reducers/app'

import Field from '../Field'

type Props = {}
type State = {}

class UpdateProfile extends React.Component<Props, State> {
  state = {
    avatar: '',
    fullName: '',
    birthDate: moment('04/05/1995', 'DD/MM/YYYY').unix(),
    gender: '',
    current_address: '',
    permanent_address: '',
    certificateNumber: '',
    certificateFront: '',
    certificateBack: '',

    type: '',
    isSameAddress: false,
    imagePickerVisible: false
  }

  onSubmit = () => {
    const {
      avatar,
      fullName,
      gender,
      current_address,
      permanent_address,
      certificateNumber,
      certificateFront,
      certificateBack
    } = this.state

    if (!avatar) {
      alert('Bạn chưa cập nhật ảnh chân dung')
    } else if (!fullName) {
      alert('Bạn chưa nhập tên')
    } else if (!current_address) {
      alert('Bạn chưa nhập địa chỉ hiện tại')
    } else if (!permanent_address) {
      alert('Bạn chưa nhập địa chỉ thường trú')
    } else if (!certificateNumber || certificateNumber.length < 9) {
      alert('Bạn chưa nhập số CMND hoặc số CMND không hợp lệ')
    } else if (!certificateFront) {
      alert('Bạn chưa cập nhật ảnh CMND mặt trước')
    } else if (!certificateBack) {
      alert('Bạn chưa cập nhật ảnh CMND mặt sau')
    } else {
      this.props.updateUserInfo({
        avatar,
        fullName,
        gender,
        current_address,
        permanent_address,
        certificateNumber,
        certificateFront,
        certificateBack
      })

      this.props.push({screen:'UpdateGuardians'})
    }
  }

  showDatePicker = () => {
    DateTimePicker.showDatePicker({
      defaultDate: this.state.birthDate,
      onSelect: birthDate => this.setState({ birthDate }),
      onConfirm: () => this.refs.gender.show(),
      onCancel: birthDate => this.setState({ birthDate })
    })
  }

  renderImagePicker = () => {
    if (this.state.imagePickerVisible) {
      Keyboard.dismiss()

      return (
        <ImagePicker
          disableGalleryOption
          onCancel={() =>
            this.setState({
              imagePickerVisible: false
            })}
          onSelected={base64 =>
            this.setState({
              [this.state.type]: base64,
              imagePickerVisible: false
            })}
        />
      )
    }
  }

  render() {
    return (
      <Container
        title="Thông tin cá nhân"
        buttons={{
          left: [
            {
              icon: Icons.back,
              onPress: () => this.props.pop()
            }
          ]
        }}
      >
        <ScrollView
          style={[
            {
              paddingHorizontal: 16,
              marginBottom:
                this.props.keyboardHeight > 0
                  ? this.props.keyboardHeight - 42
                  : 0
            }
          ]}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* avatar */}
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() =>
              this.setState({
                type: 'avatar',
                imagePickerVisible: true
              })}
          >
            {this.state.avatar
              ? <Image
                  style={styles.avatar}
                  resizeMethod="scale"
                  source={{ uri: this.state.avatar }}
                />
              : <Text bold large>
                  +
                </Text>}
          </TouchableOpacity>

          {/* fullName */}
          <Field
            label="Họ và tên"
            content={this.state.fullName}
            returnKeyType="next"
            onChangeText={fullName =>
              this.setState({ fullName: fullName.trim() })}
            onSubmitEditing={this.showDatePicker}
          />

          {/* birthdate */}
          <View style={{ marginVertical: 10 }}>
            <Text small style={{ marginBottom: 10 }}>
              Ngày sinh:
            </Text>

            <TouchableOpacity
              style={styles.dobContainer}
              onPress={this.showDatePicker}
            >
              <Text bold small>
                {moment.unix(this.state.birthDate).format('DD/MM/YYYY')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* gender */}
          <View style={{ marginVertical: 10 }}>
            <Text small>
              Giới tính
              <Text small color={Colors.coral}>
                *
              </Text>:
            </Text>

            <DropDown
              ref="gender"
              style={{
                marginTop: 2,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: Colors.veryLightPink
              }}
              textStyle={{
                marginLeft: 12,
                color: Colors.steel,
                fontSize: 14,
                fontFamily: Fonts.face.bold
              }}
              dropdownStyle={{
                width: Metrics.screen.width - 32,
                height: 90
              }}
              dropdownTextStyle={{
                marginLeft: 12,
                color: Colors.steel,
                fontSize: 16,
                fontFamily: Fonts.face.bold
              }}
              renderSeparator={() => {
                color: 'white'
              }}
              defaultValue={this.state.gender === 0 ? 'Nữ' : 'Nam'}
              options={['Nữ', 'Nam']}
              onSelect={index => {
                this.setState({ gender: Number(index) })
                this.refs.currentAddress.focus()
              }}
            />
          </View>

          {/* currentAddress */}
          <Field
            ref="currentAddress"
            label="Địa chỉ tạm trú"
            returnKeyType="next"
            content={this.state.current_address}
            onChangeText={current_address =>
              this.setState({ current_address: current_address.trim() })}
            onSubmitEditing={() => this.refs.permanentAddress.focus()}
          />

          {/* permanentAdress */}
          <Field
            ref="permanentAddress"
            label="Địa chỉ thường trú"
            returnKeyType="next"
            content={
              this.state.isSameAddress
                ? this.state.current_address
                : this.state.permanent_address
            }
            onChangeText={permanent_address =>
              this.setState({ permanent_address: permanent_address.trim() })}
            onSubmitEditing={() => this.refs.certificateNumber.focus()}
          />

          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row' }}
            onPress={() => {
              this.setState(
                {
                  isSameAddress: !this.state.isSameAddress
                },
                () => {
                  let permanent_address = ''

                  if (this.state.isSameAddress) {
                    permanent_address = this.state.current_address
                  }

                  this.setState({ permanent_address })
                }
              )
            }}
          >
            <View style={styles.addressCheckBox}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: this.state.isSameAddress
                    ? Colors.coral
                    : 'white'
                }}
              />
            </View>

            <Text small>Địa chỉ thường trú giống với địa chỉ tạm trú</Text>
          </TouchableOpacity>

          {/* certificateNumber */}
          <Field
            ref="certificateNumber"
            label="CMND"
            content={this.state.certificateNumber}
            onChangeText={certificateNumber =>
              this.setState({ certificateNumber: certificateNumber.trim() })}
          />

          {/* certificateFront */}
          <View style={{ marginVertical: 10 }}>
            <Text small style={{ marginBottom: 10 }}>
              Hình CMND mặt trước:
            </Text>

            <TouchableOpacity
              style={styles.imagePlaceholder}
              onPress={() =>
                this.setState({
                  type: 'certificateFront',
                  imagePickerVisible: true
                })}
            >
              {this.state.certificateFront
                ? <Image
                    style={{ width: '100%', height: 200, borderRadius: 8 }}
                    source={{ uri: this.state.certificateFront }}
                  />
                : <Text bold large>
                    +
                  </Text>}
            </TouchableOpacity>
          </View>

          {/* certificatBack */}
          <View style={{ marginVertical: 10 }}>
            <Text small style={{ marginBottom: 10 }}>
              Hình CMND mặt sau:
            </Text>

            <TouchableOpacity
              style={styles.imagePlaceholder}
              onPress={() =>
                this.setState({
                  type: 'certificateBack',
                  imagePickerVisible: true
                })}
            >
              {this.state.certificateBack
                ? <Image
                    style={{ width: '100%', height: 200, borderRadius: 8 }}
                    source={{ uri: this.state.certificateFront }}
                  />
                : <Text bold large>
                    +
                  </Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>

        {this.renderImagePicker()}

        <Button
          bold
          gradient
          label={'TIẾP TỤC'}
          labelColor="white"
          isLoading={this.props.isLoading}
          onPress={this.onSubmit}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.veryLightPink
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2
  },
  dobContainer: {
    marginTop: 2,
    paddingLeft: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: Colors.coral,
    backgroundColor: Colors.veryLightPink
  },
  addressCheckBox: {
    width: 18,
    height: 18,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.coolGrey
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.veryLightPink
  }
})

const mapStateToProps = state => ({
  keyboardHeight: appSelectors.getKeyboardHeight(state),
  isLoading: selectors.getLoading(state, 'updateUserInfo')
})

const mapDispatchToProps = dispatch => ({
  updateUserInfo: userInfo =>
    dispatch(actions.updateUserInfo({ userInfo, isFirstUpdate: true }))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
