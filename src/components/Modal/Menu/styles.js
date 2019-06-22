import { StyleSheet, Dimensions } from 'react-native'
import { wp, hp, isAndroid } from 'Constants/constant'

import { Themes } from 'themes'

export const styles = StyleSheet.create({
  Containner: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Themes.Colors.blackBg
  },
  Header: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(7.1)
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  Footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(6)
  },
  buttonClose: {
    marginTop: hp(5.3),
    right: wp(5.9),
    position: 'absolute'
  },
  contentHeader: {
    width: wp(65.8),
    height: wp(21.3),
    flexDirection: 'row'
  },
  viewContentHeader: {
    width: wp(21.3),
    height: wp(21.3)
  },
  imageViewContentHeader: {
    width: wp(21.3),
    height: wp(21.3),
    borderRadius: wp(21.3)
  },
  iconImageViewContentHeader: {
    position: 'absolute',
    width: wp(7),
    height: wp(7),
    bottom: -2,
    right: -2
  },
  textViewContentHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: wp(4)
  },
  titleTextViewContentHeader: {
    fontFamily: Themes.Fonts.face.demiBold,
    color: Themes.Colors.white,
    fontSize: hp(2.8),
    letterSpacing: 1.28
  },
  contentTextViewContentHeader: {
    color: Themes.Colors.white,
    fontFamily: Themes.Fonts.face.regular,
    fontSize: hp(2),
    letterSpacing: 1.05,
    opacity: 0.6
  },

  listContent: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textListContent: {
    fontFamily: Themes.Fonts.face.regular,
    color: Themes.Colors.white,
    fontSize: hp(2.4),
    textAlign: 'center',
    letterSpacing: 1.05
  },
  childTextListContent: {
    fontFamily: Themes.Fonts.face.regular,
    color: Themes.Colors.white,
    fontSize: hp(2.4),
    textAlign: 'center',
    marginTop: hp(4.7),
    letterSpacing: 1.05
  },
  textFooter: {
    color: 'white',
    fontFamily: Themes.Fonts.face.demiBold,
    letterSpacing: 1.05,
    fontSize: hp(2.4),
    lineHeight: hp(3),
    marginLeft: wp(2)
  },
  contentFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: hp(3)
  },
  viewContentFooter: {
    justifyContent: 'center'
  },
  buttonFooter: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
