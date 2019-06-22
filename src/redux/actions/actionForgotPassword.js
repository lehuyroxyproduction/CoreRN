import {
  ACTION_POST_API_FORGOT_PASSWORD_START,
  ACTION_POST_API_FORGOT_PASSWORD_CANCEL,
  ACTION_POST_API_FORGOT_PASSWORD_SUCCESS,
  ACTION_POST_API_FORGOT_PASSWORD_FAILURE
} from './types';

export const postAPIForgotPasswordStart = (payload) => ({ type: ACTION_POST_API_FORGOT_PASSWORD_START, payload: payload });
export const postAPIForgotPasswordCancel = () => ({ type: ACTION_POST_API_FORGOT_PASSWORD_CANCEL });
export const postAPIForgotPasswordSuccess = (response) => ({ type: ACTION_POST_API_FORGOT_PASSWORD_SUCCESS, response: response });
export const postAPIForgotPasswordError = (error) => ({ type: ACTION_POST_API_FORGOT_PASSWORD_FAILURE, error: error });