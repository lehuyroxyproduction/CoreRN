import { call, put, takeEvery } from 'redux-saga/effects'
import { 
    ACTION_GET_LISTUSER_START,
    ACTION_GET_LISTUSER_SUCCESS,
    ACTION_GET_LISTUSER_CANCEL,
    ACTION_GET_LISTUSER_ERROR
} from "../actions/types";
import {
   getApiListUserStart,
   getApiListUserSuccess,
   getApiListUserCancel,
   getApiListUserError
} from '../actions/actionListUser'
import {METHOD_GET,HEADER} from '../../constants/webServices'
// #region ============ SAGA =============

 const getListUser = (payload) => {
  const url = 'http://vps506502.ovh.net:4321/api/players?limit=15&page=1'
  const request = fetch(url,{
    method:METHOD_GET,
    headers: HEADER,
  })
  .then( response => response.json() )
  .catch( error => error )
  console.log(request)
  return request  
}
  
  export function* apiFetchListUser(action) {
      console.log("saga ", action)
    try {
      const response = yield call(getListUser);
        
      console.log(response)
      if(response !== undefined){
        yield put(getApiListUserSuccess(response))
      }
    } catch (e) {
      yield put(getApiListUserError( e.message || ''));
    }
  }
  
  // the 'watcher'
  export function* sagaFetchList() {
    yield takeEvery(ACTION_GET_LISTUSER_START, apiFetchListUser);
  }
  // #endregion