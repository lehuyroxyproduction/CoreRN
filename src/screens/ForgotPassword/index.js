/* eslint-disable no-unused-vars */
import React from 'react'
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Header, Text, TextInput, View } from 'components/ui'
import { hp, isAndroid, STATUS_BAR_STYLE, wp } from 'constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Icons } from 'images'
import { Container } from 'components'
import { Colors, Fonts, Themes } from 'themes'
import { connect } from 'react-redux'
import { isEmailValid } from 'utils'
import I18n from 'react-native-i18n'
import normalize from 'utils/normalizeSize'
import validate from 'validate.js'
import { authActions, authSelectors } from 'reducers'



type Props = {}
type State = {}

class ForgotPassword extends React.PureComponent<Props, State> {
  state = {
    email: '',
    emailCheck: null,
  }
  submit = () => {
    let sub = this.validateOnFormForgetPassword(this.state.email) ? -1 : 1
    if (sub === -1)
    {
       this.setState({emailCheck: sub})
    }
    else{
      
      const onSuccess = () => this.props.push({ screen: 'CheckEmail' })
      let email = this.state.email
      this.props.requestForgotPassword({
        email,
        meta: {
          onSuccess
        }
      })

    }
    
  }
  handleCheckEmailFromText = (email) => {
    this.setState({
      email: email
    },() => {
      let error = this.validateOnFormForgetPassword(email)
       let check = error && error.email ? -1 : 1 
       this.setState({
          emailCheck: check
        })

    })
    

  }
  validateOnFormForgetPassword = (email) => {
    var constraints = {
      email: {
         presence: {
             message: "Email not empty"
         },
         email: {
            message: "Email is invalid"
         }
      }
    }
    const error = validate({
      email: email
    },
      constraints,
      { fullMessages: false }
    )
    return error

  }
  renderHeader = () => <Header leftIcon={Icons.icBack} onLeftIconPress={() => this.props.pop()} />

  render() {
    // StatusBar.setBackgroundColor('rgba(0,0,0,0)')
    // StatusBar.setTranslucent(true)
    // StatusBar.setBarStyle(STATUS_BAR_STYLE.DARK, true)
    const { emailCheck } = this.state
    let icClose = isAndroid ? 'md-close' : 'ios-close'
    let icCheck = isAndroid ? 'md-checkmark' : 'ios-checkmark'
    let icEmailCheckColor = emailCheck === 1 ? Colors.electricBlue : 'red'
    let icEmailCheck = emailCheck === 1 ? icCheck : icClose
    const { isLoading } = this.props

    return (
      <Container touchableWithoutFeedback barStyle={STATUS_BAR_STYLE.DARK} isLoading={isLoading} >
        {this.renderHeader()}
        <View style={styles.container}>
          <Text xlarge bold>
            {I18n.t('Forgot') + '\n' + I18n.t('Password')}
          </Text>

          {/* region LeHuy import */}
          <View style={{ marginTop: hp(3.4) }}>
            <Text style={styles.Content}>{I18n.t('SendEmail')}</Text>
          </View>
          {/* end region  */}

          <View style={{ marginTop: hp(3.4) }}>
            <Text small medium color="rgba(0, 0, 0, 0.3)">
              {I18n.t('EmailOrUsername')}
            </Text>
            <View
              alignCenter
              row
              style={{
                width: '100%',
                height: hp(4.1),
                borderBottomColor: Colors.electricBlue
              }}
              borderBottomWidth={0.8}>
              <TextInput
                demiBold
                smaller
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={email => {
                  this.handleCheckEmailFromText(email)
                }}
                style={{
                  width: '95%',
                  height: '100%',
                  fontSize: Fonts.size.large,
                  paddingRight: 5
                }}
              />

              {emailCheck && <Ionicons name={icEmailCheck} size={normalize(18)} color={icEmailCheckColor} />}
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text bold small style={{ color: 'white' }}>
              {I18n.t('SendRequest')}
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: wp(12.8),
    flex: 1
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0
  },
  Content: {
    fontFamily: Fonts.face.regular,
    fontSize: 14,
    opacity: 0.6,
    height: 75,
    lineHeight: 25
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
  isLoading: authSelectors.getLoading(state, 'forgotPassword')
 
})

const mapDispatchToProps =  {
  requestForgotPassword: authActions.requestForgotPassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword)
