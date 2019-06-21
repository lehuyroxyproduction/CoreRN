import { ACTION_FETCH_ACCESS_LOG_START, ACTION_FETCH_ACCESS_LOG_SUCCESS, ACTION_FETCH_ACCESS_LOG_CANCEL, ACTION_FETCH_ACCESS_LOG_FAILURE } from "../actions/types";
import { RESPONSE_STATUS, SERVER_STATUS } from "../../constants/webServices";

const DEFAULT_STATE = {
    listAccessLog: "",
    status: RESPONSE_STATUS.LOADING,
    errorMessage: ""
};

export default (state = DEFAULT_STATE, action) => {
    
    switch(action.type){
        case ACTION_FETCH_ACCESS_LOG_START:
            return {...state, status: RESPONSE_STATUS.LOADING }

        case ACTION_FETCH_ACCESS_LOG_SUCCESS:
            const {status, userData, error} = action.payload;

            // Sync Response Status
            if (status == SERVER_STATUS.SUCCESS)
                return {...state, status: RESPONSE_STATUS.SUCCESS, listAccessLog: userData}
            else
                return {...state, status: RESPONSE_STATUS.SERVER_ERROR, errorMessage: error.text }

        case ACTION_FETCH_ACCESS_LOG_FAILURE:
            return {...state, status: RESPONSE_STATUS.UNEXPECTED_ERROR, errorMessage: action.payload.message }

        case ACTION_FETCH_ACCESS_LOG_CANCEL:
            return {...state }

        default: 
            return state;
    }
}