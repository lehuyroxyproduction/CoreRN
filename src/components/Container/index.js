import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Platform, StatusBar, ScrollView, StyleSheet } from 'react-native'
import { Navbar } from 'components'
import { View } from 'components/uielements'

import { isLightColor } from 'utils/colors'

import { Colors } from 'themes'
import store from 'store'
import { appActions } from 'reducers'

export class Container extends React.PureComponent {
  static propTypes = {
    buttons: PropTypes.shape({
      left: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.number.isRequired,
          onPress: PropTypes.func
        })
      ),
      right: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.number.isRequired,
          onPress: PropTypes.func
        })
      )
    }),
    title: PropTypes.string,
    titleColor: PropTypes.string,
    isLoading: PropTypes.bool,
    loadingColor: PropTypes.string,
    animated: PropTypes.bool,
    scrollable: PropTypes.bool,
    padding: PropTypes.number,
    center: PropTypes.bool,
    centerVertical: PropTypes.bool,
    centerHorizontal: PropTypes.bool,
    statusbarColor: PropTypes.string,
    background: PropTypes.string,
    navbarColor: PropTypes.string,
    isNavbarHidden: PropTypes.bool,
    isDrawnUnderNavbar: PropTypes.bool
  }

  static defaultProps = {
    title: '',
    titleColor: 'black',
    buttons: {},
    isLoading: false,
    loadingColor: Colors.coral,
    animated: false,
    scrollable: false,
    padding: 0,
    center: false,
    centerVertical: false,
    centerHorizontal: false,
    statusbarColor: 'dark-content',
    background: 'white',
    navbarColor: 'transparent',
    isNavbarHidden: false,
    isDrawnUnderNavbar: false
  }

  renderLoading() {
    return (
      <View style={styles.loading} center>
        <ActivityIndicator size="large" color={this.props.loadingColor} />
      </View>
    )
  }

  renderStatusBar() {
    const { navbarColor, background, statusbarColor } = this.props

    return (
      <StatusBar
        barStyle={
          statusbarColor
            ? Platform.OS === 'ios'
              ? statusbarColor
              : navbarColor
                ? isLightColor(navbarColor)
                  ? 'dark-content'
                  : 'light-content'
                : isLightColor(background)
                  ? 'dark-content'
                  : 'light-content'
            : ''
        }
        backgroundColor="transparent"
        translucent
      />
    )
  }

  renderNavbar() {
    const { title, titleColor, navbarColor, buttons = {}, isDrawnUnderNavbar } = this.props

    return (
      <Navbar
        title={title}
        titleColor={titleColor || (navbarColor ? (isLightColor(navbarColor) ? 'black' : 'white') : 'black')}
        buttons={buttons}
        navbarColor={navbarColor}
        isDrawnUnderNavbar={isDrawnUnderNavbar}
      />
    )
  }

  render() {
    const {
      isLoading,
      scrollable,
      padding,
      center,
      centerVertical,
      centerHorizontal,
      background,
      isNavbarHidden,
      isDrawnUnderNavbar,
      style,
      children
    } = this.props

    return (
      <View flex background={background} style={style}>
        {!isNavbarHidden && !isDrawnUnderNavbar && this.renderNavbar()}

        {this.renderStatusBar()}

        {scrollable ? (
          <ScrollView style={[styles.scrollable, { backgroundColor: background }]} showsVerticalScrollIndicator={false}>
            {this.renderNavbar()}

            {isLoading ? this.renderLoading() : children}
          </ScrollView>
        ) : (
          <View
            flex
            center={center}
            padding={padding}
            centerVertical={centerVertical}
            centerHorizontal={centerHorizontal}>
            {isLoading ? this.renderLoading() : children}
          </View>
        )}

        {!scrollable && !isNavbarHidden && isDrawnUnderNavbar && this.renderNavbar()}

        {!isLoading && this.props.frontComponent}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollable: {
    flex: 1
  },
  loading: {
    width: '100%',
    height: '100%'
  }
})
