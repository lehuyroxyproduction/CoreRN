import * as types from './actionTypes'

export const setLoading = value => ({
  type: types.SET_LOADING,
  payload: value
})

export const setSignInType = type => ({
  type: types.SET_SIGN_IN_TYPE,
  payload: type
})

export const requestGoogleSignIn = onPop => ({
  type: types.REQUEST_GOOGLE_SIGN_IN,
  meta: {onPop}
})

export const requestFacebookSignIn = onPop => ({
  type: types.REQUEST_FACEBOOK_SIGN_IN,
  meta: {onPop}
})

export const requestAlternateFacebookSignIn = (user, onPop, onNext) => ({
  type: types.REQUEST_ALTERNATE_FACEBOOK_SIGN_IN,
  payload: user,
  meta: {onPop, onNext}
})

export const requestSignOut = onSuccess => ({
  type: types.REQUEST_SIGN_OUT,
  meta: {onSuccess}
})

export const signOutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS
})
