import { createAction, handleActions } from 'redux-actions'
export const types={
    GET_VIRTUAL_START : 'GET_VIRTUAL_START',
    GET_VIRTUAL_SUCCESS : 'GET_VIRTUAL_SUCCESS',
    GET_VIRTUAL_ERROR : 'GET_VIRTUAL_ERROR',
    GET_VIRTUAL_DETAIL_START : 'GET_VIRTUAL_DETAIL_START',
    GET_VIRTUAL_DETAIL_SUCCESS : 'GET_VIRTUAL_DETAIL_SUCESS',
    GET_VIRTUAL_DETAIL_ERROR: 'GET_VIRTUAL_DETAIL_ERROR',
    SET_VIRTUAL_DETAIL_START_TIME: 'SET_VIRTUAL_DETAIL_START_TIME',
    SET_VIRTUAL_DETAIL_TIME_OUT: 'SET_VIRTUAL_DETAIL_TIME_OUT',
    SET_VIRTUAL_DETAIL_ACTIVITY_STATUS: 'SET_VIRTUAL_DETAIL_ACTIVITY_STATUS',
    SET_VIRTUAL_DETAIL_CLOSE_DATE: 'SET_VIRTUAL_DETAIL_CLOSE_DATE',

    REQUEST_LOAD_MORE_VIRTUAL_RACE: 'REQUEST_LOAD_MORE_VIRTUAL_RACE',
    REQUEST_LOAD_MORE_VIRTUAL_RACE_SUCCESS: 'REQUEST_LOAD_MORE_VIRTUAL_RACE_SUCCESS',
    REQUEST_LOAD_MORE_VIRTUAL_RACE_ERROR: 'REQUEST_LOAD_MORE_VIRTUAL_RACE_ERROR',


    SET_BOOKMARK_VIRTUAL_RACE: 'SET_BOOKMARK_VIRTUAL_RACE',
    REQUEST_ADD_BOOKMARK_VIRTUAL_RACE: 'REQUEST_ADD_BOOKMARK_VIRTUAL_RACE',
    REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_SUCCESS: 'REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_SUCCESS',
    REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_ERROR: 'REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_ERROR',
    

    REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE: 'REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE',
    REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_SUCCESS: 'REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_SUCCESS',
    REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_ERROR: 'REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_ERROR',



  }

export const actions = {
    getVirtualsStart: createAction(types.GET_VIRTUAL_START),
    getVirtualsSuccess: createAction(types.GET_VIRTUAL_SUCCESS),
    getVirtualsError: createAction(types.GET_VIRTUAL_ERROR),

    getLoadMoreVirtualRace: createAction(types.REQUEST_LOAD_MORE_VIRTUAL_RACE),
    getLoadMoreVirtualRaceSuccess: createAction(types.REQUEST_LOAD_MORE_VIRTUAL_RACE_SUCCESS),
    getLoadMoreVirtualRaceError: createAction(types.REQUEST_LOAD_MORE_VIRTUAL_RACE_ERROR),
    
    getVirtualsDetailStart: createAction(types.GET_VIRTUAL_DETAIL_START),
    getVirtualsDetailSuccess: createAction(types.GET_VIRTUAL_DETAIL_SUCCESS),
    getVirtualsDetailError: createAction(types.GET_VIRTUAL_DETAIL_ERROR),
    setVirtualDetailStartTime: createAction(types.SET_VIRTUAL_DETAIL_START_TIME),
    setVirtualDetailSetTimeout: createAction(types.SET_VIRTUAL_DETAIL_TIME_OUT),

    setVirtualDetailActivityStatus: createAction(types.SET_VIRTUAL_DETAIL_ACTIVITY_STATUS),
    setVirtualDetailCloseDate: createAction(types.SET_VIRTUAL_DETAIL_CLOSE_DATE),

    setBookMarkVirtualRace: createAction(types.SET_BOOKMARK_VIRTUAL_RACE),
    requestAddBookmarkVirtualRace: createAction(types.REQUEST_ADD_BOOKMARK_VIRTUAL_RACE),
    requestAddBookmarkVirtualRaceSuccess: createAction(types.REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_SUCCESS),
    requestAddBookmarkVirtualRaceError: createAction(types.REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_ERROR),

    requestRemoveBookmarkVirtualRace: createAction(types.REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE),
    requestRemoveBookmarkVirtualRaceSuccess: createAction(types.REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_SUCCESS),
    requestRemoveBookmarkVirtualRaceError: createAction(types.REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_ERROR)

    
  }

  const defaultState = {
    listVirtuals: [],
    virtualsDetail: null,
    virtualDetailStartTime: false,
    virtualDetailTimeout: null,
    virtualDetailActivityStatus: null,
    virtualDetailCloseDate: null,
    bookmarkVirtualRace: null
  }

  export const selectors = {
    getVirtuals: state => state.virtuals.listVirtuals,
    getLoading: (state, action) => {
      return state.ui.virtuals[action].isLoading
    },
    getVirtualsDetail: state => state.virtuals.virtualsDetail,
    getVirtualDetailStartTime: state => state.virtuals.virtualDetailStartTime,
    getVirtualDetailTimeout: state => state.virtuals.virtualDetailTimeout,

    getVirtualDetailActivityStatus: state => state.virtuals.virtualDetailActivityStatus,
    getVirtualDetailCloseDate: state => state.virtuals.virtualDetailCloseDate,

    getBookMarkVirtualRace: state =>  state.virtuals.bookmarkVirtualRace
  }
  export default handleActions(
    {
      // [types.GET_VIRTUAL_RESET]: (state, { payload }) => {
      //   return { ...state, listVirtuals: [] }
      // },
      // [types.SET_BOOKMARK_DATA_VIRTUAL_RACE]: (state, { payload }) => {
      //   return { ...state, listVirtuals: payload }
      // },
      [types.GET_VIRTUAL_SUCCESS]: (state, { payload }) => {
        return { ...state, listVirtuals: payload }
      },
      [types.REQUEST_LOAD_MORE_VIRTUAL_RACE_SUCCESS]: (state, { payload }) => {
        return { ...state, listVirtuals: state.listVirtuals.concat(payload) }
      },
      [types.GET_VIRTUAL_DETAIL_SUCCESS]: (state, { payload }) => {
        return { ...state, virtualsDetail: payload }
      },
      [types.SET_VIRTUAL_DETAIL_START_TIME]: (state, { payload }) => {
        return { ...state, virtualDetailStartTime: payload }
      },
      [types.SET_VIRTUAL_DETAIL_TIME_OUT]: (state, { payload }) => {
        return { ...state, virtualDetailTimeout: payload }
      },
      [types.SET_VIRTUAL_DETAIL_ACTIVITY_STATUS]: (state, { payload }) => {
        return { ...state, virtualDetailActivityStatus: payload }
      },
      [types.SET_VIRTUAL_DETAIL_CLOSE_DATE]: (state, { payload }) => {
        return { ...state, virtualDetailCloseDate: payload }
      },
      [types.SET_BOOKMARK_VIRTUAL_RACE]: (state, { payload }) => {
        return { ...state, bookmarkVirtualRace: payload }
      }
    },
    defaultState
  )