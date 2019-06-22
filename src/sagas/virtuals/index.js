import { AsyncStorage, Platform, Alert } from 'react-native'
import moment from 'moment'
import { call, select, put, takeLatest, delay } from 'redux-saga/effects'
import {
  virtualsActions,
  virtualsSelectors,
  virtualsTypes
} from 'reducers'

import { api } from 'services'

// import App from 'app'
import { STATUS_CODE } from 'constant'

import * as R from 'ramda'


// get list for screen Virtuals
const getListVirtuals = function*({payload:{type}}) {
  try {
    const res = yield call(api.getVirtualRaces,type,1)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(virtualsActions.getVirtualsSuccess(res.data.data.items))
    }
    else
    {
      yield put(virtualsActions.getVirtualsError(res.message))
    }
     
  } catch (e) {
    yield put(virtualsActions.getVirtualsError(e))
  }
}
// get Virtual Detail
const getVirtualsDetail = function*({payload:{virtualsId,closing_date,is_bookmark,meta}}){
    try {
      yield put(virtualsActions.setVirtualDetailStartTime(false))
      yield put(virtualsActions.setVirtualDetailSetTimeout(null))
      const res = yield call(api.getVirtualRaceDetail,virtualsId)
      yield put(virtualsActions.getVirtualsDetailSuccess(res.data.data))
      yield put(virtualsActions.setBookMarkVirtualRace(is_bookmark))
      yield put(virtualsActions.setVirtualDetailCloseDate(closing_date))
     
      const now = yield moment()
      const virtualRaceDetai = yield select(virtualsSelectors.getVirtualsDetail)
      const dateStart = yield moment(virtualRaceDetai.venue_list[0].start_date)
      const dateEnd = yield moment(virtualRaceDetai.venue_list[0].end_date)
      
      const status = yield virtualRaceDetai.activity_status === 0 && virtualRaceDetai.is_registered === true ? true : false
      const validDateStart = yield moment(now).isAfter(dateStart)
      const validDateEnd = yield moment(now).isBefore(dateEnd)
      const valid = yield status && validDateStart && validDateEnd
      yield put(virtualsActions.setVirtualDetailStartTime(!valid))
      if (validDateStart === false)
      {
      
        const diff = yield dateStart.diff(now)
        const duration = yield moment.duration(diff)
        const milliseconds = yield duration.as('milliseconds')
        yield put(virtualsActions.setVirtualDetailSetTimeout(milliseconds))
      }
      else {
        yield put(virtualsActions.setVirtualDetailSetTimeout(null))
      }
      meta.onSuccess && meta.onSuccess()
    }
    catch (e) {
      yield put(virtualsActions.getVirtualsDetailError(e))
      yield put(virtualsActions.setVirtualDetailSetTimeout(null))
      yield put(virtualsActions.setVirtualDetailStartTime(false))
    }
}

const getAddBookmarkVirtualRace = function*({payload:{virtual_Id,page,type,meta}}) {
  try {
    const params = {
      eventId: virtual_Id
    }   
    const res = yield call(api.addBookmarkForEvent,params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      // let listVirtualRace = []
      const virtualRaces = yield select(virtualsSelectors.getVirtuals)
      let  item_exists = yield R.find(R.propEq('id', virtual_Id))(virtualRaces)
      yield item_exists.is_bookmark = 1
      let index = yield R.findIndex(R.propEq('id', virtual_Id))(virtualRaces)
      virtualRaces[index] = item_exists
      
      yield put(virtualsActions.requestAddBookmarkVirtualRaceSuccess())
      yield put(virtualsActions.getVirtualsSuccess(virtualRaces))
      yield put(virtualsActions.setBookMarkVirtualRace(1))
      meta.onSuccess && meta.onSuccess()

    }
    else
    {
      yield put(virtualsActions.requestAddBookmarkVirtualRaceError(res.message))
    }
  } catch (e) {
    yield put(virtualsActions.requestAddBookmarkVirtualRaceError(e))
  }
}

const getRemoveBookmarkVirtualRace = function*({payload:{virtual_Id,page,type,meta}}) {
  try {
    const params = {
      eventId: virtual_Id
    }   
    const res = yield call(api.removeBookmarkForEvent,params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      const virtualRaces = yield select(virtualsSelectors.getVirtuals)
      let  item_exists = yield R.find(R.propEq('id', virtual_Id))(virtualRaces)
      yield item_exists.is_bookmark = 0
      let index = yield R.findIndex(R.propEq('id', virtual_Id))(virtualRaces)
      virtualRaces[index] = item_exists

      yield put(virtualsActions.requestRemoveBookmarkVirtualRaceSuccess())
      yield put(virtualsActions.getVirtualsSuccess(virtualRaces))
      yield put(virtualsActions.setBookMarkVirtualRace(0))
      meta.onSuccess && meta.onSuccess()

    }
    else
    {
      yield put(virtualsActions.requestRemoveBookmarkVirtualRaceSuccess(res.message))
    }
  } catch (e) {
    yield put(virtualsActions.requestRemoveBookmarkVirtualRaceSuccess(e))
  }
}
const getLoadMoreVirtualRace = function*({payload:{type, page}}) {
  try {
    const res = yield call(api.getVirtualRaces,type,page)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(virtualsActions.getLoadMoreVirtualRaceSuccess(res.data.data.items))
    }
    else
    {
      yield put(virtualsActions.getLoadMoreVirtualRaceError(res.message))
    }
   
    
  } catch (e) {
    yield put(virtualsActions.getLoadMoreVirtualRaceError(e))
  }
}

// prettier-ignore
const watcher = function* () {
  yield takeLatest(virtualsTypes.GET_VIRTUAL_START, getListVirtuals)
  yield takeLatest(virtualsTypes.GET_VIRTUAL_DETAIL_START,getVirtualsDetail)

  yield takeLatest(virtualsTypes.REQUEST_ADD_BOOKMARK_VIRTUAL_RACE, getAddBookmarkVirtualRace)
  yield takeLatest(virtualsTypes.REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE, getRemoveBookmarkVirtualRace)

  yield takeLatest(virtualsTypes.REQUEST_LOAD_MORE_VIRTUAL_RACE, getLoadMoreVirtualRace)

}

export default watcher()
