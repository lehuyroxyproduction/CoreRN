import { ACTION_POST_CHANGE_PASS_START, ACTION_POST_CHANGE_PASS_CANCEL, ACTION_POST_CHANGE_PASS_SUCCESS, ACTION_POST_CHANGE_PASS_FAILURE } from '../actions/types.js';

const defaultState = {
    isLoading: false,
    isError: false,
    response: undefined,
}

const reducerChangePass = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_POST_CHANGE_PASS_START:
            const result = { ...state, isLoading: true, isError: false, response: undefined };
            return result;

        case ACTION_POST_CHANGE_PASS_CANCEL:
            return { ...state, isLoading: false, isError: false, response: undefined };

        case ACTION_POST_CHANGE_PASS_SUCCESS:
            return { ...state, isLoading: false, isError: false, response: action.response };

        case ACTION_POST_CHANGE_PASS_FAILURE:
            return { ...state, isLoading: false, isError: true, response: action.response };
        
        default:
            return state;
    }
}

export default reducerChangePass;