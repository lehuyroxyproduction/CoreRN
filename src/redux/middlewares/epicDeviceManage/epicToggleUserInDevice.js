import { Observable } from 'rxjs/Observable';
import { ACTION_TOGGLE_USER_IN_DEVICE_REQUEST } from '../../actions/types';
import { HEADER, URL_SUB_ADD_USER_IN_DEVICE, URL_SUB_REMOVE_USER_IN_DEVICE, METHOD_PUT } from '../../../constants/webServices';
import { toggleUserInDeviceSuccess, toggleUserInDeviceError } from '../../actions/actionDeviceManage';

const toggleUserInDevice = (payload) => {
  const { token, domain, deviceId, selected, userId } = payload;
  const headers = { ...HEADER, Authorization: token };

  if (selected === true) {
    // ===== Add User in Device =======
    const url = domain + URL_SUB_ADD_USER_IN_DEVICE;
    const request = fetch(url, {
      method: METHOD_PUT,
      headers,
      body: JSON.stringify({
        userID: userId,
        deviceID: deviceId
      }),
    })
      .then((response) => {
        return response.json();
      });
    return request;
  }

  // ======= Remove User in Device =======
  const url = domain + URL_SUB_REMOVE_USER_IN_DEVICE;
  const request = fetch(url, {
    method: METHOD_PUT,
    headers,
    body: JSON.stringify({
      userID: userId,
      deviceID: deviceId
    }),
  })
    .then(response => response.json());
  return request;
};

const epicToggleUserInDevice = action$ => action$
  .ofType(ACTION_TOGGLE_USER_IN_DEVICE_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(toggleUserInDevice(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "Success": true,
            "msg": "Update successfully"
          } */
        const { deviceId, userId, selected } = action.payload;
        return toggleUserInDeviceSuccess({ ...response, selected, deviceId, userId });
      }
      /* response: {     
        "Success": false,
        "msg": "Update fail"
      } */
      return toggleUserInDeviceError(`Server Error: ${response.success === false ? response.msg : response.stringify()}`);
    })
    .catch(
      () => {
        return Observable.of(toggleUserInDeviceError('Connection Error.'));
      },
    ));

export default epicToggleUserInDevice;
