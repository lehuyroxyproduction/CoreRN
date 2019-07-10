import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/reducers.js'
import createSagaMiddleware from 'redux-saga'
import ReduxThunk from 'redux-thunk'
// import epics from '../middlewares/epics.js'
import sagas from '../middlewares/saga'
import Reactotron from 'reactotron-react-native'
import config from '../../constants/config'

// const sagaMonitor = Reactotron.createSagaMonitor
// const sagaMiddleware = createSagaMiddleware({sagaMonitor})
const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(
    ReduxThunk, 
    // epics, 
    sagaMiddleware
));

sagaMiddleware.run(sagas);

export default store;