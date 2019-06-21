import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ActivityIndicator, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Image from 'react-native-scalable-image';
import { Subject } from 'rxjs';
import ComponentCustomTextInput from '../../components/componentCustomTextInput.js';
import ComponentRoundedButton from '../../components/reuseable/componentRoundedButton.js';
import { Devices, Colors, StylesGlobal, DefaultProps } from '../../constants/constants.js';
import { resetStackNavigator } from '../../helpers/helperReactNavigation/helperStackNavigator.js';
import { validateTextInputEmail, validateTextInputPassword, validateTextInputPhoneNumber, validateTextInputName } from '../../helpers/helperString/helperString.js';
import { postAPISignUpStart } from '../../redux/actions/actionSignUp.js';
import { saveUser } from '../../redux/actions/actionApp.js';

// #region Constants
const padding = 18 * Devices.displayScale;
const textInputAllTag = -1;
const textInputPhoneNumberTag = 0;
const textInputNameTag = 1;
const textInputEmailTag = 2;
const textInputPasswordTag = 3;
// #endregion

class ComponentSignUp extends Component {
  
  // #region NavigationOptions
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  }
  // #endregion

  // #region Component Lifecycle

  constructor(props) {
    super(props);
    this.state = {
      callingCode: '65',
      phoneNumber: '',
      name: '',
      email: '',
      password: '',
      shouldShowErrorArray: [false, false, false, false],
      errorArray: [undefined, undefined, undefined, undefined],
      shouldEnableScroll: false
    };
    this.subjectSignUpButton = new Subject();
    this.subjectSignInButton = new Subject();
  }

  componentDidMount() {
    this.subjectSignUpButton.subscribe({
      next: value => this.onPressButtonSignUp()
    });

    this.subjectSignInButton.subscribe({
      next: value => this.onPressButtonSignIn()
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isError, response } = nextProps;
    if (!isError && response && !this.props.response) {
      this.props.saveUser(response);
      resetStackNavigator(this.props.navigation, 'UserTabNavigatorMain');
    }
    else if (isError && !this.props.response) {
      this.refs.toast.close();
      this.refs.toast.show(response.text);
    }
  }

  render() {
    const { isLoading } = this.props;
    const { phoneNumber, name, email, password, shouldShowErrorArray, errorArray, shouldEnableScroll } = this.state;
    return (
      <ImageBackground 
        style={styles.backgroundImage} 
        source={require('../../assets/images/bg.jpg')} 
        pointerEvents={!isLoading ? 'auto' : 'none'}
      >
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
            this.setState({...this.state, hideResults: true, shouldEnableScroll: false})
          }
          // Android only
          onKeyboardDidShow={frame =>
            this.setState({...this.state, shouldEnableScroll: true})
          }
          onKeyboardDidHide={frame =>
            this.setState({...this.state, hideResults: true, shouldEnableScroll: false})
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
            <ComponentCustomTextInput
              onRef={ref => (this.textInputPhoneNumber = ref)}
              // shouldAlignRight={true}
              text={'+' + this.state.callingCode}
              placeholderText={I18n.t('PhoneNumber')}
              value={phoneNumber}
              shouldShowError={shouldShowErrorArray[textInputPhoneNumberTag]}
              errorText={errorArray[textInputPhoneNumberTag]}
              keyboardType='phone-pad'
              returnKeyType='next'
              autoCapitalize='none'
              onChangeText={text => this.validateTextInput(textInputPhoneNumberTag, text)}
              onSubmitEditing={() => this.textInputName.focus()}
            />

            <ComponentCustomTextInput
              onRef={ref => (this.textInputName = ref)}
              // shouldAlignRight={true}
              text={I18n.t('YourName')}
              placeholderText={I18n.t('YourName')}
              value={name}
              shouldShowError={shouldShowErrorArray[textInputNameTag]}
              errorText={errorArray[textInputNameTag]}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='words'
              onChangeText={text => this.validateTextInput(textInputNameTag, text)}
              onSubmitEditing={() => this.textInputEmail.focus()}
            />
            
            <ComponentCustomTextInput
              onRef={ref => (this.textInputEmail = ref)}
              // shouldAlignRight={true}
              text={I18n.t('Email')}
              placeholderText={I18n.t('Email')}
              value={email}
              shouldShowError={shouldShowErrorArray[textInputEmailTag]}
              errorText={errorArray[textInputEmailTag]}
              keyboardType='email-address'
              returnKeyType='next'
              autoCapitalize='none'
              onChangeText={text => this.validateTextInput(textInputEmailTag, text)}
              onSubmitEditing={() => this.textInputPassword.focus()}
            />
        
            <ComponentCustomTextInput
              onRef={ref => (this.textInputPassword = ref)}
              // shouldAlignRight={true}
              text={I18n.t('Password')}
              placeholderText={I18n.t('Password')}
              value={password}
              iconColor={'white'}
              shouldShowError={shouldShowErrorArray[textInputPasswordTag]}
              errorText={errorArray[textInputPasswordTag]}
              secureTextEntry={true}
              returnKeyType='next'
              autoCapitalize='none'
              onChangeText={text => this.validateTextInput(textInputPasswordTag, text)}
              onSubmitEditing={() => this.subjectSignUpButton.next()}
            />
          </View>

          <View style={styles.buttonContainer} >
            <ComponentRoundedButton
                style={styles.signUpContainer}
                buttonTitle={I18n.t('SignUp')}
                buttonTitleColor={Colors.main}
                onPress={() => this.subjectSignUpButton.next()}
            />

            <TouchableOpacity
              style={styles.signInContainer}
              onPress={() => {this.subjectSignInButton.next()}} 
            >
                <Text style={styles.signIn} >{I18n.t('AlreadyHaveAnAccount')}</Text>
            </TouchableOpacity>
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
    );
  }

    componentWillUnmount() {
      this.subjectSignUpButton.unsubscribe();
      this.subjectSignInButton.unsubscribe();
      this.subjectSignUpButton = undefined;
      this.subjectSignInButton = undefined;
    }

  // #endregion

  // #region Methods

  onPressButtonSignUp = () => {
    const { phoneNumber, name, email, password } = this.state;
    if (Platform.OS === 'ios') {
      this.scroll.props.scrollToPosition(0, 0);
    }
    
    const isValid = this.validateTextInput(textInputAllTag);
    if (isValid) {
      Keyboard.dismiss();
      const payload = {email: email, password: password, name: name, phonenumber: phoneNumber};
      this.props.postAPISignUpStart(payload);
    }
  }

  onPressButtonSignIn = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('SignIn');
  }

  validateTextInput = (textInputIndex, text = undefined) => {
    const { phoneNumber, name, email, password, shouldShowErrorArray, errorArray } = this.state;
    let newShouldShowErrorArray = shouldShowErrorArray;
    let newErrorArray = errorArray;

    switch(textInputIndex) {
      case textInputPhoneNumberTag: {
        const validateTextInputPhoneNumberResult = validateTextInputPhoneNumber(text);
        newShouldShowErrorArray[textInputPhoneNumberTag] = !validateTextInputPhoneNumberResult.isValid;
        newErrorArray[textInputPhoneNumberTag] = validateTextInputPhoneNumberResult.errorMessage;
        this.setState({...this.state, phoneNumber: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
        return validateTextInputPhoneNumberResult.isValid;
      }

      case textInputNameTag: {
        const validateTextInputNameResult = validateTextInputName(text);
        newShouldShowErrorArray[textInputNameTag] = !validateTextInputNameResult.isValid;
        newErrorArray[textInputNameTag] = validateTextInputNameResult.errorMessage;
        this.setState({...this.state, name: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
        return validateTextInputNameResult.isValid;
      }

      case textInputEmailTag: {
        const validateTextInputEmailResult = validateTextInputEmail(text);
        newShouldShowErrorArray[textInputEmailTag] = !validateTextInputEmailResult.isValid;
        newErrorArray[textInputEmailTag] = validateTextInputEmailResult.errorMessage;
        this.setState({...this.state, email: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
        return validateTextInputEmailResult.isValid;
      }

      case textInputPasswordTag: {
        const validateTextInputPasswordResult = validateTextInputPassword(text);
        newShouldShowErrorArray[textInputPasswordTag] = !validateTextInputPasswordResult.isValid;
        newErrorArray[textInputPasswordTag] = validateTextInputPasswordResult.errorMessage;
        this.setState({...this.state, password: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
        return validateTextInputPasswordResult.isValid;
      }

      default: {
        const validateTextInputPhoneNumberResult = validateTextInputPhoneNumber(phoneNumber);
        const validateTextInputNameResult = validateTextInputName(name);
        const validateTextInputEmailResult = validateTextInputEmail(email);
        const validateTextInputPasswordResult = validateTextInputPassword(password);
        newShouldShowErrorArray[textInputPhoneNumberTag] = !validateTextInputPhoneNumberResult.isValid;
        newErrorArray[textInputPhoneNumberTag] = validateTextInputPhoneNumberResult.errorMessage;
        newShouldShowErrorArray[textInputNameTag] = !validateTextInputNameResult.isValid;
        newErrorArray[textInputNameTag] = validateTextInputNameResult.errorMessage;
        newShouldShowErrorArray[textInputEmailTag] = !validateTextInputEmailResult.isValid;
        newErrorArray[textInputEmailTag] = validateTextInputEmailResult.errorMessage;
        newShouldShowErrorArray[textInputPasswordTag] = !validateTextInputPasswordResult.isValid;
        newErrorArray[textInputPasswordTag] = validateTextInputPasswordResult.errorMessage;
        this.setState({...this.state, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
        return validateTextInputPhoneNumberResult.isValid &&
              validateTextInputNameResult.isValid &&
              validateTextInputEmailResult.isValid && 
              validateTextInputPasswordResult.isValid;
      }
    }
  }

  // #endregion

}

// #region Stylesheet
const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },

    container: {
        flex: 1,
    },

    scrollView: {
        flexGrow : 1, 
        justifyContent : 'center',
    },

    logoContainer: {
        flex: 1, 
        marginTop: padding,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    inputContainer: {
        flex: 1,
        marginTop: padding,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    autoCompleteInput: {
        backgroundColor: 'transparent',
    },

    autoCompleteList: {
        margin: 0,
        paddingHorizontal: padding / 2,
    },

    autoCompleteItem: {
        marginVertical: padding / 2,
        color: 'black',
        fontSize: 14 * Devices.displayScale,
    },

    buttonContainer: {
        flex: 1,
        marginTop: padding,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    signUpContainer: {
        width: DefaultProps.buttonDefaultWidth,
        backgroundColor: 'white'
    },

    signInContainer: {
        marginVertical: padding,
    },

    signIn: {
        color: 'white',
        fontSize: 13 * Devices.displayScale,
        fontWeight: 'bold'
    },

});
// #endregion

// #region Redux
const mapStateToProps = (state) => ({
  isLoading: state.signUp.isLoading,
  isError: state.signUp.isError,
  response: state.signUp.response,
});

function dispatchToProps(dispatch) {
    return bindActionCreators({
      postAPISignUpStart,
      saveUser,
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(ComponentSignUp);
// #endregion