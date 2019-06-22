import moment from 'moment'

import Picker from 'react-native-picker'

let days = []
let months = []
let years = []

let day = 1
let month = 1
let year = 1950

const MAX_YEAR = 2030

for (let i = 1; i <= 31; i++) {
  days.push(day)
  day = day + 1
}

for (let i = 1; i <= 12; i++) {
  months.push(`tháng ${month}`)
  month = month + 1
}

for (let i = 1950; i <= MAX_YEAR; i++) {
  years.push(year)
  year = year + 1
}

class DateTimePicker {
  show = () => Picker.show()

  hide = () => Picker.hide()

  showDatePicker({
    defaultDate = moment().unix(),
    cancelText = 'Hủy',
    confirmText = 'Chọn',
    onSelect = () => {},
    onCancel = () => {},
    onConfirm = () => {}
  }) {
    const day = moment.unix(defaultDate).format('DD')
    const month = moment.unix(defaultDate).format('MM')
    const year = moment.unix(defaultDate).format('YYYY')

    Picker.init({
      pickerData: [days, months, years],
      pickerBg: [255, 255, 255, 1],
      pickerToolBarBg: [255, 255, 255, 1],
      pickerTitleColor: [255, 255, 255, 1],
      pickerCancelBtnText: cancelText,
      pickerCancelBtnColor: [248, 105, 62, 1],
      pickerConfirmBtnText: confirmText,
      pickerConfirmBtnColor: [248, 105, 62, 1],
      pickerFontSize: 18,
      pickerFontFamily: 'system font',
      selectedValue: [
        day[0] === '0' ? day[1] : day,
        `tháng ${month[0] === '0' ? month[1] : month}`,
        year
      ],
      onPickerCancel: () => onCancel(defaultDate),
      onPickerConfirm: () => onConfirm(),
      onPickerSelect: data => {
        const year = data[2]
        const month =
          data[1].slice(6).length === 1
            ? `0${data[1].slice(6)}`
            : `${data[1].slice(6)}`
        let day = data[0]

        const maxDay = moment(`${year}-${month}`).daysInMonth()

        if (data[0] > maxDay) {
          day = maxDay
        }

        Picker.select([day, data[1], data[2]])

        onSelect(moment(`${day}-${month}-${year}`, 'DDMMYYYY').unix())
      }
    })

    Picker.show()
  }
}

export default new DateTimePicker()
