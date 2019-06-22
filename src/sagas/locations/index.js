import { Platform } from 'react-native'
import { eventChannel } from 'redux-saga'
import { take, takeLatest, race, put, call, cancelled, select, delay } from 'redux-saga/effects'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import Geolocation from 'react-native-geolocation-service'
import moment from 'moment'
import { AlertUtils } from 'components'
import {
  recordLocation,
  updateCurrentLocation,
  getTrackingState,
  addOneSecond,
  recordEvent,
  stopTrackingLocation,
  addTime
} from 'reducers/locations'
import { checkLocationPermission } from 'utils/locations'
import {
  START_TRACKING_LOCATION,
  STOP_TRACKING_LOCATION,
  REQUEST_CURRENT_LOCATION,
  PAUSE_TRACKING_LOCATION,
  RESUME_TRACKING_LOCATION
} from 'reducers/locations/actionTypes'
import { Action } from 'rxjs/scheduler/Action'

const getCurrentLocation = (): Promise<{
  latitude: number,
  longitude: number,
  accuracy: number
}> => {
  return new Promise((resolve, reject) => {
    const MyGeolocation = Platform.OS === 'ios' ? navigator.geolocation : Geolocation
    // Geolocation options
    const options = {
      enableHighAccuracy: true,
      timeOut: 15000,
      maximumAge: 0,
      distanceFilter: 50
    }

    MyGeolocation.getCurrentPosition(
      result => resolve({ ...result.coords, time: moment().unix() }),
      error => reject(error),
      options
    )
  })
}
let bg_time = 0
let fg_time = 0
let stt

/**
 * Channel emitting tracked locations
 */
const getLocationChannel = () => {
  return eventChannel(emit => {
    const options = {
      enableHighAccuracy: true,
      timeOut: 10000,
      maximumAge: 0,
      distanceFilter: 50
    }
    // Return first stored location
    // BackgroundGeolocation.getLocations(result => emit({ result: result[0] }), error => emit({ error }))

    BackgroundGeolocation.getCurrentLocation(result => emit({ result }), error => emit({ error }), options)
    /**
     * Configure BackgroundGeolocation
     * https://github.com/mauron85/react-native-background-geolocation#api
     */
    // BackgroundGeolocation.configure({
    //   locationProvider: Platform.select({
    //     ios: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    //     android: BackgroundGeolocation.ACTIVITY_PROVIDER
    //   }),
    //   desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //   stationaryRadius: 2,
    //   distanceFilter: 3,
    //   notificationTitle: 'Tracking current route',
    //   notificationText: 'enabled',
    //   debug: __DEV__,
    //   // debug: true,
    //   startOnBoot: false,
    //   // stopOnTerminate: false,
    //   interval: 5000,
    //   fastestInterval: 3000,
    //   activitiesInterval: 5000,
    //   //   iOS
    //   activityType: 'Fitness'
    // })

    BackgroundGeolocation.configure({
      locationProvider: Platform.select({
        ios: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
        android: BackgroundGeolocation.ACTIVITY_PROVIDER
      }),
      // locationProvider: BackgroundGeolocation.RAW_PROVIDER,
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 21,
      distanceFilter: 21,
      // notificationTitle: 'Background tracking',
      // notificationText: 'disabled',
      // debug: true,
      // debug: __DEV__,
      // android
      // startOnBoot: false,
      // startForeground: true,
      // stopOnTerminate: false,
      interval: 8000,
      fastestInterval: 6000,
      activitiesInterval: 8000,
      // stopOnStillActivity: false,
      // notificationsEnabled: false,
      // ios
      activityType: 'Fitness'
    })

    BackgroundGeolocation.on('location', location => {
      emit({ result: location })
    })

    BackgroundGeolocation.on('error', error => {
      console.log('[ERROR] BackgroundGeolocation error:', error)
      emit({ error })
    })

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started')
    })

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped')
    })

    BackgroundGeolocation.on('authorization', status => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status)
      if (
        Platform.select({
          ios: status === BackgroundGeolocation.NOT_AUTHORIZED,
          android: status !== BackgroundGeolocation.AUTHORIZED
        })
      ) {
        // we need to set delay or otherwise alert may not be shown
        AlertUtils.alert('App requires location tracking permission', 'Would you like to open app settings?', [
          {
            text: 'Yes',
            onPress: () => BackgroundGeolocation.showAppSettings()
          },
          {
            text: 'No',
            onPress: () => {
              console.log('No Pressed')
            },
            style: 'cancel'
          }
        ])
      }
    })

    BackgroundGeolocation.on('background', () => {
      if (stt !== null && (stt === START_TRACKING_LOCATION || stt === RESUME_TRACKING_LOCATION)) {
        bg_time = moment().unix()
      }
      console.log('[INFO] App is in background : ', bg_time)
    })

    BackgroundGeolocation.on('foreground', () => {
      if (stt !== null && (stt === START_TRACKING_LOCATION || stt === RESUME_TRACKING_LOCATION)) {
        fg_time = moment().unix()
      }
      console.log('[INFO] App is in foreground : ', fg_time - bg_time)
    })

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning)
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled)
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization)

      // Check status before start
      if (!status.isRunning) {
        // triggers start on start event
        BackgroundGeolocation.start()
      }
    })

    return () => {
      console.log('\n\nend services\n\n')
      // BackgroundGeolocation.stop()
      // BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event))
      // clearInterval(handler);
    }
  })
}

const trackLocation = function*() {
  const locationChannel = getLocationChannel()
  console.log('----------locationChannel', locationChannel)
  try {
    while (true) {
      const { result, error } = yield take(locationChannel)

      if (error) {
        throw error
      }

      if (result) {
        console.log('result : ', result)
        yield put(recordLocation(result))
      } else {
        // No location was found, try to get the current location
        console.log('result : no reult')
        const currentLocation = yield call(getCurrentLocation)
        yield put(recordLocation(currentLocation))
      }
      console.log('----------locationChannel aaaaa', locationChannel)
    }
  } catch (error) {
    console.log('trackLocation error', error)
    // DelayedAlert.alert('Error', error.message)
  } finally {
    if (yield cancelled()) {
      locationChannel.close()
      console.log('cancelled')
    }
  }
}

const trackLocationWatcher = function*() {
  try {
    while (yield take(START_TRACKING_LOCATION)) {
      // Unless permission is granted, don't do anything
      const granted = yield call(checkLocationPermission)
      if (!granted) {
        continue
      }

      /**
       *             ┌───────╖
       * start -> pause -> resume
       *   │       │ ╙───────┘ │
       *   │       v           │
       *   └───> stop <────────┘
       */
      while (true) {
        const trackingState = yield select(getTrackingState)
        // stt = trackingState

        if (!trackingState || trackingState === STOP_TRACKING_LOCATION) {
          yield take(START_TRACKING_LOCATION)
          console.log('trackLocationWatcher STOP_TRACKING_LOCATION')
          BackgroundGeolocation.stop()
          BackgroundGeolocation.deleteAllLocations()
        } else if (trackingState === PAUSE_TRACKING_LOCATION) {
          console.log('trackLocationWatcher PAUSE_TRACKING_LOCATION')
          yield take([RESUME_TRACKING_LOCATION, STOP_TRACKING_LOCATION])
        } else if (trackingState === START_TRACKING_LOCATION || trackingState === RESUME_TRACKING_LOCATION) {
          console.log('trackLocationWatcher START_TRACKING_LOCATION | RESUME_TRACKING_LOCATION')
          const { trackLocationStopped } = yield race({
            trackLocation: call(trackLocation),
            trackLocationStopped: take(STOP_TRACKING_LOCATION),
            trackLocationPaused: take(PAUSE_TRACKING_LOCATION)
          })

          if (trackLocationStopped) {
            console.log('trackLocationWatcher trackLocationStopped')
            BackgroundGeolocation.stop()
            break
          }
        }
      }
    }
  } catch (error) {
    console.log('trackLocationWatcher : ', error)
  }
}

const onCurrentLocationRequest = function*() {
  try {
    const granted = yield call(checkLocationPermission)
    if (granted) {
      const currentLocation = yield call(getCurrentLocation)
      yield put(updateCurrentLocation(currentLocation))
    }
  } catch (error) {
    console.log(error)
  }
}

const requestCurrentLocationWatcher = function*() {
  yield takeLatest(REQUEST_CURRENT_LOCATION, onCurrentLocationRequest)
}

// TODO: Support background timer
const trackDurationWatcher = function*() {
  try {
    while (yield take([START_TRACKING_LOCATION, RESUME_TRACKING_LOCATION])) {
      while (true) {
        const { timerEvent, trackingEvent } = yield race({
          timerEvent: delay(1000),
          trackingEvent: take([PAUSE_TRACKING_LOCATION, STOP_TRACKING_LOCATION])
        })
        console.log('trackDurationWatcher ')
        if (timerEvent) {
          if (bg_time > 0 && fg_time > 0 && fg_time > bg_time) {
            yield put(addTime(fg_time - bg_time))
            bg_time = 0
            fg_time = 0
          } else {
            bg_time++
            yield put(addOneSecond())
          }
          // yield put(addOneSecond())
        } else if (trackingEvent) {
          break
        }
      }
    }
  } catch (error) {
    console.log('trackDurationWatcher error : ', error)
  }
}

const trackingEventWatcher = function*() {
  try {
    while (true) {
      const action = yield take([
        START_TRACKING_LOCATION,
        PAUSE_TRACKING_LOCATION,
        RESUME_TRACKING_LOCATION,
        STOP_TRACKING_LOCATION
      ])

      const currentLocation = yield call(getCurrentLocation)
      // if (action.type === START_TRACKING_LOCATION) {
      // yield put(recordLocation(currentLocation))
      // }
      stt = action.type
      yield put(recordEvent({ eventType: action.type, ...currentLocation }))
    }
  } catch (error) {
    console.log(error)
  }
}

export default [requestCurrentLocationWatcher(), trackLocationWatcher(), trackDurationWatcher(), trackingEventWatcher()]
