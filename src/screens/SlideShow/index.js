import React from 'react'
import { Dimensions, Image, PanResponder, ScrollView, StyleSheet } from 'react-native'

import I18n from 'react-native-i18n'
import { Backgrounds, Icons, Logos } from 'images'
import { Container, Touchable } from 'components'
import { Text, View } from 'components/ui'
import { hp, STATUS_BAR_STYLE, wp } from 'constant'
import Button from 'components/ui/Button'
import { Colors, Fonts, Metrics, Themes } from 'themes'
import { hasNotch, isIphoneX } from 'utils'
import AsyncStorage from '@react-native-community/async-storage'

const dataSource = [
  { url: Backgrounds.screen1, btnText: 'Next' },
  { url: Backgrounds.screen2, btnText: 'MoveNow' },
  { url: Backgrounds.screen3, btnText: 'JoinNow' }
]
const screen = 1
// const height = hp(100)
// const width = wp(100)
const { height, width } = Dimensions.get('window')
export default class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      position: 0,
      height: Dimensions.get('window').width * (4 / 9),
      width: Dimensions.get('window').width,
      scrolling: false
    }
  }

  _move = index => {
    const isUpdating = index !== this._getPosition()
    const x = this.state.width * index
    this._ref.scrollTo({ x: this.state.width * index, y: 0, animated: true })
    this.setState({ position: index })
  }

  _getPosition = () => {
    return this.state.position
  }

  _next = () => {
    const pos = this._getPosition() === dataSource.length - 1 ? 0 : this._getPosition() + 1
    this._move(pos)
    this.setState({ position: pos })
  }

  _prev = () => {
    const pos = this._getPosition === 0 ? dataSource.length - 1 : this._getPosition() - 1
    this._move(pos)
    this.setState({ position: pos })
  }

  _onRef = ref => {
    this._ref = ref
    if (ref && this.state.position !== this._getPosition()) {
      this._move(this._getPosition())
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.position !== this.props.position) {
  //     this._move(this.props.position)
  //   }
  // }
  textScreen1() {
    return (
      <Text xlarge bold color="white">
        EMPOWERING{'\n'}YOU TO{' '}
        <Text xlarge bold color={Colors.electricBlue}>
          MOVE
        </Text>
      </Text>
    )
  }
  textScreen2() {
    return (
      <View width="80%">
        <Text xlarge bold color="white">
          {I18n.t('HowTo')}
          <Text xlarge bold color={Colors.electricBlue}>
            {I18n.t('Move')}
          </Text>
        </Text>
        <Text color="white" large bold style={{ marginTop: hp(0.5) }}>
          {I18n.t('BelieveInACause')}
        </Text>
        <Text color="white" small>
          {I18n.t('DareYourselfTakeUpAChallengeOrARace')}
        </Text>
        <Text color="white" large bold style={{ marginTop: hp(0.5) }}>
          {I18n.t('RunWalkDanceToIt')}
        </Text>
        <Text color="white" small>
          {I18n.t('TrackYourMovementAndBeTheBestYouCanBe')}
        </Text>
        <Text color="white" large bold style={{ marginTop: hp(0.5) }}>
          {I18n.t('MakeItCount')}
        </Text>
        <Text color="white" small>
          {I18n.t('Celebrate')}
        </Text>
      </View>
    )
  }
  textScreen3() {
    return (
      <View width="71%">
        <Text xlarge bold color="white">
          {`${I18n.t('Ready')}${I18n.t('Set')}${I18n.t('MoveDot')}`}
        </Text>
        <Text color="white" style={{ opacity: 0.7 }} small>
          {I18n.t('MoveMoreMoveBetterMoveFastOrGetLeftBehindReady')}
        </Text>
      </View>
    )
  }

  headerScreen = index => {
    return index === 0 ? null : (
      <Button
        icon={Icons.icBack}
        contentColor="white"
        color="transparent"
        style={styles.stylesHeader}
        touchStyle={{ width: hp(5), height: hp(6) }}
        onPress={this._prev}
      />
    )
  }

  componentWillMount() {
    AsyncStorage.setItem('@Liv3ly', '1')
    const width = this.state.width

    let release = (e, gestureState) => {
      const width = this.state.width
      const relativeDistance = gestureState.dx / width
      const vx = gestureState.vx
      let change = 0

      if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
        change = 1
      } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
        change = -1
      }
      const position = this._getPosition()
      if (position === 0 && change === -1) {
        change = 0
      } else if (position + change >= dataSource.length) {
        change = dataSource.length - (position + change)
      }
      this._move(position + change)
      return true
    }

    this._panResponder = PanResponder.create({
      onPanResponderRelease: release
    })
  }

  renderTexts = position => {
    switch (position) {
      case 0:
        return this.textScreen1()
      case 1:
        return this.textScreen2()
      case 2:
        return this.textScreen3()
    }
  }

  renderComponents = () => {
    const position = this._getPosition()
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          justifyContent: 'flex-end',
          bottom: isIphoneX ? hp(25) : hp(22.5),
          start: 0,
          end: 0,
          top: 0
        }}>
        {this.headerScreen(position)}
        <View start={wp(8)}>{this.renderTexts(position)}</View>
      </View>
    )
  }
  renderLogo = position => {
    return (
      position === 2 && (
        <Image
          source={Logos.logoLiv3ly}
          style={{
            position: 'absolute',
            start: wp(8),
            top: hasNotch ? hp(23) + Metrics.statusBar.height : hp(20)
          }}
        />
      )
    )
  }
  // renderHeader = () => <Header style={{position: 'absolute'}} icLeftTintColor="white" />
  buttonSkip = () => {
    this.props.push({ screen: 'Register' })
  }
  buttonLogin = () => {
    this.props.setStackRoot({ screen: 'Login' })
  }
  buttonRegister = () => {
    this.props.setStackRoot({ screen: 'Register' })
  }

  render() {
    let position = this._getPosition()
    return (
      <Container>
        {/* SECTION IMAGE */}
        <ScrollView
          ref={ref => this._onRef(ref)}
          decelerationRate={0.99}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          {...this._panResponder.panHandlers}
          style={[styles.container, { height: hp(100) }]}>
          {dataSource.map((image, index) => {
            const imageObject = typeof image.url === 'string' ? { uri: image.url } : image.url
            return (
              <View key={index}>
                <Image source={imageObject} style={{ height, width }} resizeMode="cover" />
              </View>
            )
          })}
        </ScrollView>
        {/* END SECTION IMAGE */}
        {this.renderComponents()}
        {this.renderLogo(position)}
        {/* SECTION BUTTON */}
        <View
          justifySpaceAround
          style={{
            position: 'absolute',
            height: hp(20),
            start: wp(8),
            bottom: isIphoneX ? hp(3) : hp(2)
          }}>
          <Button
            color={Colors.electricBlue}
            title={I18n.t(dataSource[position].btnText)}
            boldTitle
            contentColor="white"
            onPress={position !== 2 ? this._next : this.buttonRegister}
            style={{
              height: hp(5),
              width: wp(30),
              borderRadius: wp(15)
            }}
          />
          {/* END SECTION BUTTON */}
          {/* SECTION INDICATOR */}
          <View
            alignCenter
            row
            justifySpaceAround
            style={{
              height: hp(1),
              width: wp(7),
              marginBottom: hp(3),
              backgroundColor: 'transparent'
            }}>
            {dataSource.map((image, index) => {
              return (
                <View
                  key={index}
                  onPress={() => {
                    this._move(index)
                  }}
                  style={[
                    [styles.indicator, setIndicatorSize(hp(1)), setIndicatorColor('#CCCCCC')],
                    position === index && [styles.indicatorSelected, setIndicatorColor('white')]
                  ]}
                />
              )
            })}
          </View>
          {/* END SECTION INDICATOR */}
          {/* #region question login */}
          {position !== 0 && (
            <View style={{ position: 'absolute', bottom: 0, width: wp(100) }}>
              <Text smaller color="white">
                {I18n.t('AlreadyAMover')}{' '}
                <Text smaller bold color="white" onPress={this.buttonLogin}>
                  {I18n.t('LogIn')}
                </Text>
              </Text>
            </View>
          )}
        </View>
      </Container>
    )
  }
}

const setIndicatorSize = function(size) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2
  }
}

const setIndicatorColor = function(color) {
  return {
    backgroundColor: color
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#222'
  },
  layoutIndicator: {
    height: hp(1),
    width: wp(11),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'transparent',
    backgroundColor: 'red'
  },
  indicator: {
    // margin: 1,
    opacity: 0.2
  },
  indicatorSelected: {
    opacity: 1
  },
  stylesMainTextTitle: {
    fontFamily: Fonts.face.bold,
    color: Colors.white,
    fontSize: 36
  },
  stylesMainTextTitleHightLight: {
    fontFamily: Themes.Fonts.face.bold,
    color: Themes.Colors.electricBlue,
    fontSize: 36
  },
  stylesMainContentDescription: {
    width: '75%'
  },
  styleMainContentDescriptionText: {
    fontFamily: Themes.Fonts.face.regular,
    color: Themes.Colors.white,
    fontSize: 17,
    marginTop: 16,
    opacity: 0.7
  },
  stylesMainContent: {},

  stylesMainContentDescriptionTitle: {
    fontSize: 21,
    color: Themes.Colors.white,
    fontFamily: Themes.Fonts.face.bold
  },
  stylesQuestion: {
    start: wp(8),
    bottom: hp(5),
    flexDirection: 'row'
  },
  stylesQuestionText: {
    color: Themes.Colors.white,
    fontSize: 14,
    fontFamily: Themes.Fonts.face.regular
  },
  stylesQuestionTextLogin: {
    color: Themes.Colors.white,
    fontSize: 14,
    fontFamily: Themes.Fonts.face.bold
  },
  stylesHeader: {
    position: 'absolute',
    paddingHorizontal: wp(3.7),
    flexDirection: 'row',
    top: hasNotch ? Themes.Metrics.statusBar.height : hp(3.7),
    start: 0,
    end: wp(3.7),
    backgroundColor: 'transparent'
  },
  stylesHeaderTextRight: {
    color: Themes.Colors.white
  }
})
