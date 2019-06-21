import {
ACTION_GET_DOORLOGS,
ACTION_GET_DOORLOGS_ERROR,
ACTION_GET_DOORLOGS_START,
ACTION_GET_DOORLOGS_SUCCESS,
ACTION_GET_LOGINLOGS,
ACTION_GET_LOGINLOGS_ERROR,
ACTION_GET_LOGINLOGS_START,
ACTION_GET_LOGINLOGS_SUCCESS,
} from './types';

import {URL_LOGS_DOOR,URL_LOGS_LOGIN,HEADER_LOGS,METHOD_GET,METHOD_POST,URL_FILTER_DOOR , 
    URL_FILTER_LOGIN ,} from '../../constants/webServices'

export const getAPILogsDoorSuccess=(response)=>({
    type:ACTION_GET_DOORLOGS_SUCCESS,
    response
    });
export const getAPILogsDoorStart=()=>({
    type:ACTION_GET_DOORLOGS_START
});
export const getAPILogsDoorError=(error)=>({
    type:ACTION_GET_DOORLOGS_ERROR,
    error
});

export const getAPILogsLoginStart=()=>({
    type:ACTION_GET_LOGINLOGS_START,
});
export const getAPILogsLoginSuccess=(data)=>({
    type:ACTION_GET_LOGINLOGS_SUCCESS,
    data
});
export const getAPILogsLoginError=(error)=>({
    type:ACTION_GET_LOGINLOGS_ERROR,
    error
});

//#Region Door
export function fetchDataDoor(payload) {
    return(dispatch)=>{
        // console.log("action start");
    dispatch(getAPILogsDoorStart());
    return getDoorFetch(payload).then(([response,json])=>{
    if(response.status===200){
    console.log('get');
    dispatch(getAPILogsDoorSuccess(json));
    console.log(json);
    }else{
    dispatch(getAPILogsDoorError(error));
    console.log(error);
    }})
}}

const getDoorFetch=(payload)=>{

let url=undefined

if( payload === undefined ){
    url=URL_LOGS_DOOR,
    method=METHOD_GET,
    body=undefined
}else{
    url=URL_FILTER_DOOR,
    method=METHOD_POST,
    body=JSON.stringify({
        datetime: payload,
    })
};

console.log(url);
console.log(method);
console.log(body)

const request = fetch(url,{
    method:method,
    headers:HEADER_LOGS,
    body:body
})
.then( response => Promise.all([response, response.json()]));
return request;
}
//#End Region 

//#Region Login
export function fetchDataLogin(payload) {
    return(dispatch)=>{
        console.log("action start");
    dispatch(getAPILogsLoginStart());
    return getLoginFetch(payload).then(([response,json])=>{
    if(response.status===200){
    console.log('get');
    dispatch(getAPILogsLoginSuccess(json));
    // console.log(json);
    }else{
    dispatch(getAPILogsLoginError(error));
    // console.log(error);
    }})
}}

const getLoginFetch=(payload)=>{

let url=undefined

if(payload===undefined){
    url=URL_LOGS_LOGIN,
    method=METHOD_GET,
    body=undefined
}else{
    url=URL_FILTER_LOGIN,
    method=METHOD_POST,
    body=JSON.stringify({
        datetime: payload,
    })

};

console.log(url);
console.log(method);
console.log(body)
const request = fetch(url,{
    method:method,
    headers:HEADER_LOGS,
    body:body
})
.then( response => Promise.all([response, response.json()]));
return request;
}
//#End Region 

