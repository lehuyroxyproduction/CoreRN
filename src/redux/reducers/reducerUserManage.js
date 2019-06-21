import { ACTION_GET_LIST_USER_SUCCESS, ACTION_ADD_USER, ACTION_ADD_USER_SUCCESS, ACTION_UPDATE_USER_SUCCESS, ACTION_REMOVE_USER_SUCCESS, ACTION_REMOVE_USER_RESET, ACTION_UPDATE_USER_RESET } from '../actions/types';

const INITIAL_STATE = {
  listUser: [],
  responseAddUser: {
    success: false,
    msg: undefined,
  },
  responseUpdateUser: {
    success: false,
    msg: undefined,
  },
  responseRemoveUser: {
    success: false,
    msg: undefined,
  },
};

const reducerUserManage = (state = INITIAL_STATE, action) => {
  
  switch (action.type) {
    case ACTION_GET_LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };

    case ACTION_ADD_USER_SUCCESS:
      return { ...state, responseAddUser: action.payload };

    case ACTION_UPDATE_USER_SUCCESS:
      return { ...state, responseUpdateUser: action.payload };
    case ACTION_UPDATE_USER_RESET:
      return { ...state, responseUpdateUser: { success: false, msg: undefined, } };

    case ACTION_REMOVE_USER_SUCCESS:
      return { ...state, responseRemoveUser: action.payload };
    case ACTION_REMOVE_USER_RESET:
      return { ...state, responseRemoveUser: { success: false, msg: undefined, } };

    default:
      return state;
  }
};

export { reducerUserManage };
