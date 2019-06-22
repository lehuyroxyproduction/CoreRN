import React from 'react'
import LottieView from 'lottie-react-native'
import { connect } from 'react-redux'
import { Colors } from 'themes'
import AsyncStorage from '@react-native-community/async-storage'
import { authActions, authSelectors, countryActions } from 'reducers'
import { getTrackingState } from 'reducers/locations'
import * as locationTypes from 'reducers/locations/actionTypes'
import * as R from 'ramda'
import { STATUS_BAR_STYLE, wp } from 'constant'
import { View } from 'components/ui'
import { Container } from 'components'

class Splash extends React.PureComponent {
  componentDidMount() {}

  getValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@Liv3ly')
      if (value === null) {
        this.setValue()
      } else {
        setTimeout(() => {
          // wait check & set token
          this.moveScreen()
        }, 500)
      }
    } catch (e) {
      console.log(e)
    }
  }
  setValue = () => {
    try {
      this.props.setStackRoot({ screen: 'SlideShow' })
    } catch (e) {
      // saving error
    }
  }

  getInfoUser = onPop => {
    if (!R.isEmpty(this.props.user)) {
      this.props.getInfoUser({ onPop: onPop })
    }
  }

  moveScreen = () => {
    const { setStackRoot, trackingState, user } = this.props
    console.log('Splash user : ', user)
    if (R.isEmpty(user)) {
      setStackRoot({ screen: 'Login' })
    } else {
      // goi update user profile
      if (
        trackingState === locationTypes.START_TRACKING_LOCATION ||
        trackingState === locationTypes.PAUSE_TRACKING_LOCATION ||
        trackingState === locationTypes.RESUME_TRACKING_LOCATION
      ) {
        let onpop = () => setStackRoot({ screen: 'ProgressTracker' })
        this.getInfoUser(onpop)
      } else {
        let onpop = () => setStackRoot({ screen: 'Main' })
        this.getInfoUser(onpop)
        // setStackRoot({ screen: 'Main' })
      }
    }
  }

  render() {
    return (
      <Container backgroundColor={Colors.electricBlue} centerItems>
        <LottieView
          enableMergePathsAndroidForKitKatAndAbove
          style={{ width: wp(45) }}
          source={require('../../../assets/videos/logoSplashscreen2.json')}
          onAnimationFinish={this.getValue}
          autoPlay
          loop={false}
          imageAssetsFolder="lottie/image"
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
  trackingState: getTrackingState(state)
})

const mapDispatchToProps = {
  getInfoUser: authActions.getInfoUser,
  getCountry: countryActions.getCountry
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash)
