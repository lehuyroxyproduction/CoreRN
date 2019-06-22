// V2

import { AsyncStorage, Platform } from 'react-native'
import apisauce from 'apisauce'
import { appConfig } from 'config'
import { jobSelectors } from 'reducers/index'
import store from 'store'
import { isNilOrEmpty } from 'constants'

const URL = appConfig.url

const password = '123456'
const device_os = Platform.OS === 'android' ? 0 : 1

const fetch = async (method, path, params, baseURL = URL) => {
  const api = apisauce.create({ baseURL })
  const token = await AsyncStorage.getItem('token')

  // login does not contain token
  if (!path.includes('authentication')) {
    api.setHeader('Authorization', `Bearer ${token}`)
  }

  return api[method](path, params)
}

export const login = user => {
  return fetch('post', '/account/authentication', {
    ...user,
    password,
    device_os
  })
}

export const logout = user => {
  return fetch('post', '/account/logout/', user)
}

export const updateFcmToken = params => {
  return fetch('put', '/gcm/refresh', {
    account_id: params.accountId,
    device_uid: params.deviceUid,
    device_token: params.deviceToken,
    device_os
  })
}

/** =================================== User =================================== */
export const getUserInfo = () => {
  return fetch('get', '/profile/info')
}

export const updateUserInfo = info => {
  return fetch('put', '/profile/update', info)
}

export const getUserBarcode = code => {
  return fetch('post', '', { code }, appConfig.barcodeUrl)
}

/** =================================== Jobs =================================== */
export const getJobs = ({ page, selectedContractTypes, selectedPaymentMethods, selectedCategories }) => {
  console.log('-------------API----------', selectedCategories, selectedPaymentMethods, selectedContractTypes)
  let contract = isNilOrEmpty(selectedContractTypes)
    ? ''
    : selectedContractTypes.length === 2
      ? ''
      : `&contract=${selectedContractTypes}`
  let paymentMethods = isNilOrEmpty(selectedPaymentMethods)
    ? ''
    : selectedPaymentMethods.length === 2
      ? ''
      : `&pay_method=${selectedPaymentMethods}`
  let storedCategories = jobSelectors.getCategories(store.getState())
  console.log('CLIENT -----------------------GET JOBS', selectedCategories, storedCategories)
  let categories = isNilOrEmpty(selectedCategories)
    ? ''
    : selectedCategories.length === storedCategories.length
      ? ''
      : `&category=${selectedCategories}`
  console.log('CLIENT -----------------------CATEGORIES', categories)
  return fetch('get', `/jobs?page=${page}&limit=10${contract}${paymentMethods}${categories}`)
}

export const getJobDetails = jobId => {
  return fetch('get', `/jobs/${jobId}`)
}

export const getUserJobs = page => {
  return fetch('get', `/profile/works?page=${page}&limit=10`)
}

/** =================================== Works =================================== */
export const getUserJobDetails = workId => {
  return fetch('get', `/works/${workId}`)
}

export const applyWorks = selectedWorkshifts => {
  return fetch('post', `jobs/${selectedWorkshifts.job_id}/apply`, selectedWorkshifts)
}

export const cancelWork = ({ workId }) => {
  return fetch('post', `/works/${workId}/cancel`)
}
/** =================================== Notifications =================================== */
export const getNotifications = page => {
  return fetch('get', `/notifications?page=${page}&limit=10`)
}

export const getNotificationDetails = notificationId => {
  return fetch('get', `notifications/${notificationId}`)
}

export const setReadNotification = notificationId => {
  return fetch('patch', `notifications/${notificationId}`)
}

export const getAppSetting = () => {
  return fetch('get', '/', {}, appConfig.appSettingUrl)
}

/** =================================== Notifications =================================== */
export const getSetting = () => {
  return fetch('get', '/', {}, 'https://j416mj5qmj.execute-api.ap-southeast-1.amazonaws.com/production/ezj/in-review')
}

export const getUserNotis = ({ page, account_id }) => {
  return fetch('get', '', {}, appConfig.userNotisUrl + `${account_id}/notifications?page=${page}&limit=10`)
}

export const getNotificationAccountId = phone => {
  return fetch('get', '', {}, appConfig.notificationAccountUrl + `?phone=${phone}`)
}

export const readUserNotification = ({ account_id, notificationId }) => {
  return fetch('put', '', {}, appConfig.userNotisUrl + account_id + `/notification/${notificationId}/read`)
}

/** =================================== Provinces =================================== */
export const getPlaces = () => {
  return fetch('get', '/provinces')
}
export const getUserFilterPlaces = () => {
  return fetch('get', '/profile/provinces')
}
export const subscribePlaces = provinces => {
  return fetch('put', '/profile/provinces/subscribe', { provinces })
}
export const unSubscribePlaces = provinces => {
  return fetch('put', '/profile/provinces/unsubscribe', { provinces })
}
/** =================================== Provinces =================================== */
export const getCategories = () => {
  return fetch('get', '/categories')
}
