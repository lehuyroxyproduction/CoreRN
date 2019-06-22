import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Platform } from 'react-native'
import _ from 'lodash'
export const WORKSHIFT = {
  AVAILABLE: 1,
  PENDING: 2,
  APPROVED: 3
}

export const WORK = {
  PENDING: 2,
  APPROVED: 3,
  FINISHED: 6,
  REJECTED: 5,
  CANCELED: 4
}

export const USER_STATUS = {
  INACTIVE: 1,
  ACTIVE: 2,
  BLOCKED: 3
}
export const NOTIS = {
  READ: 3,
  UNREAD: 2
}

export const PAYMENT_METHODS = {
  CASH: 0,
  TRANSFER: 1
}
//
// export const JOB_NOTES = {
//   PENDING: 'Thông tin đăng ký đã được gửi đến khách hàng vui lòng chờ khách hàng duyệt bạn nhé',
//   APPROVED: 'Bạn đã được duyệt vào làm công việc này. Đúng ngày giờ bên dưới bạn vui lòng đến đúng địa chỉ để làm việc',
//   FINISHED: 'Chúc mừng bạn đã hoàn thành công việc',
//   REJECTED: 'Rất tiếc công việc này đã bị khách hàng từ chối bạn vui lòng đăng ký công việc khác nhé',
//   CANCELED: 'Rất tiếc công việc đã bị hủy do khách hàng không còn nhu cầu tuyển dụng, công việc này bạn không cần đi làm nữa. Xin lỗi bạn về sự bất tiện này',
//   OFF_SHIFT: 'Rất tiếc bạn đã Off ca này. Bạn sẽ bị xử phạt với hành vi này'
// }

export const HEADER_HEIGHT = 85
export const isAndroid = Platform.OS === 'android'
export const hp = value => {
  return heightPercentageToDP(value.toString() + '%')
}
export const wp = value => {
  return widthPercentageToDP(value.toString() + '%')
}
export const isNilOrEmpty = value =>{
  return _.isNil(value) || _.isEmpty(value)
}
