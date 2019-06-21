import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { epicGetUser, epicUploadUserAvatar } from './epicApp';
import { epicSignIn } from './epicSignIn';
import { epicForgotPassword } from './epicForgotPassword';
import { epicSignUp } from './epicSignUp';
import { epicClockIn } from './epicScanQR';
import { epicAccessLog } from './epicAccessLog';
import epicChangePass from './epicChangePass';
import { epicGetListUser, epicAddUser, epicUpdateUser, epicRemoveUser } from './epicUserManage';
import { epicGetListDevice, epicAddDevice, epicToggleUserInDevice, epicUpdateDevice, epicRemoveDevice } from './epicDeviceManage';


const epics = combineEpics(
  epicSignIn,
  epicForgotPassword,
  epicSignUp,
  epicGetUser,
  epicUploadUserAvatar,
  epicClockIn,
  epicAccessLog,
  epicChangePass,


  // USER MANAGER
  epicGetListUser,
  epicAddUser,
  epicUpdateUser,
  epicRemoveUser,

  // DEVICE MANAGE
  epicGetListDevice,
  epicAddDevice,
  epicUpdateDevice,
  epicRemoveDevice,
  epicToggleUserInDevice,
);
export default createEpicMiddleware(epics);
