import { call, select, put, takeLatest } from 'redux-saga/effects'
import { Location } from '@mauron85/react-native-background-geolocation'
import { sessionActions, sessionSelectors, sessionTypes, authSelectors, authActions } from 'reducers'
import {
  getRefinedLocationList,
  getDuration,
  getDistance,
  getPace,
  stopTrackingLocation,
  startTrackingLocation,
  resumeTrackingLocation,
  pauseTrackingLocation
} from 'reducers/locations'
import momenttimezone from 'moment-timezone'
import { api } from 'services'

import { STATUS_CODE } from 'constant'

const formatCoordinates = (
  locations: Array<Location>
): Array<{ latitude: number, longitude: number, created_at: number }> => {
  return locations.map(location => ({
    latitude: location.latitude,
    longitude: location.longitude,
    created_at: parseInt(location.time.toFixed(0), 10)
  }))
}

const addSession = function*({ payload: { meta } }) {
  try {
    const params = {
      // coordinates: [],
      user_time_zone: momenttimezone.tz.guess(),
      goal: ''
      // run_virtualrace: run_virtualrace
    }
    // const user = yield select(authSelectors.getUser)
    // yield put(authActions.setAuthToken(user.token))
    // yield call(api.setToken, user.token)
    const res = yield call(api.addSession, params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(sessionActions.addSessionSuccess(res.data.data))
      yield put(startTrackingLocation())
      meta.onSuccess && meta.onSuccess()
    } else {
      yield put(sessionActions.addSessionError(res.message))
      meta.onError && meta.onError()
    }
  } catch (e) {
    yield put(sessionActions.addSessionError(e))
    meta.onError && meta.onError()
  }
}

const endSession = function*({ payload: { run_virtualrace, onSuccess } }) {
  try {
    // Stop the session before sending data
    // yield put(stopTrackingLocation())

    const session = yield select(sessionSelectors.getSession) // get session
    console.log('--------------endSession', session)
    const locations = yield select(getRefinedLocationList) // Change to getLocationList for full list
    const duration = yield select(getDuration) // in seconds
    const distance = yield select(getDistance) // in km
    const pace = yield select(getPace) // in min/km
    const params = {
      coordinates: formatCoordinates(locations),
      duration,
      distance,
      pace,
      run_virtualrace: run_virtualrace
    }
    yield console.log('paramsEndSession', params)

    const res = yield call(api.endSession, session.session_id, params)
    if (
      (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) ||
      (res.ok && res.data.status_code === STATUS_CODE.SESSION_FINISHED)
    ) {
      yield put(authActions.getTotalPoint())
      yield put(sessionActions.endSessionSuccess())
      const dataDemo = yield res.data.data

      let challenges_finished = yield dataDemo.challenges_finished || []
      let virtualraces_success = yield dataDemo.virtualraces_success || []
      let array_virtualraces_success_new = []
      yield virtualraces_success.map((item, index) => {
        array_virtualraces_success_new = { ...item, ...{ type: 'virtualRace' } }
      })
      let array_configuration = yield challenges_finished.concat(array_virtualraces_success_new)
      yield put(sessionActions.endSessionFinished(array_configuration))
      onSuccess && onSuccess()
    } else {
      Alert.alert(I18n.t('CantUploadSession'))
      yield put(sessionActions.endSessionError(res.message))
    }
  } catch (e) {
    Alert.alert(I18n.t('CantUploadSession'))
    console.log(e)
    yield put(sessionActions.endSessionError(e))
  }
}

// const updateSession = function*() {
//   try {
//     const session = yield select(sessionSelectors.getSession) // get session
//     const res = yield call(api.endSession, id)
//     if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
//       yield put(sessionActions.updateSessionSuccess(res.data.data))
//     } else {
//       yield put(sessionActions.updateSessionError(res.data.message))
//     }
//   } catch (e) {
//     yield put(sessionActions.updateSessionError(e))
//   }
// }

const pauseSession = function*() {
  try {
    yield put(pauseTrackingLocation())
    // const session = yield select(sessionSelectors.getSession) // get session
    // const res = yield call(api.pauseSession, session.session_id)
    // if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
    //   yield put(sessionActions.pauseSessionSuccess(res.data.data))
    //   yield put(pauseTrackingLocation())
    // } else {
    //   yield put(sessionActions.pauseSessionError(res.data.message))
    // }
  } catch (e) {
    yield put(sessionActions.pauseSessionError(e))
  }
}

const resumeSession = function*() {
  try {
    yield put(resumeTrackingLocation())
    // const session = yield select(sessionSelectors.getSession) // get session
    // const res = yield call(api.resumeSession, session.session_id)
    // if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
    //   yield put(sessionActions.resumeSessionSuccess(res.data.data))
    //   yield put(resumeTrackingLocation())
    // } else {
    //   yield put(sessionActions.resumeSessionError(res.data.message))
    // }
  } catch (e) {
    yield put(sessionActions.resumeSessionError(e))
  }
}
const updateAdrressForWorkFlow = function*({ payload: { address } }) {
  try {
    const params = {
      address: address
    }
    const res = yield call(api.updateAdrressUserForModal, params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield console.log('update User Form Message', res)
    }
  } catch (e) {
    yield put(sessionActions.endSessionUpdateAddressErrorForUser(e))
  }
}

const watcher = function*() {
  yield takeLatest(sessionTypes.ADD_SESSION, addSession)
  yield takeLatest(sessionTypes.END_SESSION, endSession)
  // yield takeLatest(sessionTypes.UPDATE_SESSION, updateSession)
  yield takeLatest(sessionTypes.RESUME_SESSION, resumeSession)
  yield takeLatest(sessionTypes.PAUSE_SESSION, pauseSession)
  yield takeLatest(sessionTypes.END_SESSION_UPDATE_ADDRESS_FOR_USER, updateAdrressForWorkFlow)
}

export default watcher()
