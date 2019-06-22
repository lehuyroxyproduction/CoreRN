import { AsyncStorage, Platform, Alert } from 'react-native'
import { call, select, put, takeLatest, delay } from 'redux-saga/effects'
import { challengesTypes, challengesActions, authActions, challengesSelectors } from 'reducers'

import { api } from 'services'

// import App from 'app'
import { STATUS_CODE } from 'constant'

import * as R from 'ramda'

// get list for screen Event
const getListChallenges = function*(action) {
  try {
    const res = yield call(api.getChallenges)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      console.log('------------list Challengs', res.data.data)
      yield put(challengesActions.getChallengesSuccess(res.data.data.items))
      action.payload && action.payload()

    } else {
      yield put(challengesActions.getChallengesError(res.data.message))
    }
  } catch (e) {
    yield put(challengesActions.getChallengesError(e))
  }
}

const getListMyChallenges = function*() {
  try {
    console.log('------------list My Challengs')
    const res = yield call(api.getMyChallenges)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      // let data_filter = R.filter(R.propEq('is_registered', true), res.data.data)
      // console.log('------------list My Challengs', data_filter)
      console.log('------------list My Challengs', res.data.data)
      yield put(challengesActions.getMyChallengesSuccess(res.data.data.items))
    } else {
      yield put(challengesActions.getMyChallengesError(res.data.message))
    }
  } catch (e) {
    yield put(challengesActions.getMyChallengesError(e))
  }
}

const getChallengesDetailsStart = function*({ payload: { prev_screen, challange_item, onSuccess } }) {
  try {
    console.log('challange_item : ', challange_item)

    if (prev_screen === 'Challenges') {
      const res = yield call(api.getChallengesDetials, challange_item.id)
      if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
        yield put(challengesActions.getChallengesDetailsSuccess(res.data.data))
        yield put(challengesActions.setBookmarkForChallenges(challange_item.is_bookmark))
        onSuccess && onSuccess()
      } else {
        yield put(challengesActions.getChallengesDetailsError(res.data.message))
      }
    } else if (prev_screen === 'MyChallenges') {
      yield put(challengesActions.getChallengesDetailsSuccess(challange_item))
      yield put(challengesActions.setBookmarkForChallenges(challange_item.is_bookmark))
      onSuccess && onSuccess()
    }
  } catch (e) {
    yield put(challengesActions.getChallengesDetailsError(e))
  }
}

const registerChallengesStart = function*({ payload: { challengeID, criteriaID, user_time_zone, onSuccess } }) {
  try {
    console.log('registerChallengesStart challenge_id : ', challengeID)
    console.log('registerChallengesStart criteria_id : ', criteriaID)
    let data = { challenge_id: challengeID, criteria_id: criteriaID, user_time_zone: user_time_zone }
    const res = yield call(api.registerChallenges, data)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(challengesActions.registerChallengesSuccess())
      yield put(authActions.getTotalPoint())
      yield put(challengesActions.getChallengesStart())
      yield put(challengesActions.getMyChallengesStart())
      onSuccess && onSuccess()
    } else {
      console.log('registerChallengesStart error : ', res.data.message)
      yield put(challengesActions.registerChallengesError(res.data.message))
    }
  } catch (e) {
    yield put(challengesActions.registerChallengesError(e))
  }
}

const requestAddBookmarkChallengesStart = function*({ payload: { challengeId,screen = null, meta } }) {
  try {
    const params = {
      challengeId: challengeId
    }
    const res = yield call(api.addBookmarkForChallenges, params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
        if (screen === 'Challenges')
        {
          const challenges = yield select(challengesSelectors.getChallenges)
          let  item_exists = yield R.find(R.propEq('id', challengeId))(challenges)
          yield item_exists.is_bookmark = 1
          let index = yield R.findIndex(R.propEq('id', challengeId))(challenges)
          challenges[index] = item_exists
          yield put(challengesActions.getChallengesSuccess(challenges))
        }
        if (screen === 'MyChallenges')
        {
          const Mychallenges = yield select(challengesSelectors.getMyChallenges)
          let  item_exists = yield R.find(R.propEq('id', challengeId))(Mychallenges)
          yield item_exists.is_bookmark = 1
          let index = yield R.findIndex(R.propEq('id', challengeId))(Mychallenges)
          Mychallenges[index] = item_exists
          yield put(challengesActions.getChallengesSuccess(Mychallenges))
        }
        



      yield put(challengesActions.requestAddBookmarkChallengesSuccess())
      yield put(challengesActions.setBookmarkForChallenges(1))
      meta.onSuccess && meta.onSuccess()
    } else {
      yield put(challengesActions.requestAddBookmarkChallengesError(res.message))
    }
  } catch (e) {
    yield put(challengesActions.requestAddBookmarkChallengesError(e))
  }
}
const requestRemoveBookmarkChallengesStart = function*({ payload: { challengeId,screen = null, meta } }) {
  try {
    const params = {
      challengeId: challengeId
    }
    const res = yield call(api.removeBookmarkForChallenges, params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {

      if (screen === 'Challenges')
      {
        const challenges = yield select(challengesSelectors.getChallenges)
        let  item_exists = yield R.find(R.propEq('id', challengeId))(challenges)
        yield item_exists.is_bookmark = 0
        let index = yield R.findIndex(R.propEq('id', challengeId))(challenges)
        challenges[index] = item_exists
        yield put(challengesActions.getChallengesSuccess(challenges))
      }
      if (screen === 'MyChallenges')
      {
        const Mychallenges = yield select(challengesSelectors.getMyChallenges)
        let  item_exists = yield R.find(R.propEq('id', challengeId))(Mychallenges)
        yield item_exists.is_bookmark = 0
        let index = yield R.findIndex(R.propEq('id', challengeId))(Mychallenges)
        Mychallenges[index] = item_exists
        yield put(challengesActions.getChallengesSuccess(Mychallenges))
      }
      
      
      yield put(challengesActions.requestRemoveBookmarkChallengesSuccess())
      yield put(challengesActions.setBookmarkForChallenges(0))
      meta.onSuccess && meta.onSuccess()
    } else {
      yield put(challengesActions.requestRemoveBookmarkChallengesError(res.message))
    }
  } catch (e) {
    yield put(challengesActions.requestRemoveBookmarkChallengesError(e))
  }
}
const getLoadMoreChallenges = function*({payload:{page}})
{
  try {
    const res = yield call(api.getChallenges,page)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(challengesActions.requestLoadMoreChallengeSuccess(res.data.data.items))
    } else {
      yield put(challengesActions.requestLoadMoreChallengeError(res.data.message))
    }
    
  } catch (e) {
    yield put(challengesActions.requestLoadMoreChallengeError(e))
  }

}
getLoadMoreMyChallenges = function*({payload:{page}})
{
  try {
    const res = yield call(api.getMyChallenges,page)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(challengesActions.requestLoadMoreMyChallengeSuccess(res.data.data.items))
    } else {
      yield put(challengesActions.requestLoadMoreMyChallengeError(res.data.message))
    }
    
  } catch (e) {
    yield put(challengesActions.requestLoadMoreMyChallengeError(e))
  }
}

// prettier-ignore
const watcher = function* () {
  yield takeLatest(challengesTypes.GET_CHALLENGES_START, getListChallenges)
  yield takeLatest(challengesTypes.GET_MYCHALLENGES_START, getListMyChallenges)
  yield takeLatest(challengesTypes.GET_CHALLENGESDETAILS_START, getChallengesDetailsStart)
  yield takeLatest(challengesTypes.REGISTER_CHALLENGES_START, registerChallengesStart)

  yield takeLatest(challengesTypes.REQUEST_ADD_BOOKMARK_CHALLENGES_START, requestAddBookmarkChallengesStart)

  yield takeLatest(challengesTypes.REQUEST_REMOVE_BOOKMARK_CHALLENGES_START, requestRemoveBookmarkChallengesStart)

  yield takeLatest(challengesTypes.REQUEST_LOAD_MORE_CHALLENGES, getLoadMoreChallenges)

  yield takeLatest(challengesTypes.REQUEST_LOAD_MORE_CHALLENGES, getLoadMoreMyChallenges)
}

export default watcher()
