import { createAction, handleActions } from 'redux-actions'

export const types={
  GET_EVENTS_START : 'GET_EVENTS_START',
  GET_EVENTS_SUCCESS : 'GET_EVENTS_SUCCESS',
  GET_EVENTS_ERROR : 'GET_EVENTS_ERROR',
  GET_MYEVENTS_START : 'GET_MYEVENTS_START',
  GET_MYEVENTS_SUCCESS : 'GET_MYEVENTS_SUCCESS',
  GET_MYEVENTS_ERROR : 'GET_MYEVENTS_ERROR',
  GET_EVENTSDETAILS_START : 'GET_EVENTSDETAILS_START',
  GET_EVENTSDETAILS_SUCCESS : 'GET_EVENTSDETAILS_SUCCESS',
  GET_EVENTSDETAILS_ERROR : 'GET_EVENTSDETAILS_ERROR',

  // Add Bookmark
  ADD_BOOKMARK_EVENT: 'ADD_BOOKMARK_EVENT',

  //Request Add Bookmark
  REQUEST_ADD_BOOKMARK_EVENT_START: 'REQUEST_ADD_BOOKMARK_EVENT_START',
  REQUEST_ADD_BOOKMARK_EVENT_SUCCESS: 'REQUEST_ADD_BOOKMARK_EVENT_SUCCESS',
  REQUEST_ADD_BOOKMARK_EVENT_ERROR: 'REQUEST_ADD_BOOKMARK_EVENT_ERROR',

  //Remove Bookmark

  REQUEST_REMOVE_BOOKMARK_EVENT_START: 'REQUEST_REMOVE_BOOKMARK_EVENT_START',
  REQUEST_REMOVE_BOOKMARK_EVENT_SUCCESS: 'REQUEST_REMOVE_BOOKMARK_EVENT_SUCCESS',
  REQUEST_REMOVE_BOOKMARK_EVENT_ERROR: 'REQUEST_REMOVE_BOOKMARK_EVENT_ERROR',

  // LoadMore
  REQUEST_LOAD_MORE_EVENT: 'REQUEST_LOAD_MORE_EVENT',
  REQUEST_LOAD_MORE_EVENT_SUCCESS: 'REQUEST_LOAD_MORE_EVENT_SUCCESS',
  REQUEST_LOAD_MORE_EVENT_ERROR: 'REQUEST_LOAD_MORE_EVENT_ERROR',

  // LoadMoreMyEvent
  REQUEST_LOAD_MORE_MY_EVENT: 'REQUEST_LOAD_MORE_MY_EVENT',
  REQUEST_LOAD_MORE_MY_EVENT_SUCCESS: 'REQUEST_LOAD_MORE_MY_EVENT_SUCCESS',
  REQUEST_LOAD_MORE_MY_EVENT_ERROR: 'REQUEST_LOAD_MORE_MY_EVENT_ERROR',

}

export const actions = {
  getEventsStart: createAction(types.GET_EVENTS_START),
  getEventsSuccess: createAction(types.GET_EVENTS_SUCCESS),
  getEventsError: createAction(types.GET_EVENTS_ERROR),
  getMyEventsStart: createAction(types.GET_MYEVENTS_START),
  getMyEventsSuccess: createAction(types.GET_MYEVENTS_SUCCESS),
  getMyEventsError: createAction(types.GET_MYEVENTS_ERROR),
  getEventsDetailsStart: createAction(types.GET_EVENTSDETAILS_START),
  getEventsDetailsSuccess: createAction(types.GET_EVENTSDETAILS_SUCCESS),
  getEventsDetailsError: createAction(types.GET_EVENTSDETAILS_ERROR),
  // create action for add bookmark event
  setBookmarkForEvent: createAction(types.ADD_BOOKMARK_EVENT),
  requestAddBookmarkEventStart: createAction(types.REQUEST_ADD_BOOKMARK_EVENT_START),
  requestAddBookMarkEventSuccess: createAction(types.REQUEST_ADD_BOOKMARK_EVENT_SUCCESS),
  requestAddBookmarkEventError: createAction(types.REQUEST_ADD_BOOKMARK_EVENT_ERROR),
  // create action for remove bookmark event

  requestRemoveBookmarkEventStart: createAction(types.REQUEST_REMOVE_BOOKMARK_EVENT_START),
  requestRemoveBookMarkEventSuccess: createAction(types.REQUEST_REMOVE_BOOKMARK_EVENT_SUCCESS),
  requestRemoveBookmarkEventError: createAction(types.REQUEST_REMOVE_BOOKMARK_EVENT_ERROR),

  // Load More Event
  requestLoadMoreEvent : createAction(types.REQUEST_LOAD_MORE_EVENT),
  requestLoadMoreEventSuccess: createAction(types.REQUEST_LOAD_MORE_EVENT_SUCCESS),
  requestLoadMoreEventError: createAction(types.REQUEST_LOAD_MORE_EVENT_ERROR),

  // Load More My Event

  // Load More Event
  requestLoadMoreMyEvent : createAction(types.REQUEST_LOAD_MORE_MY_EVENT),
  requestLoadMoreMyEventSuccess: createAction(types.REQUEST_LOAD_MORE_MY_EVENT_SUCCESS),
  requestLoadMoreMyEventError: createAction(types.REQUEST_LOAD_MORE_MY_EVENT_ERROR),
  

  
  
}

const defaultState = {
  listEvents: null,
  listMyEvents: null,
  eventsDetails: null,
  bookmarkEvent: null
}
export const selectors = {
  getEvents: state => state.events.listEvents,
  getMyEvents: state => state.events.listMyEvents,
  getEventDetails: state => state.events.eventsDetails,
  // getLoading: state => state.ui

  getBookmarkEvent: state => state.events.bookmarkEvent,

  getLoading: (state, action) => {
    return state.ui.events[action].isLoading
  }
}
export default handleActions(
  {
    [types.GET_EVENTS_SUCCESS]: (state, { payload }) => {
      return { ...state, listEvents: payload }
    },
    [types.GET_MYEVENTS_SUCCESS]: (state, { payload }) => {
      return { ...state, listMyEvents: payload }
    },
    [types.GET_EVENTSDETAILS_SUCCESS]: (state, { payload }) => {
      return { ...state, eventsDetails: payload }
    },
    [types.ADD_BOOKMARK_EVENT]: (state, { payload }) => {
      return { ...state, bookmarkEvent: payload }
    },
    [types.REQUEST_LOAD_MORE_EVENT_SUCCESS]: (state, { payload }) => {
      return { ...state, listEvents: state.listEvents.concat(payload) }
    },
    [types.REQUEST_LOAD_MORE_MY_EVENT_SUCCESS]: (state, { payload }) => {
      return { ...state, listMyEvents: state.listMyEvents.concat(payload) }
    }
  },
  defaultState
)
