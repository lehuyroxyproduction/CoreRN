import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet } from 'react-native'

import Picker from 'react-native-picker'

import { Container } from 'components'
import { Text, TextInput } from 'components/uielements'

import { actions } from 'reducers/user'

import { Icons } from 'images'
import { Colors, Fonts, Styles } from 'themes'

import moment from 'moment'

let days = []
let months = []
let years = []

let day = 1
let month = 1
let year = 1950

for (let i = 1; i <= 31; i++) {
  days.push(day)
  day = day + 1
}

for (let i = 1; i <= 12; i++) {
  months.push(`tháng ${month}`)
  month = month + 1
}

for (let i = 1950; i <= 2030; i++) {
  years.push(year)
  year = year + 1
}

class Dob extends React.Component {
  state = { day: '04', month: '05', year: '1995' }

  componentDidMount() {
    this.showDatePicker()
  }

  componentWillUnmount() {
    Picker.hide()
  }

  onNext = () => {
    // console.log(this.state.day)
    // console.log(this.state.month)
    // console.log(this.state.year)

    const birth_date = moment(`${this.state.day}-${this.state.month}-${this.state.year}`, 'DDMMYYYY').unix()

    // console.log(date)

    this.props.setUserInfo({
      birth_date
    })

    this.props.push({ screen: 'RegisterGender' })
  }

  showDatePicker() {
    Picker.init({
      pickerData: [days, months, years],
      pickerBg: [255, 255, 255, 1],
      pickerToolBarBg: [255, 255, 255, 1],
      pickerTitleColor: [255, 255, 255, 1],
      pickerCancelBtnColor: [255, 255, 255, 1],
      pickerConfirmBtnText: 'Tiếp theo',
      pickerConfirmBtnColor: [248, 105, 62, 1],
      pickerFontSize: 18,
      pickerFontFamily: 'system font',
      selectedValue: [
        this.state.day[0] === '0' ? this.state.day[1] : this.state.day,
        `tháng ${this.state.month[0] === '0' ? this.state.month[1] : this.state.month}`,
        this.state.year
      ],
      onPickerConfirm: () => this.onNext(),
      onPickerSelect: data => {
        const year = data[2]
        const month = data[1].slice(6).length === 1 ? `0${data[1].slice(6)}` : `${data[1].slice(6)}`
        let day = data[0]

        const maxDay = moment(`${year}-${month}`).daysInMonth()

        if (data[0] > maxDay) {
          day = maxDay
        }

        Picker.select([day, data[1], data[2]])

        this.setState(() => ({ day, month, year }))
      }
    })

    Picker.show()
  }

  render() {
    return (
      <Container
        padding={38}
        buttons={{
          left: [{ icon: Icons.back, onPress: () => this.props.pop() }]
        }}>
        <Text color={Colors.coral} bold center>
          Bạn sinh tháng mấy ?
        </Text>

        <TouchableOpacity onPress={() => this.showDatePicker()}>
          <TextInput
            ref="input"
            value={`Ngày ${this.state.day} tháng ${this.state.month}, ${this.state.year}`}
            style={[Styles.input.round, { backgroundColor: Colors.veryLightPink }]}
            containerStyle={{ marginVertical: 24 }}
            editable={false}
            returnKeyType="next"
            placeholder="Nhập  họ và tên"
            onChangeText={value => this.setState({ value })}
          />
        </TouchableOpacity>

        <Text tiny center>
          Bạn có thể thay đổi trong mục thông tin cá nhân
        </Text>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  keyboardHeight: state.app.deviceKeyboardHeight
})

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dob)
