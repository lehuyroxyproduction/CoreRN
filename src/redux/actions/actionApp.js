import { createAction, handleActions } from 'redux-actions'
import { 
  ACTION_APP_SAVE_USER,
  ACTION_APP_UPDATE_TABBAR_VISIBLE,
  ACTION_GET_API_USER_START,
  ACTION_GET_API_USER_CANCEL,
  ACTION_GET_API_USER_SUCCESS,
  ACTION_GET_API_USER_FAILURE,
  ACTION_POST_API_UPDATE_USER_START,
  ACTION_POST_API_UPDATE_USER_CANCEL,
  ACTION_POST_API_UPDATE_USER_SUCCESS,
  ACTION_POST_API_UPDATE_USER_FAILURE,
  ACTION_POST_API_UPLOAD_USER_AVATAR_START,
  ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL,
  ACTION_POST_API_UPLOAD_USER_AVATAR_SUCCESS,
  ACTION_POST_API_UPLOAD_USER_AVATAR_FAILURE,
  ACTION_UPDATE_USER_LOCATION,
  ACTION_SAVE_DEVICE_DETAIL,
  ACTION_SET_CURRENT_SCREEN,
  ACTION_PUSH,
  ACTION_SET_PUSH,
  ACTION_TOAST,
  ACTION_SET_TOAST,
  ACTION_UPDATE_NETWORK,
  ACTION_UPDATE_KEYBOARD,
  ACTION_UPDATE_KEYBOARD_HEIGHT,
  ACTION_UPDATE_BOTTOM_TABS_HEIGHT,
  ACTION_GET_SERVER_CONNECTION,
  ACTION_GET_SERVER_CONNECTION_SUCCESS

} from './types';

export const saveUser = (payload) => ({ type: ACTION_APP_SAVE_USER, payload: payload });
export const updateTabbarVisible = (payload) => ({ type: ACTION_APP_UPDATE_TABBAR_VISIBLE, payload: payload });

export const getAPIUserStart = (payload) => ({ type: ACTION_GET_API_USER_START, payload: payload });
export const getAPIUserCancel = () => ({ type: ACTION_GET_API_USER_CANCEL });
export const getAPIUserSuccess = (response) => ({ type: ACTION_GET_API_USER_SUCCESS, response: response });
export const getAPIUserError = (error) => ({ type: ACTION_GET_API_USER_FAILURE, error: error });

export const postAPIUpdateUserStart = (payload) => ({ type: ACTION_POST_API_UPDATE_USER_START, payload: payload });
export const postAPIUpdateUserCancel = () => ({ type: ACTION_POST_API_UPDATE_USER_CANCEL });
export const postAPIUpdateUserSuccess = (response) => ({ type: ACTION_POST_API_UPDATE_USER_SUCCESS, response: response });
export const postAPIUpdateUserError = (error) => ({ type: ACTION_POST_API_UPDATE_USER_FAILURE, error: error });

export const postAPIUploadUserAvatarStart = (payload) => ({ type: ACTION_POST_API_UPLOAD_USER_AVATAR_START, payload: payload });
export const postAPIUploadUserAvatarCancel = () => ({ type: ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL });
export const postAPIUploadUserAvatarSuccess = (response) => ({ type: ACTION_POST_API_UPLOAD_USER_AVATAR_SUCCESS, response: response });
export const postAPIUploadUserAvatarError = (error) => ({ type: ACTION_POST_API_UPLOAD_USER_AVATAR_FAILURE, error: error });


export const  setCurrentScreen = createAction(types.SET_CURRENT_SCREEN)
export const  
  // Ui
export const  push = createAction(types.PUSH)
export const  setPush = createAction(types.SET_PUSH)
export const  toast = createAction(types.TOAST)
export const  setToast = createAction(types.SET_TOAST)
  // System
export const  updateNetwork = createAction(types.UPDATE_NETWORK)
export const  updateKeyboard = createAction(types.UPDATE_KEYBOARD)
export const  updateDeviceKeyboardHeight = createAction(types.UPDATE_KEYBOARD_HEIGHT)
export const  updateBottomTabsHeight = createAction(types.UPDATE_BOTTOM_TABS_HEIGHT)
  //
export const  getServerConnection = createAction(types.GET_SERVER_CONNECTION)
export const  getServerConnectionSuccess = createAction(types.GET_SERVER_CONNECTION_SUCCESS)