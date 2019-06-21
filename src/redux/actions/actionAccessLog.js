import { ACTION_FETCH_ACCESS_LOG_START, ACTION_FETCH_ACCESS_LOG_SUCCESS, ACTION_FETCH_ACCESS_LOG_FAILURE, ACTION_FETCH_ACCESS_LOG_CANCEL } from './types';

export const fetchAccessLog = (payload) => ({
    type: ACTION_FETCH_ACCESS_LOG_START,
    payload: payload,
})

export const fetchAccessLogSuccess = (payload) => ({
    type: ACTION_FETCH_ACCESS_LOG_SUCCESS,
    payload: payload,
})

export const fetchAccessLogFail = (payload) => ({
    type: ACTION_FETCH_ACCESS_LOG_FAILURE,
    payload: payload,
})

export const fetchAccessLogCancel = (payload) => ({
    type: ACTION_FETCH_ACCESS_LOG_CANCEL,
    payload: payload,
})