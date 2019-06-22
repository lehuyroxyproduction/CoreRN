import React from 'react'
import { FlatList, Image, TouchableOpacity } from 'react-native'
import { Text, View } from 'components/uielements'
import { Icons } from 'images'
import { hp, wp } from 'constants'
import { Colors } from 'themes'
import reject from 'lodash/reject'

export default class ItemList extends React.PureComponent {
  _itemSelected = item => {
    const { uniqueKey, selectedItems } = this.props
    return selectedItems.indexOf(item[uniqueKey]) !== -1
  }

  _getRow = item => {
    const { displayKey } = this.props
    return (
      <TouchableOpacity onPress={() => this._toggleItem(item)} style={{ paddingHorizontal: wp(6) }}>
        <View row centerHorizontal>
          <Text
            style={{
              flex: 1,
              color: Colors.slate,
              paddingVertical: hp(1)
            }}>
            {item[displayKey]}
          </Text>
          {this._itemSelected(item) ? <Image source={Icons.checked2} /> : <Image source={Icons.unchecked2} />}
        </View>
      </TouchableOpacity>
    )
  }

  _toggleItem = item => {
    const { uniqueKey, selectedItems, onSelectedItemsChange } = this.props
    const status = this._itemSelected(item)
    let newItems = []
    if (status) {
      newItems = reject(selectedItems, singleItem => item[uniqueKey] === singleItem)
    } else {
      newItems = [...selectedItems, item[uniqueKey]]
    }
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems)
  }

  render() {
    const { items, uniqueKey, selectedItems } = this.props
    return (
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        renderItem={rowData => this._getRow(rowData.item)}
        data={items}
        extraData={selectedItems}
        keyExtractor={item => item[uniqueKey]}
      />
    )
  }
}
