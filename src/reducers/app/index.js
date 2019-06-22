import { createAction } from 'redux-actions'

const types = {
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  UPDATE_NETWORK: 'UPDATE_NETWORK'
}

const actions = {
  setCurrentScreen: createAction(types.SET_CURRENT_SCREEN),
  updateNetwork: createAction(types.UPDATE_NETWORK)
}

const initialState = {
  currentScreen: null,
  isConnected: true,
  items: [
    {
      name: 'ACTIVITIES',
      screen: 'Main'
    },
    {
      name: 'EVENTS',
      screen: 'Events'
    },
    {
      name: 'CHALLENGES',
      screen: 'Challenges'
    },
    {
      name: 'VIRTUALRACE',
      screen: ''
    },
    {
      name: 'REWARDS',
      screen: ''
    },
    {
      name: 'HISTORY',
      screen: ''
    },
    {
      name: 'MYPROFILE',
      screen: ''
    },
    {
      name: 'EVENTDETAILS',
      screen: 'EventDetails'
    },
    {
      name: 'EVENTSDETAILSWEB',
      screen: 'EventsDetailsWeb'
    }
  ]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_SCREEN:
      return { ...state, currentScreen: payload }
    case types.UPDATE_NETWORK:
      return { ...state, isConnected: payload }
    default:
      return state
  }
}

const selectors = {
  getCurrentScreen: state => state.app.currentScreen,
  getNetInfo: state => state.app.isConnected
}

export { types, actions, selectors }
