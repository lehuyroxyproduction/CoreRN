import apisauce from 'apisauce'
import config from 'config'
import { STATUS_CODE, UNAUTHENTICATED, EMAIL_DUPLICATED } from 'constant'
import { Platform, Alert } from 'react-native'
import App from 'App'
import store from 'store'
import { authActions } from 'reducers'
import { AlertUtils } from 'components/ultilities/AlertUtils'

export const api = apisauce.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout
})

fetch = (method: String, path: String, data: Object | String) => {
  // if (Platform.OS === 'ios') {
  //   path = path + '/'
  // }
  return api[method](path, data).then(res => {
    console.log('res : ', res)
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      return {
        ok: true,
        data: res.data
      }
    } else if (res.ok && res.data.status_code === STATUS_CODE.UNAUTHENTICATED) {
      console.log('UNAUTHENTICATED')
      // alert(res.data.message)
      AlertUtils.alert(
        'Alert',
        res.data.message,
        [
          {
            text: 'OK',
            onPress: () => {
              try {
                store.dispatch(authActions.logoutSuccess())
                store.dispatch(App.goLogin())
              } catch (e) {}
            }
          }
        ],
        { cancelable: false }
      )
    }
    return {
      ok: false,
      error: res.problem,
      data: res.data,
      message: res.data.message
    }
  })
}

export const setAuthToken = token => {
  api.setHeaders({ Authorization: `Bearer ${token}` })
}

export const registerUser = user => {
  return fetch('post', 'account/register', user)
}

export const loginInternal = user => {
  return fetch('post', 'account/login', user)
}

export const workoutSummary = () => {
  return fetch('get', 'account/workout/summary')
}

export const logout = () => {
  console.log('logout')
  return fetch('get', 'account/logout')
}

export const loginSocial = user => {
  console.log('getEventDetials Platform : ', Platform)
  if (Platform.OS === 'ios') {
    return fetch('post', 'account/auth/', user)
  } else {
    return fetch('post', 'account/auth', user)
  }
}

export const getEvents = (page = 1) => {
  if (Platform.OS === 'ios') {
    return fetch('get', `events/?type=1&page=${page}`)
  } else {
    return fetch('get', `events?type=1&page=${page}`)
  }
}
export const getEventDetials = event_id => {
  console.log('getEventDetials Platform : ', Platform)
  if (Platform.OS === 'ios') {
    return fetch('get', `event/${event_id}/`)
  } else {
    return fetch('get', `event/${event_id}`)
  }
}

export const getWorkouts = () => {
  return fetch('get', 'account/workout')
}

export const addSession = params => {
  // return api.post('account/session', params, POST_PUT_API_CONFIG)
  return fetch('post', 'account/session', params)
}

export const endSession = (id, params) => {
  // return api.put(`account/session/${id}/end`, params, POST_PUT_API_CONFIG)
  return fetch('put', `account/session/${id}/end`, params)
}

export const updateSession = (id, params) => {
  // return api.put(`account/session/${id}`, params, POST_PUT_API_CONFIG)
  return fetch('put', `account/session/${id}`, params)
}

export const pauseSession = id => {
  // return api.put(`account/session/${id}/pause`, {}, POST_PUT_API_CONFIG)
  return fetch('put', `account/session/${id}/pause`, {})
}
export const resumeSession = id => {
  // return api.put(`account/session/${id}/resumed`, {}, POST_PUT_API_CONFIG)
  return fetch('put', `account/session/${id}/resumed`, {})
}

export const uploadImage_Session = (sessionId, images) => {
  return fetch('post', `session/${sessionId}/images`, images)
}

export const getInfoUser = () => {
  return fetch('get', 'account/profile')
}

export const getCountry = () => {
  return fetch('get', 'country/')
}

export const updateInfoUser = userInfo => {
  return fetch('put', 'account/profile', userInfo)
}

export const getPoint = () => {
  if (Platform.OS === 'ios') {
    return fetch('get', 'account/points/?page=1&limit=50&category=1')
  } else {
    return fetch('get', 'account/points?page=1&limit=50&category=1')
  }
}

export const getVirtualRaces = (type, page) => {
  if (Platform.OS === 'ios') {
    return fetch('get', `events/?type=${type}&page=${page}`)
  } else {
    return fetch('get', `events?type=${type}&page=${page}`)
  }
}
export const getVirtualRaceDetail = virtualsId => {
  if (Platform.OS === 'ios') {
    return fetch('get', `event/${virtualsId}/`)
  } else {
    return fetch('get', `event/${virtualsId}`)
  }
}

export const getChallenges = (page = 1) => {
  return fetch('get', `challenge/list?page=${page}`)
}

export const getMyChallenges = (page = 1) => {
  return fetch('get', `challenge/mylist?page=${page}`)
}

export const getChallengesDetials = challenge_id => {
  return fetch('get', `challenge/detail/${challenge_id}`)
}

export const registerChallenges = data => {
  return fetch('post', 'challenge/join', data)
}
export const updateAdrressUserForModal = data => {
  return fetch('post', 'account/received-modal', data)
}

export const getTotalPoint = () => {
  return fetch('get', 'points/total')
}
export const getForgetPassword = data => {
  return fetch('post', 'account/request-reset-password', data)
}
export const updateChangePassword = data => {
  return fetch('post', 'account/change-password', data)
}
export const addBookmarkForEvent = data => {
  return fetch('post', 'events/add-bookmark', data)
}
export const removeBookmarkForEvent = data => {
  return fetch('post', 'events/remove-bookmark', data)
}

export const addBookmarkForChallenges = data => {
  return fetch('post', 'challenge/add-bookmark', data)
}
export const removeBookmarkForChallenges = data => {
  return fetch('post', 'challenge/remove-bookmark', data)
}
