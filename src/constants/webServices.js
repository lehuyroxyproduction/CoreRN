export const HEADER = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
// export const AUTHENTICATE = {};
export const HEADER_MULTIPART = { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data;' }

export const METHOD_POST = 'POST';
export const METHOD_GET = 'GET';
export const METHOD_PUT = 'PUT';

// export const URL_DOMAIN = 'http://192.168.1.202:8000/';
export const URL_DOMAIN = 'http://qr.adquestasia.com/';

export const URL_SIGN_IN = URL_DOMAIN + 'users/authenticate';
export const URL_FORGOT_PASSWORD = URL_DOMAIN + 'users/resetpasswd';
export const URL_SIGN_UP = URL_DOMAIN + 'signup';
export const URL_GET_USER = URL_DOMAIN + 'accesslog/get';
export const URL_UPDATE_USER_AVATAR = URL_DOMAIN + 'signup/upload_avatars';
export const URL_UPDATE_USER = URL_DOMAIN + 'signup/update';
export const URL_CLOCK_IN = URL_DOMAIN + 'accesslog/post';
export const URL_GENERATE_QR = URL_DOMAIN + 'qrlogin/';

// #region Access Log
export const SERVER_STATUS = { SUCCESS: 1, ERROR: 0 };
export const RESPONSE_STATUS = { LOADING: 'LOADING', SUCCESS: 'SUCCESS', SERVER_ERROR: 'SERVER_ERROR', UNEXPECTED_ERROR: 'UNEXPECTED_ERROR', };
export const URL_ACCESS_LOG = URL_DOMAIN + 'accesslog/';
// #endregion

// #region sub api (unfix domain)
export const URL_SUB_SIGN_IN = 'users/authenticate';
export const URL_SUB_CHANGE_PASS = 'users/changepasswd';

export const URL_SUB_CHECK_QR = 'devices/CheckQRCode/';
// #endregion

// #region USER MANAGE
export const URL_SUB_GET_USERS = 'users/listuser';
export const URL_SUB_ADD_USER = 'users/register';
export const URL_SUB_UPDATE_USER = 'users/updateprofile';
export const URL_SUB_REMOVE_USER = 'users/removeuser';
// #endregion

// #region DEVICE MANAGE
export const URL_SUB_GET_DEVICE = 'devices/listdevice';
export const URL_SUB_ADD_DEVICE = 'devices/addDevice';
export const URL_SUB_UPDATE_DEVICE = 'devices/updateDevice';
export const URL_SUB_REMOVE_DEVICE = 'devices/removedevice';
export const URL_SUB_ADD_USER_IN_DEVICE = 'devices/updateUserIdOnDevice';
export const URL_SUB_REMOVE_USER_IN_DEVICE = 'devices/removeUserIdOnDevice';
// #endregion


//#region Kenny
export const HEADERFORGOTPASS =  { 'Accept': 'application/json', 'Content-Type': 'application/json',  Authorization: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbkF0dGVtcHRzIjowLCJfaWQiOiI1YjkwZjFlZWUxNGFhZDA1NzAzMmM3NjYiLCJ1c2VybmFtZSI6ImFkbWluQGFkcXVlc3Rhc2lhLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDkuWDllUzBSc1FIVTNicWVsTzdLWWVRS0VvdUQ2c01WWjRFNjIxLzZVUnF4b0VLVkN2VC9TIiwiSXNBZG1pbiI6dHJ1ZSwiUmZpZFVJRCI6IjA6MDowOjA6MDowOjA6MDowOjAiLCJfX3YiOjAsImlhdCI6MTU0MTk5NzEzNiwiZXhwIjoxNTczNTMzMTM2fQ.IGmQ-Sl0CGsB82GLBlCquU9nDTyBqA_dvXDBUCZTOaI"};
export const HEADER_LOGS=  { 'Content-Type': 'application/json',  Authorization: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbkF0dGVtcHRzIjowLCJfaWQiOiI1YjkwZjFlZWUxNGFhZDA1NzAzMmM3NjYiLCJ1c2VybmFtZSI6ImFkbWluQGFkcXVlc3Rhc2lhLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDkuWDllUzBSc1FIVTNicWVsTzdLWWVRS0VvdUQ2c01WWjRFNjIxLzZVUnF4b0VLVkN2VC9TIiwiSXNBZG1pbiI6dHJ1ZSwiUmZpZFVJRCI6IjA6MDowOjA6MDowOjA6MDowOjAiLCJfX3YiOjAsImlhdCI6MTU0MTk5NzEzNiwiZXhwIjoxNTczNTMzMTM2fQ.IGmQ-Sl0CGsB82GLBlCquU9nDTyBqA_dvXDBUCZTOaI"};
export const URL_LOGS_DOOR = `${URL_DOMAIN}doorlogs/tracelog`;
export const URL_LOGS_LOGIN = `${URL_DOMAIN}loginlogs/tracelog`;
export const URL_FILTER_DOOR = `${URL_DOMAIN}doorlogs/tracelogbydate`;
export const URL_FILTER_LOGIN = `${URL_DOMAIN}loginlogs/tracelogbydate`;
//#endregion