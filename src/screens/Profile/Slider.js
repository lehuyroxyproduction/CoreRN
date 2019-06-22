import React from 'react'
import Proptypes from 'prop-types'
import { Alert } from 'react-native'
import { View, ScrollView, StyleSheet } from 'react-native'

import { Colors } from 'themes'
import { Text, Touchable } from 'components/uielements'

export const TAB_1_POS = 0
export const TAB_2_POS = 1
export const TAB_3_POS = 2

const TAB_1_LABEL = 'CÁ NHÂN'
const TAB_2_LABEL = 'NGƯỜI THÂN'
const TAB_3_LABEL = 'TK NGÂN HÀNG'

export default class Slider extends React.Component {
  static propTypes = {
    onEditMode: Proptypes.bool,
    onSelectionChange: Proptypes.func
  }

  state = { currentPos: 0 }

  render() {
    const { currentPos } = this.state
    const { onEditMode } = this.props

    const TabButton = ({ label, pos }) => {
      onPress = () => {
        this.setState({ currentPos: pos })
        this.props.onSelectionChange(pos)
      }

      return (
        <Touchable
          radius={15}
          gradient={pos === currentPos}
          style={styles.tabButton}
          onPress={
            !onEditMode
              ? onPress
              : () => {
                Alert.alert(
                  '',
                  'Hãy hoàn tất chỉnh sửa trước khi chuyển tab!',
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'OK'
                    }
                  ]
                )
              }
          }>
          <Text
            tiny
            bold
            color={pos === currentPos ? 'white' : Colors.cloudyBlue}
            style={{ marginHorizontal: 16 }}>
            {label}
          </Text>
        </Touchable>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TabButton label={TAB_1_LABEL} pos={TAB_1_POS} />
          <TabButton label={TAB_2_LABEL} pos={TAB_2_POS} />
          <TabButton label={TAB_3_LABEL} pos={TAB_3_POS} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    paddingHorizontal: 8
  },
  tabButton: {
    height: 30,
    marginHorizontal: 4
  }
})
