import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, takeUntil, race } from 'rxjs/operators';
import { RxConstants } from '../../config/config.js';
import { 
    ACTION_POST_API_FORGOT_PASSWORD_START,
    ACTION_POST_API_FORGOT_PASSWORD_CANCEL,
    ACTION_POST_API_FORGOT_PASSWORD_SUCCESS,
    ACTION_POST_API_FORGOT_PASSWORD_FAILURE
} from '../actions/types.js';
import { HEADERFORGOTPASS, METHOD_PUT, URL_FORGOT_PASSWORD , AUTHENTICATE } from '../../constants/webServices.js';
import { postAPIForgotPasswordStart, postAPIForgotPasswordCancel, postAPIForgotPasswordSuccess, postAPIForgotPasswordError } from '../actions/actionForgotPassword.js';

// #region Epic
export const epicForgotPassword = action$ =>
  action$
  .ofType(ACTION_POST_API_FORGOT_PASSWORD_START)
  .debounceTime(RxConstants.debounceTime)
  .switchMap(action =>
      postForgotPassword(action.payload)
      .map(response => {
          if (!response.userData) {
            
              return postAPIForgotPasswordSuccess(response.msg);
          }
          else {
               
              return postAPIForgotPasswordError(response.error);
          }
      })
      .catch(error => {
          // console.log(error);
          return Observable.of(postAPIForgotPasswordError('Connection Error'));
      })
      // .takeUntil(action$.ofType(ACTION_POST_API_FORGOT_PASSWORD_CANCEL))
      .race(
          action$.ofType(ACTION_POST_API_FORGOT_PASSWORD_CANCEL)
          .map(() => postAPIForgotPasswordCancel())
          .first()
      )
  );
// #endregion

// #region Methods
const postForgotPassword = (payload) => {
    // const header = {...HEADERFORGOTPASS,  AUTHENTICATE};
    console.log(URL_FORGOT_PASSWORD);
    console.log(HEADERFORGOTPASS);
    console.log(payload.email);
  const request = fetch(URL_FORGOT_PASSWORD, {
    method: METHOD_PUT,
    headers: HEADERFORGOTPASS,
    body: JSON.stringify({
        username: payload.email,
    }),
  })
    .then(response => response.json());
  return Observable.from(request);
};
// #endregion