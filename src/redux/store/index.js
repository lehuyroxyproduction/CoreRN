import { createStore, applyMiddleware, compose, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import epics from '../middlewares/epics';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk'

const composeEnhancers = composeWithDevTools({
  // Specify custom devTools options
});

export default createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(epics,ReduxThunk),
  // other store enhancers if any
  ),
);
