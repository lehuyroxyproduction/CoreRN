import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, TextInput as RNTextInput } from 'react-native'

import { Text, Touchable } from 'components/uielements'

import { Colors, Fonts } from 'themes'

import { Icons } from 'images'

export class TextInput extends React.Component {
  state = { text: '' }

  static propTypes = {
    error: PropTypes.bool,
    errorText: PropTypes.string,
    errorTextColor: PropTypes.string,

    bold: PropTypes.bool,
    textColor: PropTypes.string,

    placeholder: PropTypes.string,
    selectionColor: PropTypes.string,

    onClearText: PropTypes.func,
    onChangeText: PropTypes.func
  }

  static defaultProps = {
    errorText: 'error',
    errorTextColor: 'salmon',

    onClearText: () => {},
    onChangeText: () => {}
  }

  onClearText = () => {
    this.props.onClearText()
    this.clear()
  }

  onChangeText = text => {
    this.setState({ text })
    this.props.onChangeText(text)
  }

  blur = () => {
    this.refs.input.blur()
  }

  focus = () => {
    this.refs.input.focus()
  }

  clear = () => {
    this.refs.input.clear()
  }

  isFocused = () => {
    return this.refs.input.isFocused()
  }

  render() {
    const {
      style,
      containerStyle,
      bold,
      center,
      textColor,
      error,
      errorText,
      errorTextColor,
      placeholder,
      placeholderTextColor,
      selectionColor = 'black',
      backgroundColor = 'white'
    } = this.props

    return (
      <View style={containerStyle}>
        {error &&
          <Text style={{ marginTop: 0 }} color={errorTextColor} small center>
            {errorText}
          </Text>}

        <RNTextInput
          {...this.props}
          ref={'input'}
          style={[
            {
              color: Colors.slate,
              textAlign: center ? 'center' : 'auto',
              paddingLeft: center ? 0 : 12,
              paddingVertical: 0,
              fontSize: 16,
              fontFamily: !bold ? Fonts.face.normal : Fonts.face.bold,
              backgroundColor
            },
            style
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || Colors.warmGrey}
          selectionColor={selectionColor}
          underlineColorAndroid="transparent"
          onChangeText={this.onChangeText}
        >
          {this.props.children}
        </RNTextInput>

        {/* {this.state.text && this.props.onClearText
          ? <Touchable
              round={30}
              style={{
                position: 'absolute',
                right: '5%',
                bottom: error ? '11%' : '21%'
              }}
              onPress={this.onClearText}
            >
              <Image
                style={{ width: 12, height: 12, resizeMode: 'contain' }}
                source={Icons.delete}
              />
            </Touchable>
          : null} */}
      </View>
    )
  }
}
