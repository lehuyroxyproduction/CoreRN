import { call, put, select, takeLatest } from 'redux-saga/effects'
import { countryActions, countryTypes } from 'reducers'
import { api } from 'services'

import { STATUS_CODE } from 'constant'

const getCountry = function*() {
  try {
    const res = yield call(api.getCountry)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(countryActions.getCountrySuccess(res.data.data))
    } else {
      yield put(countryActions.getCountryError(res.data.message))
    }
  } catch (e) {
    yield put(countryActions.getCountryError(e))
  }
}

// prettier-ignore
const watcher = function* () {
  yield takeLatest(countryTypes.GET_COUNTRY, getCountry)
}

export default watcher()
