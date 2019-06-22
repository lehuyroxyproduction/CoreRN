import { createAction, handleActions } from 'redux-actions'

export const types = {
  // User's notis
  GET_USER_NOTIS: 'GET_USER_NOTIS',
  GET_USER_NOTIS_SUCCEEDED: 'GET_USER_NOTIS_SUCCEEDED',
  GET_USER_NOTIS_FAIL: 'GET_USER_NOTIS_FAIL',
  GET_USER_NOTIS_CANCELED: 'GET_NOTI_CANCELED',
  // Read notification
  READ_USER_NOTIFICATION: 'READ_USER_NOTIFICATION',
  READ_USER_NOTIFICATION_SUCCEEDED: 'READ_USER_NOTIFICATION_SUCCEEDED',
  READ_USER_NOTIFICATION_FAILED: 'READ_USER_NOTIFICATION_FAILED',
  READ_USER_NOTIFICATION_CANCELED: 'READ_USER_NOTIFICATION_CANCELED'

}

export const actions = {
  // User's notis
  getUserNotis: createAction(types.GET_USER_NOTIS),
  getUserNotisSuccess: createAction(types.GET_USER_NOTIS_SUCCEEDED),
  getUserNotisFail: createAction(types.GET_USER_NOTIS_FAIL),
  getUserNotisCanceled: createAction(types.GET_USER_NOTIS_CANCELED),
  // Read notification
  readUserNotification: createAction(types.READ_USER_NOTIFICATION),
  readUserNotificationSuccessfully: createAction(types.READ_USER_NOTIFICATION_SUCCEEDED),
  readUserNotificationFailed: createAction(types.READ_USER_NOTIFICATION_FAILED),
  readUserNotificationCanceled: createAction(types.READ_USER_NOTIFICATION_CANCELED)
}

export const selectors = {
  // User's notis
  getUserNotis: state => state.notis.list,
  getUserNotisPage: state => state.notis.page,
  getUserNotisTotal: state => state.notis.total,
  getCurrentUserNotisTotal: state => state.notis.list.length,
  // Ui
  getStatus: (state, action) => state.ui.notis[action].status,
  getLoading: (state, action) => state.ui.notis[action].isLoading
}

const defaultState = {
  // User's notis
  list: [],
  page: 0,
  total: null
}

export default handleActions(
  {
    [types.GET_USER_NOTIS_SUCCEEDED]: (state, action) => {
      const {notis, page, total, isRefreshing} = action.payload

      return {
        ...state,
        list: isRefreshing ? notis : [...state.list, ...notis],
        page,
        total
      }
    }
  },
  defaultState
)
