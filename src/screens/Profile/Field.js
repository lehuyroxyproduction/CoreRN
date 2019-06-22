import React from 'react'
import Proptypes from 'prop-types'
import { StyleSheet } from 'react-native'

import { Colors } from 'themes'
import { View, Text, TextInput } from 'components/uielements'

export default class Field extends React.Component {
  state = { isFocused: false }

  onFocusChange = (isFocused: boolean) => {
    this.setState({ isFocused })
  }

  focus = () => {
    this.refs.input.focus()
  }

  render() {
    const { isFocused } = this.state

    const {
      label,
      content,
      isRequired,
      isEditMode,
      onChangeText = () => {},
      style
    } = this.props

    const NONE = isEditMode ? '' : 'chưa cập nhật'

    return (
      <View style={[styles.fieldWrapper, style]}>
        <Text small>
          {label}
          {isRequired && (
            <Text small color={Colors.coral}>
              *
            </Text>
          )}
          :
        </Text>

        <TextInput
          {...this.props}
          ref="input"
          style={[
            styles.fieldInput,
            {
              borderColor: Colors.coral,
              borderWidth: isEditMode ? 1 : 0,
              backgroundColor: isFocused ? 'white' : Colors.veryLightPink
            }
          ]}
          editable={isEditMode}
          ellipsizeMode={'tail'}
          placeholder={NONE}
          onFocus={() => this.onFocusChange(true)}
          onEndEditing={() => this.onFocusChange(false)}
          onChangeText={onChangeText}
          background={Colors.veryLightPink}>
          <Text bold small>
            {content}
          </Text>
        </TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fieldWrapper: {
    marginVertical: 12
  },
  fieldInput: {
    fontSize: 14,
    marginTop: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12
  }
})
