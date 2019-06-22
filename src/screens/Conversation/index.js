import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

import { Container } from 'components'
import { View } from 'components/uielements'

import { Images } from 'images'

export default class Conversation extends React.Component {
  render() {
    return <Container background={Images.chatBackground} />
  }
}
