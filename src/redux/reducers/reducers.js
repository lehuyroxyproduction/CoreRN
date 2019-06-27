import { combineReducers } from 'redux'
import {reducerListUser} from './reducerListUser'

const reducers = combineReducers({
    ListUser:reducerListUser
})

export default reducers;