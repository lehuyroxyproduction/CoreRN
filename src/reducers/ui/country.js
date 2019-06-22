import { combineReducers } from 'redux'

import { reducerFactory } from 'utils'

import { types } from 'reducers/country'

export default combineReducers({
  getCountry: reducerFactory({
    onStart: types.GET_COUNTRY,
    onSuccess: types.GET_COUNTRY_SUCCESS,
    onError: types.GET_COUNTRY_ERROR
  })
})
