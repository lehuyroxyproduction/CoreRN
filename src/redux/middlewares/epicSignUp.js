import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, takeUntil, race } from 'rxjs/operators';
import { RxConstants } from '../../config/config.js';
import { 
    ACTION_POST_API_SIGNUP_START,
    ACTION_POST_API_SIGNUP_CANCEL,
    ACTION_POST_API_SIGNUP_SUCCESS,
    ACTION_POST_API_SIGNUP_FAILURE
} from '../actions/types.js';
import { HEADER, METHOD_POST, URL_SIGN_UP } from '../../constants/webServices.js';
import { postAPISignUpStart, postAPISignUpCancel, postAPISignUpSuccess, postAPISignUpError } from '../actions/actionSignUp.js';

// #region Epic
export const epicSignUp = action$ =>
    action$
    .ofType(ACTION_POST_API_SIGNUP_START)
    // .debounceTime(RxConstants.debounceTime)
    .switchMap(action =>
        postSignUp(action.payload)
        .map(response => {
            if (response.userData) {
                return postAPISignUpSuccess(response.userData);
            }
            else {
                return postAPISignUpError(response.error);
            }
        })
        .catch(error => {
            // console.log(error);
            return Observable.of(postAPISignUpError({text: 'Bad Request'}))
        })
        // .takeUntil(action$.ofType(ACTION_POST_API_SIGNUP_CANCEL))
        .race(
            action$.ofType(ACTION_POST_API_SIGNUP_CANCEL)
            .map(() => postAPISignUpCancel())
            .first()
        )
    );
// #endregion

// #region Methods
const postSignUp = (payload) => {
    const request = fetch(URL_SIGN_UP, {
        method: METHOD_POST,
        headers: HEADER,
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            user_name: payload.name,
            phone_number: payload.phonenumber,
        })
    })
    .then(response => response.json());
    return Observable.from(request);
}
// #endregion