// import { Navigation } from 'react-native-navigation'
// import { ScreenWrapper } from 'components'

// import LoginWithPassword from './LoginWithPassword'

import Login from './Login'
import Verify from './Verify'
import Complete from './Complete'
import Jobs from './Jobs'
import JobDetails from './JobDetails'
import UserJobs from './UserJobs'
import UserJobDetails from './UserJobDetails'

import RegisterName from './Register/Name'
import RegisterDob from './Register/Dob'
import RegisterGender from './Register/Gender'
import RegisterAddress from './Register/Address'
import SearchAddress from './Register/Address/Search.js'
import RegisterIdentification from './Register/Identification'
import RegisterAvatar from './Register/Avatar'

import RegisterFirstGuard from './Register/Guardians/FirstGuard'
import RegisterSecondGuard from './Register/Guardians/SecondGuard'

import Profile from './Profile'
import UpdateProfile from './Profile/UpdateProfile'
import UpdateGuardians from './Profile/UpdateGuardians'

import Conversation from './Conversation'

import More from './More'
import Alert from './Alert'
import Nothing from './Nothing'
import Notis from './Notis'
import Lab from './Lab'
import JobFilter from './JobFilter'

export default {
  Login,
  // LoginWithPassword,
  Verify,
  RegisterName,
  RegisterDob,
  RegisterGender,
  RegisterAddress,
  SearchAddress,
  RegisterIdentification,
  RegisterAvatar,
  RegisterFirstGuard,
  RegisterSecondGuard,
  JobFilter,
  Jobs,
  UserJobs,

  More,
  Conversation,

  Nothing,
  Notis,
  Lab,
  JobDetails,
  Profile,
  Complete,
  UserJobDetails,
  Alert,
  UpdateProfile,
  UpdateGuardians
}

// export const modals = {
//   JobDetails,
//   Profile,
//   Complete,
//   UserJobDetails,
//   Alert,
//   UpdateProfile,
//   UpdateGuardians
// }

// export function registerScreens(store, Provider) {
//   Object.entries({ ...screens, ...modals }).map(([id, screen]) =>
//     Navigation.registerComponent(
//       id,
//       () => ScreenWrapper(screen),
//       store,
//       Provider
//     )
//   )
// }
