import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, takeUntil, race } from 'rxjs/operators';
import { RxConstants } from '../../config/config.js';
import { 
    ACTION_POST_API_SIGNIN_START,
    ACTION_POST_API_SIGNIN_CANCEL,
    ACTION_POST_API_SIGNIN_SUCCESS,
    ACTION_POST_API_SIGNIN_FAILURE
} from '../actions/types.js';
import { HEADER, METHOD_POST, URL_SUB_SIGN_IN } from '../../constants/webServices.js';
import { postAPISignInStart, postAPISignInCancel, postAPISignInSuccess, postAPISignInError } from '../actions/actionSignIn.js';

// #region Epic
export const epicSignIn = action$ =>
  action$
  .ofType(ACTION_POST_API_SIGNIN_START)
  //.debounceTime(RxConstants.debounceTime)
  .switchMap(action =>
      postSignIn(action.payload)
      .map(response => {
          if (response.success == true) {
              /*response: {
                  "success": true,
                  "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhlMDBjNmJiYzY3NzBjNDUwODllM2QiLCJ1c2VybmFtZSI6ImtlbHZpbiIsInBhc3N3b3JkIjoiJDJhJDEwJDZzTHdQaHNKdlp3WEd1YnlRRWRWUC5BUjR1c1NMTmdLcm1IbFVnVVl6N2JCczRoUFJKMXFHIiwiSXNBZG1pbiI6dHJ1ZSwiUmZpZFVJRCI6Ijg3OjE2ODoxODA6MTI6MDowOjA6MDowOjAiLCJfX3YiOjAsImlhdCI6MTUzNjAzMzcwOCwiZXhwIjoxNTM2MDM0MzEyfQ.E77q4iTCgcV_er62gBvDx6H3WiJZQNM0zee5QEf4tCk",
                  "user": {
                      "id": "5b8e00c6bbc6770c45089e3d",
                      "username": "kelvin",
                      "IsAdmin": true,
                      "RfidUID": "87:168:180:12:0:0:0:0:0:0"
                  }
              } */
              return postAPISignInSuccess({...response.user, token: response.token});
          }
          else if (response.msg) {
              return postAPISignInError(response.msg);
          } 

          return postAPISignInError('Connection Error');
      })
      .catch(error => {
        return Observable.of(postAPISignInError('Connection Error'));
      })
      // .takeUntil(action$.ofType(ACTION_POST_API_SIGNIN_CANCEL))
      .race(
          action$.ofType(ACTION_POST_API_SIGNIN_CANCEL)
          .map(() => postAPISignInCancel())
          .first()
      )
  );
// #endregion

// #region Methods
const postSignIn = (payload) => {
  const url = payload.domain + URL_SUB_SIGN_IN;
  const request = fetch(url, {
    method: METHOD_POST,
    headers: HEADER,
    body: JSON.stringify({
      username: payload.email || '',
      password: payload.password || '',
    }),
  })
    .then(response => response.json());
  return Observable.from(request);
};
// #endregion