import React from 'react'
import { connect } from 'react-redux'
import { Image, ScrollView, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native'

import moment from 'moment'

import { Button, Container, DropDown, DateTimePicker, ImagePicker } from 'components'
import { View, Text } from 'components/uielements'

import convert from 'utils/converter'
import { Colors, Fonts, Metrics, Styles } from 'themes'

import Field from '../Field'
import Toast from 'components/Toast'
import { userActions, userSelectors, appSelectors } from 'reducers'
import { Navigation } from 'react-native-navigation'

const FEMALE = 0

class PersonalInfo extends React.Component {
  state = {
    isEditMode: false,
    isDataEdited: false,
    showImagePicker: false,
    isFrontCertificate: false,
    isBackCertificate: false,
    errorString: ''
  }

  componentDidMount() {
    const {
      staff_code,
      imei,
      first_name,
      last_name,
      avatar,
      certificate_number,
      certificate_front,
      certificate_back,
      birth_date,
      gender,
      current_address,
      job_title,
      permanent_address
    } = this.props.user

    this.setState({
      staff_code,
      imei,
      fullname: last_name + ' ' + first_name,
      avatar: avatar + `?${new Date()}`,
      certificate_number,
      certificate_front: certificate_front + `?${new Date()}`,
      certificate_back: certificate_back + `?${new Date()}`,
      birth_date,
      gender,
      current_address,
      job_title,
      permanent_address
    })
  }

  componentWillUnmount() {
    DateTimePicker.hide()
  }

  onUpdate = () => {
    const { isDataEdited } = this.state

    console.log('onUpdate-----------', isDataEdited)
    if (isDataEdited) {
      let { isFirstUpdate } = this.props
      let {
        staff_code,
        imei,
        fullname,
        avatar,
        certificate_number,
        certificate_front,
        certificate_back,
        birth_date,
        gender,
        current_address,
        job_title,
        permanent_address
      } = this.state
      if (!gender) {
        gender = FEMALE
      }

      let full_name = ''
      if (fullname.trim()) {
        full_name = convert.toCapital(fullname.trim())
      }
      const name = full_name.split(' ')

      const first_name = name[name.length - 2]
      const last_name = full_name.replace(first_name, '').trim()

      console.log('-=======================validateUserAge', this.validateUserAge(birth_date))
      // if (this.validateUserData(full_name, avatar,
      //   certificate_number, certificate_front, certificate_back,
      //   birth_date, gender, current_address, permanent_address)) {
      //   Alert.alert(
      //     'Các thông tin sau chưa đầy đủ:',
      //     this.state.errorString,
      //     [
      //       {
      //         text: 'Hủy',
      //         onPress: () => this.setState({ isEditMode: false }),
      //         style: 'cancel'
      //       },
      //       {
      //         text: 'Tiếp tục',
      //         onPress: () => this.setState({ isEditMode: true }),
      //         style: 'OK'
      //       }
      //     ]
      //   )
      // } else {
      // let isFirstUpdate = (this.props.isFirstUpdate && this.props.isFirstUpdate) || null
      let onSuccess = null
      if (isFirstUpdate) {
        onSuccess = () =>
          this.showAlert({
            type: 'success',
            title: 'Thành công',
            description: 'Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng ký công việc ngay bây giờ',
            onPress: () => this.props.push({ screen: 'Jobs' })
          })
      }
      let onFailed = description =>
        this.showAlert({
          type: 'error',
          title: 'Thất bại',
          description
        })
      console.log('====================onSuccess', onSuccess)
      let userInfo = {
        staff_code,
        imei,
        first_name,
        last_name,
        avatar,
        certificate_number,
        certificate_front,
        certificate_back,
        birth_date,
        gender: Number(gender),
        current_address,
        job_title,
        permanent_address
      }
      this.props.updateUserInfo({ userInfo, onSuccess, onFailed })
    }
  }

  checkInputAge = onSuccess => {
    if (!this.state.isEditMode) {
      return onSuccess && onSuccess()
    }
    let {
      fullname,
      avatar,
      certificate_number,
      certificate_front,
      certificate_back,
      birth_date,
      gender,
      current_address,
      permanent_address
    } = this.state
    let full_name = ''
    if (fullname.trim()) {
      full_name = convert.toCapital(fullname.trim())
    }
    if (this.validateUserAge(birth_date)) {
      return this.showAlert({
        type: 'error',
        title: 'Thất bại',
        description:
          'Rất tiếc bạn chưa đủ tuổi lao động, Tài khoản không được kích hoạt. Vui lòng quay lại sau khi đủ tuổi lao động'
      })
    }
    if (
      this.validateUserData(
        full_name,
        avatar,
        certificate_number,
        certificate_front,
        certificate_back,
        birth_date,
        gender,
        current_address,
        permanent_address
      )
    ) {
      return Alert.alert('Các thông tin sau chưa đầy đủ:', this.state.errorString, [
        {
          text: 'Hủy',
          onPress: () => this.setState({ isEditMode: false }),
          style: 'cancel'
        },
        {
          text: 'Tiếp tục',
          onPress: () => this.setState({ isEditMode: true }),
          style: 'OK'
        }
      ])
    } else {
      return onSuccess && onSuccess()
    }
  }

  showAlert({ title, type, description, hasInput, ...others }) {
    this.props.showModal({
      screen: 'Alert',
      passProps: {
        title,
        type,
        description,
        hasInput,
        ...others
      },
      options: {
        ...Styles.modalStyle
      }
    })
  }

  validateUserAge(birthDay) {
    console.log('validateUserAge--------------', moment().diff(moment.unix(birthDay), 'years'), birthDay)
    let age = moment().diff(moment.unix(birthDay), 'years')
    // if (age < 18) { return true } else { return false }
    return age < 18
  }

  onDataChanged = (name, value) => {
    this.setState({
      isDataEdited: true,
      [name]: value
    })
  }

  renderDateTimePicker = () => {
    const { isEditMode, birth_date } = this.state

    if (isEditMode) {
      DateTimePicker.showDatePicker({
        defaultDate: birth_date,
        onSelect: birth_date => this.onDataChanged('birth_date', birth_date),
        onCancel: birth_date => this.onDataChanged('birth_date', birth_date)
      })
    }
  }

  renderImagePicker() {
    const { isEditMode, isFrontCertificate, isBackCertificate, showImagePicker } = this.state

    const onCancel = () => this.setState({ showImagePicker: false })

    if (isEditMode && showImagePicker) {
      return (
        <ImagePicker
          disableGalleryOption={!isFrontCertificate && !isBackCertificate}
          onCancel={onCancel}
          onSelected={base64 => {
            if (!isFrontCertificate && !isBackCertificate) {
              this.onDataChanged('avatar', base64)
            } else if (isFrontCertificate) {
              this.onDataChanged('certificate_front', base64)
            } else {
              this.onDataChanged('certificate_back', base64)
            }

            onCancel()
          }}
        />
      )
    }

    return null
  }

  validateUserData(
    full_name,
    avatar,
    certificate_number,
    certificate_front,
    certificate_back,
    birth_date,
    gender,
    current_address,
    permanent_address
  ) {
    let errorString = ''
    if (!full_name.trim()) {
      errorString += '[Họ và tên] chưa nhập\n'
    }
    if (!birth_date) {
      errorString += '[Ngày tháng năm sinh] chưa nhập\n'
    }
    if (!gender) {
      errorString += '[Giới tính] chưa nhập\n'
    }
    if (!current_address.trim()) {
      errorString += '[Địa chỉ hiện tại] chưa nhập\n'
    }
    if (!permanent_address.trim()) {
      errorString += '[Địa chỉ thường trú] chưa nhập\n'
    }
    if (!certificate_number.trim()) {
      errorString += '[CMND] chưa nhập\n'
    }

    if (!certificate_front.trim() || certificate_front.trim().substring(0, 1) === '?') {
      errorString += '[CMND mặt trước] chưa nhập\n'
    }
    if (!certificate_back.trim() || certificate_back.trim().substring(0, 1) === '?') {
      errorString += '[CMND mặt sau] chưa nhập\n'
    }
    if (!avatar.trim() || avatar.trim().substring(0, 1) === '?') {
      errorString += '[Hình đại diện] chưa nhập\n'
    }
    if (errorString) {
      this.setState({ errorString })
      return true
    }
    return false
  }

  render() {
    const {
      isEditMode,
      staff_code,
      imei,
      fullname,
      avatar,
      certificate_number,
      certificate_front,
      certificate_back,
      birth_date,
      gender,
      permanent_address,
      job_title,
      current_address
    } = this.state
    let { isLoading } = this.props
    return (
      <Container isNavbarHidden>
        <ScrollView
          style={[
            styles.scrollview,
            { marginBottom: this.props.keyboardHeight && (this.props.keyboardHeight - (45 + this.props.bottomTabsHeight)) || 0 }
          ]}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              borderRadius: 90 / 2,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.veryLightPink
            }}
            disabled={!isEditMode}
            onPress={() => {
              this.setState(
                {
                  showImagePicker: true,
                  isFrontCertificate: false,
                  isBackCertificate: false
                },
                () => Keyboard.dismiss()
              )
            }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 80 / 2
              }}
              resizeMethod="scale"
              source={{ uri: avatar }}
            />

            {isEditMode && (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#rgba(0,0,0,.5)'
                }}>
                <Text color="white" style={{ fontSize: 36 }}>
                  +
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <Field
            style={{ marginTop: 24 }}
            label="Mã GHN"
            content={staff_code}
            isEditMode={isEditMode}
            onChangeText={staff_code => this.onDataChanged('staff_code', staff_code)}
          />

          <Field
            style={{ marginTop: 24 }}
            label="IMEI"
            content={imei}
            isEditMode={isEditMode}
            onChangeText={imei => this.onDataChanged('imei', imei)}
          />

          <Field
            label="Họ và tên"
            content={fullname}
            isRequired={true}
            isEditMode={isEditMode}
            onChangeText={fullname => this.onDataChanged('fullname', fullname)}
          />

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Ngày tháng năm sinh
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <TouchableOpacity
              style={[styles.pickerButton, { borderWidth: isEditMode ? 1 : 0 }]}
              accessible={isEditMode}
              onPress={this.renderDateTimePicker}>
              <Text bold small>
                {moment.unix(birth_date).format('DD/MM/YYYY')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 12 }}>
            <Text small>
              Giới tính
              <Text small color={Colors.coral}>
                *
              </Text>
              :
            </Text>

            <DropDown
              disabled={!isEditMode}
              style={{
                marginTop: 2,
                paddingVertical: 12,
                borderColor: Colors.coral,
                borderWidth: isEditMode ? 1 : 0,
                backgroundColor: Colors.veryLightPink
              }}
              textStyle={{
                marginLeft: 12,
                color: Colors.steel,
                fontSize: 16,
                fontFamily: Fonts.face.bold
              }}
              dropdownStyle={{
                width: Metrics.screen.width - 48,
                height: 80
              }}
              dropdownTextStyle={{
                marginLeft: 12,
                color: Colors.steel,
                fontSize: 16,
                fontFamily: Fonts.face.bold
              }}
              defaultValue={gender === FEMALE ? 'Nữ' : 'Nam'}
              options={['Nữ', 'Nam']}
              onSelect={(i, value) => {
                this.onDataChanged('gender', i)
              }}
            />
          </View>

          <Field
            label="Địa chỉ hiện tại"
            content={current_address}
            isRequired={true}
            isEditMode={isEditMode}
            onChangeText={current_address => this.onDataChanged('current_address', current_address)}
          />

          <Field
            label="Địa chỉ thường trú"
            content={permanent_address}
            isRequired={true}
            isEditMode={isEditMode}
            onChangeText={permanent_address => this.onDataChanged('permanent_address', permanent_address)}
          />

          <Field
            label="Công việc hiện tại"
            content={job_title}
            isRequired={false}
            isEditMode={isEditMode}
            onChangeText={job_title => this.onDataChanged('job_title', job_title)}
          />

          <Field
            label="CMND"
            content={certificate_number}
            isRequired={true}
            isEditMode={isEditMode}
            onChangeText={certificate_number => this.onDataChanged('certificate_number', certificate_number)}
          />

          <View style={styles.fieldWrapper}>
            <Text small>Mặt trước:</Text>

            <TouchableOpacity
              disabled={!isEditMode}
              onPress={() => {
                Keyboard.dismiss()
                this.setState({
                  showImagePicker: true,
                  isFrontCertificate: true,
                  isBackCertificate: false
                })
              }}>
              {!certificate_front ||
                certificate_front.trim().substring(0, 1) === '?' &&
                  <Text
                    style={{
                      fontSize: 48,
                      color: Colors.warmGrey,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    +
                  </Text> ||
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: certificate_front }}
                    resizeMode="stretch"
                    // resizeMethod="scale"
                  />
              }
            </TouchableOpacity>
          </View>

          <View style={styles.fieldWrapper}>
            <Text small>Mặt sau:</Text>

            <TouchableOpacity
              disabled={!isEditMode}
              onPress={() => {
                Keyboard.dismiss()
                this.setState({
                  showImagePicker: true,
                  isFrontCertificate: false,
                  isBackCertificate: true
                })
              }}>
              {!certificate_back ||
                certificate_back.trim().substring(0, 1) === '?' &&
                  <Text
                    style={{
                      fontSize: 48,
                      color: Colors.warmGrey,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    +
                  </Text>                 ||
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: certificate_back }}
                    resizeMode="stretch"
                    // resizeMethod="scale"
                  />
              }
            </TouchableOpacity>
          </View>
        </ScrollView>

        {this.renderImagePicker()}

        <Button
          bold
          gradient
          label={isEditMode ? 'HOÀN TẤT CHỈNH SỬA' : 'CHỈNH SỬA'}
          labelColor="white"
          isLoading={isLoading}
          onPress={() => {
            this.checkInputAge(() => {
              this.setState({ isEditMode: !isEditMode })

              this.props.isEditMode(!isEditMode)
              if (isEditMode) {
                return this.onUpdate()
              }
            })
            // this.setState({ isEditMode: !isEditMode })
            // this.props.isEditMode(!isEditMode)
            // if (isEditMode) {
            //   return this.onUpdate()
            // }
          }}
          // this.setState({ isLoading: true }, () => this.props.push('Jobs'))
        />
        <Toast />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  scrollview: {
    paddingHorizontal: 24,
    height: 'auto'
  },
  thumbnail: {
    width: '100%',
    height: 223,
    marginTop: 2
  },
  fieldWrapper: {
    marginVertical: 12
  },
  fieldInput: {
    marginTop: 2,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.veryLightPink
  },
  pickerButton: {
    marginTop: 2,
    paddingLeft: 12,
    paddingVertical: 12,
    borderColor: Colors.coral,
    backgroundColor: Colors.veryLightPink
  }
})

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  toast: appSelectors.getToast(state),
  keyboardHeight: appSelectors.getKeyboardHeight(state),
  bottomTabsHeight: appSelectors.getBottomTabsHeight(state),
  isLoading: userSelectors.getLoading(state, 'updateUserInfo')
})

const mapDispatchToProps = {
  updateUserInfo: userActions.updateUserInfo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo)
