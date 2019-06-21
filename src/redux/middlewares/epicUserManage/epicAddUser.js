import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import { ACTION_GET_LIST_USER_REQUEST, ACTION_ADD_USER_REQUEST } from '../../actions/types';
import { METHOD_GET, URL_SUB_GET_USERS, HEADER, URL_SUB_ADD_USER, METHOD_POST } from '../../../constants/webServices';
import { getListUserSuccess, getListUserError, postAddUserSuccess, postAddUserError } from '../../actions/actionUserManage';

const postAddUser = (payload) => {
  const { username, password, isAdmin, RFID, domain, token, } = payload;

  const url = domain + URL_SUB_ADD_USER;

  const request = fetch(url, {
    method: METHOD_POST,
    headers: HEADER,
    body: JSON.stringify({
      username,
      password,
      isAdmin,
      RfidUID: RFID || '00:000:000:00:0:0:0:0:0:0'
    }),
  })
    .then(response => response.json());
  return request;
};

const epicAddUser = action$ => action$
  .ofType(ACTION_ADD_USER_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(postAddUser(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "success": true,
            "msg": "User registered"
        } */
        return postAddUserSuccess(response);
      }
      /* response: {
          "success": false,
          "msg": "Username already added"
      } */
      return postAddUserError(response.success === false ? response.msg : response);
    })
    .catch(
      error => Observable.of(postAddUserError('Connection Error.')),
    ));

export default epicAddUser;
