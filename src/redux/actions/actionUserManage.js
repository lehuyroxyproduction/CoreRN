import {
  ACTION_GET_LIST_USER_REQUEST, ACTION_GET_LIST_USER_SUCCESS, ACTION_GET_LIST_USER_FAILURE, 
  ACTION_ADD_USER_REQUEST, ACTION_ADD_USER_SUCCESS, ACTION_ADD_USER_FAILURE, ACTION_UPDATE_USER_REQUEST, ACTION_UPDATE_USER_SUCCESS, ACTION_UPDATE_USER_FAILURE, ACTION_REMOVE_USER_REQUEST, ACTION_REMOVE_USER_SUCCESS, ACTION_REMOVE_USER_FAILURE, ACTION_REMOVE_USER_RESET, ACTION_UPDATE_USER_RESET,
} from './types';

// #region GET USER
export const getListUserRequest = payload => ({ type: ACTION_GET_LIST_USER_REQUEST, payload });
export const getListUserSuccess = response => ({ type: ACTION_GET_LIST_USER_SUCCESS, payload: response });
export const getListUserError = error => ({ type: ACTION_GET_LIST_USER_FAILURE, payload: error });
// #endregion


// #region ADD USER
export const postAddUserRequest = payload => ({ type: ACTION_ADD_USER_REQUEST, payload });
export const postAddUserSuccess = response => ({ type: ACTION_ADD_USER_SUCCESS, payload: response });
export const postAddUserError = error => ({ type: ACTION_ADD_USER_FAILURE, payload: error });
// #endregion


// #region UPDATE USER
export const postUpdateUserRequest = payload => ({ type: ACTION_UPDATE_USER_REQUEST, payload });
export const postUpdateUserSuccess = response => ({ type: ACTION_UPDATE_USER_SUCCESS, payload: response });
export const postUpdateUserError = error => ({ type: ACTION_UPDATE_USER_FAILURE, payload: error });
export const postUpdateUserReset = error => ({ type: ACTION_UPDATE_USER_RESET, payload: error });
// #endregion


// #region REMOVE USER
export const postRemoveUserRequest = payload => ({ type: ACTION_REMOVE_USER_REQUEST, payload });
export const postRemoveUserReset = payload => ({ type: ACTION_REMOVE_USER_RESET, payload });
export const postRemoveUserSuccess = response => ({ type: ACTION_REMOVE_USER_SUCCESS, payload: response });
export const postRemoveUserError = error => ({ type: ACTION_REMOVE_USER_FAILURE, payload: error });
// #endregion
