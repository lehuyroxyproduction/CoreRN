import { combineReducers } from 'redux'
import { loadingReducer, errorReducer } from '../../helpers/HelperRedux'
import reducerApp from 'redux/reducers/reducerAppucerApp'
// import reducerSignIn from './reducerSignIn'
// import reducerForgotPassword from './reducerForgotPassword'
// import reducerSignUp from './reducerSignUp'
// import reducerChangePass from './reducerChangePass'
// import reducerFilterLogs from './reducerFilterLogs'

export default combineReducers({
  app: reducerApp,
  // signIn: reducerSignIn,
  // forgotPassword: reducerForgotPassword,
  // signUp: reducerSignUp,
  // changePass: reducerChangePass
});
