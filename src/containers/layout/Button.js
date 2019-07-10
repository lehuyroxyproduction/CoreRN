import * as React from 'react'
import { ActivityIndicator, Image, StyleProp, StyleSheet, TextStyle } from 'react-native'
import Touchable from '../components/Touchable'
import { Text, View } from '../'
import { Metrics } from '../libs/themes'
import {Colors} from '../../constants/constants'
import {styles} from './styles/btn.styles'


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

export default class Button extends React.PureComponent<ButtonProps> {

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
          <Text 
            smaller 
            bold 
            color={contentColor} 
            style={[
              icon && { margin: Metrics.Spacing.small },
              styles.textTitle, 
              textStyle]}
            >
            {title}
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
        ]}
      >
          <Touchable
            isEnabled={isEnabled && !isBusy && !isLocked}
            borderless
            style={touchStyle || styles.touchStyle}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
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

