import {
    ACTION_GET_LISTUSER_START,
    ACTION_GET_LISTUSER_SUCCESS,
    ACTION_GET_LISTUSER_CANCEL,
    ACTION_GET_LISTUSER_ERROR
} from '../actions/types'

const defaultState = {
    isLoading : false,
    isError : false,
    response : undefined
}

export const reducerListUser = ( state = defaultState , action ) => {
    switch (action.type){
        case ACTION_GET_LISTUSER_START:
            return {
                ...state,
                isLoading:true,
                isError:false,
                response:undefined
            }
        case ACTION_GET_LISTUSER_CANCEL:
            return {
                ...state,
                isLoading:false,
                isError:false,
                response:undefined
            }
        case ACTION_GET_LISTUSER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                response:action.response
            }
        case ACTION_GET_LISTUSER_ERROR:
            return {
                ...state,
                isLoading:false,
                isError:true,
                response:action.error
            }
        default : 
            return state
    }
}