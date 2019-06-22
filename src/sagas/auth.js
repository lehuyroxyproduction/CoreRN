import jwtDecode from 'jwt-decode'
import {AsyncStorage, Platform} from 'react-native'
import {call, select, put, takeLatest, delay} from 'redux-saga/effects'
import DeviceInfo from 'react-native-device-info'

import {types, actions} from 'reducers/auth'
import {
  actions as userActions,
  selectors as userSelectors
} from 'reducers/user'

import {fetch} from 'utils/api'
import {getAppVersion} from 'utils/version'
import {betterWarning} from 'utils/betterError'

import {client, firebase} from 'services'

import App from 'App'

const login = function* ({payload: {phoneNumber}}) {
  const fcmToken = yield firebase.messaging().getToken()
  const deviceUid = DeviceInfo.getUniqueID()

  const user = {
    account_id: phoneNumber,
    device_uid: deviceUid,
    device_token: fcmToken
  }

  const res = yield call(fetch, 'login', user)

  if (res && res.status_code === 1000) {
    const {token, is_required_update} = res.data

    const info = jwtDecode(token)
    const isRegisted = !is_required_update

    yield call(AsyncStorage.setItem, 'token', token)

    yield put(actions.loginSuccess())
    yield put(userActions.setUserInfo({...info, isRegisted}))

    yield delay(350)

    App.startTest()
  } else {
    betterWarning('Đăng nhập thất bại')

    yield put(actions.loginFail())
  }
}

const logout = function* () {
  const user = yield select(userSelectors.getUser)
  const device_uid = DeviceInfo.getUniqueID()
  yield call(client.logout, {
    account_id: user.phone_number,
    device_uid
  })
  yield put(userActions.deleteUserInfo())
  App.startLoginTest()
}

const getSetting = function* () {
  const version = getAppVersion()

  const res = yield call(client.getSetting)

  if (res && res.status_code === 1000) {
    // if (res && res.data) {
    const {info} = res.data.data

    if (Platform.OS === 'ios' && parseInt(version.code) === parseInt(info.version_code)) {
      yield put(actions.getSettingSuccess(true))
    } else if (Platform.OS === 'android' && parseInt(version.code) === parseInt(info.version_code_android)) {
      yield put(actions.getSettingSuccess(true))
    } else {
      yield put(actions.getSettingSuccess(false))
    }
  }
}

// prettier-ignore
const watcher = function* () {
  yield takeLatest(types.LOGIN, login)
  yield takeLatest(types.LOGOUT, logout)
  yield takeLatest(types.GET_SETTING, getSetting)
}

export default watcher()
