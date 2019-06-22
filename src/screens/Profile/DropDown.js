import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { DropDown } from 'components'
import { Text } from 'components/uielements'

import { Icons } from 'images'
import { Colors, Fonts, Metrics } from 'themes'

type Props = {
  label: String,
  options: Array<String>,
  onSelect: Function
}

const CustomDropDown = (props: Props) => {
  const { label, options, onSelect, defaultValue } = props

  return (
    <View style={{ marginVertical: 10 }}>
      <Text small style={{ marginBottom: 4 }}>
        {label}
      </Text>

      <DropDown
        style={styles.container}
        textStyle={styles.textStyle}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        renderSeparator={() => {
          color: 'white'
        }}
        defaultValue={defaultValue}
        options={options}
        onSelect={index => onSelect(index)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.veryLightPink
  },
  textStyle: {
    marginLeft: 12,
    color: Colors.steel,
    fontSize: 14,
    fontFamily: Fonts.face.bold
  },
  dropdownStyle: {
    width: '86%'
  },
  dropdownTextStyle: {
    paddingLeft: 12,
    color: Colors.steel,
    fontSize: 16,
    fontFamily: Fonts.face.bold
  }
})

export default CustomDropDown
