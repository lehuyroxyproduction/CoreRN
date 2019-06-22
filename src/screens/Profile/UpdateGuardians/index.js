import React from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'

import { Container, Button } from 'components'
import { View, Text } from 'components/uielements'

import { Icons } from 'images'

import { actions, selectors } from 'reducers/user'
import { selectors as appSelectors } from 'reducers/app'

import Field from '../Field'

type Props = {}
type State = {}

class UpdateGuardians extends React.Component<Props, State> {
  state = {
    guardian1: { name: '', title: '', yearOfBirth: '', phoneNumber: '' },
    guardian2: { name: '', title: '', yearOfBirth: '', phoneNumber: '' }
  }

  setDataToState = (pos, key, value) => {
    if (pos === 0) {
      this.setState({ guardian1: { ...this.state.guardian1, [key]: value } })
    } else {
      this.setState({ guardian2: { ...this.state.guardian2, [key]: value } })
    }
  }

  onSubmit = () => {
    const { guardian1, guardian2 } = this.state

    const currentYear = new Date().getFullYear()

    const {
      name: name1,
      title: title1,
      yearOfBirth: yearOfBirth1,
      phoneNumber: phoneNumber1
    } = guardian1

    const {
      name: name2,
      title: title2,
      yearOfBirth: yearOfBirth2,
      phoneNumber: phoneNumber2
    } = guardian2

    if (!name1) {
      alert('Bạn chưa nhập tên người thân 1')
    } else if (!name2) {
      alert('Bạn chưa nhập tên người thân 2')
    } else if (!title1) {
      alert('Bạn chưa nhập mối quan hệ với người thân 1')
    } else if (!title2) {
      alert('Bạn chưa nhập mối quan hệ với người thân 1')
    } else if (currentYear - Number(yearOfBirth1) < 18) {
      alert(
        'Bạn chưa nhập năm sinh của người thân 1 hoặc người thân 1 chưa đủ 18 tuổi'
      )
    } else if (currentYear - Number(yearOfBirth2) < 18) {
      alert(
        'Bạn chưa nhập năm sinh của người thân 2 hoặc người thân 2 chưa đủ 18 tuổi'
      )
    } else if (!phoneNumber1) {
      alert('Bạn chưa nhập số điện thoại người thân 1')
    } else if (!phoneNumber2) {
      alert('Bạn chưa nhập số điện thoại người thân 2')
    } else {
      this.props.updateUserInfo({ guardians: [guardian1, guardian2] })
    }
  }

  render() {
    // console.log('state', this.state)

    const { guardian1, guardian2 } = this.state

    return (
      <Container
        title="Thông tin người thân"
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
          <View style={{ marginVertical: 16 }}>
            <Text bold>Người thân 1</Text>

            <Field
              label="Họ và tên"
              returnKeyType="next"
              content={guardian1.name}
              onChangeText={name => this.setDataToState(0, 'name', name.trim())}
              onSubmitEditing={() => this.refs.title1.focus()}
            />

            <Field
              ref="title1"
              label="Quan hệ"
              returnKeyType="next"
              content={guardian1.title}
              onChangeText={title =>
                this.setDataToState(0, 'title', title.trim())}
              onSubmitEditing={() => this.refs.yearOfBirth1.focus()}
            />

            <Field
              ref="yearOfBirth1"
              label="Năm sinh"
              returnKeyType="next"
              keyboardType="numeric"
              content={guardian1.yearOfBirth}
              onChangeText={yearOfBirth =>
                this.setDataToState(0, 'yearOfBirth', yearOfBirth.trim())}
              onSubmitEditing={() => this.refs.phoneNumber1.focus()}
            />

            <Field
              ref="phoneNumber1"
              label="Số điện thoại"
              returnKeyType="next"
              content={guardian1.phoneNumber}
              onChangeText={phoneNumber =>
                this.setDataToState(0, 'phoneNumber', phoneNumber.trim())}
              onSubmitEditing={() => this.refs.name2.focus()}
            />
          </View>

          <View style={{ marginVertical: 16 }}>
            <Text bold>Người thân 2</Text>

            <Field
              ref="name2"
              label="Họ và tên"
              returnKeyType="next"
              content={guardian2.name}
              onChangeText={name => this.setDataToState(1, 'name', name.trim())}
              onSubmitEditing={() => this.refs.title2.focus()}
            />

            <Field
              ref="title2"
              label="Quan hệ"
              returnKeyType="next"
              content={guardian2.title}
              onChangeText={title =>
                this.setDataToState(1, 'title', title.trim())}
              onSubmitEditing={() => this.refs.yearOfBirth2.focus()}
            />

            <Field
              ref="yearOfBirth2"
              label="Năm sinh"
              returnKeyType="next"
              keyboardType="numeric"
              content={guardian2.yearOfBirth}
              onChangeText={yearOfBirth =>
                this.setDataToState(1, 'yearOfBirth', yearOfBirth.trim())}
              onSubmitEditing={() => this.refs.phoneNumber2.focus()}
            />

            <Field
              ref="phoneNumber2"
              label="Số điện thoại"
              content={guardian2.phoneNumber}
              onChangeText={phoneNumber =>
                this.setDataToState(1, 'phoneNumber', phoneNumber.trim())}
            />
          </View>
        </ScrollView>

        <Button
          bold
          gradient
          label={'HOÀN TẤT'}
          labelColor="white"
          //   isLoading={this.props.isLoading}
          onPress={this.onSubmit}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  keyboardHeight: appSelectors.getKeyboardHeight(state),
  isLoading: selectors.getLoading(state, 'updateUserInfo')
})

const mapDispatchToProps = dispatch => ({
  updateUserInfo: userInfo => dispatch(actions.updateUserInfo({ userInfo }))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGuardians)
