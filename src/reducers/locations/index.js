import { combineReducers } from 'redux'
import { Location } from '@mauron85/react-native-background-geolocation'
import { createSelector } from 'reselect'
import * as R from 'ramda'
import * as types from './actionTypes'
import { distanceBetween } from 'utils/locations'
import { Platform } from 'react-native'
import moment from 'moment'

type Action<T> = {
  type: string,
  payload: T
}

type TrackingEvent = {
  eventType: string,
  latitude: number,
  longitude: number,
  time: number
}

/**
 * Actions
 */
export const requestCurrentLocation = () => ({
  type: types.REQUEST_CURRENT_LOCATION
})

export const updateCurrentLocation = currentLocation => ({
  type: types.UPDATE_CURRENT_LOCATION,
  payload: currentLocation
})

export const startTrackingLocation = () => ({
  type: types.START_TRACKING_LOCATION
})

export const pauseTrackingLocation = () => ({
  type: types.PAUSE_TRACKING_LOCATION
})

export const resumeTrackingLocation = () => ({
  type: types.RESUME_TRACKING_LOCATION
})

export const stopTrackingLocation = () => ({
  type: types.STOP_TRACKING_LOCATION
})

export const recordLocation = (location: Location) => ({
  type: types.RECORD_LOCATION,
  payload: location
})

export const resetLocation = () => ({
  type: types.RESET_LOCATION
})

export const recordEvent = (event: TrackingEvent) => ({
  type: types.RECORD_EVENT,
  payload: event
})

export const addOneSecond = () => ({
  type: types.ADD_ONE_SECOND
})

export const addTime = time => ({
  type: types.ADD_ONE_TIME,
  payload: time
})

/**
 * Reducers
 */
const defaultLocation = {
  latitude: 10.7725451,
  longitude: 106.6958526
}
const currentLocation = (state: { latitude: number, longitude: number } = defaultLocation, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENT_LOCATION:
      return action.payload
    case types.RECORD_LOCATION:
      return action.payload
    default:
      return state
  }
}

const list = (state: Array<Location> = [], action) => {
  switch (action.type) {
    case types.START_TRACKING_LOCATION:
      return []
    case types.RECORD_LOCATION:
      // let now = moment().unix()
      // console.log('RECORD_LOCATION now : ', now)
      // console.log('RECORD_LOCATION action.payload.time : ', action.payload.time)
      // console.log('RECORD_LOCATION now - time : ', now - action.payload.time)
      // console.log('RECORD_LOCATION action.payload : ', action.payload)
      // console.log('RECORD_LOCATION state : ', state)
      console.log('RECORD_LOCATION')
      if (Platform.OS === 'ios') {
        if (action.payload.speed <= 0) {
          return state
        }
      } else if (Platform.OS === 'android') {
        if (!action.payload.speed || action.payload.speed <= 0.5) {
          return state
        }
      }
      console.log('RECORD_LOCATION save')
      return [...state, action.payload]
    case types.RESET_LOCATION:
      return []
    default:
      return state
  }
}

const trackingState = (state: string | null = null, action) => {
  switch (action.type) {
    case types.START_TRACKING_LOCATION:
    case types.PAUSE_TRACKING_LOCATION:
    case types.RESUME_TRACKING_LOCATION:
    case types.STOP_TRACKING_LOCATION:
      return action.type
    default:
      return state
  }
}

const duration = (state: number = 0, action) => {
  switch (action.type) {
    case types.START_TRACKING_LOCATION:
      return 0
    case types.ADD_ONE_SECOND:
      return state + 1
    case types.ADD_ONE_TIME:
      console.log('duration payload : ', action.payload)
      return state + action.payload
    default:
      return state
  }
}

const trackingEvents = (state: Array<TrackingEvent> = [], action) => {
  switch (action.type) {
    case types.RECORD_EVENT:
      return [...state, action.payload]
    default:
      return state
  }
}

const locationsReducers = combineReducers({
  currentLocation,
  list,
  trackingState,
  trackingEvents,
  duration
})

export default locationsReducers

/**
 * Selectors
 */
export const getCurrentLocation = (state): Location => state.locations.currentLocation
export const getLocationList = (state): Array<Location> => state.locations.list
export const getTrackingState = (state): string => state.locations.trackingState
export const getDistance = createSelector(
  getLocationList,
  locations => {
    // Returns distance in km
    const { distance } = locations.slice(1).reduce(
      (acc, elem) => ({
        distance: acc.distance + distanceBetween(acc.prev, elem),
        prev: elem
      }),
      {
        distance: 0,
        prev: locations[0]
      }
    )
    return distance
  }
)
export const getDuration = state => state.locations.duration // Returns duration in seconds
export const getPace = createSelector(
  getDuration,
  getDistance,
  (duration, distance) => {
    // Returns pace in min/km
    let temp = distance.toFixed(2)

    // console.log('-----------------getDistance', temp)
    return !distance || temp.toString() === '0.00' ? 0 : duration / 60 / distance
  }
)
export const isTrackingPaused = state => {
  return state.locations.trackingState === types.PAUSE_TRACKING_LOCATION
}

const getDistanceThresholdFromPace = pace => {
  if (!pace) {
    return 0
  }

  return (1 / pace) * (1000 / 60) // use m/s as threshold
}
export const getRefinedLocationList = createSelector(
  getLocationList,
  () => 0, // TODO: Should use the average pace from previous sessions, not the current session's pace
  (locations, pace) => {
    if (!locations.length) {
      return []
    }

    // Filter by distance threshold, removing noisy location points
    const DISTANCE_THRESHOLD = getDistanceThresholdFromPace(pace) || 10 // meters
    const result = []
    result.push(R.head(locations))
    for (let i = 1; i < locations.length; ++i) {
      if (distanceBetween(R.last(result), locations[i]) >= DISTANCE_THRESHOLD) {
        result.push(locations[i])
      }
    }
    return result
  }
)
