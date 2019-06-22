import { call, put, select, takeLatest } from 'redux-saga/effects'

import moment from 'moment'
// import { selectors as userSelectors } from 'reducers/user'
import { actions, selectors, types } from 'reducers/notis'

import { fetch } from 'utils/api'

moment.locale('vi')

//Parse user notis data
const parseUserNotis = notis => {
  return notis.map(noti => {
    const {
      notification_id,
      notification_title,
      notification_name,
      notification_content,
      notification_data,
      sent_at = 0,
      hash,
      system,
      status
    } = noti

    return {
      id: notification_id,
      title: notification_title,
      name: notification_name,
      content: notification_content,
      data: notification_data,
      sent_at: moment.unix(sent_at).format('HH:mm DD/MM/YYYY'),
      hash,
      system,
      status
    }
  })
}
// Notis
// Get notis
const getUserNotis = function * ({payload: {isRefreshing, account_id}}) {
  // const user = yield select(userSelectors.getUser)
  // const res = yield call(fetch, 'getUserNotis', user.phone_number)
  // const { isRefreshing, account_id } = payload
  const total = yield select(selectors.getUserNotisTotal)
  const currentTotal = yield select(selectors.getCurrentUserNotisTotal)
  if (isRefreshing || !total || currentTotal < total) {
    const page = isRefreshing ? 0 : yield select(selectors.getUserNotisPage)
    const res = yield call(fetch, 'getUserNotis', {
      page: page + 1,
      account_id
    })
    if (res && res.status_code === 1000) {
      yield put(
        actions.getUserNotisSuccess({
          notis: parseUserNotis(res.data.notifications || []),
          page: res.data.page,
          total: res.data.total,
          isRefreshing
        })
      )
    } else {
      yield put(actions.getUserNotisFail())
    }
  } else {
    yield put(actions.getUserNotisCanceled())
  }
}

// Read notification
const readUserNotification = function * ({payload: {account_id, notificationId, onSuccess}}) {
  const res = yield call(fetch, 'readUserNotification', {account_id, notificationId})
  if (res && res.status_code === 1000) {
    if (res.data.success) {
      onSuccess()
    }
  } else {
    yield put(actions.readUserNotificationFailed)
  }
}

// prettier-ignore
const watcher = function * () {
  // Notis
  yield takeLatest(types.GET_USER_NOTIS, getUserNotis)
  // Read user notification
  yield takeLatest(types.READ_USER_NOTIFICATION, readUserNotification)
}

export default watcher()
