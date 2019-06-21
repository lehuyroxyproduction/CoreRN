import {
    ACTION_POST_LOGINFILTER,
    ACTION_POST_LOGINFILTER_START,
    ACTION_POST_LOGINFILTER_SUCCESS,
    ACTION_POST_LOGINFILTER_ERROR,
    ACTION_POST_DOORFILTER,
    ACTION_POST_DOORFILTER_START,
    ACTION_POST_DOORFILTER_SUCCESS,
    ACTION_POST_DOORFILTER_ERROR,
} from '../actions/types';

const defaultState = {
    isLoading: false,
    isError: false,
    response: undefined,
    data:undefined
}

const reducerFilterLogs= ( state = defaultState , action) =>{
    switch(action.type){
        case ACTION_POST_DOORFILTER_START:
            return{
                ...state,
                isLoading:true,
                isError:false,
                response:undefined}
        case ACTION_POST_DOORFILTER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                isError:false,
                response:action.response}
        case ACTION_POST_DOORFILTER_ERROR:
            return{
                ...state,
                isLoading:false,
                isError:true,
                response:undefined}
                
        case ACTION_POST_LOGINFILTER_START:
            return{
                ...state,
                isLoading:true,
                isError:false,
                data:undefined}
        case ACTION_POST_LOGINFILTER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                isError:false,
                data:action.data}
        case ACTION_POST_LOGINFILTER_ERROR:
            return{
                ...state,
                isLoading:false,
                isError:true,
                data:undefined}            
        default:
        return state
    }
}

export default reducerFilterLogs;