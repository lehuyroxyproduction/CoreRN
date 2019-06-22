import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

import { Container } from 'components'
import { View, Text, TextInput, Touchable } from 'components/uielements'

import { Icons, Images } from 'images'

import { Colors, Metrics, Styles } from 'themes'

import { selectors } from 'reducers/app'
import { Navigation } from 'react-native-navigation'

class Alert extends React.PureComponent {
  state = { x: 0, y: 0 }

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,

    buttonLabel: PropTypes.string,
    onPress: PropTypes.func,

    hasInput: PropTypes.bool,
    inputPlaceholder: PropTypes.string,
    onChangeText: PropTypes.func
  }

  static defaultProps = {
    type: 'none', // 'none', 'success', 'error'

    title: 'Title',
    description: 'description',

    buttonLabel: 'Ok',
    onPress: () => {},
    onDismiss: () => {},

    hasInput: false,
    inputPlaceholder: 'Placeholder',
    onChangeText: () => {}
  }

  // componentDidMount() {
  //   // this.props.navigator.setStyle({
  //   //   ...Styles.modalStyle,
  //   //   ...Styles.navigatorStyle
  //   // })
  //   Navigation.mergeOptions(this.props.componentId, {
  //     ...Styles.modalStyle
  //     // ...Styles.navigatorStyle
  //   })
  // }

  dismiss = () => {
    this.props.onDismiss()
    this.props.dismissModal()
  }

  onPress = () => {
    this.props.onPress()
    this.dismiss()
  }

  render() {
    const { type, title, description, buttonLabel, hasInput, inputPlaceholder } = this.props

    return (
      <Container background="#rgba(0,0,0,0.3)" isNavbarHidden>
        <ScrollView
          style={{ marginBottom: (this.props.keyboardHeight && this.props.keyboardHeight - 101) || 0 }}
          keyboardShouldPersistTaps="always">
          <TouchableOpacity style={styles.container} onPress={this.dismiss} />

          <View
            style={[
              styles.panel,
              {
                marginTop: hasInput ? Metrics.screen.height / 4 : Metrics.screen.height / 3
              }
            ]}
            background="white"
            onLocation={({ x, y }) => this.setState({ x, y })}>
            <Text center bold style={styles.title}>
              {title.toUpperCase()}
            </Text>

            <Text center small style={{ marginVertical: !hasInput ? 24 : 0 }}>
              {description}
            </Text>

            {hasInput && (
              <TextInput
                ref={r => (this.input = r)}
                style={styles.textInput}
                autoGrow
                multiline
                placeholder={inputPlaceholder}
                onChangeText={text => this.props.onChangeText(text)}
              />
            )}

            <Touchable style={styles.button} gradient gradientStyle={styles.buttonGradient} onPress={this.onPress}>
              <Text bold color="white">
                {buttonLabel.toUpperCase()}
              </Text>
            </Touchable>
          </View>

          <Image
            style={[
              {
                top: this.state.y - 78
              },
              styles.image
            ]}
            source={type === 'success' ? Images.man_success : type === 'error' ? Images.man_error : Images.man}
          />

          <TouchableOpacity
            style={[
              {
                top: this.state.y - 16,
                right: this.state.x - 16
              },
              styles.closeButton
            ]}
            onPress={this.dismiss}>
            <Image style={styles.closeImage} source={Icons.close} />
          </TouchableOpacity>
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrics.screen.height,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: 'transparent'
  },
  panel: {
    width: '80%',
    borderRadius: 8,
    alignSelf: 'center',
    position: 'absolute'
  },
  title: {
    fontSize: 18,
    marginTop: 64 + 14,
    marginBottom: 12
  },
  image: {
    height: 136,
    alignSelf: 'center',
    position: 'absolute',
    resizeMode: 'contain'
  },
  button: {
    width: '100%',
    height: 45
  },
  buttonGradient: {
    overflow: 'hidden',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  closeImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  textInput: {
    width: '85%',
    height: 120,
    fontSize: 13,
    textAlignVertical: 'top',
    paddingTop: 16,
    paddingLeft: 12,
    marginVertical: 28,
    borderRadius: 8,
    backgroundColor: Colors.veryLightPink,
    alignSelf: 'center'
  }
})

const mapStateToProps = state => ({
  keyboardHeight: selectors.getKeyboardHeight(state)
})

export default connect(mapStateToProps)(Alert)
