import { createAction, handleActions } from 'redux-actions'
// import { AsyncStorage } from 'react-native'

export const types = {
  // Get user info
  GET_USER_INFO: 'GET_USER_INFO',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAIL: 'GET_USER_INFO_FAIL',
  // Update user info
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAIL: 'UPDATE_USER_INFO_FAIL',
  // Set user info
  SET_USER_INFO: 'SET_USER_INFO',
  // Delete user info
  DELETE_USER_INFO: 'DELETE_USER_INFO',
  // Update fcm token
  UPDATE_FCM_TOKEN: 'UPDATE_FCM_TOKEN',
  // get notification account id
  GET_NOTIFICATION_ACCOUNT_ID: 'GET_NOTIFICATION_ACCOUNT_ID',
  GET_NOTIFICATION_ACCOUNT_ID_SUCCESS: 'GET_NOTIFICATION_ACCOUNT_ID_SUCCESS',
  // get user barcode
  GET_USER_BARCODE: 'GET_USER_BARCODE',
  GET_USER_BARCODE_SUCCESS: 'GET_USER_BARCODE_SUCCESS',
  GET_USER_BARCODE_ERROR: 'GET_USER_BARCODE_ERROR',

  SELECT_CONTRACT_TYPES: 'SELECT_CONTRACT_TYPES',
  SELECT_PAYMENT_METHODS: 'SELECT_PAYMENT_METHODS',
  SELECT_CATEGORIES: 'SELECT_CATEGORIES'
  //
}

export const actions = {
  // Get user info
  getUserInfo: createAction(types.GET_USER_INFO),
  getUserInfoSuccess: createAction(types.GET_USER_INFO_SUCCESS),
  getUserInfoFail: createAction(types.GET_USER_INFO_FAIL),
  // Get user barcode
  getUserBarcode: createAction(types.GET_USER_BARCODE),
  getUserBarcodeSuccess: createAction(types.GET_USER_BARCODE_SUCCESS),
  getUserBarcodeError: createAction(types.GET_USER_BARCODE_ERROR),
  // Update user info
  updateUserInfo: createAction(types.UPDATE_USER_INFO),
  updateUserInfoSuccess: createAction(types.UPDATE_USER_INFO_SUCCESS),
  updateUserInfoFail: createAction(types.UPDATE_USER_INFO_FAIL),
  // Set user info
  setUserInfo: createAction(types.SET_USER_INFO),
  // Delete user info
  deleteUserInfo: createAction(types.DELETE_USER_INFO),
  //
  updateFcmToken: createAction(types.UPDATE_FCM_TOKEN),
  //
  getNotificationAccountId: createAction(types.GET_NOTIFICATION_ACCOUNT_ID),
  getNotificationAccountIdSuccess: createAction(types.GET_NOTIFICATION_ACCOUNT_ID_SUCCESS),
  //
  selectContractTypes: createAction(types.SELECT_CONTRACT_TYPES),
  selectPaymentMethods: createAction(types.SELECT_PAYMENT_METHODS),
  selectCategories: createAction(types.SELECT_CATEGORIES)
}

export const selectors = {
  getSelectedCategories: state => state.user.selectedCategories,
  getSelectedPaymentMethods: state => state.user.selectedPaymentMethods,
  getSelectedContractTypes: state => state.user.selectedContractTypes,
  getUser: state => state.user,
  getUserRegister: state => state.user.isRegisted,
  getUserBarcode: state => state.user.userBarcode,
  getNotificationAccountId: state => state.user.notificationAccountId,
  getLoading: (state, action: String) => state.ui.user[action].isLoading
}

const defaultState = {
  selectedContractTypes: null,
  selectedPaymentMethods: null,
  selectedCategories: null,
  user_id: 0,
  notificationAccountId: null,
  first_name: '',
  isRegisted: false,
  userBarcode: []
}

export default handleActions(
  {
    [types.GET_USER_INFO_SUCCESS]: (state, action) => {
      return { ...state, ...action.payload, time: new Date().getMilliseconds() }
    },
    [types.SET_USER_INFO]: (state, action) => {
      return { ...state, ...action.payload }
    },
    [types.DELETE_USER_INFO]: () => {
      return defaultState
    },
    [types.GET_NOTIFICATION_ACCOUNT_ID_SUCCESS]: (state, action) => {
      return { ...state, notificationAccountId: action.payload.account_id }
    },
    [types.GET_USER_BARCODE_SUCCESS]: (state, action) => {
      return { ...state, userBarcode: action.payload }
    },
    [types.SELECT_CATEGORIES]: (state, action) => {
      return { ...state, selectedCategories: action.payload }
    },
    [types.SELECT_CONTRACT_TYPES]: (state, action) => {
      return { ...state, selectedContractTypes: action.payload }
    },
    [types.SELECT_PAYMENT_METHODS]: (state, action) => {
      return { ...state, selectedPaymentMethods: action.payload }
    }
  },
  defaultState
)
