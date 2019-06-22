import { combineReducers } from 'redux'

import auth from './auth'
import events from './events'
import sessions from './sessions'
import country from './country'
import virtuals from './virtuals'
import challenges from './challenges'
// import reservation from './reservation'
// import station from './station'
// import bank from './bank'
// import notification from './notification'
export default combineReducers({ auth, events, sessions, country, virtuals, challenges})

