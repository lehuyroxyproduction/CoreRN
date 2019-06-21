import { Observable } from 'rxjs';
import { ACTION_FETCH_ACCESS_LOG_START } from '../actions/types';
import { URL_DEVICE_TEST, METHOD_POST, HEADER, METHOD_GET, URL_ACCESS_LOG } from "../../constants/webServices";
import { fetchAccessLogFail, fetchAccessLogSuccess } from '../actions/actionAccessLog';


const fetchAccessLog = (payload) => {
    const request = fetch(URL_ACCESS_LOG + payload.userId, {
        method: METHOD_GET,
        headers: HEADER,
        timeout: 500
    })
    .then((response) => {
        return response.json()
    });
    return request;
}

export const epicAccessLog = action$ =>
    action$
    .ofType(ACTION_FETCH_ACCESS_LOG_START)
    .switchMap(action => {
        return Observable.from(fetchAccessLog(action.payload))
        .map(response => {
            console.log(response);
            return fetchAccessLogSuccess(response);
        })
        .catch(error => {
            return Observable.of(fetchAccessLogFail({message: error}))
        })
    })