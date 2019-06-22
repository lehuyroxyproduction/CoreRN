import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'

import { Button } from 'components'
import { View, Text } from 'components/uielements'

import { selectors, actions } from 'reducers/user'
import { selectors as appSelectors } from 'reducers/app'

import Field from '../Field'

class Guardians extends React.Component {
  state = { isEditMode: false, guardians: [] }

  componentDidMount() {
    this.setState({ guardians: this.props.user.guardians || [] })
  }

  //   componentWillReceiveProps(nextProps) {
  //     if (this.props.user !== nextProps.user) {
  //       this.setState({ guardians: nextProps.guardians })
  //     }
  //   }

  onChangeText = (text, pos) => {
    const { guardians } = this.state

    guardians[pos] = { ...guardians[pos], ...text }

    if (pos === 0) {
      this.setState({
        guardians: [guardians[pos], guardians[1]]
      })
    } else {
      this.setState({
        guardians: [guardians[0], guardians[pos]]
      })
    }
  }

  onUpdate() {
    // const { guardians } = this.state
    this.props.updateUserInfo({ guardians: this.state.guardians })
    /*if (this.validateUserData(guardians)) {

      Alert.alert(
        'Các thông tin sau chưa đầy đủ:',
        this.state.errorString,
        [
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
        ]
      )
    } else {
      this.props.updateUserInfo({ guardians: this.state.guardians })
    }*/
  }

  validateUserData(guardians) {
    let errorString = ''
    if (guardians[0]) {
      if (!guardians[0].name || !guardians[0].name.trim()) {
        errorString += '[Họ và tên] người thân 1 chưa nhập\n'
      }
      if (!guardians[0].title || !guardians[0].title.trim()) {
        errorString += '[Quan hệ] người thân 1 chưa nhập\n'
      }
      if (!guardians[0].year_of_birth || guardians[0].year_of_birth == 0) {
        errorString += '[Năm sinh] người thân 1 chưa nhập\n'
      }
      if (!guardians[0].phone_number || !guardians[0].phone_number.trim()) {
        errorString += '[Số điện thoại] người thân 1 chưa nhập\n'
      }
    }

    if (guardians[1]) {
      if (!guardians[1].name || !guardians[1].name.trim()) {
        errorString += '[Họ và tên] người thân 2 chưa nhập\n'
      }
      if (!guardians[1].title || !guardians[1].title.trim()) {
        errorString += '[Quan hệ] người thân 2 chưa nhập\n'
      }
      if (!guardians[1].year_of_birth || guardians[1].year_of_birth == 0) {
        errorString += '[Năm sinh] người thân 2 chưa nhập\n'
      }
      if (!guardians[1].phone_number || !guardians[1].phone_number.trim()) {
        errorString += '[Số điện thoại] người thân 2 chưa nhập\n'
      }
    }

    if (errorString) {
      this.setState({ errorString })
      return true
    }
    return false
  }

  renderFields(guardian) {
    const { isEditMode, guardians } = this.state
    const name = guardian ? guardian.name : ''
    const title = guardian ? guardian.title : ''
    const year_of_birth = guardian ? guardian.year_of_birth : 0
    const phone_number = guardian ? guardian.phone_number : ''

    const pos = guardians.indexOf(guardian)

    return (
      <View>
        <Field
          label="Họ và tên"
          content={name ? name : ''}
          isRequired={true}
          isEditMode={isEditMode}
          onChangeText={name => this.onChangeText({ name: name.trim() }, pos)}
        />

        <Field
          label="Quan hệ"
          content={title ? title : ''}
          isRequired={true}
          isEditMode={isEditMode}
          onChangeText={title =>
            this.onChangeText({ title: title.trim() }, pos)}
        />

        <Field
          label="Năm sinh"
          content={year_of_birth ? year_of_birth : 0}
          isRequired={true}
          isEditMode={isEditMode}
          onChangeText={year_of_birth =>
            this.onChangeText(
              { year_of_birth: Number(year_of_birth.trim()) },
              pos
            )}
        />

        <Field
          label="Số điện thoại"
          content={phone_number ? phone_number : ''}
          isRequired={true}
          isEditMode={isEditMode}
          onChangeText={phone_number =>
            this.onChangeText({ phone_number: phone_number.trim() }, pos)}
        />
      </View>
    )
  }

  render() {
    const { isEditMode, guardians } = this.state

    const guardian_1 = guardians && guardians.length >= 1 ? guardians[0] : null
    const guardian_2 = guardians && guardians.length >= 2 ? guardians[1] : null

    return (
      <View style={styles.container}>
        <ScrollView
          style={[
            styles.scrollview,
            {
              marginBottom:
                this.props.keyboardHeight > 0
                  ? this.props.keyboardHeight + 45
                  : 80
            }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text bold small style={styles.title}>
            Người thân 1
          </Text>

          {this.renderFields(guardian_1)}

          <Text bold small style={styles.title}>
            Người thân 2
          </Text>

          {this.renderFields(guardian_2)}
        </ScrollView>

        <Button
          bold
          gradient
          label={isEditMode ? 'HOÀN TẤT CHỈNH SỬA' : 'CHỈNH SỬA'}
          labelColor="white"
          style={styles.editButton}
          //   isLoading={this.state.isLoading}
          onPress={() => {
            this.setState({ isEditMode: !isEditMode })

            this.props.isEditMode(!isEditMode)

            if (isEditMode) {
              this.onUpdate()
            }
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  scrollview: {
    paddingHorizontal: 24
  },
  title: {
    marginTop: 50,
    marginBottom: 12
  },
  editButton: {
    bottom: 35,
    position: 'absolute'
  }
})

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  keyboardHeight: appSelectors.getKeyboardHeight(state)
})

const mapDispatchToProps = dispatch => ({
  updateUserInfo: userInfo => dispatch(actions.updateUserInfo({ userInfo }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Guardians)
