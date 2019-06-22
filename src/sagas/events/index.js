import { AsyncStorage, Platform, Alert } from 'react-native'
import { call, select, put, takeLatest, delay } from 'redux-saga/effects'
import {
  authSelectors,
  eventsActions,
  eventSelectors,
  eventsTypes
} from 'reducers'

import { api } from 'services'

// import App from 'app'
import { STATUS_CODE } from 'constant'

import * as R from 'ramda'

// get list for screen Event
const getListEvents = function*() {
  try {
    const res = yield call(api.getEvents)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      console.log('------------list Events', res.data.data)
      yield put(eventsActions.getEventsSuccess(res.data.data.items))
    } else {
      yield put(eventsActions.getEventsError(res.data.message))
    }
  } catch (e) {
    yield put(eventsActions.getEventsError(e))
  }
}

// get list for screen MyEvents
const getListMyEvents = function*() {
  try {
    const res = yield call(api.getEvents)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      let data_filter = R.filter(R.propEq('is_registered', true), res.data.data.items)
      console.log('------------list MyEvents', data_filter)
      yield put(eventsActions.getMyEventsSuccess(data_filter))
    } else {
      yield put(eventsActions.getMyEventsError(res.data.message))
    }
  } catch (e) {
    yield put(eventsActions.getMyEventsError(e))
  }
}
// get list for screen MyEvents
const getEventsDetailsStart = function*({payload:{event_id,is_bookmark,meta}}) {
  try {
    const res = yield call(api.getEventDetials,event_id)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      console.log('------------Event Details', res.data.data)
      yield put(eventsActions.getEventsDetailsSuccess(res.data.data))
      yield put(eventsActions.setBookmarkForEvent(is_bookmark))
      meta.onSuccess && meta.onSuccess()
    } else {
      yield put(eventsActions.getEventsDetailsError(res.data.message))
    }
  } catch (e) {
    yield put(eventsActions.getEventsDetailsError(e))
  }
}

const getAddBookmarkEvent = function*({payload:{event_id,screen = null, meta}}) {
  try {
    const params = {
      eventId: event_id
    }   
    const res = yield call(api.addBookmarkForEvent,params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      if (screen === 'EVENT')
      {
        const events = yield select(eventSelectors.getEvents)
        let  item_exists = yield R.find(R.propEq('id', event_id))(events)
        yield item_exists.is_bookmark = 1
        let index = yield R.findIndex(R.propEq('id', event_id))(events)
        events[index] = item_exists
        yield put(eventsActions.getEventsSuccess(events))
      }
      if (screen === 'MYEVENT')
      {
        const Myevents = yield select(eventSelectors.getMyEvents)
        let  item_exists = yield R.find(R.propEq('id', event_id))(Myevents)
        yield item_exists.is_bookmark = 1
        let index = yield R.findIndex(R.propEq('id', event_id))(Myevents)
        Myevents[index] = item_exists
        yield put(eventsActions.getMyEventsSuccess(Myevents))
      }

 

      yield put(eventsActions.requestAddBookMarkEventSuccess())
      yield put(eventsActions.setBookmarkForEvent(1))
      meta.onSuccess && meta.onSuccess()
    }
    else
    {
      yield put(eventsActions.requestAddBookmarkEventError(res.message))
    }
  } catch (e) {
    yield put(eventsActions.requestAddBookmarkEventError(e))
  }
}
const getRemoveBookmarkEvent = function*({payload:{event_id,screen = null, meta}}) {
  try {
    const params = {
      eventId: event_id
    }
    const res = yield call(api.removeBookmarkForEvent,params)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {

      if (screen === 'EVENT')
      {
        const events = yield select(eventSelectors.getEvents)
        let  item_existsEvent = yield R.find(R.propEq('id', event_id))(events)
        yield item_existsEvent.is_bookmark = 0
        let indexEvent = yield R.findIndex(R.propEq('id', event_id))(events)
        events[indexEvent] = item_existsEvent
        yield put(eventsActions.getEventsSuccess(events))
      }
      if (screen === 'MYEVENT')
      {
        const Myevents = yield select(eventSelectors.getMyEvents)
        let  item_exists = yield R.find(R.propEq('id', event_id))(Myevents)
        yield item_exists.is_bookmark = 0
        let index = yield R.findIndex(R.propEq('id', event_id))(Myevents)
        Myevents[index] = item_exists
        yield put(eventsActions.getMyEventsSuccess(Myevents))
      }


  

      yield put(eventsActions.requestRemoveBookMarkEventSuccess())
      yield put(eventsActions.setBookmarkForEvent(0))
      meta.onSuccess && meta.onSuccess()
    }
    else
    {
      yield put(eventsActions.requestRemoveBookmarkEventError(res.message))
    }
    
  } catch (e) {
    yield put(eventsActions.requestRemoveBookmarkEventError(e))
  }
}
const getLoadMoreEvent = function*({payload:{page}})
{
  try {
    const res = yield call(api.getEvents,page)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      yield put(eventsActions.requestLoadMoreEventSuccess(res.data.data.items))
    } else {
      yield put(eventsActions.requestLoadMoreEventError(res.data.message))
    }
    
  } catch (e) {
    yield put(eventsActions.requestLoadMoreEventError(e))
  }

}

const getLoadMoreMyEvent = function*({payload:{page}})
{
  try {
    const res = yield call(api.getEvents,page)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      let data_filter = R.filter(R.propEq('is_registered', true), res.data.data.items)
      console.log('------------list MyEvents', data_filter)
      yield put(eventsActions.requestLoadMoreMyEventSuccess(data_filter))
    } else {
      yield put(eventsActions.requestLoadMoreMyEventError(res.data.message))
    }
    
  } catch (e) {
    yield put(eventsActions.requestLoadMoreMyEventError(res.data.message))
  }
}

// prettier-ignore
const watcher = function* () {
  yield takeLatest(eventsTypes.GET_EVENTS_START, getListEvents)
  yield takeLatest(eventsTypes.GET_MYEVENTS_START, getListMyEvents)
  yield takeLatest(eventsTypes.GET_EVENTSDETAILS_START, getEventsDetailsStart)

  yield takeLatest(eventsTypes.REQUEST_ADD_BOOKMARK_EVENT_START, getAddBookmarkEvent)
  yield takeLatest(eventsTypes.REQUEST_REMOVE_BOOKMARK_EVENT_START, getRemoveBookmarkEvent)

  yield takeLatest(eventsTypes.REQUEST_LOAD_MORE_EVENT, getLoadMoreEvent)

  yield takeLatest(eventsTypes.REQUEST_LOAD_MORE_MY_EVENT, getLoadMoreMyEvent)
}

export default watcher()
