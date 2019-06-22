import React from 'react'
import PropTypes from 'prop-types'
import { Image, Picker, ScrollView, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import { Container } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import DropDown from 'components/DropDown'

import { selectors } from 'reducers/app'
import { actions } from 'reducers/user'

import { Icons } from 'images'
import { Colors, Metrics, Styles } from 'themes'

class SecondGuard extends React.Component {
  state = {
    title: '',
    name: '',
    phone_number: '',
    year_of_birth: '',
    isSelectedOther: false
  }

  validate = phoneNumber => {
    return !isNaN(phoneNumber)

    // const vnPhoneRegex = /0+([0-9]{9,10})\b/g
    // return vnPhoneRegex.test(phoneNumber)
  }

  onNext = () => {
    const { title, name, phone_number, year_of_birth } = this.state

    if (title.trim() && name.trim() && phone_number && year_of_birth.trim()) {
      if (!this.validate(phone_number)) {
        alert('Vui lòng nhập số điện thoại hợp lệ')
      } else if (
        !Number(year_of_birth) ||
        new Date().getFullYear() - year_of_birth < 18
      ) {
        alert('Vui lòng nhập năm sinh hợp lệ, người thân phải từ 18 tuổi')
      } else {
        this.props.setUserInfo({
          guardians: [
            this.props.guard,
            {
              title,
              name,
              phone_number,
              year_of_birth: parseInt(year_of_birth)
            }
          ]
        })
        this.props.push({screen:'Complete'})
      }
    } else {
      alert('Vui lòng nhập đầy đủ thông tin')
    }
  }

  render() {
    return (
      <Container
        padding={24}
        buttons={{
          left: [{ icon: Icons.back, onPress: () => this.props.pop() }]
        }}>
        <ScrollView
          style={{ marginBottom: this.props.keyboardHeight }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
          //   onContentSizeChange={(contentWidth, contentHeight) =>
          //     this.setState({
          //       height: contentHeight
          //     })}
        >
          <Text color={Colors.coral} bold center>
            2 người thân của bạn là ai?
          </Text>

          <Text tiny center style={{ marginVertical: 24 }}>
            Người thân phải là người trong gia đình, trên 18 tuổi và có số điện
            thoại di động có thể liên hệ được
          </Text>

          <Text bold>Người thân 2</Text>

          <View row centerHorizontal style={{ marginTop: 24 }}>
            <View flex={2}>
              <Text small>Họ và tên</Text>
            </View>

            <View flex={6}>
              <TextInput
                style={[
                  {
                    width: Metrics.screen.width * 0.55,
                    height: 40,
                    marginLeft: 12,
                    borderRadius: 30,
                    backgroundColor: Colors.veryLightPink
                  }
                ]}
                returnKeyType="next"
                placeholder="Nhập họ và tên"
                onChangeText={name => this.setState({ name })}
              />
            </View>
          </View>

          <View row centerHorizontal style={{ marginTop: 24 }}>
            <View flex={2}>
              <Text small>Mối quan hệ</Text>
            </View>

            <View flex={6}>
              <DropDown
                style={{ marginLeft: 24 }}
                textStyle={{ fontSize: 13 }}
                dropdownTextStyle={{ fontSize: 13, paddingHorizontal: 36 }}
                defaultValue="Vui lòng chọn"
                options={['Ông', 'Bà', 'Cha', 'Mẹ', 'Khác']}
                onSelect={(i, value) => {
                  if (value === 'Khác') {
                    this.setState({ isSelectedOther: true })
                  } else {
                    this.setState({ title: value, isSelectedOther: false })
                  }
                }}
              />
            </View>
          </View>

          {this.state.isSelectedOther && (
            <View row centerHorizontal style={{ marginTop: 24 }}>
              <View flex={2} />

              <View flex={6}>
                <TextInput
                  style={[
                    {
                      width: Metrics.screen.width * 0.55,
                      height: 40,
                      marginLeft: 12,
                      borderRadius: 30,
                      backgroundColor: Colors.veryLightPink
                    }
                  ]}
                  returnKeyType="next"
                  placeholder="Nhập mối quan hệ"
                  onChangeText={title => this.setState({ title })}
                  onEndEditing={() => this.refs.third.focus()}
                />
              </View>
            </View>
          )}

          <View row centerHorizontal style={{ marginTop: 24 }}>
            <View flex={2}>
              <Text small>Năm sinh</Text>
            </View>

            <View flex={6}>
              <TextInput
                ref="third"
                style={[
                  {
                    width: Metrics.screen.width * 0.55,
                    height: 40,
                    marginLeft: 12,
                    borderRadius: 30,
                    backgroundColor: Colors.veryLightPink
                  }
                ]}
                returnKeyType="next"
                placeholder="Nhập năm sinh"
                onChangeText={year_of_birth => this.setState({ year_of_birth })}
                onEndEditing={() => this.refs.fourth.focus()}
              />
            </View>
          </View>

          <View row centerHorizontal style={{ marginTop: 24 }}>
            <View flex={2}>
              <Text small>Số điện thoại</Text>
            </View>

            <View flex={6}>
              <TextInput
                ref="fourth"
                style={[
                  {
                    width: Metrics.screen.width * 0.55,
                    height: 40,
                    marginLeft: 12,
                    borderRadius: 30,
                    backgroundColor: Colors.veryLightPink
                  }
                ]}
                returnKeyType="next"
                placeholder="Nhập số điện thoại"
                onChangeText={phone_number => this.setState({ phone_number })}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 24,
              alignItems: 'flex-end'
            }}>
            <Touchable
              round={60}
              gradient
              color={Colors.coolGrey}
              onPress={this.onNext}>
              <Image source={Icons.right} />
            </Touchable>
          </View>
        </ScrollView>
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
)(SecondGuard)
