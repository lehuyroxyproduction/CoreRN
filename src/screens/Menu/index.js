import React from 'react'
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'

import * as R from 'ramda'
import { connect } from 'react-redux'
import { authSelectors, authActions } from 'reducers'
import { Icons, Logos } from 'images'
import { Container } from 'components/Container'
import { ImageContent } from 'components'
import { Colors, Fonts } from 'themes'
import { Header, Text, View } from 'components/ui'
import { hp, STATUS_BAR_STYLE, wp } from 'constant'
import FastImage from 'react-native-fast-image'
import I18n from 'react-native-i18n'
import Button from 'components/ui/Button'
import items from 'components/MenuItems'
import { AlertUtils } from '../../components/ultilities/AlertUtils'
import { from } from 'rxjs/observable/from'
// import Toast from 'react-native-easy-toast'

type Props = {
  onClosePress: Function,
  onRoutePress: Function,
  onLogoutPress: Function
}
class Menu extends React.PureComponent<Props> {
  render() {
    const { onClosePress, user, onRoutePress, onLogoutPress, isLoading, tempUser } = this.props
    let avatarPic =
      (!R.isNil(user.avatar) &&
        !R.isEmpty(user.avatar) && {
        uri: user.avatar + '?t=' + new Date().getUTCMilliseconds(),
        priority: FastImage.priority.high
      }) ||
      (!R.isNil(tempUser.photo_url) &&
        !R.isEmpty(tempUser.photo_url) && {
        uri: tempUser.photo_url,
        priority: FastImage.priority.high
      }) ||
      Logos.logo3
    return (
      <Container barStyle={STATUS_BAR_STYLE.LIGHT} isLoading={isLoading} alignCenter backgroundColor={Colors.blackBg}>
        {/* Close */}
        <Header width="100%" rightIcon={Icons.icClose} icRightTintColor="white" onRightIcPress={onClosePress} />
        <View row justifyCenter alignCenter>
          {/* Avatar */}
          <View height={wp(21)} width={wp(21)}>
            <ImageContent
              source={avatarPic}
              style={{
                width: wp(21),
                height: wp(21),
                borderRadius: wp(21) / 2
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Image source={Icons.icKing} style={styles.kingIcon} />
          </View>

          {/* User */}
          <View start={wp(4)}>
            <Text demiBold color="white">
              {(user && user.name) || 'Liv3ly Name'}
            </Text>

            <Text smaller color={Colors.brownGrey}>
              {(user && user.total_points) || 0} {I18n.t('Point')} >
            </Text>
          </View>
        </View>

        {/* Routes */}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            marginVertical: hp(10),
            justifyContent: 'space-between'
          }}
          showsVerticalScrollIndicator={false}>
          {items.map((route, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.linkButton}
                onPress={
                  route.screen === ''
                    ? () => AlertUtils.alert(null, 'Coming soon...')
                    : () => onRoutePress(route.screen)
                }>
                <Text smaller color="white">
                  {I18n.t(route.name)}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Log out */}
        <Button
          title={I18n.t('Logout')}
          textStyle={{
            fontSize: Fonts.size.smaller,
            fontFamily: Fonts.face.demiBold
          }}
          icon={Icons.icLogout}
          onPress={onLogoutPress}
          style={{ bottom: hp(4) }}
          contentColor="white"
          color="transparent"
        />
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  linkButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  kingIcon: {
    position: 'absolute',
    bottom: 0,
    end: 0
  }
})
const mapStateToProps = state => ({
  // onMainSwipeStartStatus: authSelectors.getOnMainSwipeStart(state)
  user: authSelectors.getUser(state),
  tempUser: authSelectors.getSocialUser(state),
  isLoading: authSelectors.getLoading(state, 'logout')
})

const mapDispatchToProps = {}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
