import app, { actions as appActions, selectors as appSelectors } from './app'
import auth, { actions as authActions, selectors as authSelectors, types as authTypes } from './auth'
import events, { actions as eventsActions, selectors as eventSelectors, types as eventsTypes } from './events'
import sessions, { actions as sessionActions, selectors as sessionSelectors, types as sessionTypes } from './sessions'

import ui from './ui'
import locations from './locations'
import signIn from './signIn'

import country, { actions as countryActions, selectors as countrySelectors, types as countryTypes } from './country'

import virtuals, {
  actions as virtualsActions,
  selectors as virtualsSelectors,
  types as virtualsTypes
} from './virtuals'

import challenges, {
  actions as challengesActions,
  selectors as challengesSelectors,
  types as challengesTypes
} from './challenges'

export { authTypes, eventsTypes, sessionTypes }
export { appActions, authActions, eventsActions, sessionActions }
export { appSelectors, authSelectors, eventSelectors, sessionSelectors }
export { countryTypes, countrySelectors, countryActions }
export { virtualsTypes, virtualsSelectors, virtualsActions }
export { challengesTypes, challengesSelectors, challengesActions }


export default {
  events,
  app,
  auth,
  ui,
  locations,
  signIn,
  sessions,
  country,
  virtuals,
  challenges
}
