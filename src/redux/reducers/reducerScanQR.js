import { 
    ACTION_SCANQR_UPDATE_CAMERA_VISIBLE,
    ACTION_SCANQR_UPDATE_CAMERA_REACTIVE,
    ACTION_POST_API_CLOCKIN_START,
    ACTION_POST_API_CLOCKIN_CANCEL,
    ACTION_POST_API_CLOCKIN_SUCCESS,
    ACTION_POST_API_CLOCKIN_FAILURE
} from '../actions/types.js';

const defaultState = {
    isCameraVisible: true,
    isCameraReactive: true,
    isLoading: false,
    isError: false,
    response: undefined,
}

const reducerQRScan = (state = defaultState, action) => {
    switch (action.type) {

        case ACTION_SCANQR_UPDATE_CAMERA_VISIBLE:
            return { ...state, isCameraVisible: action.payload };

        case ACTION_SCANQR_UPDATE_CAMERA_REACTIVE:
            return { ...state, isCameraReactive: action.payload };

        case ACTION_POST_API_CLOCKIN_START:
            return { ...state, isLoading: true, isError: false, response: undefined };

        case ACTION_POST_API_CLOCKIN_CANCEL:
            return { ...state, isLoading: false, isError: false, response: undefined };

        case ACTION_POST_API_CLOCKIN_SUCCESS:
            console.log('ACTION_POST_API_CLOCKIN_SUCCESS');
            return { ...state, isLoading: false, isError: false, response: { text: action.response }};

        case ACTION_POST_API_CLOCKIN_FAILURE:
            return { ...state, isLoading: false, isError: true, response: { text: action.error } };
        
        default:
            return state;
    }
}

export default reducerQRScan;