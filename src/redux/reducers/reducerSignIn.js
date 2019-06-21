import { 
    ACTION_POST_API_SIGNIN_START,
    ACTION_POST_API_SIGNIN_CANCEL,
    ACTION_POST_API_SIGNIN_SUCCESS,
    ACTION_POST_API_SIGNIN_FAILURE
} from '../actions/types.js';

const defaultState = {
    isLoading: false,
    isError: false,
    response: undefined,
}

const reducerSignIn = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_POST_API_SIGNIN_START:
            return { 
                ...state, 
                isLoading: true, 
                isError: false, 
                response: undefined };

        case ACTION_POST_API_SIGNIN_CANCEL:
            return { ...state, 
                isLoading: false, 
                isError: false, 
                response: undefined };

        case ACTION_POST_API_SIGNIN_SUCCESS:
            return { ...state, 
                isLoading: false, 
                isError: false, 
                response: action.response };

        case ACTION_POST_API_SIGNIN_FAILURE:
            return { 
                ...state, 
                isLoading: false, 
                isError: true, 
                response: action.response };
        
        default:
            return state;
    }
}

export default reducerSignIn;