import { createAction, handleActions } from 'redux-actions'

export const types = {
  // login
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  // logout
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
  // setting
  GET_SETTING: 'GET_SETTING:',
  GET_SETTING_SUCCESS: 'GET_SETTING_SUCCESS'
}

export const actions = {
  // login
  login: createAction(types.LOGIN),
  loginSuccess: createAction(types.LOGIN_SUCCESS),
  loginFail: createAction(types.LOGIN_FAIL),
  // logout
  logout: createAction(types.LOGOUT),
  logoutSuccess: createAction(types.LOGOUT_SUCCESS),
  logoutFail: createAction(types.LOGOUT_FAIL),
  // get setting
  getSetting: createAction(types.GET_SETTING),
  getSettingSuccess: createAction(types.GET_SETTING_SUCCESS)
}

export const selectors = {
  getStatus: state => state.ui.auth.status,
  getLoading: state => state.ui.auth.isLoading,
  getLoginWithPassword: state => state.auth.isLoginWithPassword
}

const defaultState = {
  isLoginWithPassword: false
}

export default handleActions(
  {
    [types.GET_SETTING_SUCCESS]: (state, action) => {
      return { ...state, isLoginWithPassword: action.payload }
    }
  },
  defaultState
)
