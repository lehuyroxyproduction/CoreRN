import { call, put, takeLatest, delay } from 'redux-saga/effects'

import { types, actions } from 'redux/reducers/reducerApp'

import { fetch } from 'utils/api'

const getServerConnection = function*() {
  const res = yield call(fetch, 'getServerConnection')

  if (res) {
    yield put(actions.getServerConnectionSuccess(true))
  } else {
    yield put(actions.getServerConnectionSuccess(false))
  }
}

const push = function*() {
  yield put(actions.setPush(true))
  yield delay(800)
  yield put(actions.setPush(false))
}

const toast = function*({ payload }) {
  yield put(actions.setToast(payload))
  yield delay(1500)
  yield put(actions.setToast(null))
}

// prettier-ignore
const watcher = function*() {
  yield takeLatest(types.PUSH, push)
  yield takeLatest(types.TOAST, toast)
  yield takeLatest(types.GET_SERVER_CONNECTION, getServerConnection)
}

export default watcher()
