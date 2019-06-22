import {
  AsyncStorage
} from 'react-native'
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
  ACTION_SAVE_DEVICE_DETAIL,
  ACTION_SET_CURRENT_SCREEN,
  ACTION_UPDATE_BOTTOM_TABS_HEIGHT,
  ACTION_UPDATE_KEYBOARD,
  ACTION_UPDATE_KEYBOARD_HEIGHT,
  ACTION_UPDATE_NETWORK,
  ACTION_GET_SERVER_CONNECTION,
  ACTION_GET_SERVER_CONNECTION_SUCCESS
} from 'redux/actions/types'
import { AsyncStorageItem } from 'Constants/constant'

const defaultState = {
  currentScreen: null,
  url: '',
  version: '',
  buildVersion: '',
  toast: {
    message: '',
    time: 0
  },
  isPushing: false,
  isConnected: true,
  isConnectedToServer: false,
  keyboardHeight: 0,
  deviceKeyboardHeight: 0,
  bottomTabsHeight: 0,
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
       
        return {
          ...state,
          user: action.payload
        };
      } else {
        // Logout
        AsyncStorage.removeItem(AsyncStorageItem.User);
        return defaultState;
      }
      
      case SET_CURRENT_SCREEN:
          return {
            ...state,
            currentScreen: action.payload
          }

      case SET_PUSH:
        return {
          ...state,
          isPushing: action.payload
        }

      case SET_TOAST:
        return {
          ...state,
          toast: {
            message: action.payload
          } //, time: new Date().getMilliseconds() }
        }

      case UPDATE_NETWORK:
        return {
          ...state,
          isConnected: action.payload
        }

      case UPDATE_KEYBOARD:
        return {
          ...state,
          keyboardHeight: action.payload
        }

      case UPDATE_KEYBOARD_HEIGHT:
        return {
          ...state,
          deviceKeyboardHeight: action.payload
        }

      case GET_SERVER_CONNECTION_SUCCESS:
        return {
          ...state,
          isConnectedToServer: action.payload
        }

      case UPDATE_BOTTOM_TABS_HEIGHT:
        return{
          ...state,
          bottomTabsHeight: action.payload
        }

      case ACTION_APP_UPDATE_TABBAR_VISIBLE:
        return {
          ...state, 
          isTabbarVisible: action.payload
        }

      case ACTION_GET_API_USER_START:
        return {
          ...state, isLoadingUser: true, isErrorUser: false
        }

      case ACTION_GET_API_USER_CANCEL:
        return {
          ...state, isLoadingUser: false, isErrorUser: false
        }

      case ACTION_GET_API_USER_SUCCESS:
        return {
          ...state, isLoadingUser: false, isErrorUser: false, user: action.response
        }

      case ACTION_GET_API_USER_FAILURE:
        console.log('ACTION_GET_API_USER_FAILURE');
        return {
          ...state, isLoadingUser: false, isErrorUser: true
        }

      case ACTION_POST_API_UPDATE_USER_START:
        return {
          ...state, isLoading: true, isError: false, response: undefined
        }

      case ACTION_POST_API_UPDATE_USER_CANCEL:
        return {
          ...state, isLoading: false, isError: false, response: undefined
        }

      case ACTION_POST_API_UPDATE_USER_SUCCESS:
        return {
          ...state, isLoading: false, isError: false, response: action.response
        }

      case ACTION_POST_API_UPDATE_USER_FAILURE:
        return {
          ...state, isLoading: false, isError: true, response: action.error
        }

      case ACTION_POST_API_UPLOAD_USER_AVATAR_START:
        return {
          ...state, isUploading: true, isUploadError: false, responseUpload: undefined
        }

      case ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL:
        return {
          ...state, isUploading: false, isUploadError: false, responseUpload: undefined
        }

      case ACTION_POST_API_UPLOAD_USER_AVATAR_SUCCESS:
        return {
          ...state, isUploading: false, isUploadError: false, responseUpload: action.response
        }

      case ACTION_POST_API_UPLOAD_USER_AVATAR_FAILURE:
        return {
          ...state, isUploading: false, isUploadError: true, responseUpload: action.error
        }

      case ACTION_UPDATE_USER_LOCATION:
        return {
          ...state, userLocation: action.payload
        }

      case ACTION_SAVE_DEVICE_DETAIL:
        return {
          ...state, deviceDetail: action.payload
        }


      default:
        return state;
  }
};

export default reducerApp;