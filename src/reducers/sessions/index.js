import { createAction, handleActions } from 'redux-actions'

export const types = {
  // add session
  ADD_SESSION: 'ADD_SESSION',
  ADD_SESSION_SUCCESS: 'ADD_SESSION_SUCCESS',
  ADD_SESSION_ERROR: 'ADD_SESSION_ERROR',
  // update session
  // UPDATE_SESSION: 'UPDATE_SESSION',
  // UPDATE_SESSION_SUCCESS: 'UPDATE_SESSION_SUCCESS',
  // UPDATE_SESSION_ERROR: 'UPDATE_SESSION_ERROR',
  // end session
  END_SESSION: 'END_SESSION',
  END_SESSION_SUCCESS: 'END_SESSION_SUCCESS',
  END_SESSION_FINISHED: 'END_SESSION_FINISHED',
  END_SESSION_UPDATE_ADDRESS_FOR_USER: 'END_SESSION_UPDATE_ADDRESS_FOR_USER',
  END_SESSION_UPDATE_ADDRESS_ERROR_FOR_USER: 'END_SESSION_UPDATE_ADDRESS_ERROR_FOR_USER',
  END_SESSION_ERROR: 'END_SESSION_ERROR',
  // pause session
  PAUSE_SESSION: 'PAUSE_SESSION',
  PAUSE_SESSION_SUCCESS: 'PAUSE_SESSION_SUCCESS',
  PAUSE_SESSION_ERROR: 'PAUSE_SESSION_ERROR',
  // restart session
  RESUME_SESSION: 'RESUME_SESSION',
  RESUME_SESSION_SUCCESS: 'RESUME_SESSION_SUCCESS',
  RESUME_SESSION_ERROR: 'RESUME_SESSION_ERROR'
}

export const actions = {
  // add session
  addSession: createAction(types.ADD_SESSION),
  addSessionSuccess: createAction(types.ADD_SESSION_SUCCESS),
  addSessionError: createAction(types.ADD_SESSION_ERROR),
  // update session
  // updateSession: createAction(types.UPDATE_SESSION),
  // updateSessionSuccess: createAction(types.UPDATE_SESSION_SUCCESS),
  // updateSessionError: createAction(types.UPDATE_SESSION_ERROR),
  // end session
  // endSession: onSuccess => ({
  //   type: types.END_SESSION,
  //   meta: { onSuccess }
  // }),
  endSession: createAction(types.END_SESSION),
  endSessionSuccess: createAction(types.END_SESSION_SUCCESS),
  endSessionFinished: createAction(types.END_SESSION_FINISHED),
  endSessionUpdateAddressForUser: createAction(types.END_SESSION_UPDATE_ADDRESS_FOR_USER),
  endSessionUpdateAddressErrorForUser: createAction(types.END_SESSION_UPDATE_ADDRESS_ERROR_FOR_USER),
  endSessionUpdateAddressError: createAction(types),
  endSessionError: createAction(types.END_SESSION_ERROR),
  // pause session
  pauseSession: createAction(types.PAUSE_SESSION),
  pauseSessionSuccess: createAction(types.PAUSE_SESSION_SUCCESS),
  pauseSessionError: createAction(types.PAUSE_SESSION_ERROR),
  // restart session
  resumeSession: createAction(types.RESUME_SESSION),
  resumeSessionSuccess: createAction(types.RESUME_SESSION_SUCCESS),
  resumeSessionError: createAction(types.RESUME_SESSION_ERROR)
}

export const selectors = {
  getSession: state => state.sessions.session,
  getLoading: (state, action) => {
    return state.ui.sessions[action].isLoading
  },
  getSessionFinished: state => state.sessions.finished_data
}

const defaultState = {
  session: null,
  finished_data: []
}

export default handleActions(
  {
    [types.ADD_SESSION_SUCCESS]: (state, { payload }) => {
      return { ...state, session: payload, finished_data: [] }
    },
    [types.ADD_SESSION_ERROR]: (state, { payload }) => {
      return { ...state, session: null, finished_data: [] }
    },
    [types.END_SESSION_SUCCESS]: (state, { payload }) => {
      return { ...state, session: {} }
    },
    [types.END_SESSION_FINISHED]: (state, { payload }) => {
      return { ...state, finished_data: payload }
    }
  },
  defaultState
)
