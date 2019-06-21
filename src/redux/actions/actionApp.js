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

export const updateUserLocation = (payload) => ({ type: ACTION_UPDATE_USER_LOCATION, payload: payload });

export const saveDeviceDetail = payload => ({ type: ACTION_SAVE_DEVICE_DETAIL, payload });

