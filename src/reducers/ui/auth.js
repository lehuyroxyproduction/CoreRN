import { combineReducers } from 'redux'

import { reducerFactory } from 'utils'

import { authTypes } from 'reducers'

export default combineReducers({
  registerUser: reducerFactory({
    onStart: authTypes.REGISTER_USER,
    onSuccess: authTypes.REGISTER_USER_SUCCESS,
    onError: authTypes.REGISTER_USER_ERROR
  }),
  loginInternal: reducerFactory({
    onStart: authTypes.LOGIN_INTERNAL,
    onSuccess: authTypes.LOGIN_INTERNAL_SUCCESS,
    onError: authTypes.LOGIN_INTERNAL_ERROR
  }),
  signInSocial: reducerFactory({
    onStart: authTypes.SIGN_IN_SOCIAL,
    onSuccess: authTypes.SIGN_IN_SOCIAL_SUCCESS,
    onError: authTypes.SIGN_IN_SOCIAL_ERROR
  }),
  logout: reducerFactory({
    onStart: authTypes.LOGOUT,
    onSuccess: authTypes.LOGOUT_SUCCESS,
    onError: authTypes.LOGOUT_ERROR
  }),
  workoutSummary: reducerFactory({
    onStart: authTypes.WORKOUT_SUMMARY,
    onSuccess: authTypes.WORKOUT_SUMMARY_SUCCESS,
    onError: authTypes.WORKOUT_SUMMARY_ERROR
  }),
  getWorkouts: reducerFactory({
    onStart: authTypes.GET_WORKOUTS,
    onSuccess: authTypes.GET_WORKOUTS_SUCCESS,
    onError: authTypes.GET_WORKOUTS_ERROR
  }),
  uploadImage_Session: reducerFactory({
    onStart: authTypes.UPLOAD_IMAGE_SESSION,
    onSuccess: authTypes.UPLOAD_IMAGE_SESSION_SUCCESS,
    onError: authTypes.UPLOAD_IMAGE_SESSION_ERROR
  }),
  getInfoUser: reducerFactory({
    onStart: authTypes.GET_INFO_USER,
    onSuccess: authTypes.GET_INFO_USER_SUCCESS,
    onError: authTypes.GET_INFO_USER_ERROR
  }),

  updateInfoUser: reducerFactory({
    onStart: authTypes.UPDATE_INFO_USER,
    onSuccess: authTypes.UPDATE_INFO_USER_SUCCESS,
    onError: authTypes.UPDATE_INFO_USER_ERROR
  }),

  forgotPassword: reducerFactory({
    onStart: authTypes.REQUEST_FORGOT_PASSWORD,
    onSuccess: authTypes.REQUEST_FORGOT_PASSWORD_SUCCESS,
    onError: authTypes.REQUEST_FORGOT_PASSWORD_ERROR
  }),
  updateChangePassword: reducerFactory({
    onStart: authTypes.UPDATE_CHANGE_PASSWORD,
    onSuccess: authTypes.UPDATE_CHANGE_PASSWORD_SUCCESS,
    onError: authTypes.UPDATE_CHANGE_PASSWORD_ERROR
  }),

  // createUser: reducerFactory({
  //   onStart: types.CREATE_USER,
  //   onSuccess: types.CREATE_USER_SUCCESS,
  //   onError: types.CREATE_USER_ERROR
  // }),
  // updateUserInfo: reducerFactory({
  //   onStart: types.UPDATE_USER_INFO,
  //   onSuccess: types.UPDATE_USER_INFO_SUCCESS,
  //   onError: types.UPDATE_USER_INFO_ERROR
  // }),
  // createUserVehicle: reducerFactory({
  //   onStart: types.CREATE_USER_VEHICLE,
  //   onSuccess: types.CREATE_USER_VEHICLE_SUCCESS,
  //   onError: types.CREATE_USER_ERROR
  // }),
  // findVehicles: reducerFactory({
  //   onStart: types.FIND_VEHICLES,
  //   onSuccess: types.FIND_VEHICLES_SUCCESS,
  //   onError: types.FIND_VEHICLES_ERROR
  // }),
  // findMakerVehicles: reducerFactory({
  //   onStart: types.FIND_MAKER_VEHICLES,
  //   onSuccess: types.FIND_MAKER_VEHICLES_SUCCESS,
  //   onError: types.FIND_MAKER_VEHICLES_ERROR
  // }),
  // updateUserVehicle: reducerFactory({
  //   onStart: types.UPDATE_USER_VEHICLE,
  //   onSuccess: types.UPDATE_USER_VEHICLE_SUCCESS,
  //   onError: types.UPDATE_USER_SETTINGS_ERROR
  // }),
  // getUserVehicle: reducerFactory({
  //   onStart: types.GET_USER_VEHICLE,
  //   onSuccess: types.GET_USER_VEHICLE_SUCCESS,
  //   onError: types.GET_USER_VEHICLE_ERROR
  // }),
  // getUserPlaces: reducerFactory({
  //   onStart: types.GET_USER_PLACES,
  //   onSuccess: types.GET_USER_PLACES_SUCCESS,
  //   onError: types.GET_USER_PLACES_ERROR
  // }),
  // requestUpdateUserPhone: reducerFactory({
  //   onStart: types.REQUEST_UPDATE_USER_PHONE,
  //   onSuccess: types.REQUEST_UPDATE_USER_PHONE_SUCCESS,
  //   onError: types.REQUEST_UPDATE_USER_PHONE_ERROR
  // }),
  // findConnectors: reducerFactory({
  //   onStart: types.FIND_CONNECTORS,
  //   onSuccess: types.FIND_CONNECTORS_SUCCESS,
  //   onError: types.FIND_CONNECTORS_ERROR
  // }),
  // findProviders: reducerFactory({
  //   onStart: types.FIND_PROVIDERS,
  //   onSuccess: types.FIND_PROVIDERS_SUCCESS,
  //   onError: types.FIND_PROVIDERS_ERROR
  // }),
  // updateUserSettings: reducerFactory({
  //   onStart: types.UPDATE_USER_SETTINGS,
  //   onSuccess: types.UPDATE_USER_SETTINGS_SUCCESS,
  //   onError: types.UPDATE_USER_SETTINGS_ERROR
  // }),
  // getLevels: reducerFactory({
  //   onStart: types.GET_LEVELS,
  //   onSuccess: types.GET_LEVELS_SUCCESS,
  //   onError: types.GET_LEVELS_ERROR
  // })
})
