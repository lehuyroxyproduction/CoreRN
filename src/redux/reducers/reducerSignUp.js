import { 
    ACTION_POST_API_SIGNUP_START,
    ACTION_POST_API_SIGNUP_CANCEL,
    ACTION_POST_API_SIGNUP_SUCCESS,
    ACTION_POST_API_SIGNUP_FAILURE
} from '../actions/types.js';

const defaultState = {
    isLoading: false,
    isError: false,
    response: undefined,
}

const reducerSignUp = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_POST_API_SIGNUP_START:
            return { ...state, isLoading: true, isError: false, response: undefined };

        case ACTION_POST_API_SIGNUP_CANCEL:
            return { ...state, isLoading: false, isError: false, response: undefined };

        case ACTION_POST_API_SIGNUP_SUCCESS:
            return { ...state, isLoading: false, isError: false, response: action.response };

        case ACTION_POST_API_SIGNUP_FAILURE:
            return { ...state, isLoading: false, isError: true, response: action.error };
        
        default:
            return state;
    }
}

export default reducerSignUp;