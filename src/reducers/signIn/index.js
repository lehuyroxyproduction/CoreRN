import { combineReducers } from 'redux'
import * as types from './actionTypes'

const signInType = (state = '', action) => {
  switch (action.type) {
    case types.SET_SIGN_IN_TYPE:
      return action.payload
    case types.SIGN_OUT_SUCCESS:
      return ''
    default:
      return state
  }
}

const isLoadingR = (state = false, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return action.payload
    default:
      return state
  }
}

const signInReducers = combineReducers({
  signInType,
  isLoading: isLoadingR,
})

export default signInReducers

/**
 * Selectors
 */
export const getSignInType = state => state.signIn.signInType
export const isLoading = state => state.signIn.isLoading
