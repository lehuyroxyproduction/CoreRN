import React from 'react'
import { Image, StatusBar, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Button, Header, Text, View, TextInput } from 'components/ui'
import { hp, isAndroid, wp, STATUS_BAR_STYLE } from 'constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Icons, Logos } from 'images'
import { Container, SideMenu, ImageContent } from 'components'
import { Colors, Fonts, Themes, Metrics } from 'themes'
import { connect } from 'react-redux'
import { authActions, authSelectors } from 'reducers'
import { isEmailValid } from 'utils'
import I18n from 'react-native-i18n'
import normalize from 'utils/normalizeSize'
import * as R from 'ramda'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import { isLoading } from 'reducers/signIn'
import { ScrollView } from 'react-native-gesture-handler'
import Menu from 'screens/Menu'
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-picker'
import ModalDatePicker from 'react-native-datepicker-modal'
import moment from 'moment'

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: false,
    path: 'images',
    maxWidth: 768,
    maxHeight: 768
  }
}

class EditInfoUser extends React.PureComponent<Props, State> {
  state = {
    emailCheck: -1,
    error: null,
    isOpen: false,
    user_info: this.props.user,
    set_avatar: false,
    temp_avatar: null,
    dob_selected: null
  }

  submit = () => {
    // const { email, password } = this.state
    // if (!email || !password || !isEmailValid(email)) {
    //   return null
    // }
    const onSuccess = () => {
      this.props.pop()
    }
    this.props.updateInfoUser({
      user: this.state.user_info,
      is_avatar_changed: this.state.set_avatar,
      onSuccess
    })
  }

  // onBackPress = () => {
  //   const curScreen = this.props.screen
  //   this.props.pop()
  // }
  renderHeader = () => {
    return <Header leftIcon={Icons.icBack} title={I18n.t('EditProfile')} onLeftIconPress={() => this.props.pop()} />
  }
  onRoutePress = (screen: string) => {
    this.setState(
      {
        isOpen: false
      },
      () => {
        screen && this.props.push({ screen })
      }
    )
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  updateMenuState = isOpen => {
    this.setState({ isOpen })
  }

  logout = () => {
    this.props.logout({
      onSuccess: () => this.props.setStackRoot({ screen: 'Login' })
    })
  }

  choose_image = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = { uri: response.uri }
        console.log('source : ', source)
        this.setState({
          set_avatar: true,
          temp_avatar: response.uri,
          user_info: {
            ...this.state.user_info,
            avatar: 'data:image/jpeg;base64,' + response.data
          }
        })
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.props.uploadImage({ image: response.data })
      }
    })
    // ImagePicker.launchCamera(options, response => {
    //   // Same code as in above section!
    //   console.log('Camera response : ', response.data)
    //   this.props.uploadImage({ image: response.data })
    // })
  }

  render_Bottom_Line = () => {
    return (
      <View // line in bottom
        flex
        row
        justifyCenter
        style={{
          height: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}
      />
    )
  }

  render_choose_Gender = () => {
    const { gender } = this.state.user_info
    let is_male = false
    is_male = gender === 'male'
    return (
      <View row width={wp(50)} justifySpaceBetween>
        <Button
          icon={is_male ? Icons.icMale_checked : Icons.icMale_unchecked}
          title={'Male'}
          lowerCase
          color={null}
          contentColor={'blake'}
          onPress={() => {
            this.setState({
              user_info: {
                ...this.state.user_info,
                gender: 'male'
              }
            })
          }}
        />
        <Button
          icon={is_male ? Icons.icFemale_unchecked : Icons.icFemale_checked}
          title={'Female'}
          lowerCase
          color={null}
          contentColor={'blake'}
          onPress={() => {
            this.setState({
              user_info: {
                ...this.state.user_info,
                gender: 'female'
              }
            })
          }}
        />
      </View>
    )
  }
  render() {
    let { isLoading, user, tempUser } = this.props
    const { emailCheck, user_info, dob_selected } = this.state
    const {
      first_name,
      last_name,
      birth_date,
      avatar,
      mobile_no,
      display_name,
      address,
      height,
      weight,
      name
    } = user_info

    let icEmailCheckColor = emailCheck === 1 ? Themes.Colors.electricBlue : 'red'
    let icClose = isAndroid ? 'md-close' : 'ios-close'
    let icCheck = isAndroid ? 'md-checkmark' : 'ios-checkmark'
    let icEmailCheck = emailCheck === 1 ? icCheck : icClose

    let myphoto = this.state.set_avatar ? this.state.temp_avatar : avatar
    let avatarPic =
      (!R.isNil(myphoto) &&
        !R.isEmpty(myphoto) && {
          uri: myphoto + '?t=' + new Date().getUTCMilliseconds(),
        priority: FastImage.priority.high
        }) ||
      (!R.isNil(tempUser.photo_url) &&
        !R.isEmpty(tempUser.photo_url) && {
        uri: tempUser.photo_url,
        priority: FastImage.priority.high
      }) ||
      Logos.logo3

    const menu = <Menu onRoutePress={this.onRoutePress} onClosePress={this.toggle} onLogoutPress={this.logout} />

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        openMenuOffset={Metrics.screen.width}
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <Container isLoading={isLoading} touchableWithoutFeedback>
          {this.renderHeader()}
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <View flex>
              <ScrollView keyboardShouldPersistTaps={'always'}>
                <TouchableOpacity onPress={Keyboard.dismiss}>
                  <View flex justifyCenter alignCenter style={styles.container}>
                    <ImageContent
                      source={avatarPic}
                      style={{
                        width: wp(21),
                        height: wp(21),
                        borderRadius: wp(21) / 2
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <TouchableOpacity style={styles.button_UploadAvatar} onPress={this.choose_image}>
                      <Text bold smaller style={{ color: Colors.electricBlue }}>
                        {I18n.t('UploadAvatar')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.render_Bottom_Line()}
                  <View flex style={styles.container}>
                    <View>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('NickName').toUpperCase()}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          width: '100%',
                          height: hp(4.1),
                          borderBottomColor: Colors.electricBlue
                        }}
                        borderBottomWidth={StyleSheet.hairlineWidth}>
                        <TextInput
                          demiBold
                          small
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={name}
                          onChangeText={text => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                name: text
                              }
                            })
                          }}
                          style={{
                            width: '95%',
                            height: '100%',
                            fontSize: Fonts.size.medium
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: hp(4) }}>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('FirstName').toUpperCase()}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          width: '100%',
                          height: hp(4.1),
                          borderBottomColor: Colors.electricBlue
                        }}
                        borderBottomWidth={StyleSheet.hairlineWidth}>
                        <TextInput
                          demiBold
                          small
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={first_name}
                          onChangeText={text => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                first_name: text
                              }
                            })
                          }}
                          style={{
                            width: '95%',
                            height: '100%',
                            fontSize: Fonts.size.medium
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: hp(4) }}>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('LastName').toUpperCase()}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          width: '100%',
                          height: hp(4.1),
                          borderBottomColor: Colors.electricBlue
                        }}
                        borderBottomWidth={StyleSheet.hairlineWidth}>
                        <TextInput
                          demiBold
                          small
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={last_name}
                          onChangeText={text => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                last_name: text
                              }
                            })
                          }}
                          style={{
                            width: '95%',
                            height: '100%',
                            fontSize: Fonts.size.medium
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  {this.render_Bottom_Line()}
                  <View flex style={styles.container}>
                    <View>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('DateofBirth')}
                      </Text>
                      <ModalDatePicker
                        style={styles.datecontainer}
                        onDateChanged={({ year, month, day, date }) => {
                          if (date) {
                            const dateStr = `${month}/${day}/${year}`
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                birth_date: dateStr
                              }
                            })
                          }
                        }}
                        renderDate={({ year, month, day, date }) => {
                          if (!date) {
                            if (birth_date && birth_date !== '') {
                              // let dat = new Date(birth_date)
                              // const dateStr = `${dat.getMonth() + 1}/${dat.getDate()}/${dat.getFullYear()}`
                              return (
                                <Text demiBold small style={styles.datetext}>
                                  {birth_date}
                                </Text>
                              )
                            } else {
                              return <Text demiBold small style={styles.datetext} />
                            }
                          } else {
                            const dateStr = `${day}/${month}/${year}`
                            return (
                              <Text demiBold small style={styles.datetext}>
                                {dateStr}
                              </Text>
                            )
                          }
                        }}
                      />
                    </View>
                    <View style={{ marginTop: hp(4) }}>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('Gender')}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          width: '100%',
                          height: hp(4.1)
                        }}>
                        {this.render_choose_Gender()}
                      </View>
                    </View>
                  </View>
                  {this.render_Bottom_Line()}
                  <View flex style={styles.container}>
                    <View>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('MOBILE_NUMBER')}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          width: '100%',
                          height: hp(4.1),
                          borderBottomColor: Colors.electricBlue
                        }}
                        borderBottomWidth={StyleSheet.hairlineWidth}>
                        <TextInput
                          demiBold
                          smaller
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={mobile_no && mobile_no !== 'null' ? mobile_no : ''}
                          onChangeText={text => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                mobile_no: text
                              }
                            })
                          }}
                          style={{
                            width: '95%',
                            height: '100%',
                            fontSize: Fonts.size.medium
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: hp(4) }}>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('RESIDENTIAL_ADDRESS')}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          width: '100%',
                          height: hp(4.1),
                          borderBottomColor: Colors.electricBlue
                        }}
                        borderBottomWidth={StyleSheet.hairlineWidth}>
                        <TextInput
                          demiBold
                          smaller
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={address}
                          onChangeText={text => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                address: text
                              }
                            })
                          }}
                          style={{
                            width: '95%',
                            height: '100%',
                            fontSize: Fonts.size.medium
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  {this.render_Bottom_Line()}
                  <View flex style={styles.container}>
                    <View flex row alignCenter justifySpaceBetween>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('HEIGHT')}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          height: hp(4.1)
                        }}>
                        <Button
                          title={'-'}
                          contentColor="black"
                          style={{ height: wp(11.7), width: wp(11.7) }}
                          color={'#rgb(241,241,241)'}
                          onPress={() => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                height: height >= 0 ? height - 1 : height
                              }
                            })
                          }}
                        />
                        <TextInput
                          demiBold
                          smaller
                          center
                          borderColor="#rgb(241,241,241)"
                          borderWidth={1}
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={'' + height}
                          onChangeText={text => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                height: text
                              }
                            })
                          }}
                          style={{
                            width: wp(17.3),
                            height: wp(11.7),
                            fontSize: Fonts.size.medium,
                            keyboardType: 'numeric'
                          }}
                        />
                        <Button
                          title={'+'}
                          contentColor="black"
                          style={{ height: wp(11.7), width: wp(11.7) }}
                          color={'#rgb(241,241,241)'}
                          onPress={() => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                height: height + 1
                              }
                            })
                          }}
                        />
                        <Text small color="rgba(0, 0, 0, 0.3)" style={{ paddingHorizontal: wp(1) }}>
                          cm
                        </Text>
                      </View>
                    </View>
                  </View>
                  {this.render_Bottom_Line()}
                  <View flex style={styles.container}>
                    <View flex row alignCenter justifySpaceBetween>
                      <Text xsmaller color="rgba(0, 0, 0, 0.3)">
                        {I18n.t('WEIGHT')}
                      </Text>
                      <View
                        alignCenter
                        row
                        style={{
                          height: hp(4.1)
                        }}>
                        <Button
                          title={'-'}
                          contentColor="black"
                          style={{ height: wp(11.7), width: wp(11.7) }}
                          color={'#rgb(241,241,241)'}
                          onPress={() => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                weight: weight >= 0 ? weight - 1 : weight
                              }
                            })
                          }}
                        />
                        <TextInput
                          demiBold
                          smaller
                          borderColor="#rgb(241,241,241)"
                          borderWidth={1}
                          center
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={'' + weight}
                          onChangeText={text => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                weight: text
                              }
                            })
                          }}
                          style={{
                            width: wp(17.3),
                            height: wp(11.7),
                            fontSize: Fonts.size.medium,
                            keyboardType: 'numeric'
                          }}
                        />
                        <Button
                          title={'+'}
                          contentColor="black"
                          style={{ height: wp(11.7), width: wp(11.7) }}
                          color={'#rgb(241,241,241)'}
                          onPress={() => {
                            this.setState({
                              user_info: {
                                ...this.state.user_info,
                                weight: weight + 1
                              }
                            })
                          }}
                        />
                        <Text smaller color="rgba(0, 0, 0, 0.3)" style={{ paddingHorizontal: wp(1) }}>
                          kg
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.submit}>
                      <Text bold smaller color="white">
                        {I18n.t('Save').toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Container>
      </SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(5)
  },
  button: {
    width: '100%',
    height: hp(5.4),
    marginTop: hp(3.4),
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.Colors.electricBlue
  },
  button_UploadAvatar: {
    width: '50%',
    height: hp(4),
    marginTop: hp(3.4),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Themes.Colors.electricBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  datecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: hp(4.1),
    borderBottomColor: Colors.electricBlue,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  dateplaceholderText: {
    color: Themes.Colors.grey235
  },
  datetext: {
    width: '95%',
    height: '100%',
    fontSize: Fonts.size.medium
  }
})

const mapStateToProps = state => ({
  isLoading:
    isLoading(state) || authSelectors.getLoading(state, 'logout') || authSelectors.getLoading(state, 'updateInfoUser'),
  user: authSelectors.getUser(state),
  tempUser: authSelectors.getSocialUser(state)
})

const mapDispatchToProps = {
  logout: authActions.logout,
  uploadImage: authActions.uploadImage,
  updateInfoUser: authActions.updateInfoUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInfoUser)
