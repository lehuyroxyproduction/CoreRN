import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import { ACTION_GET_LIST_USER_REQUEST, ACTION_GET_LIST_DEVICE_REQUEST } from '../../actions/types';
import { METHOD_GET, URL_SUB_GET_USERS, HEADER, URL_SUB_GET_DEVICE } from '../../../constants/webServices';
import { getListDeviceSuccess, getListDeviceError } from '../../actions/actionDeviceManage';

const getListDevice = (payload) => {
  const { domain, token, } = payload;

  const url = domain + URL_SUB_GET_DEVICE;
  const header = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_GET,
    headers: header,
  })
    .then(response => response.json());
  return request;
};

const epicGetListDevice = action$ => action$
  .ofType(ACTION_GET_LIST_DEVICE_REQUEST)
  // .debounceTime(500) // Delay
  .switchMap(action => Observable.from(getListDevice(action.payload))
    .map((response) => {
      if (Array.isArray(response)) {
        /* response: [
          {
            "UserID": [
              "5b90e087e14aad057032c752",
              "5b90e0e9e14aad057032c753",
            ],
            "_id": "5b90f209e14aad057032c767",
            "Mac": "60:01:94:49:A6:7D",
            "ChipSerial": "4826749",
            "IsActive": true,
            "ClockID": 1,
            "ClockStatus": false,
            "ClockDescription": "",
            "DoorID": 1,
            "DoorStatus": false,
            "DoorDescription": "",
            "QRString": "60:01:94:49:A6:7DqdOvEPZ2ps",
            "__v": 0
          }
        ] */
        return getListDeviceSuccess(response);
      }
      return getListDeviceError(response);
    })
    .catch(
      error => Observable.of(getListDeviceError('Connection Error.'))
    ));

export default epicGetListDevice;
