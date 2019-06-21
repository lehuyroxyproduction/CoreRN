import { 
    ACTION_POST_API_SIGNUP_START,
    ACTION_POST_API_SIGNUP_CANCEL,
    ACTION_POST_API_SIGNUP_SUCCESS,
    ACTION_POST_API_SIGNUP_FAILURE
} from './types.js';

export const postAPISignUpStart = (payload) => ({ type: ACTION_POST_API_SIGNUP_START, payload: payload });
export const postAPISignUpCancel = () => ({ type: ACTION_POST_API_SIGNUP_CANCEL });
export const postAPISignUpSuccess = (response) => ({ type: ACTION_POST_API_SIGNUP_SUCCESS, response: response });
export const postAPISignUpError = (error) => ({ type: ACTION_POST_API_SIGNUP_FAILURE, error: error });