import { combineReducers } from 'redux'
import { reducerFactory } from 'utils/reducerFactory'

import { types as authTypes } from './auth'
import { types as userTypes } from './user'
import { types as jobsTypes } from './jobs'
import { types as notisTypes } from './notis'
import { types as placesTypes } from './places'

const auth = reducerFactory({
  onStart: authTypes.LOGIN,
  onSuccess: authTypes.LOGIN_SUCCESS,
  onError: authTypes.LOGIN_FAIL,
  onCancel: authTypes.LOGOUT
})

const user = combineReducers({
  updateUserInfo: reducerFactory({
    onStart: userTypes.UPDATE_USER_INFO,
    onSuccess: userTypes.UPDATE_USER_INFO_SUCCESS,
    onError: userTypes.UPDATE_USER_INFO_FAIL
  }),
  getUserBarcode: reducerFactory({
    onStart: userTypes.GET_USER_BARCODE,
    onSuccess: userTypes.GET_USER_BARCODE_SUCCESS,
    onError: userTypes.GET_USER_BARCODE_ERROR
  })
})

const jobs = combineReducers({
  getJobs: reducerFactory({
    onStart: jobsTypes.GET_JOBS,
    onSuccess: jobsTypes.GET_JOBS_SUCCESS,
    onError: jobsTypes.GET_JOBS_FAIL,
    onCancel: jobsTypes.GET_JOBS_CANCELED
  }),
  getUserJobs: reducerFactory({
    onStart: jobsTypes.GET_USER_JOBS,
    onSuccess: jobsTypes.GET_USER_JOBS_SUCCESS,
    onError: jobsTypes.GET_USER_JOBS_FAIL,
    onCancel: jobsTypes.GET_USER_JOBS_CANCELED
  }),
  getJobDetails: reducerFactory({
    onStart: jobsTypes.GET_JOB_DETAILS,
    onSuccess: jobsTypes.GET_JOB_DETAILS_SUCCESS,
    onError: jobsTypes.GET_JOB_DETAILS_FAIL
  }),
  getUserJobDetails: reducerFactory({
    onStart: jobsTypes.GET_USER_JOB_DETAILS,
    onSuccess: jobsTypes.GET_USER_JOB_DETAILS_SUCCESS,
    onError: jobsTypes.GET_JOB_DETAILS_FAIL
  }),
  applyWorks: reducerFactory({
    onStart: jobsTypes.APPLY_WORKS,
    onSuccess: jobsTypes.APPLY_WORKS_SUCCESS,
    onError: jobsTypes.APPLY_WORKS_FAIL,
    onCancel: jobsTypes.APPLY_WORKS_CANCELED
  }),
  cancelWork: reducerFactory({
    onStart: jobsTypes.CANCEL_WORK,
    onSuccess: jobsTypes.CANCEL_WORK_SUCCESS,
    onError: jobsTypes.CANCEL_WORK_FAIL,
    onCancel: jobsTypes.CANCEL_WORK_CANCELED
  }),
  getCategories: reducerFactory({
    onStart: jobsTypes.GET_CATEGORIES,
    onSuccess: jobsTypes.GET_CATEGORIES_SUCCESS,
    onError: jobsTypes.GET_CATEGORIES_ERROR
  })
})
const notis = combineReducers({
  getUserNotis: reducerFactory({
    onStart: notisTypes.GET_USER_NOTIS,
    onSuccess: notisTypes.GET_USER_NOTIS_SUCCEEDED,
    onError: notisTypes.GET_USER_NOTIS_FAIL,
    onCancel: notisTypes.GET_USER_NOTIS_CANCELED
  }),
  readUserNotification: reducerFactory({
    onStart: notisTypes.READ_USER_NOTIFICATION,
    onSuccess: notisTypes.READ_USER_NOTIFICATION_SUCCEEDED,
    onError: notisTypes.READ_USER_NOTIFICATION_FAILED,
    onCancel: notisTypes.READ_USER_NOTIFICATION_CANCELED
  })
})
const places = combineReducers({
  getPlaces: reducerFactory({
    onStart: placesTypes.GET_PLACES,
    onSuccess: placesTypes.GET_PLACES_SUCCEEDED,
    onError: placesTypes.GET_PLACES_FAILED,
    onCancel: placesTypes.GET_PLACES_CANCELED
  }),
  getUserFilterPlaces: reducerFactory({
    onStart: placesTypes.GET_USER_FILTER_PLACES,
    onSuccess: placesTypes.GET_USER_FILTER_PLACES_SUCCEEDED,
    onError: placesTypes.GET_USER_FILTER_PLACES_FAILED,
    onCancel: placesTypes.GET_USER_FILTER_PLACES_CANCELED
  }),
  subscribePlaces: reducerFactory({
    onStart: placesTypes.SUBSCRIBE_PLACES,
    onSuccess: placesTypes.SUBSCRIBE_PLACES_SUCCEEDED,
    onError: placesTypes.SUBSCRIBE_PLACES_FAILED
  }),
  unSubscribePlaces: reducerFactory({
    onStart: placesTypes.UNSUBSCRIBE_PLACES,
    onSuccess: placesTypes.UNSUBSCRIBE_PLACES_SUCCEEDED,
    onError: placesTypes.UNSUBSCRIBE_PLACES_FAILED
  }),
  subscribeUnSubscribePlaces: reducerFactory({
    onStart: placesTypes.SUBSCRIBE_UNSUBSCRIBE_PLACES,
    onSuccess: placesTypes.SUBSCRIBE_UNSUBSCRIBE_PLACES_SUCCEEDED,
    onError: placesTypes.SUBSCRIBE_UNSUBSCRIBE_PLACES_FAILED
  })
})
export default combineReducers({
  auth,
  user,
  jobs,
  notis,
  places
})
