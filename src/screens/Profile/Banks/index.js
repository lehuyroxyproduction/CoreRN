import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { Container, Button } from 'components'
import { View, Text } from 'components/uielements'
import { Colors, Fonts, Metrics } from 'themes'

import Field from '../Field'
import DropDown from '../DropDown'

import { actions, selectors } from 'reducers/user'
import { selectors as appSelectors } from 'reducers/app'

type Props = {}
type State = {}

class Banks extends React.Component<Props, State> {
  state = {
    isEditMode: false,

    bank_name: this.props.userInfo.bank_name || 'Ngân hàng Techcombank',
    bank_branch: this.props.userInfo.bank_branch || '',
    bank_account_name: this.props.userInfo.bank_account_name || '',
    bank_account_number: this.props.userInfo.bank_account_number || ''
  }

  onSubmit = () => {
    const { isEditMode, ...userInfo } = this.state

    if (this.state.isEditMode) {
      this.props.updateUserInfo(userInfo)
    }
    this.setState({ isEditMode: !isEditMode })
  }

  render() {
    const {
      isEditMode,
      bank_name,
      bank_branch,
      bank_account_name,
      bank_account_number
    } = this.state

    return (
      <Container isNavbarHidden>
        <ScrollView
          style={[
            {
              paddingHorizontal: 24,
              marginBottom: this.props.keyboardHeight && (this.props.keyboardHeight - 101) || 0
            }
          ]}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >

          <Field
            label="Ngân hàng liên kết"
            content={bank_name}
            isEditMode={false}
          />

          <Field
            label="Tên chủ tài khoản"
            content={bank_account_name}
            isEditMode={isEditMode}
            onChangeText={bank_account_name =>
              this.setState({ bank_account_name })}
          />

          <Field
            label="Số tài khoản"
            content={bank_account_number}
            isEditMode={isEditMode}
            onChangeText={bank_account_number =>
              this.setState({ bank_account_number })}
          />

          <Field
            label="Chi nhánh"
            content={bank_branch}
            isEditMode={isEditMode}
            onChangeText={bank_branch =>
              this.setState({ bank_branch })}
          />
        </ScrollView>

        <Button
          bold
          gradient
          label={isEditMode ? 'HOÀN TẤT CHỈNH SỬA' : 'CHỈNH SỬA'}
          labelColor="white"
          isLoading={this.props.isLoading}
          onPress={this.onSubmit}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  keyboardHeight: appSelectors.getKeyboardHeight(state),
  isLoading: selectors.getLoading(state, 'updateUserInfo'),
  userInfo: selectors.getUser(state)
})

const mapDispatchToProps = dispatch => ({
  updateUserInfo: userInfo => dispatch(actions.updateUserInfo({ userInfo }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Banks)
