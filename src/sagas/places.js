import {call, put, takeLatest} from 'redux-saga/effects'
import {actions, selectors, types} from 'reducers/places'
import {actions as jobActions} from 'reducers/jobs'
import {fetch} from 'utils/api'

const getPlaces = function* ({payload: {onSuccess}}) {
  const res = yield call(fetch, 'getPlaces')
  if (res && res.status_code === 1000 && res.data.provinces) {
    yield put(actions.getPlacesSucceeded(res.data.provinces))
    onSuccess()
  } else {
    yield put(actions.getPlacesFailed())
  }
}

const getUserFilterPlaces = function* ({payload: {onSuccess}}) {
  const res = yield call(fetch, 'getUserFilterPlaces')
  const empty = []
  if (res && res.status_code === 1000) {
    yield put(actions.getUserFilterPlacesSucceeded({
      places: !res.data.provinces ? empty : res.data.provinces,
      onSuccess
    }))
  } else if (!res) {
    yield put(actions.getUserFilterPlacesSucceeded({places: empty, onSuccess}))
  } else {
    yield put(actions.getUserFilterPlacesFailed())
  }
}

const getUserFilterPlacesSucceeded = function* ({payload: {onSuccess}}) {
  onSuccess()
}

const subscribePlaces = function* ({payload: provinces}) {
  const res = yield call(fetch, 'subscribePlaces', provinces)
  if (res && res.status_code === 1000) {
    yield call(subscribePlacesSucceeded)
  } else {
    yield put(actions.subscribePlacesFailed())
  }
}
const unSubscribePlaces = function* ({payload: provinces}) {
  const res = yield call(fetch, 'unSubscribePlaces', provinces)
  if (res && res.status_code === 1000) {
    yield call(unSubscribePlacesSucceeded)
  } else {
    yield put(actions.unSubscribePlacesFailed())
  }
}
const subscribeUnsubcribePlaces = function* ({payload: provinces}) {
  const {subProvinces, unsubProvinces} = provinces
  const resSub = yield call(fetch, 'subscribePlaces', subProvinces)
  const resUnsub = yield call(fetch, 'unSubscribePlaces', unsubProvinces)

  if (resSub && resSub.status_code === 1000 && resUnsub && resUnsub.status_code === 1000) {
    yield put(actions.subscribeUnSubscribePlacesSucceeded())
  } else {
    yield put(actions.subscribeUnSubscribePlacesFailed())
  }
}
const subscribePlacesSucceeded = function* () {
  yield put(jobActions.getJobs({payload: {isRefreshing: true}}))
}
const unSubscribePlacesSucceeded = function* () {
  yield put(jobActions.getJobs({payload: {isRefreshing: true}}))
}

const subscribeUnSubscribePlacesSucceeded = function* () {
  yield put(jobActions.getJobs({payload: {isRefreshing: true}}))
}

const watcher = function* () {
  yield takeLatest(types.GET_PLACES, getPlaces)
  yield takeLatest(types.GET_USER_FILTER_PLACES, getUserFilterPlaces)
  yield takeLatest(types.GET_USER_FILTER_PLACES_SUCCEEDED, getUserFilterPlacesSucceeded)
  yield takeLatest(types.SUBSCRIBE_PLACES, subscribePlaces)
  yield takeLatest(types.UNSUBSCRIBE_PLACES, unSubscribePlaces)
  yield takeLatest(types.SUBSCRIBE_PLACES_SUCCEEDED, subscribePlacesSucceeded)
  yield takeLatest(types.UNSUBSCRIBE_PLACES_SUCCEEDED, unSubscribePlacesSucceeded)
  yield takeLatest(types.SUBSCRIBE_UNSUBSCRIBE_PLACES, subscribeUnsubcribePlaces)
  yield takeLatest(types.SUBSCRIBE_UNSUBSCRIBE_PLACES_SUCCEEDED, subscribeUnSubscribePlacesSucceeded)
}

export default watcher()
