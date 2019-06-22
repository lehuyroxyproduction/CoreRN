import { createAction, handleActions } from 'redux-actions'

export const types = {
  GET_COUNTRY: 'GET_COUNTRY',
  GET_COUNTRY_SUCCESS: 'GET_COUNTRY_SUCCESS',
  GET_COUNTRY_ERROR: 'GET_COUNTRY_ERROR'
}

export const actions = {
  getCountry: createAction(types.GET_COUNTRY),
  getCountrySuccess: createAction(types.GET_COUNTRY_SUCCESS),
  getCountryError: createAction(types.GET_COUNTRY_ERROR)
}

export const selectors = {
  getCountry: state => state.country.country,
  getLoading: (state, action) => {
    return state.ui.country[action].isLoading
  }
}

const defaultState = {
  country: []
}

export default handleActions(
  {
    [types.GET_COUNTRY_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        country: payload
      }
    }
  },
  defaultState
)
