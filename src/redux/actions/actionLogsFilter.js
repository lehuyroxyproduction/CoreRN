import {
    ACTION_POST_LOGINFILTER,
    ACTION_POST_LOGINFILTER_START,
    ACTION_POST_LOGINFILTER_SUCCESS,
    ACTION_POST_LOGINFILTER_ERROR,
    ACTION_POST_DOORFILTER,
    ACTION_POST_DOORFILTER_START,
    ACTION_POST_DOORFILTER_SUCCESS,
    ACTION_POST_DOORFILTER_ERROR,
} from './types'

import {
    URL_FILTER_DOOR , 
    URL_FILTER_LOGIN ,
    HEADER_LOGS , 
    METHOD_POST
}from '../../constants/webServices'

//#region login

export const postAPILoginFilterStart= () =>({
    type: ACTION_POST_LOGINFILTER_START,
    
})
export const postAPILoginFilterSuccess= (data) =>({
    type: ACTION_POST_LOGINFILTER_SUCCESS,
    data
})
export const postAPILoginFilterError= (error) =>({
    type: ACTION_POST_LOGINFILTER_ERROR,
    error
})

export function fecthfilterlogin(payload){
    return(dispatch)=>{
        console.log('filterlogin')
        dispatch(postAPILoginFilterStart());
        return postLoginFetch(payload).then(([response,json])=>{
            if(response.status===200){
                dispatch(postAPILoginFilterSuccess(json));
                console.log(json)
            }else{
                dispatch(postAPILoginFilterError(error));
                console.log(error)
            }
        })
    }
}

const postLoginFetch=(payload)=>{
    // console.log('filterlogin_fetch')
    // console.log(payload);
    let body= {
        "datetime":"Nov 27 2018"
};
    console.log(body)
    // console.log(URL_FILTER_LOGIN)
    // console.log(HEADER_LOGS)
    const request=fetch(URL_FILTER_LOGIN,{
        method:METHOD_POST,
        header:HEADER_LOGS,
        body:body
    })
    .then(response=> Promise.all([response,response.json()]));
    return request
}

//#endregion door



//#region door

export const postAPIDoorFilterStart= () =>({
    type: ACTION_POST_DOORFILTER_START,

})
export const postAPIDoorFilterSuccess= (response) =>({
    type: ACTION_POST_DOORFILTER_SUCCESS,
    response
})
export const postAPIDoorFilterError= (error) =>({
    type: ACTION_POST_DOORFILTER_ERROR,
    error
})

export function fecthfilterDoor(payload){
    return(dispatch)=>{
        dispatch(postAPIDoorFilterStart());
        return postDoorFetch(payload).then(([response,json])=>{
            if(response.status===200){
                dispatch(postAPIDoorFilterSuccess(json));
            }else{
                dispatch(postAPIDoorFilterError(error))
            }
        })
    }
}

const postDoorFetch=(payload)=>{
    console.log(payload);
    let body= '"datetime":"'+payload+'"';
    console.log(body)
    const request=fetch(URL_FILTER_DOOR,{
        method:METHOD_POST,
        header:HEADER_LOGS,
        body:body
    })
    .then(response=> Promise.all([response,response.json()]));
    return request
}

//#endregion door