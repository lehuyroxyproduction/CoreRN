import { 
    ACTION_POST_API_SIGNIN_START,
    ACTION_POST_API_SIGNIN_CANCEL,
    ACTION_POST_API_SIGNIN_SUCCESS,
    ACTION_POST_API_SIGNIN_FAILURE
} from './types.js';

export const postAPISignInStart = (payload) => ({ type: ACTION_POST_API_SIGNIN_START, payload: payload });
export const postAPISignInCancel = () => ({ type: ACTION_POST_API_SIGNIN_CANCEL });
export const postAPISignInSuccess = (response) => ({ type: ACTION_POST_API_SIGNIN_SUCCESS, response: response });
export const postAPISignInError = (error) => ({ type: ACTION_POST_API_SIGNIN_FAILURE, response: error });