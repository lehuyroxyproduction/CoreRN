import { combineReducers } from 'redux'
import { reducerFactory } from 'utils'

import { types } from 'reducers/events'

export default combineReducers({
  getListEvents: reducerFactory({
    onStart: types.GET_EVENTS_START,
    onSuccess: types.GET_EVENTS_SUCCESS,
    onError: types.GET_EVENTS_ERROR
  }),
  getListMyEvents: reducerFactory({
    onStart: types.GET_MYEVENTS_START,
    onSuccess: types.GET_MYEVENTS_SUCCESS,
    onError: types.GET_MYEVENTS_ERROR
  }),
  getEventsDetailsStart: reducerFactory({
    onStart: types.GET_EVENTSDETAILS_START,
    onSuccess: types.GET_EVENTSDETAILS_SUCCESS,
    onError: types.GET_EVENTSDETAILS_ERROR
  }),

  getEventsDetailAddBookmark: reducerFactory({
    onStart: types.REQUEST_ADD_BOOKMARK_EVENT_START,
    onSuccess: types.REQUEST_ADD_BOOKMARK_EVENT_SUCCESS,
    onError: types.REQUEST_ADD_BOOKMARK_EVENT_ERROR
  }),

  getEventsDetailRemoveBookmark: reducerFactory({
    onStart: types.REQUEST_REMOVE_BOOKMARK_EVENT_START,
    onSuccess: types.REQUEST_REMOVE_BOOKMARK_EVENT_SUCCESS,
    onError: types.REQUEST_REMOVE_BOOKMARK_EVENT_ERROR
  }),

})

// export default app
