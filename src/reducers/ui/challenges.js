import { combineReducers } from 'redux'
import { reducerFactory } from 'utils'

import { types } from 'reducers/challenges'

export default combineReducers({
  getListChallenges: reducerFactory({
    onStart: types.GET_CHALLENGES_START,
    onSuccess: types.GET_CHALLENGES_SUCCESS,
    onError: types.GET_CHALLENGES_ERROR
  }),
  getListMyChallenges: reducerFactory({
    onStart: types.GET_MYCHALLENGES_START,
    onSuccess: types.GET_MYCHALLENGES_SUCCESS,
    onError: types.GET_MYCHALLENGES_ERROR
  }),
  getChallengesDetailsStart: reducerFactory({
    onStart: types.GET_CHALLENGESDETAILS_START,
    onSuccess: types.GET_CHALLENGESDETAILS_SUCCESS,
    onError: types.GET_CHALLENGESDETAILS_ERROR
  }),
  registerChallenges: reducerFactory({
    onStart: types.REGISTER_CHALLENGES_START,
    onSuccess: types.REGISTER_CHALLENGES_SUCCESS,
    onError: types.REGISTER_CHALLENGES_ERROR
  }),
  
  addBookMarkChallenges: reducerFactory({
    onStart: types.REQUEST_ADD_BOOKMARK_CHALLENGES_START,
    onSuccess: types.REQUEST_ADD_BOOKMARK_CHALLENGES_SUCCESS,
    onError: types.REQUEST_ADD_BOOKMARK_CHALLENGES_ERROR
  }),

  removeBookMarkChallenges: reducerFactory({
    onStart: types.REQUEST_REMOVE_BOOKMARK_CHALLENGES_START,
    onSuccess: types.REQUEST_REMOVE_BOOKMARK_CHALLENGES_SUCCESS,
    onError: types.REQUEST_REMOVE_BOOKMARK_CHALLENGES_ERROR
  }),

})

// export default app
