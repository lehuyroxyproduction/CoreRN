import { createStore, applyMiddleware, compose } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import Reactotron from 'utils/reactotron'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import config from 'config'
import reducers from 'reducers'
import sagas from 'sagas'

// create root reducer
const rootReducer = persistCombineReducers(config.persist, reducers)

// track saga
const sagaMonitor = config.reactotron.enable && Reactotron.createSagaMonitor
const saga = createSagaMiddleware({ sagaMonitor })

// create middlewares
const middlewares = [thunk, saga]
const enhancers = [applyMiddleware(...middlewares)]

// create store
const store = config.reactotron.enable
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
