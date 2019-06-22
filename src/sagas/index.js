import { all } from 'redux-saga/effects'
import auth from './auth'
import locations from './locations'
import events from './events'
import signIn from './signIn'
import sessions from './sessions'
import country from './country'
import challenges from './challenges'
import virtuals from './virtuals'

export default function * rootSaga ()  {
  yield all([
    ...auth,
    ...locations,
    ...events,
    ...signIn,
    ...sessions,
    ...country,
    ...virtuals,
    ...challenges
  ])
}
