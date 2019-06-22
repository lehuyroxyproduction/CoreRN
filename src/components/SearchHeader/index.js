import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { View, Text, TextInput } from 'components/uielements'
import { Icons } from 'images'
import {Colors, Metrics} from 'themes'
import { HEADER_HEIGHT, wp } from 'constants'

type Props = {
  title?: String,
  placeholder?: String,
  onChangeText?: Function,
  onFilterButtonClick?: Function
}

export const SearchHeader = (props: Props) => {
  const {title, placeholder, onChangeText, onFilterButtonClick} = props

  return (
    <LinearGradient
      start={{x: 0.1, y: 0.6}}
      end={{x: 0.8, y: 1.0}}
      colors={['rgba(251,190,38,1)', Colors.dustyOrange]}
      style={styles.headerGradient}>
      {title ? (
        <View flex centerHorizontal>
          <Text bold color="white">
            {title}
          </Text>
        </View>
      ) : (
        <View flex row>
          <View flex centerVertical>
            <Image style={styles.searchIcon} source={Icons.searchWhite} />

            <TextInput
              style={styles.searchInput}
              selectionColor="white"
              placeholder={placeholder}
              placeholderTextColor="white"
              onFocus={() => {}}
              onChangeText={onChangeText}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={onFilterButtonClick}>
            <Image style={styles.filterIcon} source={Icons.filter} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: '92%',
              height: '100%',
              backgroundColor: 'transparent'
            }}
            onPress={() =>
              alert('Chức năng đang phát triển, vui lòng quay lại sau.')
            }
          />
        </View>
      )}
    </LinearGradient>
  )
}

SearchHeader.defaultProps = {
  placeholder: 'Bạn đang muốn tìm việc gì?',
  onChangeText: () => {}
}

const styles = StyleSheet.create({
  headerGradient: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    paddingTop: getStatusBarHeight(),
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    width: wp(4.5),
    resizeMode: 'contain',
    // marginTop: 4,
    marginStart: wp(3)
    // marginLeft: 16
  },
  searchInput: {
    height: 35,
    color: 'white',
    fontSize: 13,
    paddingStart: wp(11),
    // paddingLeft: wp(8),
    // marginRight: 16,
    marginEnd: wp(3),
    borderRadius: 10,
    backgroundColor: '#rgba(255,255,255,.24)'
  },
  filterButton: {
    width: '7%',
    height: '100%'
  },
  filterIcon: {
    flex: 1,
    resizeMode: 'contain'
  }
})
