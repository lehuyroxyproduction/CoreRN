import { ACTION_GET_LIST_DEVICE_SUCCESS, ACTION_ADD_DEVICE_SUCCESS, ACTION_UPDATE_DEVICE_SUCCESS, ACTION_TOGGLE_USER_IN_DEVICE_SUCCESS, ACTION_SAVE_DEVICE_DETAIL, ACTION_REMOVE_DEVICE_SUCCESS, ACTION_REMOVE_DEVICE_RESET, ACTION_UPDATE_DEVICE_RESET } from '../actions/types';

const INITIAL_STATE = {
  listDevice: [],
  responseAddDevice: {
    success: false,
    msg: undefined,
  },
  responseUpdateDevice: {
    success: false,
    msg: undefined,
  },
  responseRemoveDevice: {
    success: false,
    msg: undefined,
  },
  responseToggleUserInDevice: {
    userId: undefined,
    deviceId: undefined,
    success: false,
    msg: undefined,
  }
};

const reducerDeviceManage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_GET_LIST_DEVICE_SUCCESS:
      return { ...state, listDevice: action.payload };
    case ACTION_ADD_DEVICE_SUCCESS:
      return { ...state, responseAddDevice: action.payload };

    case ACTION_UPDATE_DEVICE_SUCCESS:
      return { ...state, responseUpdateDevice: action.payload };
    case ACTION_UPDATE_DEVICE_RESET:
      return { ...state, responseUpdateDevice: { success: false, msg: undefined, } };

    case ACTION_REMOVE_DEVICE_SUCCESS:
      return { ...state, responseRemoveDevice: action.payload };
    case ACTION_REMOVE_DEVICE_RESET:
      return { ...state, responseRemoveDevice: { success: false, msg: undefined, } };
      
    case ACTION_TOGGLE_USER_IN_DEVICE_SUCCESS:
      return { ...state, responseToggleUserInDevice: action.payload };
    default:
      return state;
  }
};

export { reducerDeviceManage };
