import { createAction, handleActions } from 'redux-actions'

export const types = {
  GET_PLACES: 'GET_PLACES',
  GET_PLACES_SUCCEEDED: 'GET_PLACES_SUCCEEDED',
  GET_PLACES_FAILED: 'GET_PLACES_FAILED',
  GET_PLACES_CANCELED: 'GET_PLACES_CANCELED',
  GET_USER_FILTER_PLACES: 'GET_USER_FILTER_PLACES',
  GET_USER_FILTER_PLACES_SUCCEEDED: 'GET_USER_FILTER_PLACES_SUCCEEDED',
  GET_USER_FILTER_PLACES_FAILED: 'GET_USER_FILTER_PLACES_FAILED',
  GET_USER_FILTER_PLACES_CANCELED: 'GET_USER_FILTER_PLACES_CANCELED',
  SUBSCRIBE_PLACES: 'SUBSCRIBE_PLACES',
  SUBSCRIBE_PLACES_SUCCEEDED: 'SUBSCRIBE_PLACES_SUCCEEDED',
  SUBSCRIBE_PLACES_FAILED: 'SUBSCRIBE_PLACES_FAILED',
  SUBSCRIBE_UNSUBSCRIBE_PLACES: 'SUBSCRIBE_UNSUBSCRIBE_PLACES',
  SUBSCRIBE_UNSUBSCRIBE_PLACES_SUCCEEDED: 'SUBSCRIBE_UNSUBSCRIBE_PLACES_SUCCEEDED',
  SUBSCRIBE_UNSUBSCRIBE_PLACES_FAILED: 'SUBSCRIBE_UNSUBSCRIBE_PLACES_FAILED',
  UNSUBSCRIBE_PLACES: 'UNSUBSCRIBE_PLACES',
  UNSUBSCRIBE_PLACES_SUCCEEDED: 'UNSUBSCRIBE_PLACES_SUCCEEDED',
  UNSUBSCRIBE_PLACES_FAILED: 'UNSUBSCRIBE_PLACES_FAILED'
}
export const actions = {
  getPlaces: createAction(types.GET_PLACES),
  getPlacesSucceeded: createAction(types.GET_PLACES_SUCCEEDED),
  getPlacesFailed: createAction(types.GET_PLACES_FAILED),
  getPlacesCanceled: createAction(types.GET_PLACES_CANCELED),
  getUserFilterPlaces: createAction(types.GET_USER_FILTER_PLACES),
  getUserFilterPlacesSucceeded: createAction(types.GET_USER_FILTER_PLACES_SUCCEEDED),
  getUserFilterPlacesFailed: createAction(types.GET_USER_FILTER_PLACES_FAILED),
  getUserFilterPlacesCanceled: createAction(types.GET_USER_FILTER_PLACES_CANCELED),
  subscribePlaces: createAction(types.SUBSCRIBE_PLACES),
  subscribePlacesSucceeded: createAction(types.SUBSCRIBE_PLACES_SUCCEEDED),
  subscribePlacesFailed: createAction(types.SUBSCRIBE_PLACES_FAILED),
  unSubscribePlaces: createAction(types.UNSUBSCRIBE_PLACES),
  unSubscribePlacesSucceeded: createAction(types.UNSUBSCRIBE_PLACES_SUCCEEDED),
  unSubscribePlacesFailed: createAction(types.UNSUBSCRIBE_PLACES_FAILED),
  subscribeUnSubscribePlaces: createAction(types.SUBSCRIBE_UNSUBSCRIBE_PLACES),
  subscribeUnSubscribePlacesSucceeded: createAction(types.SUBSCRIBE_UNSUBSCRIBE_PLACES_SUCCEEDED),
  subscribeUnSubscribePlacesFailed: createAction(types.SUBSCRIBE_UNSUBSCRIBE_PLACES_FAILED)
}

export const selectors = {
  getPlaces: state => state.places.list,
  getUserFilterPlaces: state => state.places.list2,
  getStatus: (state, action) => state.ui.places[action].status,
  getLoading: (state, action) => state.ui.places[action].isLoading
}

const defaultState = {
  list: [],
  list2: []
}

export default handleActions(
  {
    [types.GET_PLACES_SUCCEEDED]: (state, action) => {
      return {
        ...state,
        list: action.payload
      }
    },
    [types.GET_USER_FILTER_PLACES_SUCCEEDED]: (state, action) => {
      return {
        ...state,
        list2: action.payload.places
      }
    }
  },
  defaultState
)
