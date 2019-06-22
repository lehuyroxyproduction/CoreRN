import React from 'react'
import {
    ScrollView,
    StatusBar,
    Image,
    FlatList,
    Keyboard,
    RefreshControl,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Picker,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native'
import { hp, STATUS_BAR_STYLE, wp } from 'constant'
import { Header, View, TextInput, Text } from 'components/ui'
import { Container, SideMenu } from 'components'
import { Backgrounds, Icons, Logos, Images } from 'images'
import { Fonts, Metrics, Themes, Colors } from 'themes'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'
import { formatNumber } from './index'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  imageModal: {
    flex: 1,
    justifyContent: 'center',
    // marginLeft: 30,
    // marginRight: 30
  },
  img: {
    
    marginLeft: 20,
    marginRight: 20,
   
  },
  textSuccess: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  },
  points: {
    marginTop: 10
  },
  footer: {
    
  },
  sreachBarView:{
    flexDirection:"row",
    justifyContent: 'center',
    height:hp(5.4),
    borderRadius: hp(5.4)/2,
    borderColor:Colors.white,
    borderStyle:'solid',
    borderWidth: 1
  },
  sreachBarViewTextInput:{
    width:wp(85.3)-hp(5.4)*1.5,
    height:hp(5.4),
    paddingLeft: wp(5)
  },
  button: {
    width: 100,
    height: hp(5),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // padding:hp(19.2)*0.10,
    backgroundColor: Colors.white
  }
})

export default class Conguration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClose: props.visible
    }
  }
  render () {
    const { visible, 
      onRequestClose, 
      source, 
      type, 
      description, 
      descriptionType,
      addPoint,
      totalNumber,
      userAddress,
      handleSendAddress,
      onTextChangeAdrress } = this.props
    const RootView = type ==='virtualRace' ? ScrollView : View
    return (
      <Modal
      animationType="slide"
      visible={this.state.isClose}
      onRequestClose={()=> {
        onRequestClose && onRequestClose()
      }}
      onDismiss={()=> {
        onRequestClose && onRequestClose()
      }}
      >
      <Container source={ Backgrounds.imgBgConfigration }>
      <TouchableWithoutFeedback onPress={() => {
             this.setState({
               isClose: !visible
             },onRequestClose)
          }}>
            <View style={styles.container}>
              <KeyboardAvoidingView style={{ flex: 1 }} behavior='position'  enabled>
              <ImageBackground source={type ==='virtualRace' ? Images.imgVirtualPopupBg : Images.imgStopPopupBg } style={[styles.imageModal]} imageStyle={{ resizeMode: 'contain'}}>           
              <View alignCenter flex style={[styles.img, type ==='virtualRace' ? { marginTop: Dimensions.get('window').height * 1/3} : {marginTop: Dimensions.get('window').height * 1/2 }]}>
                        <Image source={Images.imgVirtualTextCongratulations}/>
                        <View flex>
                          <View style={styles.textSuccess}>
                          <Text color={Colors.white} style={{ textAlign: 'center'}}>{description}</Text>
                          <Text color={Colors.white} bold large style={{ textAlign: 'center'}}>{descriptionType}</Text>
                          </View>
                         <View style={styles.points}></View>
                          <Text xlarge bold color={Colors.yellowBrow} style={{ textAlign: 'center'}}>+{addPoint && formatNumber(addPoint)} {I18n.t('Point')}</Text>
                          <Text large bold color={Colors.white} style={{ textAlign: 'center'}}>Total: {totalNumber && formatNumber(totalNumber)} {I18n.t('Point')} </Text>
                          <View style={styles.points}></View>
                          {
                            type ==='virtualRace' &&
                            <View style={styles.footer}>
                              <Image source={Images.imgVirtualLine}/>
                              <View style={styles.points}></View>
                              <View flex>
                                <Text color={Colors.white} style={{ textAlign: 'center'}}>{I18n.t('modalVirtualRaceTextLabel')}</Text>
                                <View style={styles.points}></View>
                                <View  centerItems>
                                  <View style={styles.sreachBarView}>                               
                                      <TextInput
                                        smaller
                                        onChangeText={text => { onTextChangeAdrress && onTextChangeAdrress(text)}}
                                        style={styles.sreachBarViewTextInput}
                                        value={userAddress && userAddress}
                                        color = {Colors.white}
                                      />
                                  </View>
                              </View>
                              <View style={styles.points}></View>
                              <TouchableOpacity style={[styles.button]} 
                                 
                                 onPress={() => {                               
                                  this.setState({
                                    isClose: !this.state.isClose
                                  },() => {
                                    handleSendAddress && handleSendAddress()
                                    onRequestClose && onRequestClose()
                                    Keyboard.dismiss()
                                  })
                                }}>
                                  <Text bold smaller style={{ color: 'black' }}>
                                  {I18n.t('sendAdrress')}
                                  </Text>
                              </TouchableOpacity>
                              <View style={styles.points}></View>
                              <View style={styles.points}></View>
                              </View>
                            
                            
                            </View>
                          }
                        
                        </View>
                    </View>       
              </ImageBackground>
              </KeyboardAvoidingView>
    
            </View>
            </TouchableWithoutFeedback>
     
    
      </Container>
      
      </Modal>
    )

  }
}

