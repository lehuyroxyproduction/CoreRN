import { Observable } from 'rxjs/Observable';
import { ACTION_REMOVE_USER_REQUEST, ACTION_REMOVE_DEVICE_REQUEST } from '../../actions/types';
import { HEADER, METHOD_POST, URL_SUB_REMOVE_DEVICE } from '../../../constants/webServices';
import { postRemoveDeviceError, postRemoveDeviceSuccess } from '../../actions/actionDeviceManage';

const postRemoveDevice = (payload) => {
  const { deviceId, domain, token } = payload;

  const url = domain + URL_SUB_REMOVE_DEVICE;
  const headers = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_POST,
    headers,
    body: JSON.stringify({
      _id: deviceId,
    }),
  })
    .then(response => response.json());
  return request;
};

const epicRemoveDevice = action$ => action$
  .ofType(ACTION_REMOVE_DEVICE_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(postRemoveDevice(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "success": true,
            "msg": "User registered"
        } */
        return postRemoveDeviceSuccess(response);
      }
      /* response: {
          "success": false,
          "msg": "Username already added"
      } */
      return postRemoveDeviceError(response.success === false ? response.msg : response);
    })
    .catch(
      () => Observable.of(postRemoveDeviceError('Connection Error.')),
    ));

export default epicRemoveDevice;
