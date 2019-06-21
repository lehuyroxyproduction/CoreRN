import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import { ACTION_GET_LIST_USER_REQUEST, ACTION_ADD_USER_REQUEST, ACTION_REMOVE_USER_REQUEST } from '../../actions/types';
import { METHOD_GET, URL_SUB_GET_USERS, HEADER, URL_SUB_ADD_USER, METHOD_POST, URL_SUB_REMOVE_USER } from '../../../constants/webServices';
import { getListUserSuccess, getListUserError, postAddUserSuccess, postAddUserError, postRemoveUserSuccess, postRemoveUserError } from '../../actions/actionUserManage';

const postRemoveUser = (payload) => {
  const { userId, domain, token } = payload;

  const url = domain + URL_SUB_REMOVE_USER;
  const headers = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_POST,
    headers,
    body: JSON.stringify({
      _id: userId,
    }),
  })
    .then(response => response.json());
  return request;
};

const epicRemoveUser = action$ => action$
  .ofType(ACTION_REMOVE_USER_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(postRemoveUser(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "success": true,
            "msg": "User registered"
        } */
        return postRemoveUserSuccess(response);
      }
      /* response: {
          "success": false,
          "msg": "Username already added"
      } */
      return postRemoveUserError(response.success === false ? response.msg : response);
    })
    .catch(
      error => Observable.of(postRemoveUserError('Connection Error.')),
    ));

export default epicRemoveUser;
