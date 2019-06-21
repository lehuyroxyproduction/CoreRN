import { Observable } from 'rxjs/Observable';
import { ACTION_ADD_DEVICE_REQUEST } from '../../actions/types';
import { HEADER, URL_SUB_ADD_DEVICE, METHOD_POST } from '../../../constants/webServices';
import { postAddDeviceSuccess, postAddDeviceError } from '../../actions/actionDeviceManage';
import { IsJsonString } from '../../../helpers/helperString';

const postAddDevice = (payload) => {
  const { domain, token, mac, chipSerial, isActive, QRString, clockID, clockStatus, 
    clockDescription, doorID, doorStatus, doorDescription } = payload;

  const url = domain + URL_SUB_ADD_DEVICE;
  const headers = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_POST,
    headers,
    body: JSON.stringify({
      Mac: mac,
      ChipSerial: chipSerial,
      IsActive: isActive,
      QRString,
      ClockID: clockID,
      ClockStatus: clockStatus,
      ClockDescription: clockDescription,
      DoorID: doorID,
      DoorStatus: doorStatus,
      DoorDescription: doorDescription
    }),
  })
    .then(response => response.json());
  return request;
};

const epicAddDevice = action$ => action$
  .ofType(ACTION_ADD_DEVICE_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(postAddDevice(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "success": true,
            "msg": "Device registered"
        } */
        return postAddDeviceSuccess(response);
      }
      /* response: {
          "success": false,
          "msg": "Devicename already added"
      } */
      return postAddDeviceError(`Server Error: ${response.success === false ? response.msg : response.stringify()}`);
    })
    .catch(
      (error) => {
        return Observable.of(postAddDeviceError('Connection Error.'));
      },
    ));

export default epicAddDevice;
