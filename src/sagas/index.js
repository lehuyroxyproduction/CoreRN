import { all } from 'redux-saga/effects'

import app from './app'
import auth from './auth'
import user from './user'
import jobs from './jobs'
import notis from './notis'
import places from './places'

export default function* rootSaga() {
  yield all([app, auth, user, jobs, notis, places])
}
