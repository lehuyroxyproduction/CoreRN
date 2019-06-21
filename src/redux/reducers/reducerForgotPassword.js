import { 
    ACTION_POST_API_FORGOT_PASSWORD_START,
    ACTION_POST_API_FORGOT_PASSWORD_CANCEL,
    ACTION_POST_API_FORGOT_PASSWORD_SUCCESS,
    ACTION_POST_API_FORGOT_PASSWORD_FAILURE
} from '../actions/types.js';

const defaultState = {
    isLoading: false,
    isError: false,
    response: undefined,
}

const reducerForgotPassword = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_POST_API_FORGOT_PASSWORD_START:
            return { ...state, isLoading: true, isError: false, response: undefined };

        case ACTION_POST_API_FORGOT_PASSWORD_CANCEL:
            return { ...state, isLoading: false, isError: false, response: undefined };

        case ACTION_POST_API_FORGOT_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, isError: false, response: action.response };

        case ACTION_POST_API_FORGOT_PASSWORD_FAILURE:
            return { ...state, isLoading: false, isError: true, response: action.error };
        
        default:
            return state;
    }
}

export default reducerForgotPassword;