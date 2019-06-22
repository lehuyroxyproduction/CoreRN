import { combineReducers } from 'redux'
import { reducerFactory } from 'utils'

import { types } from 'reducers/app'

export default combineReducers({
  test: reducerFactory({
    onStart: types.SET_CURRENT_SCREEN_ID
  })
})

// export default app
