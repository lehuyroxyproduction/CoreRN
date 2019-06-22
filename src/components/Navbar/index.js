import React from 'react'
import PropTypes from 'prop-types'
import {Platform, Image} from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { View, Text, Touchable } from 'components/uielements'

import { Metrics } from 'themes'

export class Navbar extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    buttons: PropTypes.shape({
      left: PropTypes.array,
      right: PropTypes.array
    }),
    navbarColor: PropTypes.string,
    isDrawnUnderNavbar: PropTypes.bool
  }

  render() {
    let buttons = this.props.buttons

    const { title, titleColor, navbarColor, isDrawnUnderNavbar } = this.props

    if (!buttons.hasOwnProperty('left') && buttons.hasOwnProperty('right')) {
      buttons = { ...buttons, left: [{}] }
    }

    if (!buttons.hasOwnProperty('right') && buttons.hasOwnProperty('left')) {
      buttons = { ...buttons, right: [{}] }
    }

    if (buttons.hasOwnProperty('left') && buttons.hasOwnProperty('right')) {
      if (buttons.left.length > buttons.right.length) {
        buttons.right = [
          ...new Array(buttons.left.length - buttons.right.length).fill({}),
          ...buttons.right
        ]
      } else {
        buttons.left = [
          ...buttons.left,
          ...new Array(buttons.right.length - buttons.left.length).fill({})
        ]
      }
    }

    return (
      <View
        row
        fillHorizontal
        centerHorizontal
        absolute={isDrawnUnderNavbar}
        background={navbarColor}
        style={{
          width: Metrics.screen.width,
          height: Metrics.navbar.height,
          paddingHorizontal: 4,
          paddingTop: DeviceInfo.hasNotch() ? 45 : 18
        }}>
        {buttons.left &&
          buttons.left.map(({ icon, onPress }, id) => (
            <Touchable
              key={id}
              //   flex={id > 0 ? 0.8 : 1}
              round={50}
              disabled={!icon}
              onPress={onPress}
              rippleColor={titleColor}>
              <Image style={{ tintColor: titleColor }} source={icon} />
            </Touchable>
          ))}

        <View center flex={buttons.left && buttons.left.length > 1 ? 2.5 : 4}>
          <Text style={{ fontSize: 20 }} color={titleColor}>
            {title}
          </Text>
        </View>

        {buttons.right &&
          buttons.right.map(({ icon, onPress }, id) => (
            <Touchable
              key={id}
              //   flex={id > 0 ? 0.8 : 1}
              round={50}
              disabled={!icon}
              onPress={onPress}>
              <Image style={{ tintColor: titleColor }} source={icon} />
            </Touchable>
          ))}
      </View>
    )
  }
}
