import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { hp, wp, NOTIS } from 'constants'
import { Icons, Images } from 'images'
import { Text, View } from 'components/uielements'
import { Colors } from 'themes'

export default class NotisListItem extends React.PureComponent {
  onItemClick (data) {
    this.props.onItemClick(data)
  }

  render () {
    const {id, title, name, content, data, sent_at, status} = this.props.item
    let image = status === NOTIS.READ ? Images.logoGrey : Images.logoOrange
    let titleColor = status === NOTIS.READ ? Colors.slate : Colors.dustyOrange
    let dot = status === NOTIS.READ ? Icons.circleGray : Icons.circleOrange
    return <TouchableOpacity
      style={styles.listItem}
      onPress={() => this.onItemClick({id, data})}>
      <Image style={{marginHorizontal: wp(4)}} source={image}/>
      <View style={{justifyContent: 'space-between'}}>
        <Text bold small color={titleColor} numberOfLines={1}>
          {title}
        </Text>
        <Text tiny color={Colors.steel} numberOfLines={2}>
          {content}
        </Text>
        <View row style={{alignItems: 'center'}}>
          <Image source={dot} style={{marginEnd: wp(2)}}/>
          <Text tiny color={titleColor}>
            {sent_at}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(10),
    borderWidth: 0.8,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingVertical: 4,
    marginVertical: 3,
    marginHorizontal: 6,
    backgroundColor: 'white'
  }
})
