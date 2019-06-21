import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import {
  debounceTime, switchMap, map, takeUntil, race,
} from 'rxjs/operators';
import { RxConstants } from '../../config/config';
import {
  ACTION_POST_CHANGE_PASS_START,
  ACTION_POST_CHANGE_PASS_CANCEL
} from '../actions/types';
import {
  HEADER, METHOD_POST, URL_SUB_SIGN_IN, URL_SUB_CHANGE_PASS, METHOD_PUT,
} from '../../constants/webServices';
import { postChangePassSuccess, postChangePassError, postChangePassCancel } from '../actions/actionChangePassword';

// #region Epic
const epicChangePass = action$ => action$
  .ofType(ACTION_POST_CHANGE_PASS_START)
  // .debounceTime(RxConstants.debounceTime)
  .switchMap(action => Observable.from(postChangePass(action.payload))
    .map((response) => {
      if (response.success === true) {
        /* response: {
            "success": true,
            "msg": "Password has been change"
        } */
        return postChangePassSuccess(response.msg);
      }
      /* response: {
          "success": false,
          "msg": "User not found"
      } */
      return postChangePassError(response.success === false ? response.msg : response);
    })
    .catch((error) => {
      return Observable.of(postChangePassError('Connection Error.'));
    })
    .race(
      action$.ofType(ACTION_POST_CHANGE_PASS_CANCEL)
        .map(() => postChangePassCancel())
        .first()
    ));
// #endregion

// #region Methods
const postChangePass = (payload) => {
  const {
    domain, oldPass, newPass, token,
  } = payload;

  const url = domain + URL_SUB_CHANGE_PASS;
  const header = { ...HEADER, Authorization: token };

  const request = fetch(url, {
    method: METHOD_PUT,
    headers: header,
    body: JSON.stringify({
      oldpassword: oldPass,
      newpassword: newPass,
    }),
  })
    .then(response => response.json());
  return request;
};
// #endregion

export default epicChangePass;
