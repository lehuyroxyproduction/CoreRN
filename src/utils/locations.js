import { Platform, PermissionsAndroid } from 'react-native'
import * as R from 'ramda'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import { AlertUtils } from 'components'
export const checkLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return true
  }

  try {
    const Pre23 = Platform.Version < 23
    const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

    if (check === PermissionsAndroid.RESULTS.GRANTED || (Pre23 && check === true)) {
      return true
    }

    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Liv3ly Fine Location Permission',
      message: 'Liv3ly needs access to your location.'
    })

    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch (err) {
    console.log('checkLocationPermission : ', err)
    return false
  }
}

export const regionFromAccuracy = ({ latitude, longitude, accuracy }) => {
  if (accuracy <= 100) {
    // If we're showing less than a certain threshold, then use these numbers instead
    return { latitudeDelta: 0.092, longitudeDelta: 0.092 }
  }

  const EQUATOR_TO_POLE = 10001.965729 // km
  /* EQUATOR_TO_POLE : 90 degrees
   * accuracy in km  : ? degrees
   */
  const coef = 20
  const accuracy_in_degrees = ((accuracy / 1000) * 90) / EQUATOR_TO_POLE
  const latitudeDelta = coef * accuracy_in_degrees
  const longitudeDelta = coef * accuracy_in_degrees
  return { latitudeDelta, longitudeDelta }
}

/**
 * Calculate the distance and duration of the route
 * @param {*} route: Google map route
 */
export const calculateDistanceAndDuration = route => {
  const duration = route.legs.reduce((acc, elem) => acc + elem.duration.value, 0)
  const distance = route.legs.reduce((acc, elem) => acc + elem.distance.value, 0)

  return { distance, duration }
}

/**
 * Returns distance in km between 2 points
 *
 * http://stackoverflow.com/a/21623206
 *
 * @param {object : { latitude: number, longitude: number }} loc1
 * @param {object : { latitude: number, longitude: number }} loc2
 * @returns {number}
 */
export const distanceBetween = ({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 }) => {
  let p = 0.017453292519943295 // Math.PI / 180
  let c = Math.cos
  let a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2

  return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
}
