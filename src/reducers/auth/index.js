import { createAction, handleActions } from 'redux-actions'

export const types = {
  // register
  REGISTER_USER: 'REGISTER_USER',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR: 'REGISTER_USER_ERROR',
  // sign in
  SET_SIGN_IN_TYPE: 'SET_SIGN_IN_TYPE',
  REQUEST_GOOGLE_SIGN_IN: 'REQUEST_GOOGLE_SIGN_IN',
  REQUEST_FACEBOOK_SIGN_IN: 'REQUEST_FACEBOOK_SIGN_IN',
  REQUEST_ALTERNATE_FACEBOOK_SIGN_IN: 'REQUEST_ALTERNATE_FACEBOOK_SIGN_IN',
  SIGN_IN_SOCIAL: 'SIGN_IN_SOCIAL',
  SIGN_IN_SOCIAL_SUCCESS: 'SIGN_IN_SOCIAL_SUCCESS',
  SIGN_IN_SOCIAL_ERROR: 'SIGN_IN_SOCIAL_ERROR',

  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',

  SAVE_USER: 'SAVE_USER',
  // sign out
  REQUEST_SIGN_OUT: 'REQUEST_SIGN_OUT',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR: 'SIGN_OUT_ERROR',

  // CREATE_USER: 'CREATE_USER',
  // CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  // CREATE_USER_ERROR: 'CREATE_USER_ERROR',
  // loginInternal
  LOGIN_INTERNAL: 'LOGIN_INTERNAL',
  LOGIN_INTERNAL_SUCCESS: 'LOGIN_INTERNAL_SUCCESS',
  LOGIN_INTERNAL_ERROR: 'LOGIN_INTERNAL_ERROR',
  // // logout
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  // // setting
  // GET_SETTING: 'GET_SETTING:',
  // GET_SETTING_SUCCESS: 'GET_SETTING_SUCCESS'
  // send request forgot password
  REQUEST_FORGOT_PASSWORD: 'REQUEST_FORGOT_PASSWORD',
  REQUEST_FORGOT_PASSWORD_SUCCESS: 'REQUEST_FORGOT_PASSWORD_SUCCESS',
  REQUEST_FORGOT_PASSWORD_ERROR: 'REQUEST_FORGOT_PASSWORD_ERROR',

  // workout summary
  WORKOUT_SUMMARY: 'WORKOUT_SUMMARY',
  WORKOUT_SUMMARY_SUCCESS: 'WORKOUT_SUMMARY_SUCCESS',
  WORKOUT_SUMMARY_ERROR: 'WORKOUT_SUMMARY_ERROR',
  GET_WORKOUTS: 'GET_WORKOUTS',
  GET_WORKOUTS_SUCCESS: 'GET_WORKOUTS_SUCCESS',
  GET_WORKOUTS_ERROR: 'GET_WORKOUTS_ERROR',

  // Upload Images
  UPLOAD_IMAGE_SESSION: 'UPLOAD_IMAGE_SESSION', // PT : screen ProgressTracker
  UPLOAD_IMAGE_SESSION_SUCCESS: 'UPLOAD_IMAGE_SESSION_SUCCESS',
  UPLOAD_IMAGE_SESSION_ERROR: 'UPLOAD_IMAGE_SESSION_ERROR',

  // Get User Info
  GET_INFO_USER: 'GET_INFO_USER',
  GET_INFO_USER_SUCCESS: 'GET_INFO_USER_SUCCESS',
  GET_INFO_USER_ERROR: 'GET_INFO_USER_ERROR',

  // Update User Info
  UPDATE_INFO_USER: 'UPDATE_INFO_USER',
  UPDATE_INFO_USER_SUCCESS: 'UPDATE_INFO_USER_SUCCESS',
  UPDATE_INFO_USER_ERROR: 'UPDATE_INFO_USER_ERROR',

  GET_POINT: 'GET_POINT',
  GET_POINT_SUCCESS: 'GET_POINT_SUCCESS',
  GET_POINT_ERROR: 'GET_POINT_ERROR',

  USER_UPDATE_RESIDENCE_COUNTRY: 'USER_UPDATE_RESIDENCE_COUNTRY',

  ADD_MISSING_SESSION: 'ADD_MISSING_SESSION',

  GET_TOTAL_POINT: 'GET_TOTAL_POINT',
  GET_TOTAL_POINT_SUCCESS: 'GET_TOTAL_POINT_SUCCESS',
  GET_TOTAL_POINT_ERROR: 'GET_TOTAL_POINT_ERROR',

  // UPDATE CHANGE PASSWORD

  UPDATE_CHANGE_PASSWORD: 'UPDATE_CHANGE_PASSWORD',
  UPDATE_CHANGE_PASSWORD_SUCCESS: 'UPDATE_CHANGE_PASSWORD_SUCCESS',
  UPDATE_CHANGE_PASSWORD_ERROR: 'UPDATE_CHANGE_PASSWORD_ERROR',

}

export const actions = {
  // register
  // registerUser: (user, onSuccess) => ({
  //   type: types.REGISTER_USER,
  //   payload: user,
  //   meta: { onSuccess }
  // }),
  saveUser: createAction(types.SAVE_USER),

  registerUser: createAction(types.REGISTER_USER),
  registerUserSuccess: createAction(types.REGISTER_USER_SUCCESS),
  registerUserError: createAction(types.REGISTER_USER_ERROR),

  // loginInternal with password
  loginInternal: createAction(types.LOGIN_INTERNAL),
  loginInternalSuccess: createAction(types.LOGIN_INTERNAL_SUCCESS),
  loginInternalError: createAction(types.LOGIN_INTERNAL_ERROR),

  // sign in
  setSignInType: createAction(types.SET_SIGN_IN_TYPE),
  requestGoogleSignIn: createAction(types.REQUEST_GOOGLE_SIGN_IN),
  requestFacebookSignIn: createAction(types.REQUEST_FACEBOOK_SIGN_IN),
  requestAlternateFacebookSignIn: createAction(types.REQUEST_ALTERNATE_FACEBOOK_SIGN_IN),
  signInSocial: createAction(types.SIGN_IN_SOCIAL),
  signInSocialSuccess: createAction(types.SIGN_IN_SOCIAL_SUCCESS),
  signInSocialError: createAction(types.SIGN_IN_SOCIAL_ERROR),
  // sign out
  requestSignOut: createAction(types.REQUEST_SIGN_OUT),
  signOutSuccess: createAction(types.SIGN_OUT_SUCCESS),
  signOutError: createAction(types.SIGN_OUT_ERROR),
  // send forgot password request
  requestForgotPassword: createAction(types.REQUEST_FORGOT_PASSWORD),
  requestForgotPasswordSuccess: createAction(types.REQUEST_FORGOT_PASSWORD_SUCCESS),
  requestForgotPasswordError: createAction(types.REQUEST_FORGOT_PASSWORD_ERROR),
  // setAuthToken: createAction(types.SET_AUTH_TOKEN)

  // loginInternal
  // loginInternal: createAction(types.LOGIN_INTERNAL),
  // loginInternalSuccess: createAction(types.LOGIN_INTERNAL_SUCCESS),
  // loginFail: createAction(types.LOGIN_FAIL),
  // logout
  logout: createAction(types.LOGOUT),
  logoutSuccess: createAction(types.LOGOUT_SUCCESS),
  logoutError: createAction(types.LOGOUT_ERROR),
  // get setting
  // getSetting: createAction(types.GET_SETTING),
  // getSettingSuccess: createAction(types.GET_SETTING_SUCCESS)
  // workout
  getWorkouts: createAction(types.GET_WORKOUTS),
  getWorkoutsSuccess: createAction(types.GET_WORKOUTS_SUCCESS),
  getWorkoutsError: createAction(types.GET_WORKOUTS_ERROR),

  workoutSummary: createAction(types.WORKOUT_SUMMARY),
  workoutSummarySuccess: createAction(types.WORKOUT_SUMMARY_SUCCESS),
  workoutSummaryError: createAction(types.WORKOUT_SUMMARY_ERROR),

  // Upload Images _Session
  uploadImage_Session: createAction(types.UPLOAD_IMAGE_SESSION),
  uploadImage_Session_Success: createAction(types.UPLOAD_IMAGE_SESSION_SUCCESS),
  uploadImage_Session_Error: createAction(types.UPLOAD_IMAGE_SESSION_ERROR),

  getInfoUser: createAction(types.GET_INFO_USER),
  getInfoUserSuccess: createAction(types.GET_INFO_USER_SUCCESS),
  getInfoUserError: createAction(types.GET_INFO_USER_ERROR),

  updateInfoUser: createAction(types.UPDATE_INFO_USER),
  updateInfoUserSuccess: createAction(types.UPDATE_INFO_USER_SUCCESS),
  updateInfoUserError: createAction(types.UPDATE_INFO_USER_ERROR),

  // get History
  getPoint: createAction(types.GET_POINT),
  getPointSuccess: createAction(types.GET_POINT_SUCCESS),
  getPointError: createAction(types.GET_POINT_ERROR),

  user_update_RCountry: createAction(types.USER_UPDATE_RESIDENCE_COUNTRY),

  add_missing_session: createAction(types.ADD_MISSING_SESSION),

  // get Total Points
  getTotalPoint: createAction(types.GET_TOTAL_POINT),
  getTotalPointSuccess: createAction(types.GET_TOTAL_POINT_SUCCESS),
  getTotalPointError: createAction(types.GET_TOTAL_POINT_ERROR),

  // create action update change password
  updateChangePassword: createAction(types.UPDATE_CHANGE_PASSWORD),
  updateChangePasswordSuccess: createAction(types.UPDATE_CHANGE_PASSWORD_SUCCESS),
  updateChangePasswordError: createAction(types.UPDATE_CHANGE_PASSWORD_ERROR)

}

export const selectors = {
  getUser: state => state.auth.user,
  getSocialUser: state => state.auth.socialUsers,
  getWorkoutSummaries: state => state.auth.workoutSummaries,
  getWorkouts: state => state.auth.workouts,
  // getStatus: state => state.ui.auth.status,
  // ui
  getLoading: (state, action) => {
    return state.ui.auth[action].isLoading
  },
  // getLoginWithPassword: state => state.auth.isLoginWithPassword
  getPoint: state => state.auth.point,
  getMissingSession: state => state.auth.missingSession
}

const defaultState = {
  user: {},
  workoutSummaries: [],
  socialUsers: {},
  onMainSwipeStart: false,
  workouts: [],
  // forgotPasswordMessage: '',
  // isLoginWithPassword: false
  point: [],
  missingSession: [],
  // forgotPasswordMessageError: null
}

export default handleActions(
  {
    [types.LOGIN_INTERNAL_SUCCESS]: (state, { payload }) => {
      return { ...state, user: payload }
    },
    // [types.REQUEST_FORGOT_PASSWORD_SUCCESS]: (state, { payload }) => {
    //   return { ...state, forgotPasswordMessage: payload }
    // },
    //  [types.REQUEST_FORGOT_PASSWORD_ERROR]: (state, { payload }) => {
    //   return { ...state, forgotPasswordMessageError: payload }
    // },
    [types.LOGOUT_SUCCESS]: (state, action) => {
      return {
        ...state,
        user: defaultState.user,
        socialUsers: defaultState.socialUsers
      }
    },
    [types.SIGN_IN_SOCIAL_SUCCESS]: (state, { payload }) => {
      return { ...state, user: payload }
    },
    [types.SAVE_USER]: (state, { payload }) => {
      return { ...state, socialUsers: payload }
    },
    [types.WORKOUT_SUMMARY_SUCCESS]: (state, { payload }) => {
      return { ...state, workoutSummaries: payload }
    },
    [types.GET_WORKOUTS_SUCCESS]: (state, { payload }) => {
      return { ...state, workouts: payload }
    },
    [types.GET_INFO_USER_SUCCESS]: (state, { payload }) => {
      console.log('user :', state.user)
      console.log('new user :', payload)
      const merge_user = { ...state.user, ...payload }
      console.log('merge user :', merge_user)
      return {
        ...state,
        user: merge_user
      }
    },
    [types.GET_POINT_SUCCESS]: (state, { payload }) => {
      return { ...state, point: payload }
    },
    [types.UPDATE_INFO_USER_SUCCESS]: (state, { payload }) => {
      const merge_user = { ...state.user, ...payload }
      console.log('merge user :', merge_user)
      return {
        ...state,
        user: merge_user
      }
    },
    [types.USER_UPDATE_RESIDENCE_COUNTRY]: (state, { payload }) => {
      console.log('USER_UPDATE state:', state)
      console.log('USER_UPDATE payload:', payload)
      return {
        ...state,
        user: {
          ...state.user,
          residence_country_id: payload
        }
      }
    },
    [types.ADD_MISSING_SESSION]: (state, { payload }) => {
      console.log('ADD_MISSING_SESSION state:', state)
      console.log('ADD_MISSING_SESSION payload:', payload)
      return {
        ...state
      }
    },
    [types.GET_TOTAL_POINT_SUCCESS]: (state, { payload }) => {
      const merge_user = { ...state.user, ...payload }
      console.log('merge point :', merge_user)
      return {
        ...state,
        user: merge_user
      }
    }
  },
  defaultState
)
