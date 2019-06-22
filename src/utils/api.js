import store from 'store'
import timer from 'react-native-timer-mixin'

import { betterError } from './betterError'
import { client } from 'services'

import { selectors } from 'reducers/app'
import { actions as authActions } from 'reducers/auth'
import { selectors as userSelectors } from 'reducers/user'

import moment from 'moment'

const TIME_OUT = 10000
const TIME_OUT_TEXT = 'Thời gian phản hồi quá lâu, vui lòng thử lại.'

export const fetch = async (api: String, params: Object) => {
  if (selectors.getNetInfo(store.getState())) {
    // check token expired
    const user = userSelectors.getUser(store.getState())

    // handle user expired
    if (user.user_id) {
      const currentDate = moment().unix()

      if (currentDate > user.exp) {
        store.dispatch(authActions.logout())
      }
    }

    // request api
    if (client.hasOwnProperty(api)) {
      const request = client[api](params)

      // start counting time out
      const timeout = new Promise(resolve =>
        timer.setTimeout(resolve, TIME_OUT, false)
      )

      return Promise.race([request, timeout]).then(res => {
        if (!res) {
          return betterError(api, TIME_OUT_TEXT)
        } else {
          if (res.ok) {
            if (res.data.message) {
              if (api !== 'applyJob' && res.data.status_code !== 1000) {
                betterError('', res.data.message)
              }
            }
            return res.data
          } else {
            return betterError(api, res.problem)
          }
        }
      })
    } else {
      return console.log(`api ${api} not found`)
    }
  } else {
    return alert('Vui lòng kiểm tra kết nối mạng.')
  }
}
