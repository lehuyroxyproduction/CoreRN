import React from 'react'
import { AppState, ActivityIndicator, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Container } from 'components'
import { View, Text, Touchable } from 'components/uielements'

import { Icons, Images } from 'images'

import { accountkit } from 'services'

import { selectors as appSelectors } from 'reducers/app'
import { actions, selectors } from 'reducers/user'
import {
  actions as authActions,
  selectors as authSelectors
} from 'reducers/auth'

import { appConfig } from 'config'
import {Colors} from 'themes'

class Login extends React.PureComponent {
  componentDidMount() {
    console.log('init Login page -=========')
    accountkit.logout()

    this.props.getSetting()
  }

  login = phoneNumber => {
    this.props.setUserInfo({ phone_number: phoneNumber })

    this.props.login({ phoneNumber })
  }

  async checkAccount() {
    try {
      if (!(await accountkit.getCurrentAccount())) {
        return
      }

      accountkit.getCurrentAccount().then(account => {
        if (account.phoneNumber) {
          const { countryCode, number } = account.phoneNumber

          if (!this.props.user.user_id) {
            this.login(countryCode + number)
          }
        }
      })
    } catch (e) {
      // console.log(e.message)
    }
  }

  returnedFromAccountKit = (nextState: string) => {
    if (nextState !== 'enable') {
      return
    }

    AppState.removeEventListener('change', this.returnedFromAccountKit)
    this.checkAccount()
  }

  loginWithPhone = () => {
    if (this.props.isLoginWithPassword) {
      this.props.push({screen:'LoginWithPassword'})
    } else {
      if (appConfig.bypassUser.enabled) {
        this.login(appConfig.bypassUser.phoneNumber)
      } else {
        if (this.props.netInfo) {
          AppState.addEventListener('change', this.returnedFromAccountKit)
          accountkit.loginWithPhone().then(() => this.checkAccount()) // callback for ios only
        } else {
          alert('Không có kết nối mạng')
        }
      }
    }
  }

  renderLoginButton() {
    if (this.props.isLoading || this.props.status === 'success') {
      return (
        <ActivityIndicator
          style={{ marginBottom: 8 }}
          size="large"
          color="white"
        />
      )
    }

    return (
      <Touchable style={styles.loginButton} onPress={this.loginWithPhone}>
        <View row centerHorizontal>
          <Text bold color={Colors.coral} style={{ marginHorizontal: 10 }}>
            Đăng nhập
          </Text>

          <Image style={styles.arrow} source={Icons.right} />
        </View>
      </Touchable>
    )
  }

  render() {
    return (
      <Container
        center
        padding={38}
        // isDrawnUnderNavbar
        // statusbarColor="light-content"
        background={Images.loginBackground}>
        <Image style={styles.logo} source={Images.logo} />

        <Text bold color="white" style={styles.appName}>
          Ezjob
        </Text>

        <Text center small color="white" style={{ marginBottom: 30 }}>
          Dùng số điện thoại để đăng ký và sử dụng các dịch vụ ưu đãi của Ezjob
        </Text>

        {this.renderLoginButton()}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 28,
    marginTop: 12,
    marginBottom: 12
  },
  arrow: {
    width: 20,
    height: 20,
    tintColor: Colors.coral,
    resizeMode: 'contain'
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: -20,
    resizeMode: 'contain'
  },
  loginButton: {
    width: '60%',
    height: 45,
    borderRadius: 30,
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  netInfo: appSelectors.getNetInfo(state),
  status: authSelectors.getStatus(state),
  isLoading: authSelectors.getLoading(state),
  isLoginWithPassword: authSelectors.getLoginWithPassword(state)
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(authActions.login(user)),
  getSetting: () => dispatch(authActions.getSetting()),
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
