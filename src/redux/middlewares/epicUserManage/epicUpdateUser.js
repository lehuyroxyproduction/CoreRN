import { Observable } from 'rxjs/Observable';
import { ACTION_UPDATE_USER_REQUEST } from '../../actions/types';
import { HEADER, URL_SUB_ADD_USER, METHOD_PUT, URL_SUB_UPDATE_USER } from '../../../constants/webServices';
import { postUpdateUserSuccess, postUpdateUserError } from '../../actions/actionUserManage';

const postUpdateUser = (payload) => {
  const { username, IsAdmin, RFID, domain, token, } = payload;

  const url = domain + URL_SUB_UPDATE_USER;
  const headers = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_PUT,
    headers,
    body: JSON.stringify({
      username,
      isAdmin: IsAdmin,
      RfidUID: RFID || '00:000:000:00:0:0:0:0:0:0'
    }),
  })
    .then(response => response.json());
  return request;
};

const epicUpdateUser = action$ => action$
  .ofType(ACTION_UPDATE_USER_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(postUpdateUser(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "success": true,
            "msg": "Successful to update"
        } */
        return postUpdateUserSuccess(response);
      }
      /* response: {
          "success": false,
          "msg": "Permission require"
      } */
      return postUpdateUserError(response.success === false ? response.msg : response);
    })
    .catch(
      () => Observable.of(postUpdateUserError('Connection Error.')),
    ));

export default epicUpdateUser;
