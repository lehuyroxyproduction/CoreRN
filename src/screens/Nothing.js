
import React from 'react'

import { Container } from 'components'
import { Text, View } from 'components/uielements'

import LinearGradient from 'react-native-linear-gradient'

export default class Nothing extends React.Component {
  render() {
    return (
      <Container
        statusbarColor="light-content"
        background={'white'}
        isNavbarHidden>
        <LinearGradient
          start={{ x: 0.1, y: 0.6 }}
          end={{ x: 0.8, y: 1.0 }}
          colors={['rgba(251,190,38,1)', 'rgba(234,100,66,1)']}
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 85,
            position: 'absolute',
            top: 0,
            paddingTop: 16,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text bold color="white">
            THÔNG BÁO
          </Text>
        </LinearGradient>

        <View flex center padding={24}>
          <Text small center>
            Chức năng này đang trong giai đoạn phát triển, vui lòng quay lại
            sau.
          </Text>
        </View>
      </Container>
    )
  }
}
