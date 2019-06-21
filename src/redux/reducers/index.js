import { combineReducers } from 'redux';
import { loadingReducer, errorReducer } from '../../helpers/HelperRedux';
import reducerApp from './reducerApp';
import reducerSignIn from './reducerSignIn';
import reducerForgotPassword from './reducerForgotPassword';
import reducerSignUp from './reducerSignUp';
import reducerScanQR from './reducerScanQR';
import reducerAccessLog from './reducerAccessLog';
import reducerChangePass from './reducerChangePass';
import { reducerUserManage } from './reducerUserManage';
import { reducerDeviceManage } from './reducerDeviceManage';
import reducerLogs from './reducerLogs';
// import reducerFilterLogs from './reducerFilterLogs'

export default combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  Logs:reducerLogs,
  app: reducerApp,
  signIn: reducerSignIn,
  forgotPassword: reducerForgotPassword,
  signUp: reducerSignUp,
  scanQR: reducerScanQR,
  accessLog: reducerAccessLog,
  changePass: reducerChangePass,
  userManage: reducerUserManage,
  deviceManage: reducerDeviceManage,
  // FilterLogs : reducerFilterLogs
});
