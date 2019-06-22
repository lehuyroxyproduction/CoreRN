import { createAction, handleActions } from 'redux-actions'
import { Metrics } from 'themes/Metrics'

export const types = {
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  // Ui
  PUSH: 'PUSH',
  SET_PUSH: 'SET_PUSH',
  TOAST: 'TOAST',
  SET_TOAST: 'SET_TOAST',
  // System
  UPDATE_NETWORK: 'UPDATE_NETWORK',
  UPDATE_KEYBOARD: 'UPDATE_KEYBOARD',
  UPDATE_KEYBOARD_HEIGHT: 'UPDATE_KEYBOARD_HEIGHT',
  UPDATE_BOTTOM_TABS_HEIGHT: 'UPDATE_BOTTOM_TABS_HEIGHT',
  //
  GET_SERVER_CONNECTION: 'GET_SERVER_CONNECTION',
  GET_SERVER_CONNECTION_SUCCESS: 'GET_SERVER_CONNECTION_SUCCESS'
}

export const actions = {
  setCurrentScreen: createAction(types.SET_CURRENT_SCREEN),
  // Ui
  push: createAction(types.PUSH),
  setPush: createAction(types.SET_PUSH),
  toast: createAction(types.TOAST),
  setToast: createAction(types.SET_TOAST),
  // System
  updateNetwork: createAction(types.UPDATE_NETWORK),
  updateKeyboard: createAction(types.UPDATE_KEYBOARD),
  updateDeviceKeyboardHeight: createAction(types.UPDATE_KEYBOARD_HEIGHT),
  updateBottomTabsHeight: createAction(types.UPDATE_BOTTOM_TABS_HEIGHT),
  //
  getServerConnection: createAction(types.GET_SERVER_CONNECTION),
  getServerConnectionSuccess: createAction(types.GET_SERVER_CONNECTION_SUCCESS)
}

export const selectors = {
  getCurrentScreen: state => state.app.currentScreen,
  getPush: state => state.app.isPushing,
  getToast: state => state.app.toast,
  getNetInfo: state => state.app.isConnected,
  getKeyboardHeight: state => state.app.keyboardHeight,
  getServerConnection: state => state.app.isConnectedToServer,
  getBottomTabsHeight: state => state.app.bottomTabsHeight
}

const defaultState = {
  currentScreen: null,
  url: '',
  version: '',
  buildVersion: '',
  toast: { message: '', time: 0 },
  isPushing: false,
  isConnected: true,
  isConnectedToServer: false,
  keyboardHeight: 0,
  deviceKeyboardHeight: 0,
  bottomTabsHeight: 0
}

export default handleActions(
  {
    [types.SET_CURRENT_SCREEN]: (state, action) => {
      return { ...state, currentScreen: action.payload }
    },
    [types.SET_PUSH]: (state, action) => {
      return { ...state, isPushing: action.payload }
    },
    [types.SET_TOAST]: (state, action) => {
      return {
        ...state,
        toast: { message: action.payload } //, time: new Date().getMilliseconds() }
      }
    },
    [types.UPDATE_NETWORK]: (state, action) => {
      return { ...state, isConnected: action.payload }
    },
    [types.UPDATE_KEYBOARD]: (state, action) => {
      return { ...state, keyboardHeight: action.payload }
    },
    [types.UPDATE_KEYBOARD_HEIGHT]: (state, action) => {
      return { ...state, deviceKeyboardHeight: action.payload }
    },
    [types.GET_SERVER_CONNECTION_SUCCESS]: (state, action) => {
      return { ...state, isConnectedToServer: action.payload }
    },
    [types.UPDATE_BOTTOM_TABS_HEIGHT]: (state, action) => {
      return { ...state, bottomTabsHeight: action.payload }
    }
  },
  defaultState
)
