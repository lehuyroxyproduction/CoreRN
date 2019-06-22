import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button, Header, Text, TextInput, View } from 'components/ui'
import { hp, isAndroid, STATUS_BAR_STYLE, wp } from 'constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Icons } from 'images'
import { Container } from 'components'
import { Colors, Fonts, Themes } from 'themes'
import { connect } from 'react-redux'
import { isEmailValid } from 'utils'
import { authActions, authSelectors } from 'reducers'
import config from 'config'
import I18n from 'react-native-i18n'
import normalize from 'utils/normalizeText'
import * as R from 'ramda'
import {
  requestAlternateFacebookSignIn,
  requestFacebookSignIn,
  requestGoogleSignIn,
  setLoading
} from 'reducers/signIn/actions'

import { isLoading } from 'reducers/signIn'
import { logEvent } from 'services/firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'

type Props = {}
type State = {}

class Login extends React.PureComponent<Props, State> {
  inputRef = null
  state = {
    password: '',
    email: '',
    hidePassword: true,
    selection: {
      start: 0,
      end: 0
    },
    emailCheck: -1,
    backButtonVisible: true,

    userInfo: null,
    error: null
  }

  async componentWillMount() {
    this.configureGoogleSignIn()
    await this.getCurrentUser()
    // GoogleSignin.signOut()
  }

  configureGoogleSignIn = () => {
    // GoogleSignin.signOut()
    GoogleSignin.configure({
      webClientId: config.google.webClientId,
      iosClientId: config.google.iosClientId
    })
  }
  getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently()
      console.log('----get current user', userInfo.user)
      this.setState({ userInfo, error: null })
    } catch (error) {
      const errorMessage = error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message
      this.setState({
        error: new Error(errorMessage)
      })
    }
  }
  
  changePassType = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }
  renderUserInfo = userInfo => {
    return (
      <View>
        <Text bold xlarge>
          Welcome {userInfo.user.name}
        </Text>
        <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>

        <Button onPress={this.signOutGoogle} title="Log out" />
        {this.renderError()}
      </View>
    )
  }

  renderError() {
    const { error } = this.state
    if (!error) {
      return null
    }
    const text = `${error.toString()} ${error.code ? error.code : ''}`
    return <Text>{text}</Text>
  }

  signInFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {
      if (result.isCancelled) {
        console.log('Cancelled')
      } else {
        console.log('logging facebook', result)
        AccessToken.getCurrentAccessToken().then(data => {
          console.log('data', data)
        })
      }
    })
  }
  _onSignInSuccess = () => {
    this.props.setStackRoot({ screen: 'Main' })
  }

  _signInFacebook = () => {
    logEvent('login_fb_btn')
    this.props.requestFacebookSignIn(this._onSignInSuccess)
  }

  _signInGoogle = async () => {
    logEvent('login_gg_btn')
    this.props.requestGoogleSignIn(this._onSignInSuccess)
  }

  renderHeader = () => <Header />

  submit = () => {
    Keyboard.dismiss()
    const { email, password } = this.state
    console.log('email password', email, password)
    if (!email || !password || !isEmailValid(email)) {
      return null
    }
    const onSuccess = () => this.props.setStackRoot({ screen: 'Main' })
    this.props.loginInternal({
      email,
      password,
      onSuccess
    })
  }

  goToForgotPassword = () => {
    this.props.push({ screen: 'ForgotPassword' })
  }

  signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()

      this.setState({ userInfo: null, error: null })
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  render() {
    let { isLoading } = this.props
    const { hidePassword, emailCheck } = this.state
    let iconPassVisible = isAndroid ? 'md-eye' : 'ios-eye'
    let iconPassInvisible = isAndroid ? 'md-eye-off' : 'ios-eye-off'
    let iconName = hidePassword ? iconPassInvisible : iconPassVisible
    let iconColor = hidePassword ? 'rgba(0, 0, 0, 0.3)' : 'black'
    let icClose = isAndroid ? 'md-close' : 'ios-close'
    let icCheck = isAndroid ? 'md-checkmark' : 'ios-checkmark'
    let icEmailCheckColor = emailCheck === 1 ? Themes.Colors.electricBlue : 'red'
    let icEmailCheck = emailCheck === 1 ? icCheck : icClose
    return (
      <Container touchableWithoutFeedback isLoading={isLoading}>
        {this.renderHeader()}
        <View flex style={styles.container}>
          <Text xlarge bold>
            {I18n.t('Login')}
          </Text>
          <View style={{ marginTop: hp(4) }}>
            <Text smaller medium color="rgba(0, 0, 0, 0.3)">
              {I18n.t('WhatYourEmail')}
            </Text>
            <View
              alignCenter
              row
              style={{
                width: '100%',
                height: hp(4.1),
                borderBottomColor: Colors.electricBlue
              }}
              borderBottomWidth={StyleSheet.hairlineWidth}>
              <TextInput
                demiBold
                smaller
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={email => {
                  if (email && email.length) {
                    if (isEmailValid(email)) {
                      this.setState({ email, emailCheck: 1 })
                    } else {
                      this.setState({ email, emailCheck: 0 })
                    }
                  } else {
                    this.setState({ email, emailCheck: -1 })
                  }
                }}
                style={{
                  width: '95%',
                  height: '100%',
                  fontSize: Fonts.size.medium,
                  paddingRight: 5
                }}
              />
              {emailCheck !== -1 && <Ionicons name={icEmailCheck} size={normalize(18)} color={icEmailCheckColor} />}
            </View>
            <Text smaller medium color="rgba(0, 0, 0, 0.3)" style={{ marginTop: hp(2.5) }}>
              {I18n.t('Yourpassword')}
            </Text>
            <View
              row
              alignCenter
              style={{
                width: '100%',
                height: hp(4.1),
                borderBottomColor: Colors.electricBlue
              }}
              borderBottomWidth={StyleSheet.hairlineWidth}>
              <TextInput
                demiBold
                tiny
                secureTextEntry={hidePassword}
                onChangeText={password => {
                  this.setState({ password })
                }}
                style={{
                  width: '95%',
                  height: '100%',
                  fontSize: Fonts.size.medium,
                  paddingRight: 5
                }}
              />
              <Ionicons name={iconName} size={normalize(18)} color={iconColor} onPress={this.changePassType} />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text bold smaller style={{ color: 'white' }}>
              {I18n.t('DONE')}
            </Text>
          </TouchableOpacity>
          <View
            centerItems
            alignCenter
            centerSelf
            row
            style={{
              position: 'absolute',
              bottom: hp(4.4)
            }}
            >
            <TouchableOpacity onPress={this.goToForgotPassword}>
              <Text smaller bold>
                {I18n.t('ForgotPassword')}
              </Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: wp(4.8), marginRight: wp(4.8) }}>|</Text>
            <TouchableOpacity onPress={() => this.props.setStackRoot({ screen: 'Register' })}>
              <Text bold smaller color={Colors.electricBlue}>
                {I18n.t('SignUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(3),
    paddingHorizontal: wp(12.8)
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0
  },
  button: {
    width: '100%',
    height: hp(5.4),
    marginTop: hp(3.4),
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.electricBlue
  }
})

const mapStateToProps = state => ({
  // // isLoading: authSelectors.getLoading(state, 'createUser') || isLoading(state)
  // isLoading:
  //   isLoading(state) ||
  //   authSelectors.getLoading(state, 'signInSocial') ||
  //   authSelectors.getLoading(state, 'loginInternal')
})

const mapDispatchToProps = dispatch => ({
  loginInternal: user => dispatch(authActions.loginInternal(user)),
  // requestGoogleSignIn: R.compose(
  //   dispatch,
  //   requestGoogleSignIn
  // ),
  // requestFacebookSignIn: R.compose(
  //   dispatch,
  //   requestFacebookSignIn
  // ),
  // requestAlternateFacebookSignIn: R.compose(
  //   dispatch,
  //   requestAlternateFacebookSignIn
  // ),
  // setSignInLoading: R.compose(
  //   dispatch,
  //   setLoading
  // )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
