import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, takeUntil, race } from 'rxjs/operators';
import { RxConstants } from '../../config/config.js';
import { 
    ACTION_POST_API_CLOCKIN_START,
    ACTION_POST_API_CLOCKIN_CANCEL,
    ACTION_POST_API_CLOCKIN_SUCCESS,
    ACTION_POST_API_CLOCKIN_FAILURE
} from '../actions/types.js';
import { HEADER, METHOD_POST, METHOD_PUT, URL_CLOCK_IN, URL_SUB_CHECK_QR } from '../../constants/webServices.js';
import { postAPIClockInStart, postAPIClockInCancel, postAPIClockInSuccess, postAPIClockInError } from '../actions/actionScanQR';

// #region Epic
export const epicClockIn = action$ =>
    action$
    .ofType(ACTION_POST_API_CLOCKIN_START)
    .debounceTime(RxConstants.debounceTime)
    .switchMap(action =>
        postClockIn(action.payload)
        .map(response => {
            if (response.success) {
                return postAPIClockInSuccess(response.msg);
            }
            else {
                return postAPIClockInError(response.msg);
            }
        })
        .catch(error => {
            return Observable.of(postAPIClockInError(error))
        })
        // .takeUntil(action$.ofType(ACTION_POST_API_CLOCKIN_CANCEL))
        .race(
            action$.ofType(ACTION_POST_API_CLOCKIN_CANCEL)
            .map(() => postAPIClockInCancel())
            .first()
        )
    );
// #endregion

// #region Methods
const postClockIn = (payload) => {
    const { serial, domain, token } = payload;

    const url = domain + URL_SUB_CHECK_QR;
    const header = {...HEADER, Authorization: token};
    const request = fetch(url, {
        method: METHOD_POST,
        headers: header,
        timeout: 500,
        body: JSON.stringify({
            qrCheck: serial
        })
    })
    .then(response => {
        return response.json();
    });
    return Observable.from(request);
}
// #endregion