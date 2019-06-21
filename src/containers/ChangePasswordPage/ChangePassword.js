import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar, ActivityIndicator, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HeaderBackButton } from 'react-navigation';
import I18n from 'react-native-i18n';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Image from 'react-native-scalable-image';
import ComponentHoshiTextInput from '../../components/componentHoshiTextInput';
import ComponentRoundedButton from '../../components/componentRoundedButton';
import {
  Devices, Colors, StylesGlobal, DefaultProps,
} from '../../constants/constants';
import styles from './styles';
import { validateTextInputPassword, validateEqual } from '../../helpers/helperString/helperString';
import { postChangePassStart } from '../../redux/actions/actionChangePassword';
import { saveUser } from '../../redux/actions/actionApp.js';
import { resetStackNavigator } from '../../helpers/helperReactNavigation/helperStackNavigator.js';
// #region Constants
const padding = 18 * Devices.displayScale;
const textInputAllTag = -1;
const textInputOldPassTag = 0;
const textInputNewPass1Tag = 1;
const textInputNewPass2Tag = 2;
// #endregion


class ChangePassword extends React.Component {
  // #region NavigationOptions
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerLeft: (<HeaderBackButton tintColor='white' onPress={params.onGoBack} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle} >{I18n.t('ChangePassword')}</Text>,
      headerRight: <View />,
      headerStyle: StylesGlobal.header,
      headerTintColor: 'white',
    };
  };
  // #endregion


  // #region Override
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onGoBack: this.onGoBack });

    this.state = {
      oldPass: '',
      newPass1: '',
      newPass2: '',
      errorArray: [undefined, undefined, undefined],

      shouldEnableScroll: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isError, response } = nextProps;

    if (!isError && response && !this.props.response) {
      // SUCCESS
      this.refs.toast.close();
      // this.refs.toast.show(response.text);

      Alert.alert(
        I18n.t('Success'),
        response,
        [
          {text: I18n.t('OK'), onPress: () =>  this.onPressButtonLogout() },
        ],
        { cancelable: false }
      );
    }
    else if (isError && !this.props.response) {
      // ERROR
      this.refs.toast.close();
    // this.refs.toast.show(response.text);
      Alert.alert(
        I18n.t('Error'),
        response,
        [
          {text: I18n.t('OK'), },
        ],
        { cancelable: false }
      );
    }
  }
  // #endregion

  // #region NavigationOptions
  onGoBack = () => {
    this.props.navigation.goBack();
    return true;
  }
  // #endregion
  // #region Methods
  onPressButtonLogout = () => {
      this.props.saveUser(undefined);
      resetStackNavigator(this.props.navigation, 'SignIn');
  }
  // #endregion

    // #region Method
    onChangePasswordPress = () => {
      const { oldPass, newPass1 } = this.state;
      const { domain, token } = this.props.user;
      //const domain = '192.168.1.202:8000';
      //const token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg4YjVjYzE5N2FkNjE3NzVkZDY1NzciLCJ1c2VybmFtZSI6ImtlbHZpbiIsInBhc3N3b3JkIjoiJDJhJDEwJHljYUM3RXN2L0Jnbk0wMU9WNGhmTWVIaTZvdVBLWFhyaUtkalVmNkR2c0kyVzhvazFEQ3N5IiwiSXNBZG1pbiI6ZmFsc2UsIlJmaWRVSUQiOiI4NzoxNjg6MTgwOjEyOjA6MDowOjA6MDowIiwiX192IjowLCJpYXQiOjE1MzU2ODYzODUsImV4cCI6MTUzNTY4Njk4OX0.Im-EhzDgFgnn6dbwqmbXyyAe99I3WkSoBp0QT2SI71I';


      if (Platform.OS === 'ios') {
          this.scroll.props.scrollToPosition(0, 0);
      }

      const existError = this.state.errorArray.some(text => text!=undefined && text!=''); // validate again
      if (!existError) {
          Keyboard.dismiss();
          const payload = {
              domain,
              token,
              oldPass,
              newPass: newPass1
          };
          this.props.postChangePassStart(payload);
      }
      else {
          // this.setState({...this.state, shouldShowButtonForgotPassword: true})
      }
  }

  validateTextInput = (textInputTag, text = undefined) => {
      const { oldPass, newPass1, newPass2, errorArray } = this.state;
      let error = {errorMessage: '', isValid: true}

      switch(textInputTag) {
          case textInputOldPassTag:
              error = validateTextInputPassword(text);
              errorArray[textInputTag] = error.errorMessage;
              this.setState({ oldPass: text });
              break;

          case textInputNewPass1Tag:
              error = validateTextInputPassword(text);
              errorArray[textInputTag] = error.errorMessage;
              this.setState({ newPass1: text });
              break;

          case textInputNewPass2Tag:
              error = validateTextInputPassword(text);
              errorArray[textInputTag] = error.errorMessage;
              this.setState({ newPass2: text });
              break;
      }

      // Check equal New Password
      if (error.isValid == true) {
          // this.state.newPass2 setState not save
          error = validateEqual([
              textInputTag == textInputNewPass1Tag ? text : newPass1,
              textInputTag == textInputNewPass2Tag ? text : newPass2,
          ]);
          errorArray[textInputNewPass1Tag] = errorArray[textInputNewPass2Tag] = error.errorMessage;
      }


      this.setState({errorArray});    // Show Error
      return error.isValid;
    }
  // #endregion


  // #region Render
  render() {
    const { errorArray, shouldEnableScroll, oldPass, newPass1, newPass2 } = this.state;
    const { isLoading } = this.props;

    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/images/bg.jpg')}
            pointerEvents={!isLoading ? 'auto' : 'none'}
        >
            <StatusBar backgroundColor={Colors.main} barStyle='light-content' />
            <KeyboardAwareScrollView
                enableOnAndroid={true} // android:windowSoftInputMode="adjustPan"
                innerRef={ref => {this.scroll = ref}}
                style={styles.container}
                contentContainerStyle={styles.scrollView}
                keyboardOpeningTime={0}
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={shouldEnableScroll}
                // iOS only
                onKeyboardWillShow={frame =>
                    this.setState({...this.state, shouldEnableScroll: true})
                }
                onKeyboardWillHide={frame =>
                    this.setState({...this.state, shouldEnableScroll: false})
                }
                // Android only
                onKeyboardDidShow={frame =>
                    this.setState({...this.state, shouldEnableScroll: true})
                }
                onKeyboardDidHide={frame =>
                    this.setState({...this.state, shouldEnableScroll: false})
                }
                keyboardShouldPersistTaps='handled'
            >

            <View style={styles.logoContainer} >
                <Image
                source={require('../../assets/images/logo.png')}
                width={DefaultProps.logoDefaultWidth}
                />
            </View>

            <View style={styles.inputContainer} >

                <ComponentHoshiTextInput
                    onRef={ref => (this.textInputOldPass = ref)}
                    text={I18n.t('Password')}
                    placeholderText={I18n.t('Password')}
                    value={oldPass}
                    iconColor={'white'}
                    shouldShowError={errorArray[textInputOldPassTag] ? true : false}
                    errorText={errorArray[textInputOldPassTag]}
                    secureTextEntry={true}
                    returnKeyType='done'
                    autoCapitalize='none'
                    onChangeText={text => this.validateTextInput(textInputOldPassTag, text)}
                    onSubmitEditing={() => this.textInputNewPass1.next()}
                />

                <ComponentHoshiTextInput
                    onRef={ref => (this.textInputNewPass1 = ref)}
                    text={I18n.t('NewPassword')}
                    placeholderText={I18n.t('NewPassword')}
                    value={newPass1}
                    iconColor={'white'}
                    shouldShowError={errorArray[textInputNewPass1Tag] ? true : false}
                    errorText={errorArray[textInputNewPass1Tag]}
                    secureTextEntry={true}
                    returnKeyType='done'
                    autoCapitalize='none'
                    onChangeText={text => this.validateTextInput(textInputNewPass1Tag, text)}
                    onSubmitEditing={() => this.textInputNewPass2.next()}
                />

                <ComponentHoshiTextInput
                    onRef={ref => (this.textInputNewPass2 = ref)}
                    text={I18n.t('ConfirmNewPassword')}
                    placeholderText={I18n.t('ConfirmNewPassword')}
                    value={newPass2}
                    iconColor={'white'}
                    shouldShowError={errorArray[textInputNewPass2Tag] ? true : false}
                    errorText={errorArray[textInputNewPass2Tag]}
                    secureTextEntry={true}
                    returnKeyType='done'
                    autoCapitalize='none'
                    onChangeText={text => this.validateTextInput(textInputNewPass2Tag, text)}
                    onSubmitEditing={() => this.subjectSignInButton.next()}
                />

            </View>

            <View style={styles.buttonContainer} >

                <ComponentRoundedButton
                    style={styles.signInContainer}
                    buttonTitle={I18n.t('ChangePassword')}
                    buttonTitleColor={Colors.main}
                    onPress={this.onChangePasswordPress}
                />

            </View>

            </KeyboardAwareScrollView >

            { isLoading ?
                <View style={StylesGlobal.loadingView} >
                    <ActivityIndicator
                    size='large'
                    color={'white'}
                    animating={isLoading}
                    />
                </View>
                : null
            }

            <Toast
                ref='toast'
                style={StylesGlobal.toastContainer}
                textStyle={StylesGlobal.toastText}
                defaultCloseDelay={DefaultProps.toastDefaultCloseDelay}
                position='top'
                positionValue={padding * 2}
            />
        </ImageBackground>
    )
  }
  // #endregion
}


// #region Redux
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    isLoading: state.changePass.isLoading,
    isError: state.changePass.isError,
    response: state.changePass.response,
  };
};

const dispatchToProps = dispatch => bindActionCreators(
  {
    postChangePassStart,
    saveUser
  },
  dispatch,
);

export default connect(mapStateToProps, dispatchToProps)(ChangePassword);
// #endregion
