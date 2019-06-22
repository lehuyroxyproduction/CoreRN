import { createAction, handleActions } from 'redux-actions'

export const types = {
  GET_CHALLENGES_START: 'GET_CHALLENGES_START',
  GET_CHALLENGES_SUCCESS: 'GET_CHALLENGES_SUCCESS',
  GET_CHALLENGES_ERROR: 'GET_CHALLENGES_ERROR',
  GET_MYCHALLENGES_START: 'GET_MYCHALLENGES_START',
  GET_MYCHALLENGES_SUCCESS: 'GET_MYCHALLENGES_SUCCESS',
  GET_MYCHALLENGES_ERROR: 'GET_MYCHALLENGES_ERROR',
  GET_CHALLENGESDETAILS_START: 'GET_CHALLENGESDETAILS_START',
  GET_CHALLENGESDETAILS_SUCCESS: 'GET_CHALLENGESDETAILS_SUCCESS',
  GET_CHALLENGESDETAILS_ERROR: 'GET_CHALLENGESDETAILS_ERROR',
  REGISTER_CHALLENGES_START: 'REGISTER_CHALLENGES_START',
  REGISTER_CHALLENGES_SUCCESS: 'REGISTER_CHALLENGES_SUCCESS',
  REGISTER_CHALLENGES_ERROR: 'REGISTER_CHALLENGES_ERROR',

  SET_BOOKMARK_FOR_CHALLENGES: 'SET_BOOKMARK_FOR_CHALLENGES',
  REQUEST_ADD_BOOKMARK_CHALLENGES_START: 'REQUEST_ADD_BOOKMARK_CHALLENGES_START',
  REQUEST_ADD_BOOKMARK_CHALLENGES_SUCCESS: 'REQUEST_ADD_BOOKMARK_CHALLENGES_SUCCESS',
  REQUEST_ADD_BOOKMARK_CHALLENGES_ERROR: 'REQUEST_ADD_BOOKMARK_CHALLENGES_ERROR',

  REQUEST_REMOVE_BOOKMARK_CHALLENGES_START: 'REQUEST_REMOVE_BOOKMARK_CHALLENGES_START',
  REQUEST_REMOVE_BOOKMARK_CHALLENGES_SUCCESS: 'REQUEST_REMOVE_BOOKMARK_CHALLENGES_SUCCESS',
  REQUEST_REMOVE_BOOKMARK_CHALLENGES_ERROR: 'REQUEST_REMOVE_BOOKMARK_CHALLENGES_ERROR',

  // LoadMore
  REQUEST_LOAD_MORE_CHALLENGES: 'REQUEST_LOAD_MORE_CHALLENGES',
  REQUEST_LOAD_MORE_CHALLENGES_SUCCESS: 'REQUEST_LOAD_MORE_CHALLENGES_SUCCESS',
  REQUEST_LOAD_MORE_CHALLENGES_ERROR: 'REQUEST_LOAD_MORE_CHALLENGES_ERROR',

  // LoadMoreMyEvent
  REQUEST_LOAD_MORE_MY_CHALLENGES: 'REQUEST_LOAD_MORE_MY_CHALLENGES',
  REQUEST_LOAD_MORE_MY_CHALLENGES_SUCCESS: 'REQUEST_LOAD_MORE_MY_CHALLENGES_SUCCESS',
  REQUEST_LOAD_MORE_MY_CHALLENGES_ERROR: 'REQUEST_LOAD_MORE_MY_CHALLENGES_ERROR',
  

}

export const actions = {
  getChallengesStart: createAction(types.GET_CHALLENGES_START),
  getChallengesSuccess: createAction(types.GET_CHALLENGES_SUCCESS),
  getChallengesError: createAction(types.GET_CHALLENGES_ERROR),
  getMyChallengesStart: createAction(types.GET_MYCHALLENGES_START),
  getMyChallengesSuccess: createAction(types.GET_MYCHALLENGES_SUCCESS),
  getMyChallengesError: createAction(types.GET_MYCHALLENGES_ERROR),
  getChallengesDetailsStart: createAction(types.GET_CHALLENGESDETAILS_START),
  getChallengesDetailsSuccess: createAction(types.GET_CHALLENGESDETAILS_SUCCESS),
  getChallengesDetailsError: createAction(types.GET_CHALLENGESDETAILS_ERROR),
  registerChallengesStart: createAction(types.REGISTER_CHALLENGES_START),
  registerChallengesSuccess: createAction(types.REGISTER_CHALLENGES_SUCCESS),
  registerChallengesError: createAction(types.REGISTER_CHALLENGES_ERROR),

  setBookmarkForChallenges: createAction(types.SET_BOOKMARK_FOR_CHALLENGES),
  requestAddBookmarkChallengesStart: createAction(types.REQUEST_ADD_BOOKMARK_CHALLENGES_START),
  requestAddBookmarkChallengesSuccess: createAction(types.REQUEST_ADD_BOOKMARK_CHALLENGES_SUCCESS),
  requestAddBookmarkChallengesError: createAction(types.REQUEST_ADD_BOOKMARK_CHALLENGES_ERROR),

  requestRemoveBookmarkChallengesStart: createAction(types.REQUEST_REMOVE_BOOKMARK_CHALLENGES_START),
  requestRemoveBookmarkChallengesSuccess: createAction(types.REQUEST_REMOVE_BOOKMARK_CHALLENGES_SUCCESS),
  requestRemoveBookmarkChallengesError: createAction(types.REQUEST_REMOVE_BOOKMARK_CHALLENGES_ERROR),

  // Load More Event
  requestLoadMoreChallenge : createAction(types.REQUEST_LOAD_MORE_CHALLENGES),
  requestLoadMoreChallengeSuccess: createAction(types.REQUEST_LOAD_MORE_CHALLENGES_SUCCESS),
  requestLoadMoreChallengeError: createAction(types.REQUEST_LOAD_MORE_CHALLENGES_ERROR),

  // Load More My Event

  // Load More Event
  requestLoadMoreMyChallenge : createAction(types.REQUEST_LOAD_MORE_MY_CHALLENGES),
  requestLoadMoreMyChallengeSuccess: createAction(types.REQUEST_LOAD_MORE_MY_CHALLENGES_SUCCESS),
  requestLoadMoreMyChallengeError: createAction(types.REQUEST_LOAD_MORE_MY_CHALLENGES_ERROR),
}

const defaultState = {
  listChallenges: null,
  listMyChallenges: null,
  challengesDetails: null,
  bookMarkForChallenges: null
}
export const selectors = {
  getChallenges: state => state.challenges.listChallenges,
  getMyChallenges: state => state.challenges.listMyChallenges,
  getChallengeDetails: state => state.challenges.challengesDetails,
  // getLoading: state => state.ui

  getLoading: (state, action) => {
    return state.ui.challenges[action].isLoading
  },
  getBookMarkChallenge: state => state.challenges.bookMarkForChallenges,
}
export default handleActions(
  {
    [types.GET_CHALLENGES_SUCCESS]: (state, { payload }) => {
      return { ...state, listChallenges: payload }
    },
    [types.GET_MYCHALLENGES_SUCCESS]: (state, { payload }) => {
      return { ...state, listMyChallenges: payload }
    },
    [types.GET_CHALLENGESDETAILS_SUCCESS]: (state, { payload }) => {
      return { ...state, challengesDetails: payload }
    },
    [types.REGISTER_CHALLENGES_SUCCESS]: (state, { payload }) => {
      return { ...state }
    },

    [types.SET_BOOKMARK_FOR_CHALLENGES]: (state, { payload }) => {
      return { ...state, bookMarkForChallenges: payload  }
    },
    [types.REQUEST_LOAD_MORE_CHALLENGES_SUCCESS]: (state, { payload }) => {
      return { ...state, listChallenges: state.listChallenges.concat(payload) }
    },
    [types.REQUEST_LOAD_MORE_MY_CHALLENGES_SUCCESS]: (state, { payload }) => {
      return { ...state, listMyChallenges: state.listMyChallenges.concat(payload) }
    }

  },
  defaultState
)
