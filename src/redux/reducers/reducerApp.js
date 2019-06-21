import { AsyncStorage } from 'react-native';
import { 
    ACTION_APP_SAVE_USER,
    ACTION_APP_UPDATE_TABBAR_VISIBLE,
    ACTION_GET_API_USER_START,
    ACTION_GET_API_USER_CANCEL,
    ACTION_GET_API_USER_SUCCESS,
    ACTION_GET_API_USER_FAILURE,
    ACTION_POST_API_UPDATE_USER_START,
    ACTION_POST_API_UPDATE_USER_CANCEL,
    ACTION_POST_API_UPDATE_USER_SUCCESS,
    ACTION_POST_API_UPDATE_USER_FAILURE,
    ACTION_POST_API_UPLOAD_USER_AVATAR_START,
    ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL,
    ACTION_POST_API_UPLOAD_USER_AVATAR_SUCCESS,
    ACTION_POST_API_UPLOAD_USER_AVATAR_FAILURE,
    ACTION_UPDATE_USER_LOCATION,
    ACTION_SAVE_DEVICE_DETAIL
} from '../actions/types';
import { AsyncStorageItem } from '../../constants/constants';

const defaultState = {
  isTabbarVisible: true,

  isLoadingUser: false,
  user: {},
  isErrorUser: false,
  userLocation: undefined,
  
  isLoading: false,
  isError: false,
  response: undefined,
  
  isUploading: false,
  isUploadError: false,
  responseUpload: undefined,
}

const reducerApp = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_APP_SAVE_USER:
      if (action.payload) {
        AsyncStorage.setItem(AsyncStorageItem.User, JSON.stringify(action.payload)).then(() => {});
        //return { ...state, user: action.payload, userLocation: state.userLocation ? state.userLocation : action.payload.location.length > 0 ? action.payload.location[0] : undefined };
        return { ...state, user: action.payload };
      } else {
        // Logout
        AsyncStorage.removeItem(AsyncStorageItem.User);
        return defaultState;
      }

    case ACTION_APP_UPDATE_TABBAR_VISIBLE:
      return { ...state, isTabbarVisible: action.payload };

    case ACTION_GET_API_USER_START:
      console.log('ACTION_GET_API_USER_START');
      return { ...state, isLoadingUser: true, isErrorUser: false };

    case ACTION_GET_API_USER_CANCEL:
      console.log('ACTION_GET_API_USER_CANCEL');
      return { ...state, isLoadingUser: false, isErrorUser: false };

    case ACTION_GET_API_USER_SUCCESS:
      console.log('ACTION_GET_API_USER_SUCCESS');
      return { ...state, isLoadingUser: false, isErrorUser: false, user: action.response };

    case ACTION_GET_API_USER_FAILURE:
      console.log('ACTION_GET_API_USER_FAILURE');
      return { ...state, isLoadingUser: false, isErrorUser: true };

    case ACTION_POST_API_UPDATE_USER_START:
      return { ...state, isLoading: true, isError: false, response: undefined };

    case ACTION_POST_API_UPDATE_USER_CANCEL:
      return { ...state, isLoading: false, isError: false, response: undefined };

    case ACTION_POST_API_UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, isError: false, response: action.response };

    case ACTION_POST_API_UPDATE_USER_FAILURE:
      return { ...state, isLoading: false, isError: true, response: action.error };

    case ACTION_POST_API_UPLOAD_USER_AVATAR_START:
      return { ...state, isUploading: true, isUploadError: false, responseUpload: undefined };

    case ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL:
      return { ...state, isUploading: false, isUploadError: false, responseUpload: undefined };

    case ACTION_POST_API_UPLOAD_USER_AVATAR_SUCCESS:
      return { ...state, isUploading: false, isUploadError: false, responseUpload: action.response };

    case ACTION_POST_API_UPLOAD_USER_AVATAR_FAILURE:
      return { ...state, isUploading: false, isUploadError: true, responseUpload: action.error };

    case ACTION_UPDATE_USER_LOCATION:
      return { ...state, userLocation: action.payload };

    case ACTION_SAVE_DEVICE_DETAIL:
      return { ...state, deviceDetail: action.payload };


    default:
      return state;
  }
};

export default reducerApp;
