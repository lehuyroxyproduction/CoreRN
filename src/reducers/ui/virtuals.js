import { combineReducers } from 'redux'
import { reducerFactory } from 'utils'

import { types } from 'reducers/virtuals'

export default combineReducers({
  getListVirtuals: reducerFactory({
    onStart: types.GET_VIRTUAL_START,
    onSuccess: types.GET_VIRTUAL_SUCCESS,
    onError: types.GET_VIRTUAL_ERROR
  }),
  getVirtualsDetail: reducerFactory({
    onStart: types.GET_VIRTUAL_DETAIL_START,
    onSuccess: types.GET_VIRTUAL_DETAIL_SUCCESS,
    onError: types.GET_VIRTUAL_DETAIL_ERROR
  }),
  getVirtualDetailAddBookmark: reducerFactory({
    onStart: types.REQUEST_ADD_BOOKMARK_VIRTUAL_RACE,
    onSuccess: types.REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_SUCCESS,
    onError: types.REQUEST_ADD_BOOKMARK_VIRTUAL_RACE_ERROR
  }),

  getVirtualDetailRemoveBookmark: reducerFactory({
    onStart: types.REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE,
    onSuccess: types.REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_SUCCESS,
    onError: types.REQUEST_REMOVE_BOOKMARK_VIRTUAL_RACE_ERROR
  }),
})

// export default app
