export type LayoutProps = {
  alignSelf: String,
  alignItems: String,
  borderBottomWidth: Number,
  borderEndWidth: Number,
  borderLeftWidth: Number,
  borderRightWidth: Number,
  borderStartWidth: Number,
  borderTopWidth: Number,
  borderWidth: Number,
  bottom: Number,
  direction: 'inherit' | 'ltr' | 'rtl',
  display: 'none' | 'flex',
  end: Number | String,
  flex: Number,
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  height: Number | String,
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  left: Number | String,
  margin: Number | String,
  marginBottom: Number | String,
  marginEnd: Number | String,
  marginHorizontal: Number | String,
  marginLeft: Number | String,
  marginRight: Number | String,
  marginStart: Number | String,
  marginTop: Number | String,
  marginVertical: Number | String,
  maxHeight: Number | String,
  maxWidth: Number | String,
  minHeight: Number | String,
  minWidth: Number | String,
  overflow: 'visible' | 'hidden' | 'scroll',
  paddingBottom: Number | String,
  paddingEnd: Number | String,
  paddingHorizontal: Number | String,
  paddingLeft: Number | String,
  paddingRight: Number | String,
  paddingStart: Number | String,
  paddingTop: Number | String,
  paddingVertical: Number | String,
  position: 'absolute' | 'relative',
  right: Number | String,
  start: Number | String,
  top: Number | String,
  width: Number | String,
  zIndex: Number,
  backgroundColor: String
}

export type TextProps = {
  textShadowOffset: { width: Number, height: Number },
  color: String,
  fontSize: Number,
  fontStyle: 'normal' | 'italic',
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
  lineHeight: Number,
  textAlign: 'auto' | 'left' | 'right' | 'center' | 'justify',
  textDecorationLine:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through',
  fontFamily: 'String',
  includeFontPadding: Boolean,
  textAlignVertical: 'auto' | 'top' | 'bottom' | 'center',
  letterSpacing: Number,
  textDecorationStyle: 'solid' | 'double' | 'dotted' | 'dashed',
  textTransorm: 'none' | 'uppercase' | 'lowercase' | 'capitalize',
  selectionColor: String,
  textBreakStrategy: 'simple' | 'highQuality' | 'balanced',
  adjustsFontSizeToFit: Boolean,
  minimumFontScale: Number
}
