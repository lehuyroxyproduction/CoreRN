import React from 'react'
import { Image, StatusBar, StyleSheet, TouchableOpacity,Keyboard } from 'react-native'
import { Button, Header, Text, View, TextInput } from 'components/ui'
import { hp, isAndroid, wp, STATUS_BAR_STYLE } from 'constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Icons } from 'images'
import { Container } from 'components'
import { Colors, Fonts, Themes } from 'themes'
import { connect } from 'react-redux'
import { authActions, authSelectors } from 'reducers'
import { isEmailValid } from 'utils'
import I18n from 'react-native-i18n'
import normalize from 'utils/normalizeSize'
import * as R from 'ramda'
import {
  requestAlternateFacebookSignIn,
  requestFacebookSignIn,
  requestGoogleSignIn,
  setLoading
} from 'reducers/signIn/actions'
import { logEvent } from 'services/firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import { isLoading } from 'reducers/signIn'

type Props = {}
type State = {}
const screen = 2
class Register extends React.PureComponent<Props, State> {
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
  }

  configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: config.google.webClientId,
      iosClientId: config.google.iosClientId
    })
  }
  getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently()
      console.log('----get current user', userInfo)
      this.setState({ userInfo, error: null })
    } catch (error) {
      const errorMessage = error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message
      this.setState({
        error: new Error(errorMessage)
      })
    }
  }
  // handleSelectionChange = (selection) => this.setState({selection})
  changePassType = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }

  submit = () => {
    Keyboard.dismiss()
    const { email, password } = this.state
    if (!email || !password || !isEmailValid(email)) {
      return null
    }
    const onSuccess = () => {
      this.goToLoginPage()
    }
    console.log('submit email: ', email)
    console.log('submit password: ', password)
    this.props.registerUser({
      email,
      password,
      name: email,
      onSuccess
    })
  }

  goToLoginPage = () => {
    this.props.setStackRoot({ screen: 'Login' })
  }
  onBackPress = () => {
    const curScreen = this.props.screen
    this.props.pop()
  }
  renderHeader = () => <Header />

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

  render() {
    let { isLoading } = this.props
    const { hidePassword, selection, emailCheck, userInfo } = this.state
    let iconPassVisible = isAndroid ? 'md-eye' : 'ios-eye'
    let iconPassInvisible = isAndroid ? 'md-eye-off' : 'ios-eye-off'
    let iconName = hidePassword ? iconPassInvisible : iconPassVisible
    let iconColor = hidePassword ? 'rgba(0, 0, 0, 0.3)' : 'black'
    let icClose = isAndroid ? 'md-close' : 'ios-close'
    let icCheck = isAndroid ? 'md-checkmark' : 'ios-checkmark'
    let icEmailCheckColor = emailCheck === 1 ? Themes.Colors.electricBlue : 'red'
    let icEmailCheck = emailCheck === 1 ? icCheck : icClose
    let prevScreen = this.props.screen
    return (
      <Container isLoading={isLoading} touchableWithoutFeedback>
        {this.renderHeader()}
        <View flex style={styles.container}>
          <Text xlarge bold>
            {I18n.t('NewAccount')}
          </Text>
          <View style={{ marginTop: hp(4) }}>
            <Text small medium color="rgba(0, 0, 0, 0.3)">
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
            <Text tiny color="rgba(0, 0, 0, 0.6)" style={{ marginTop: hp(0.5) }}>
              {I18n.t('YouNeedToConfirmThisEmailLater')}
            </Text>
            <Text small medium color="rgba(0, 0, 0, 0.3)" style={{ marginTop: hp(2.5) }}>
              {I18n.t('CreatePassword')}
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
            <Text bold small style={{ color: 'white' }}>
              {I18n.t('DONE')}
            </Text>
          </TouchableOpacity>
          {/* <View row alignCenter justifyCenter style={{ marginTop: hp(5.9) }}>
            <View
              flex
              style={{
                height: 1,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'rgba(0, 0, 0, 0.3)'
              }}
            />
            <Text demiBold small color="rgba(0, 0, 0, 0.3)" alignSelf>
              {I18n.t('OrSignUpWith')}
            </Text>
            <View
              flex
              style={{
                height: 1,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'rgba(0, 0, 0, 0.3)'
              }}
            />
          </View> */}
          {/* <View alignCenter centerItems row style={{ width: '100%', marginTop: hp(2.5) }}>
            <Button
              icon={Icons.icFacebookSignup}
              color="transparent"
              contentColor={null}
              onPress={this._signInFacebook}
            />
            <Button
              icon={Icons.icGoogleSignup}
              contentColor={null}
              style={{ marginStart: wp(5.3) }}
              color="transparent"
              onPress={this._signInGoogle}
            />
          </View> */}
          <View
            centerItems
            alignCenter
            row
            style={{
              position: 'absolute',
              bottom: hp(4.4),
              alignSelf: 'center'
            }}>
            <Text small>{I18n.t('AlreadyHaveAnAccount')}</Text>
            <TouchableOpacity onPress={this.goToLoginPage}>
              <Text bold small>
                {I18n.t('LogIn')}
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
    paddingHorizontal: wp(12.8)
  },
  button: {
    width: '100%',
    height: hp(5.4),
    marginTop: hp(3.4),
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.Colors.electricBlue
  }
})

const mapStateToProps = state => ({
  isLoading: isLoading(state) || authSelectors.getLoading(state, 'registerUser')
})

const mapDispatchToProps = dispatch => ({
  requestGoogleSignIn: R.compose(
    dispatch,
    requestGoogleSignIn
  ),
  requestFacebookSignIn: R.compose(
    dispatch,
    requestFacebookSignIn
  ),
  requestAlternateFacebookSignIn: R.compose(
    dispatch,
    requestAlternateFacebookSignIn
  ),
  registerUser: R.compose(
    dispatch,
    authActions.registerUser
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
