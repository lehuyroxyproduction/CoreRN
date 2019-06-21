import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, takeUntil, race } from 'rxjs/operators';
import { RxConstants } from '../../config/config.js';
import { 
    ACTION_GET_API_USER_START,
    ACTION_GET_API_USER_CANCEL,
    ACTION_GET_API_USER_SUCCESS,
    ACTION_GET_API_USER_FAILURE,
    ACTION_POST_API_UPDATE_USER_START,
    ACTION_POST_API_UPDATE_USER_CANCEL,
    ACTION_POST_API_UPDATE_USER_SUCCESS,
    ACTION_POST_API_UPDATE_USER_FAILURE,
    ACTION_POST_API_UPLOAD_USER_AVATAR_START,
    ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL,
    ACTION_POST_API_UPLOAD_USER_AVATAR_SUCCESS,
    ACTION_POST_API_UPLOAD_USER_AVATAR_FAILURE,
} from '../actions/types.js';
import { 
    HEADER, 
    HEADER_MULTIPART,
    METHOD_GET,
    METHOD_POST, 
    URL_GET_USER,
    URL_UPDATE_USER, 
    URL_UPDATE_USER_AVATAR 
} from '../../constants/webServices.js';
import { 
    getAPIUserStart,
    getAPIUserCancel,
    getAPIUserSuccess,
    getAPIUserError,
    postAPIUpdateUserStart, 
    postAPIUpdateUserCancel, 
    postAPIUpdateUserSuccess, 
    postAPIUpdateUserError,
    postAPIUploadUserAvatarStart,
    postAPIUploadUserAvatarCancel,
    postAPIUploadUserAvatarSuccess,
    postAPIUploadUserAvatarError,
} from '../actions/actionApp.js';

// #region Epic
export const epicGetUser = action$ =>
    action$
    .ofType(ACTION_GET_API_USER_START)
    // .debounceTime(RxConstants.debounceTime)
    .switchMap(action =>
        getUser(action.payload)
        .map(response => {
            // console.log(response);
            if (response.userData) {
                return getAPIUserSuccess(response.userData);
            }
            else {
                return getAPIUserError(response.error);
            }
        })
        .catch(error => {
            // console.log(error);
            return Observable.of(getAPIUserError({text: 'Bad Request'}))
        })
        // .takeUntil(action$.ofType(ACTION_GET_API_USER_CANCEL))
        .race(
            action$.ofType(ACTION_GET_API_USER_CANCEL)
            .map(() => getAPIUserCancel())
            .first()
        )
    );

export const epicUpdateUser = action$ =>
    action$
    .ofType(ACTION_POST_API_UPDATE_USER_START)
    // .debounceTime(RxConstants.debounceTime)
    .switchMap(action =>
        postUpdateUser(action.payload)
        .map(response => {
            // console.log(response);
            if (response.userData) {
                return postAPIUpdateUserSuccess(response.userData);
            }
            else {
                return postAPIUpdateUserError(response.error);
            }
        })
        .catch(error => {
            // console.log(error);
            return Observable.of(postAPIUpdateUserError({text: 'Bad Request'}))
        })
        // .takeUntil(action$.ofType(ACTION_POST_API_UPDATE_USER_CANCEL))
        .race(
            action$.ofType(ACTION_POST_API_UPDATE_USER_CANCEL)
            .map(() => postAPIUpdateUserCancel())
            .first()
        )
    );

export const epicUploadUserAvatar = action$ =>
    action$
    .ofType(ACTION_POST_API_UPLOAD_USER_AVATAR_START)
    // .debounceTime(RxConstants.debounceTime)
    .switchMap(action =>
        postUploadUserAvatar(action.payload)
        .map(response => {
            if (response.userData) {
                return postAPIUploadUserAvatarSuccess(response.userData);
            }
            else {
                return postAPIUploadUserAvatarError(response.error);
            }
        })
        .catch(error => {
            // console.log(error);
            return Observable.of(postAPIUploadUserAvatarError({text: 'Bad Request'}))
        })
        // .takeUntil(action$.ofType(ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL))
        .race(
            action$.ofType(ACTION_POST_API_UPLOAD_USER_AVATAR_CANCEL)
            .map(() => postAPIUploadUserAvatarCancel())
            .first()
        )
);
// #endregion

// #region Methods
const getUser = (payload) => {
    const url = `${URL_GET_USER}/${payload.id}`;
    // console.log(url);
    const request = fetch(url, {
        method: METHOD_GET,
        headers: HEADER,
    })
    .then(response => response.json());
    return Observable.from(request);
}

const postUpdateUser = (payload) => {
    const request = fetch(URL_UPDATE_USER, {
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

postUploadUserAvatar = (payload) => {
    const postData = new FormData();
    postData.append('id', payload.id);
    postData.append('data', {
        uri: payload.source.path,
        type: payload.source.mime,
        name: payload.id,
    })
    // console.log(postData);
    const request = fetch(URL_UPDATE_USER_AVATAR, {
        method: METHOD_POST,
        headers: HEADER_MULTIPART,
        body: postData
    })
    .then(response => response.json());
    return Observable.from(request);
}
// #endregion