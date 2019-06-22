import * as React from 'react'
import { ActivityIndicator, Image, StyleProp, StyleSheet, TextStyle } from 'react-native'
import Touchable from '../Touchable'
import { Colors, Metrics } from 'themes'
import { Text, View } from 'components/ui'
import FastImage from 'react-native-fast-image'

export interface ButtonProps {
  isEnabled?: boolean;
  isBusy?: boolean;
  circular?: boolean;
  color?: string;
  contentColor?: string;
  icon?: any;
  title?: string;
  lowerCase?: boolean;
  style?: StyleProp;
  textStyle?: TextStyle;
  touchStyle?: StyleProp;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  isLocked?: boolean;
}

class Button extends React.PureComponent<ButtonProps> {
  renderContent = () => {
    const { isBusy, title, icon, contentColor, children, textStyle, lowerCase } = this.props
    if (isBusy) {
      return <ActivityIndicator size="small" color={contentColor} />
    }

    if (!title && !icon) {
      return children
    }

    return (
      <View style={styles.buttonContent}>
        {!!icon && <Image source={icon} style={{ tintColor: contentColor, alignSelf: 'center' }} />}

        {!!title && (
          <Text smaller bold color={contentColor} style={[icon && { marginLeft: Metrics.Spacing.small }, textStyle]}>
            {(!lowerCase && title.toUpperCase()) || title}
          </Text>
        )}
      </View>
    )
  }

  render = () => {
    const {
      isEnabled,
      isBusy,
      circular,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      color,
      style,
      touchStyle,
      isLocked
    } = this.props
    return (
      <View
        style={[
          styles.button,
          circular && styles.circular,
          { backgroundColor: color },
          isLocked ? { opacity: 0.38 } : null,
          style
        ]}>
        <Touchable
          isEnabled={isEnabled && !isBusy && !isLocked}
          borderless
          style={touchStyle || styles.touchStyle}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          {this.renderContent()}
        </Touchable>
      </View>
    )
  }
}

Button.defaultProps = {
  isEnabled: true,
  isBusy: false,
  circular: false,
  color: Colors.electricBlue,
  contentColor: Colors.white,
  onPress: () => {},
  onLongPress: () => {},
  onPressIn: () => {},
  onPressOut: () => {},
  isLocked: false
}

export default Button

const styles = StyleSheet.create({
  button: {
    minHeight: Metrics.Spacing.small * 5
  },
  touchStyle: {
    flex: 1,
    alignSelf: 'stretch'
    // paddingHorizontal: Metrics.Spacing.big,
    // paddingVertical: Metrics.Spacing.medium
  },
  circular: {
    width: Metrics.Spacing.xSmall * 14,
    height: Metrics.Spacing.xSmall * 14,
    borderRadius: Metrics.Spacing.xSmall * 7
  },
  buttonContent: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
