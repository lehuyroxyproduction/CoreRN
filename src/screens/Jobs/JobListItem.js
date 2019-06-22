import React from 'react'
import Swipeout from 'react-native-swipeout'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Text, Touchable, View} from 'components/uielements'
import {Colors, Metrics} from 'themes'
import convert from 'utils/converter'
import {Icons} from 'images'
import {hp, wp, PAYMENT_METHODS} from 'constants'

const supplierIconSize = wp(13.1)
export default class JobListItem extends React.PureComponent {
  render() {
    const {id, name, date, supplier, place, salary, rating, isContractRequired, payMethod} = this.props.item
    console.log('JobListItem----------', this.props.item)

    let swipeoutBtns = [
      {
        component: (
          <Touchable
            gradient
            radius={10}
            rippleCentered={false}
            style={{
              marginHorizontal: 3,
              marginVertical: 6
            }}>
            <Text bold small color="white">
                            ỨNG TUYỂN
            </Text>
          </Touchable>
        ),
        backgroundColor: 'transparent'
      }
    ]

    return (
      <Swipeout
        style={{width: '100%'}}
        autoClose
        right={swipeoutBtns}
        buttonWidth={150}
        backgroundColor={'transparent'}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.props.onItemClick(id)}>
          {supplier.avatar ? (
            <Image style={styles.itemIcon} source={{uri: supplier.avatar}} />
          ) : (
            <View
              style={[
                styles.itemIcon,
                {
                  borderWidth: 1,
                  borderColor: '#EAEAEA'
                }
              ]}
            />
          )}

          <View
            flex
            style={{justifyContent: 'space-between'}}>
            <Text
              bold
              small
              color={Colors.slate}
              numberOfLines={2}>
              {name}
            </Text>
            <View centerHorizontal row style={{ marginVertical: hp(1)}}>
              <View center row style={{justifyContent: 'space-between'}}>
                <Image style={{marginRight: wp(1)}} source={Icons.dollar} />
                <Text bold small color={Colors.dustyOrange}>{salary !== 0 && `${convert.toCurrency(salary)} ` || 'Theo năng suất'}</Text>
              </View>
              <View flex row centerHorizontal style={{justifyContent: 'space-between', start: wp(2)}}>
                {isContractRequired ? <View style={{borderRadius: 6, paddingHorizontal: wp(2), padding: hp(0.2), backgroundColor: Colors.tomato}}><Text center bold tiny style={{ color: 'white', textAlignVertical: 'center'}}>HĐ</Text></View> : <View />}
                {payMethod === PAYMENT_METHODS.CASH ? (
                  <View style={{borderRadius: 6, paddingHorizontal: wp(0.5), backgroundColor: 'red'}}><Text bold tiny style={{color: 'white', textAlignVertical: 'center'}}>Tiền mặt</Text></View>
                ) : <View style={{borderRadius: 6, paddingHorizontal: wp(0.5), backgroundColor: 'green'}}><Text bold tiny style={{color: 'white', textAlignVertical: 'center'}}>Chuyển khoản</Text></View>}
              </View>

            </View>
            <View row center style={{justifyContent: 'space-between'}}>
              <View row>
                <Image style={{marginEnd: wp(1)}} source={Icons.address} />

                <Text tiny numberOfLines={1}>
                  {place}
                </Text>
              </View>
              <View row center>
                <Image style={{marginEnd: wp(2)}} source={Icons.calendar} />

                <Text tiny >
                  {date.start}
                </Text>
              </View>

            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  itemIcon: {
    width: supplierIconSize,
    height: supplierIconSize,
    borderRadius: supplierIconSize / 2,
    marginHorizontal: wp(2),
    alignSelf: 'center'
  },
  listItem: {
    width: '96%',
    borderWidth: 0.8,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingVertical: hp(.5),
    marginVertical: hp(.5),
    marginHorizontal: wp(2),
    paddingEnd: wp(3),
    flexDirection: 'row',
    backgroundColor: 'white'
  }
})
