import { 
    ACTION_SCANQR_UPDATE_CAMERA_VISIBLE, 
    ACTION_SCANQR_UPDATE_CAMERA_REACTIVE,
    ACTION_POST_API_CLOCKIN_START,
    ACTION_POST_API_CLOCKIN_CANCEL,
    ACTION_POST_API_CLOCKIN_SUCCESS,
    ACTION_POST_API_CLOCKIN_FAILURE
} from './types.js';

export const updateCameraVisible = (payload) => ({ type: ACTION_SCANQR_UPDATE_CAMERA_VISIBLE, payload: payload });
export const updateCameraReactive = (payload) => ({ type: ACTION_SCANQR_UPDATE_CAMERA_REACTIVE, payload: payload });
export const postAPIClockInStart = (payload) => ({ type: ACTION_POST_API_CLOCKIN_START, payload: payload });
export const postAPIClockInCancel = () => ({ type: ACTION_POST_API_CLOCKIN_CANCEL });
export const postAPIClockInSuccess = (response) => ({ type: ACTION_POST_API_CLOCKIN_SUCCESS, response: response });
export const postAPIClockInError = (error) => ({ type: ACTION_POST_API_CLOCKIN_FAILURE, error: error });