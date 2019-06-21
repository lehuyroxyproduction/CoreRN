import {
  ACTION_GET_LIST_DEVICE_REQUEST, ACTION_GET_LIST_DEVICE_SUCCESS, ACTION_GET_LIST_DEVICE_FAILURE, 
  ACTION_ADD_DEVICE_REQUEST, ACTION_ADD_DEVICE_SUCCESS, ACTION_ADD_DEVICE_FAILURE, ACTION_UPDATE_DEVICE_REQUEST, ACTION_UPDATE_DEVICE_SUCCESS, ACTION_UPDATE_DEVICE_FAILURE, ACTION_TOGGLE_USER_IN_DEVICE_REQUEST, ACTION_TOGGLE_USER_IN_DEVICE_SUCCESS, ACTION_TOGGLE_USER_IN_DEVICE_FAILURE, ACTION_SAVE_DEVICE_DETAIL, ACTION_REMOVE_DEVICE_REQUEST, ACTION_REMOVE_DEVICE_SUCCESS, ACTION_REMOVE_DEVICE_FAILURE, ACTION_REMOVE_DEVICE_RESET, ACTION_UPDATE_DEVICE_RESET,
} from './types';

// #region GET DEVICE
export const getListDeviceRequest = payload => ({ type: ACTION_GET_LIST_DEVICE_REQUEST, payload });
export const getListDeviceSuccess = response => ({ type: ACTION_GET_LIST_DEVICE_SUCCESS, payload: response });
export const getListDeviceError = error => ({ type: ACTION_GET_LIST_DEVICE_FAILURE, payload: error });
// #endregion


// #region ADD DEVICE
export const postAddDeviceRequest = payload => ({ type: ACTION_ADD_DEVICE_REQUEST, payload });
export const postAddDeviceSuccess = response => ({ type: ACTION_ADD_DEVICE_SUCCESS, payload: response });
export const postAddDeviceError = error => ({ type: ACTION_ADD_DEVICE_FAILURE, payload: error });
// #endregion


// #region UPDATE DEVICE
export const postUpdateDeviceRequest = payload => ({ type: ACTION_UPDATE_DEVICE_REQUEST, payload });
export const postUpdateDeviceSuccess = response => ({ type: ACTION_UPDATE_DEVICE_SUCCESS, payload: response });
export const postUpdateDeviceError = error => ({ type: ACTION_UPDATE_DEVICE_FAILURE, payload: error });
export const postUpdateDeviceReset = () => ({ type: ACTION_UPDATE_DEVICE_RESET });
// #endregion

// #region UPDATE USER ON Device
export const toggleUserInDeviceRequest = payload => ({ type: ACTION_TOGGLE_USER_IN_DEVICE_REQUEST, payload });
export const toggleUserInDeviceSuccess = response => ({ type: ACTION_TOGGLE_USER_IN_DEVICE_SUCCESS, payload: response });
export const toggleUserInDeviceError = error => ({ type: ACTION_TOGGLE_USER_IN_DEVICE_FAILURE, payload: error });
// #endregion

// #region REMOVE DEVICE
export const postRemoveDeviceRequest = payload => ({ type: ACTION_REMOVE_DEVICE_REQUEST, payload });
export const postRemoveDeviceSuccess = response => ({ type: ACTION_REMOVE_DEVICE_SUCCESS, payload: response });
export const postRemoveDeviceError = error => ({ type: ACTION_REMOVE_DEVICE_FAILURE, payload: error });
export const postRemoveDeviceReset = error => ({ type: ACTION_REMOVE_DEVICE_RESET, payload: error });
// #endregion
