import { Alert, Platform } from 'react-native'

import { takeLatest, call, select, put, delay } from 'redux-saga/effects'

import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk'

import * as types from 'reducers/signIn/actionTypes'
import * as actions from 'reducers/signIn/actions'
import { getSignInType } from 'reducers/signIn'
import { authActions, authSelectors, authTypes } from 'reducers'
import config from 'config'
import { api } from 'services'

import { logEvent } from 'services/firebase'

/**
 * Constants
 */
export const SIGN_IN_TYPES = {
  Google: 'Google',
  Facebook: 'Facebook'
}

const SOCIAL_TYPES = {
  Google: 'gg',
  Facebook: 'fb'
}

/**
 * Configurations
 */
GoogleSignin.configure({
  webClientId: config.google.webClientId,
  iosClientId: config.google.iosClientId
})

/**
 * Utils
 */

/**
 * Sagas
 */

const requestGoogleSignIn = function*({ meta: { onPop } }) {
  try {
    yield put(actions.setLoading(false))
    yield put(actions.setLoading(true))
    // yield call(GoogleSignin.revokeAccess)
    yield call(GoogleSignin.signOut)
    // yield delay(200)

    // Sign in
    yield call(GoogleSignin.hasPlayServices)
    const userInfo = yield call(GoogleSignin.signIn)
    // console.log('---------userInfo', userInfo)
    // Consume info
    const { user, accessToken } = userInfo
    const { id, photo, name, email } = user
    const payload = {
      photo_url: photo,
      name,
      email,
      accessToken,
      social_id: id,
      social_type: SIGN_IN_TYPES.Google,
      onPop
    }
    // yield put(authActions.createUser({...payload, google_id: id, onPop}))
    yield put(authActions.signInSocial(payload))

    yield put(actions.setSignInType(SIGN_IN_TYPES.Google))
  } catch (error) {
    logEvent('login_gg_failed', { errorMessage: error })

    // Mostly JS errors
    if (!error.code) {
      console.log(error)
      return
    }

    // Google sign-in errors
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Sign-in failed', 'Sign-in was cancelled')
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Swallow
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Sign-in failed', 'Play services not available or outdated')
    } else {
      Alert.alert('Something went wrong', error.toString())
    }
  } finally {
    yield put(actions.setLoading(false))
  }
}

const requestFacebookUserInfo = () => {
  return new Promise((resolve, reject) => {
    const options = {
      parameters: {
        fields: { string: 'first_name,last_name,email,picture.height(961)' }
      }
    }
    const callback = (error, result) => {
      if (error) {
        logEvent('login_fb_failed', { errorMessage: error })
        reject(error)
      } else {
        resolve(result)
      }
    }
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest('/me', options, callback)
    console.log('-----infoRequestFB', infoRequest)
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start()
  })
}

const requestFacebookSignIn = function*({ meta: { onPop } }) {
  try {
    // yield put(actions.setLoading(false))
    // yield put(actions.setLoading(true))
    // yield delay(200)
    // Sign in
    LoginManager.logOut()
    yield call(
      LoginManager.setLoginBehavior,
      Platform.select({
        ios: 'native',
        android: 'native_only'
      })
    )
    const logIn = yield call(LoginManager.logInWithReadPermissions, ['public_profile', 'email'])
    if (logIn.isCancelled) {
      throw Error('Sign-in was cancelled')
    }
    const userInfo = yield call(requestFacebookUserInfo)
    // console.log('---------userInfo', userInfo)
    let res = yield call(AccessToken.getCurrentAccessToken)
    // console.log('---------AccessToken', res)
    // Consume info
    const { id, picture, first_name, last_name, email } = userInfo
    const name = `${first_name} ${last_name}`
    const payload = {
      photo_url: picture.data.url,
      name,
      email,
      accessToken: res.accessToken,
      social_id: id,
      social_type: SIGN_IN_TYPES.Facebook,
      onPop
    }
    yield put(authActions.signInSocial(payload))
    yield put(actions.setSignInType(SIGN_IN_TYPES.Facebook))
  } catch (error) {
    try {
      yield call(
        LoginManager.setLoginBehavior,
        Platform.select({
          ios: 'web',
          android: 'web_only'
          // android: 'native_with_fallback'
        })
      )
      const logIn = yield call(LoginManager.logInWithReadPermissions, ['public_profile', 'email'])
      if (logIn.isCancelled) {
        throw Error('Sign-in was cancelled')
      }
      const userInfo = yield call(requestFacebookUserInfo)
      // console.log('---------userInfo', userInfo)
      let res = yield call(AccessToken.getCurrentAccessToken)
      // console.log('---------AccessToken', res)
      // Consume info
      const { id, picture, first_name, last_name, email } = userInfo
      const name = `${first_name} ${last_name}`
      const payload = {
        photo_url: picture.data.url,
        name,
        email,
        accessToken: res.accessToken,
        social_id: id,
        social_type: SIGN_IN_TYPES.Facebook,
        onPop
      }
      yield put(authActions.signInSocial(payload))
      yield put(actions.setSignInType(SIGN_IN_TYPES.Facebook))
    } catch (error) {
      console.log(error)
      Alert.alert('Sign-in failed', error.message)
    }
  } finally {
    // yield put(actions.setLoading(false))
  }
}

const alternateFacebookSignIn = function*({ payload: userInfo, meta: { onPop } }) {
  try {
    yield put(actions.setLoading(false))
    yield put(actions.setLoading(true))
    // yield delay(200)
    // Consume info
    const { id, avatar, name, email } = userInfo
    const payload = { avatar, name, email }
    // yield put(authActions.createUser({ ...payload, fb_id: id, onPop }))
    yield put(actions.setSignInType(SIGN_IN_TYPES.Facebook))
  } catch (error) {
    console.log(error)
  } finally {
    yield put(actions.setLoading(false))
  }
}

const signOut = function*({ meta: { onSuccess } }) {
  try {
    yield put(actions.setLoading(false))
    yield put(actions.setLoading(true))
    yield delay(200)
    // Sign out
    const signInType = yield select(getSignInType)
    switch (signInType) {
      case SIGN_IN_TYPES.Google:
        yield call(GoogleSignin.revokeAccess)
        yield call(GoogleSignin.signOut)
        break
      case SIGN_IN_TYPES.Facebook:
        LoginManager.logOut()
        break
      default:
        throw Error('Unable to detect sign-in provider.')
    }

    const userInfo = yield select(authSelectors.getUserInfo)
    yield call(api.signOut, userInfo.token)

    // Clean up
    yield put(actions.signOutSuccess())
    yield call(api.setToken, null)
    onSuccess && onSuccess()
  } catch (error) {
    Alert.alert('Sign-out failed', error.message)
  } finally {
    // yield put(authActions.setAuthToken(null))
    yield put(actions.setLoading(false))
  }
}

const alternatefacebookSignInRequestWatcher = function*() {
  yield takeLatest(types.REQUEST_ALTERNATE_FACEBOOK_SIGN_IN, alternateFacebookSignIn)
}
const signOutRequestWatcher = function*() {
  yield takeLatest(types.REQUEST_SIGN_OUT, signOut)
}

const facebookSignInRequestWatcher = function*() {
  yield takeLatest(types.REQUEST_FACEBOOK_SIGN_IN, requestFacebookSignIn)
}

const googleSignInRequestWatcher = function*() {
  yield takeLatest(types.REQUEST_GOOGLE_SIGN_IN, requestGoogleSignIn)
}

export default [
  googleSignInRequestWatcher(),
  facebookSignInRequestWatcher(),
  alternatefacebookSignInRequestWatcher(),
  signOutRequestWatcher()
]
