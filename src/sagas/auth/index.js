// import jwtDecode from 'jwt-decode'
import { Alert } from 'react-native'
import { call, put, select, takeLatest, delay } from 'redux-saga/effects'
import DeviceInfo from 'react-native-device-info'
import { authActions, authSelectors, authTypes, countryActions, sessionSelectors } from 'reducers'
import { api } from 'services'

import { STATUS_CODE } from 'constant'
import { getSignInType } from 'reducers/signIn'
import { SIGN_IN_TYPES } from 'sagas/signIn'
import { GoogleSignin } from 'react-native-google-signin'
import { LoginManager } from 'react-native-fbsdk'
// import {
//   actions as userActions,
//   selectors as userSelectors
// } from 'reducers/user'
// import {getAppVersion} from 'utils/version'
// import {betterWarning} from 'utils/betterError'

const registerUser = function*({ payload: { email, password, name, onSuccess } }) {
  let title, success
  try {
    const user = { email, password, name }
    const res = yield call(api.registerUser, user)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.registerUserSuccess())
      return onSuccess()
    } else {
      console.log('registerUser faile : ', res)
      yield put(authActions.registerUserError(res.message))
      Alert.alert('REGISTER FAILED', res.message, [
        {
          text: 'OK',
          style: 'cancel'
        }
      ])
    }
  } catch (e) {
    console.log('registerUser error: ', e)
    yield put(authActions.registerUserError())
  }
}

/**
 * Utils
 */

const loginInternal = function*({ payload: { email, password, onSuccess } }) {
  try {
    let device_id = DeviceInfo.getDeviceId()
    let device_name = DeviceInfo.getDeviceName()
    let user = { email, password, device_id, device_name }
    const res = yield call(api.loginInternal, user)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield call(api.setAuthToken, res.data.data.token)
      yield put(authActions.loginInternalSuccess(res.data.data))
      yield delay(500)
      yield put(authActions.getTotalPoint())
      yield put(authActions.getInfoUser({ onSuccess }))
      yield delay(500)
      onSuccess && onSuccess()
    } else {
      yield put(authActions.loginInternalError())
      Alert.alert('LOGIN FAILED', res.message ? res.message : 'login error', [
        {
          text: 'OK',
          style: 'cancel'
        }
      ])
    }
  } catch (e) {
    Alert.alert('LOGIN FAILED', e.message)
    yield put(authActions.loginInternalError(e))
  }
}

const signInSocical = function*({ payload: { email, social_id, social_type, name, photo_url, accessToken, onPop } }) {
  try {
    let user = {
      email,
      id: social_id,
      platform: social_type.toLowerCase(),
      name,
      access_token: accessToken
    }
    const res = yield call(api.loginSocial, user)
    const social_account = {
      email,
      social_id,
      social_type: social_type.toLowerCase(),
      photo_url
    }
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield call(api.setAuthToken, res.data.data.token)
      yield put(authActions.saveUser(social_account))
      yield put(authActions.signInSocialSuccess(res.data.data))
      yield put(authActions.getInfoUser({ onPop: onPop }))
      // onPop && onPop()
    } else {
      Alert.alert('Sign-in failed', res.message)
      yield put(authActions.signInSocialError(res.message))
    }
  } catch (e) {
    console.log(e)
    // alert(e)
    yield put(authActions.signInSocialError(e))
  }
}
// const loginInternal = function* ({payload: {phoneNumber}}) {
//   const fcmToken = yield firebase.messaging().getToken()
//   const deviceUid = DeviceInfo.getUniqueID()
//
//   const user = {
//     account_id: phoneNumber,
//     device_uid: deviceUid,
//     device_token: fcmToken
//   }
//
//   const res = yield call(fetch, 'loginInternal', user)
//
//   if (res && res.status_code === 1000) {
//     const {token, is_required_update} = res.data
//
//     const info = jwtDecode(token)
//     const isRegisted = !is_required_update
//
//     yield call(AsyncStorage.setItem, 'token', token)
//
//     yield put(actions.loginInternalSuccess())
//     yield put(userActions.setUserInfo({...info, isRegisted}))
//
//     yield delay(350)
//
//     App.startMain()
//   } else {
//     betterWarning('Đăng nhập thất bại')
//
//     yield put(actions.loginFail())
//   }
// }

const logout = function*({ payload: { onSuccess } }) {
  // const user = yield select(authSelectors.getUser)
  // Sign out
  try {
    onSuccess && onSuccess()
    const signInType = yield select(getSignInType)
    switch (signInType) {
      case SIGN_IN_TYPES.Google:
        yield call(GoogleSignin.revokeAccess)
        yield call(GoogleSignin.signOut)
        break
      case SIGN_IN_TYPES.Facebook:
        yield call(LoginManager.logOut)
        break
      default:
      // throw Error('Unable to detect sign-in provider.')
    }

    // const userInfo = yield select(authSelectors.getUserInfo)
    // yield call(api.signOut, userInfo.token)
    let res = yield call(api.logout)
    if (res && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield call(api.setAuthToken, null)

      yield put(authActions.logoutSuccess())
    } else {
      yield put(authActions.logoutError())
    }
    // Clean up
    // yield put(actions.signOutSuccess())
    // yield put(authActions.logoutSuccess())
  } catch (e) {
    console.log(e)
    yield put(authActions.logoutError(e))
  }
}

// const logout = function* () {
//   const user = yield select(userSelectors.getUser)
//   const device_uid = DeviceInfo.getUniqueID()
//   yield call(client.logout, {
//     account_id: user.phone_number,
//     device_uid
//   })
//   yield put(userActions.deleteUserInfo())
//   App.startLogin()
// }

// const getSetting = function* () {
//   const version = getAppVersion()
//
//   const res = yield call(client.getSetting)
//
//   if (res && res.status_code === 1000) {
//     // if (res && res.data) {
//     const {info} = res.data.data
//
//     if (Platform.OS === 'ios' && parseInt(version.code) === parseInt(info.version_code)) {
//       yield put(actions.getSettingSuccess(true))
//     } else if (Platform.OS === 'android' && parseInt(version.code) === parseInt(info.version_code_android)) {
//       yield put(actions.getSettingSuccess(true))
//     } else {
//       yield put(actions.getSettingSuccess(false))
//     }
//   }
// }

const getWorkouts = function*() {
  try {
    const res = yield call(api.getWorkouts)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.getWorkoutsSuccess(res.data.data))
    } else {
      yield put(authActions.getWorkoutsError(res.data.message))
    }
  } catch (e) {
    yield put(authActions.getWorkoutsError(e))
  }
}

const workoutSummary = function*() {
  try {
    const res = yield call(api.workoutSummary)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.workoutSummarySuccess(res.data.data))
    } else {
      yield put(authActions.workoutSummaryError(res.data.message))
    }
  } catch (e) {
    yield put(authActions.workoutSummaryError(e))
  }
}

const uploadImage_Session = function*({ payload: { image } }) {
  try {
    const session = yield select(sessionSelectors.getSession)
    let data = `data:image/png;base64,${image}`
    let images = []
    images.push(data)
    const res = yield call(api.uploadImage_Session, session.session_id, {
      images
    })
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.uploadImage_Session_Success())
    } else {
      yield put(authActions.uploadImage_Session_Error())
    }
  } catch (e) {
    yield put(authActions.uploadImage_Session_Error(e))
  }
}

const getInfoUser = function*({ payload: { onPop } }) {
  try {
    yield put(authActions.getTotalPoint())
    const res = yield call(api.getInfoUser)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(countryActions.getCountry())
      yield put(authActions.getInfoUserSuccess(res.data.data))
      console.log('onPop :', onPop)
      if (onPop) {
        onPop && onPop()
      }
    } else {
      yield put(authActions.getInfoUserError(res.data.message))
      yield put(authActions.logoutSuccess())
    }
  } catch (e) {
    yield put(authActions.getInfoUserError(e))
    yield put(authActions.logoutSuccess())
  }
}

const updateInfoUser = function*({ payload: { user, is_avatar_changed, onSuccess } }) {
  try {
    console.log('updateInfoUser user : ', user)
    userInfo = {
      display_name: user.name,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      birth_date: user.birth_date,
      gender: user.gender,
      avatar: user.avatar,
      phone_no: user.phone_no,
      phone_country_id: user.phone_country_id,
      mobile_no: user.mobile_no + '',
      mobile_country_id: user.mobile_country_id,
      address: user.address,
      postal_code: user.postal_code,
      residence_country_id: user.residence_country_id,
      biography: user.biography,
      identification_no: user.identification_no,
      height: Number(user.height),
      weight: Number(user.weight),
      is_avatar_changed: is_avatar_changed || null
    }
    const res = yield call(api.updateInfoUser, userInfo)
    console.log('updateInfoUser : ', res)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.updateInfoUserSuccess(res.data.data))
      yield put(authActions.getTotalPoint())
      yield put(authActions.getInfoUser({ onPop: onSuccess }))
      // onSuccess && onSuccess()
    } else {
      yield put(authActions.updateInfoUserError(res.message))
    }
  } catch (e) {
    yield put(authActions.updateInfoUserError(e))
  }
}

const getPoint = function*() {
  try {
    const res = yield call(api.getPoint)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.getPointSuccess(res.data.data))
    } else {
      yield put(authActions.getPointError(res.message))
    }
  } catch (e) {
    yield put(authActions.getPointError(e))
  }
}

const getTotalPoint = function*() {
  try {
    const res = yield call(api.getTotalPoint)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.getTotalPointSuccess(res.data.data))
    } else {
      yield put(authActions.getTotalPointError(res.data.message))
    }
  } catch (e) {
    yield put(authActions.getTotalPointError(e))
  }
}
const getForgetPassword = function*({ payload: { email, meta } }) {
  try {
    let data = yield { email: email }
    // yield put(authActions.requestForgetPasswordError(null))
    const res = yield call(api.getForgetPassword, data)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.requestForgotPasswordSuccess())
      // yield put(authActions.requestForgetPasswordError(null))
      yield meta.onSuccess && meta.onSuccess()
    } else {
      yield put(authActions.requestForgotPasswordError(res.message))
      yield alert(res.message)
      // yield meta.onError && meta.onError()
    }
  } catch (e) {
    yield put(authActions.requestForgotPasswordError(e))
    yield alert(res.message)
    // yield meta.onError && meta.onError()
  }
}
const upateChangePassword = function*({ payload: { oldPassword, newPassword, meta } }) {
  try {
    let data = yield { oldPassword: oldPassword, newPassword: newPassword }
    const res = yield call(api.updateChangePassword, data)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(authActions.updateChangePasswordSuccess())
      yield meta.onSuccess && meta.onSuccess()
    } else {
      yield put(authActions.updateChangePasswordError(res.message))
      yield Alert.alert('UPDATE PASSWORD FAILED', res.message, [
        {
          text: 'OK',
          style: 'cancel'
        }
      ])
      
    }
  } catch (e) {
    yield put(authActions.updateChangePasswordError(e))
    Alert.alert('UPDATE PASSWORD FAILED', e.message)
  }
}

// prettier-ignore
const watcher = function* () {
  yield takeLatest(authTypes.REGISTER_USER, registerUser)
  yield takeLatest(authTypes.LOGIN_INTERNAL, loginInternal)
  yield takeLatest(authTypes.SIGN_IN_SOCIAL, signInSocical)
  yield takeLatest(authTypes.LOGOUT, logout)
  yield takeLatest(authTypes.WORKOUT_SUMMARY, workoutSummary)
  yield takeLatest(authTypes.GET_WORKOUTS, getWorkouts)
  yield takeLatest(authTypes.UPLOAD_IMAGE_SESSION, uploadImage_Session)
  yield takeLatest(authTypes.GET_INFO_USER, getInfoUser)
  yield takeLatest(authTypes.UPDATE_INFO_USER, updateInfoUser)
  yield takeLatest(authTypes.GET_POINT, getPoint)
  yield takeLatest(authTypes.GET_TOTAL_POINT, getTotalPoint)

  yield takeLatest(authTypes.REQUEST_FORGOT_PASSWORD, getForgetPassword)

  yield takeLatest(authTypes.UPDATE_CHANGE_PASSWORD, upateChangePassword)
  // yield takeLatest(types.LOGOUT, logout)
  // yield takeLatest(types.GET_SETTING, getSetting)
}

export default watcher()
