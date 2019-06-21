import { Observable } from 'rxjs/Observable';
import { ACTION_UPDATE_DEVICE_REQUEST } from '../../actions/types';
import { HEADER, METHOD_POST, URL_SUB_UPDATE_DEVICE, METHOD_PUT } from '../../../constants/webServices';
import { postUpdateDeviceSuccess, postUpdateDeviceError } from '../../actions/actionDeviceManage';

const postUpdateDevice = (payload) => {
  const { domain, token, deviceId, mac, chipSerial, isActive, clockID, clockStatus, 
    clockDescription, doorID, doorStatus, doorDescription } = payload;

  const url = domain + URL_SUB_UPDATE_DEVICE;
  const headers = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_PUT,
    headers,
    body: JSON.stringify({
      _id: deviceId,
      Mac: mac,
      ChipSerial: chipSerial,
      IsActive: isActive,
      ClockID: clockID,
      ClockStatus: clockStatus,
      ClockDescription: clockDescription,
      DoorID: doorID,
      DoorStatus: doorStatus,
      DoorDescription: doorDescription
    }),
  })
    .then((response) => {
      return response.json();
    });
  return request;
};

const epicUpdateDevice = action$ => action$
  .ofType(ACTION_UPDATE_DEVICE_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(postUpdateDevice(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "success": true,
            "msg": "Device registered"
        } */
        return postUpdateDeviceSuccess(response);
      }
      /* response: {
          "success": false,
          "msg": "Devicename already added"
      } */
      return postUpdateDeviceError(`Server Error: ${response.success === false ? response.msg : response.stringify()}`);
    })
    .catch(
      () => {
        return Observable.of(postUpdateDeviceError('Connection Error.'));
      },
    ));

export default epicUpdateDevice;
