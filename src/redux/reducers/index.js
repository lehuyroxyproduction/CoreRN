import app, {actions as appActions, selectors as appSelectors} from './app'
import auth, {actions as authActions, selectors as authSelectors} from './auth'
import user, {actions as userActions, selectors as userSelectors} from './user'
import jobs, {actions as jobActions, selectors as jobSelectors} from './jobs'
import notis, {actions as notisActions, selectors as notisSelectors} from './notis'
import places, {actions as placeActions, selectors as placeSelectors} from './places'

import ui from './ui'

export {
  appActions, authActions, userActions, jobActions, notisActions, placeActions
}

export {
  appSelectors, authSelectors, userSelectors, jobSelectors, notisSelectors, placeSelectors
}

export default {
  app,
  auth,
  user,
  jobs,
  notis,
  places,
  ui
}
