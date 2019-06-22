import React from 'react'
import { connect } from 'react-redux'
import { Alert, Image, StyleSheet } from 'react-native'

import { Container } from 'components'
import { View, Text, Touchable } from 'components/uielements'

import { actions, selectors } from 'reducers/user'
import { actions as authActions } from 'reducers/auth'
import { selectors as appSelectors } from 'reducers/app'

import { betterWarning } from 'utils/betterError'
import { Icons, Images } from 'images'
import LoadingView from 'loading/LoadingView'
import { hp } from 'constants'
import { Colors } from 'themes/Colors'
import Toast from 'components/Toast'

class More extends React.Component {
  state = { x: null, y: null, avatar: null }

  componentWillMount() {
    this.props.getUserInfo()
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (this.props.user !== nextProps.user) {
      this.setState({ avatar: this.props.user.avatar })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.user !== nextProps.user) {
  //     this.setState({avatar: this.props.user.avatar})
  //   }
  // }

  onProfilePress = () => {
    // this.props.push('Profile', {
    //   callbackAvatar: avatar => this.setState({avatar})
    // })
    this.props.push({ screen: 'Profile', passProps: { callbackAvatar: avatar => this.setState({ avatar }) } })
  }

  onWalletPress = () => {
    betterWarning()
  }

  onContactPress = () => {
    betterWarning()
  }

  onLogoutPress = () => {
    Alert.alert('', 'Bạn có muốn đăng xuất?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel log out'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => this.props.logout()
      }
    ])
  }

  renderUserName = () => {
    const { first_name } = this.props.user

    return (
      <View style={{ marginTop: 54, marginBottom: 24 }}>
        <Text color="white" bold>
          {first_name && 'Xin chào,'}
        </Text>

        <Text color="white" bold style={{ fontSize: 28 }}>
          {first_name.toUpperCase()}
        </Text>
      </View>
    )
  }

  renderToast = () =>{
    return <Toast />
  }

  renderBarcode = link => {
    return (
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <Text bold>Mã Vạch Điểm Danh</Text>
        <Image style={{ width: '100%', height: hp(8) }} source={{ uri: link }} />
      </View>
    )
  }

  render() {
    const { barcode, getUserBarcodeLoading } = this.props
    const TouchableWithConnection = ({ title, description, onPress, children }) => {
      return (
        <Touchable
          rippleStyle={styles.panelButton}
          rippleCentered={false}
          onPress={() => {
            if (this.props.netInfo) {
              onPress()
            } else {
              alert('Không có kết nối mạng')
            }
          }}>
          {children}

          <View style={{ marginLeft: 16, flex: 4 }}>
            <Text tiny>{description}</Text>

            <Text bold>{title}</Text>
          </View>

          <Image style={styles.chevron} source={Icons.chevronRight} />
        </Touchable>
      )
    }
    return (
      <Container
        padding={20}
        centerVertical
        isDrawnUnderNavbar
        statusbarColor="light-content"
        background={Images.moreBackground}>
        {this.renderUserName()}

        <View
          padding={18}
          background={Colors.white}
          style={styles.panel}
          onLocation={({ x, y }) => this.setState({ x, y })}>
          <Text bold small>
            Bạn có thể
          </Text>

          {/* Profile */}
          <TouchableWithConnection
            title="Thông tin cá nhân"
            description="Chỉnh sửa và cập nhật"
            onPress={this.onProfilePress}>
            <Image style={styles.panelButtonIcon} source={Icons.profile} />
          </TouchableWithConnection>

          {/* Wallet */}
          <TouchableWithConnection title="Ví Ezpay" description="Kiểm tra tài khoản" onPress={this.onWalletPress}>
            <Image style={styles.panelButtonIcon} source={Icons.wallet} />
          </TouchableWithConnection>

          {/* Contact */}
          <TouchableWithConnection title="Liên hệ Ezjob" description="Giải đáp thắc mắc" onPress={this.onContactPress}>
            <Image style={styles.panelButtonIcon} source={Icons.contact} />
          </TouchableWithConnection>

          {/* Logout */}
          <TouchableWithConnection title="Đăng xuất" description="Chọn" onPress={this.onLogoutPress}>
            <Image style={styles.panelButtonIcon} source={Icons.logout} />
          </TouchableWithConnection>
          {barcode && barcode.link && this.renderBarcode(barcode.link)}
        </View>
        {/* Avatar */}
        {this.state.avatar ? (
          <View
            center
            style={[
              {
                top: this.state.y - 126 / 2,
                right: this.state.x + 8
              },
              styles.avatarShadow
            ]}
            background={Images.avatarShadow}>
            <Image style={styles.avatar} source={{ uri: this.state.avatar }} />
          </View>
        ) : null}

        {getUserBarcodeLoading && <LoadingView />}
        {this.renderToast()}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  panel: {
    marginBottom: 54,
    paddingVertical: 25,
    borderRadius: 18
  },
  panelButton: {
    height: 65,
    marginTop: 16,
    borderWidth: 0.8,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  panelButtonIcon: {
    width: 75,
    height: 75,
    resizeMode: 'contain'
  },
  chevron: {
    flex: 1,
    width: 10,
    height: 10,
    resizeMode: 'contain'
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2
  },
  avatarShadow: {
    width: 126,
    height: 126,
    borderRadius: 126 / 2,
    position: 'absolute'
  },
  barcode: {
    flex: 1,
    width: null,
    height: null
  }
})

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  netInfo: appSelectors.getNetInfo(state),
  barcode: selectors.getUserBarcode(state),
  getUserBarcodeLoading: selectors.getLoading(state, 'getUserBarcode')
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
  getUserInfo: () => dispatch(actions.getUserInfo()),
  getUserBarcode: () => dispatch(actions.getUserBarcode())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(More)
