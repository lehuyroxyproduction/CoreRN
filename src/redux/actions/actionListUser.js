import {
    ACTION_GET_LISTUSER_CANCEL,
    ACTION_GET_LISTUSER_ERROR,
    ACTION_GET_LISTUSER_START,
    ACTION_GET_LISTUSER_SUCCESS
} from './types'

export const getApiListUserStart = payload => ({
    type : ACTION_GET_LISTUSER_START ,
    payload
})

export const getApiListUserSuccess = response =>({
    type : ACTION_GET_LISTUSER_SUCCESS,
    response:response
})

export const getApiListUserCancel = () => ({
    type: ACTION_GET_LISTUSER_CANCEL,
})

export const getApiListUserError = error => ({
    type: ACTION_GET_LISTUSER_ERROR,
    error:error
})
