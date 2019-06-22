import { call, select, put, takeLatest } from 'redux-saga/effects'
import DeviceInfo from 'react-native-device-info'

import { actions as authActions } from 'reducers/auth'
import { types, actions, selectors } from 'reducers/user'

import { fetch } from 'utils/api'

import convert from 'utils/converter'
import { appActions } from 'reducers/index'

const getUserInfo = function*() {
  const user = yield select(selectors.getUser)

  const res = yield call(fetch, 'getUserInfo', user.user_id)

  if (res) {
    // check user existed
    if (res.status_code === 1008) {
      return yield put(authActions.logout())
    }

    if (res.data) {
      yield put(actions.getUserInfoSuccess(res.data))
      yield put(actions.getUserBarcode())
    }
  }
}

const updateUserInfo = function*({ payload: { userInfo, onSuccess, onFailed } }) {
  const info = yield select(selectors.getUser)

  let profile = { ...info }

  if (userInfo.fullName) {
    const full_name = convert.toCapital(userInfo.fullName.trim())
    const name = full_name.split(' ')

    const first_name = name[name.length - 2]
    const last_name = full_name.replace(first_name, '').trim()

    profile = {
      ...profile,
      first_name,
      last_name,
      avatar: userInfo.avatar,
      current_address: userInfo.current_address,
      permanent_address: userInfo.permanent_address,
      certificate_number: userInfo.certiticateNumber,
      certificate_front: userInfo.certificateFront,
      certificate_back: userInfo.certificateBack
    }
  } else {
    profile = { ...profile, ...userInfo }
  }
  console.log('-------------------Update Profile', profile)

  const res = yield call(fetch, 'updateUserInfo', profile)

  if (res && res.status_code === 1000) {
    // onSuccess && onSuccess()
    if (onSuccess) {
      onSuccess()
    } else {
      yield put(appActions.toast(res.message))
    }
    yield put(actions.updateUserInfoSuccess())
    yield call(getUserInfo)
  } else {
    yield put(actions.updateUserInfoFail(res.message))
    onFailed && onFailed(res.message)
    // yield put(appActions.toast(res.message))
  }
}

const getUserBarcode = function*() {
  const user = yield select(selectors.getUser)
  const code = user.certificate_number
  if (code) {
    const res = yield call(fetch, 'getUserBarcode', code)
    if (res && res.data) {
      yield put(actions.getUserBarcodeSuccess(res.data))
    } else {
      yield put(actions.getUserBarcodeError())
    }
  } else {
    yield put(actions.getUserBarcodeError())
  }
}

const updateFcmToken = function*({ payload }) {
  const user = yield select(selectors.getUser)

  const deviceUid = DeviceInfo.getUniqueID()

  if (deviceUid) {
    yield call(fetch, 'updateFcmToken', {
      accountId: user.phone_number,
      deviceUid,
      deviceToken: payload
    })
  }
}

const getNotificationAccountId = function*({ payload: { meta } }: { payload: { meta: Function } }) {
  const user = yield select(selectors.getUser)
  if (!user.notificationAccountId && user.phone_number) {
    const res = yield call(fetch, 'getNotificationAccountId', user.phone_number)
    if (res && res.status_code === 1000) {
      if (meta && meta.onSuccess) {
        yield put(
          actions.getNotificationAccountIdSuccess({
            account_id: res.data.account_id,
            onSuccess: meta.onSuccess
          })
        )
      }
    }
  }

  if (user.notificationAccountId) {
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  }
}
const getNotificationAccountIdSuccess = function*({ payload: { onSuccess } }) {
  const user = yield select(selectors.getUser)
  if (user.notificationAccountId) {
    onSuccess()
  }
}

// prettier-ignore
const watcher = function* () {
  yield takeLatest(types.GET_USER_INFO, getUserInfo)
  yield takeLatest(types.GET_USER_BARCODE, getUserBarcode)
  yield takeLatest(types.UPDATE_USER_INFO, updateUserInfo)
  yield takeLatest(types.UPDATE_FCM_TOKEN, updateFcmToken)
  yield takeLatest(types.GET_NOTIFICATION_ACCOUNT_ID, getNotificationAccountId)
  yield takeLatest(types.GET_NOTIFICATION_ACCOUNT_ID_SUCCESS, getNotificationAccountIdSuccess)
}

export default watcher()
