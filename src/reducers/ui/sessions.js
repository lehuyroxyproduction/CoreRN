import { combineReducers } from 'redux'

import { reducerFactory } from 'utils'

import { sessionTypes } from 'reducers'

export default combineReducers({
  addSession: reducerFactory({
    onStart: sessionTypes.ADD_SESSION,
    onSuccess: sessionTypes.ADD_SESSION_SUCCESS,
    onError: sessionTypes.ADD_SESSION_ERROR
  }),
  updateSession: reducerFactory({
    onStart: sessionTypes.UPDATE_SESSION,
    onSuccess: sessionTypes.UPDATE_SESSION_SUCCESS,
    onError: sessionTypes.UPDATE_SESSION_ERROR
  }),
  endSession: reducerFactory({
    onStart: sessionTypes.END_SESSION,
    onSuccess: sessionTypes.END_SESSION_SUCCESS,
    onError: sessionTypes.END_SESSION_ERROR
  }),
  pauseSession: reducerFactory({
    onStart: sessionTypes.PAUSE_SESSION,
    onSuccess: sessionTypes.PAUSE_SESSION_SUCCESS,
    onError: sessionTypes.PAUSE_SESSION_ERROR
  }),
  resumeSession: reducerFactory({
    onStart: sessionTypes.RESUME_SESSION,
    onSuccess: sessionTypes.RESUME_SESSION_SUCCESS,
    onError: sessionTypes.RESUME_SESSION_ERROR
  })
})
