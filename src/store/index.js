import { createStore, applyMiddleware, compose } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import Reactotron from 'utils/reactotron'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import reducers from 'reducers'

import sagas from 'sagas'
import {persistConfig, reactotron} from 'config'

// create root reducer
const rootReducer = persistCombineReducers(persistConfig, reducers)

// track saga
const sagaMonitor = reactotron.enable && Reactotron.createSagaMonitor
const saga = createSagaMiddleware({sagaMonitor})

// create middlewares
const middlewares = [thunk, saga]
const enhancers = [applyMiddleware(...middlewares)]

// create store
const store = reactotron.enable
  ? createStore(
    rootReducer,
    compose(
      ...enhancers,
      Reactotron.createEnhancer()
    )
  )
  : createStore(rootReducer, compose(...enhancers))

// saga.run(sagas)
// export const persistor = callback =>
persistStore(store, null, () => {
  saga.run(sagas)
})
// persistStore(store, {}, () => callback(store.getState()))

export default store
