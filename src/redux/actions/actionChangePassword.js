import {
  ACTION_POST_CHANGE_PASS_START,
  ACTION_POST_CHANGE_PASS_CANCEL,
  ACTION_POST_CHANGE_PASS_SUCCESS,
  ACTION_POST_CHANGE_PASS_FAILURE,
} from './types';

export const postChangePassStart = (payload) => ({ type: ACTION_POST_CHANGE_PASS_START, payload: payload });
export const postChangePassCancel = () => ({ type: ACTION_POST_CHANGE_PASS_CANCEL });
export const postChangePassSuccess = (response) => ({ type: ACTION_POST_CHANGE_PASS_SUCCESS, response: response });
export const postChangePassError = (error) => ({ type: ACTION_POST_CHANGE_PASS_FAILURE, response: error });