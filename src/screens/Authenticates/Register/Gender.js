import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux'

import { Container } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import { actions } from 'redux/reducers/user'

import { Colors, Styles } from 'themes'

import { Icons, Images } from 'images'

import timer from 'react-native-timer-mixin'

class Gender extends React.Component {
  state = { selected: [false, false] }

  onSelect(num) {
    timer.clearTimeout(this.timer)

    switch (num) {
      case 0:
        this.setState({ selected: [true, false] }, () => {
          this.props.setUserInfo({ gender: 1 })

          this.timer = timer.setTimeout(
            () => this.props.push({screen:'RegisterAddress'}),
            1500
          )
        })

        break
      case 1:
        this.setState({ selected: [false, true] }, () => {
          this.props.setUserInfo({ gender: 0 })

          this.timer = timer.setTimeout(
            () => this.props.push({screen:'RegisterAddress'}),
            1500
          )
        })
        break
    }
  }

  render() {
    return (
      <Container
        padding={38}
        buttons={{
          left: [{ icon: Icons.back, onPress: () => this.props.pop() }]
        }}>
        <Text color={Colors.coral} bold center>
          Giới tính của bạn là gì?
        </Text>

        <View
          row
          style={{
            paddingVertical: 24,
            paddingHorizontal: 24,
            justifyContent: 'space-around'
          }}>
          <View>
            <LinearGradient
              start={{ x: 0.1, y: 0.6 }}
              end={{ x: 0.8, y: 1.0 }}
              colors={
                this.state.selected[0]
                  ? ['rgba(251,190,38,1)', 'rgba(234,100,66,1)']
                  : ['rgba(255,255,255,1)', 'rgba(255,255,255,1)']
              }
              style={{
                width: 92,
                height: 92,
                borderRadius: 92 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Touchable
                round={84}
                color="lightblue"
                onPress={() => this.onSelect(0)}>
                <Image
                  style={{ width: 84, height: 84, borderRadius: 42 }}
                  source={Images.male}
                />
              </Touchable>
            </LinearGradient>
            <Text center>Nam</Text>
          </View>

          <View>
            <LinearGradient
              start={{ x: 0.1, y: 0.6 }}
              end={{ x: 0.8, y: 1.0 }}
              colors={
                this.state.selected[1]
                  ? ['rgba(251,190,38,1)', 'rgba(234,100,66,1)']
                  : ['rgba(255,255,255,1)', 'rgba(255,255,255,1)']
              }
              style={{
                width: 92,
                height: 92,
                borderRadius: 92 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Touchable
                round={84}
                color="lightcoral"
                onPress={() => this.onSelect(1)}>
                <Image
                  style={{ width: 84, height: 84, borderRadius: 42 }}
                  source={Images.female}
                />
              </Touchable>
            </LinearGradient>

            <Text center>Nữ</Text>
          </View>
        </View>

        <Text tiny center>
          Bạn có thể thay đổi trong mục thông tin cá nhân
        </Text>
      </Container>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gender)
