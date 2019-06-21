import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import { ACTION_GET_LIST_USER_REQUEST } from '../../actions/types';
import { METHOD_GET, URL_SUB_GET_USERS, HEADER } from '../../../constants/webServices';
import { getListUserSuccess, getListUserError } from '../../actions/actionUserManage';

const getListUser = (payload) => {
  const { domain, token, } = payload;

  const url = domain + URL_SUB_GET_USERS;
  const header = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_GET,
    headers: header,
  })
    .then(response => response.json());

  /* const request = axios({
    method: METHOD_GET,
    header,
    url,
  })
    .then(response => response.json()); */
  return request;
};

const epicGetListUser = action$ => action$
  .ofType(ACTION_GET_LIST_USER_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(getListUser(action.payload))
    .map((response) => {
      if (Array.isArray(response)) {
        /* response: [
            {
                "_id": "5b8e0698801afc26583e1752",
                "username": "kelvin",
                "password": "$2a$10$lr5wfWjM5kjsV9WK0zVVROGLuWE5E0PEuxrhSHt7pPyWb750GxO/G",
                "IsAdmin": true,
                "RfidUID": "87:168:180:12:0:0:0:0:0:0",
                "__v": 0
            }
        ] */
        return getListUserSuccess(response);
      }
      return getListUserError(response);
    })
    .catch(
      error => Observable.of(getListUserError('Connection Error.'))
    ));

export default epicGetListUser;
