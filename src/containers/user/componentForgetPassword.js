import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, TouchableOpacity, Text, StatusBar, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Image from 'react-native-scalable-image';
import { Subject } from 'rxjs';
import ComponentCustomTextInput from '../../components/componentCustomTextInput.js';
import ComponentRoundedButton from '../../components/componentRoundedButton.js';
import { Devices, Colors, StylesGlobal, DefaultProps } from '../../constants/constants.js';
import { validateTextInputEmail } from '../../helpers/helperString/helperString.js';
import { postAPIForgotPasswordStart } from '../../redux/actions/actionForgotPassword.js';

// #region Constants
const padding = 18 * Devices.displayScale;
const textInputAllTag = -1;
const textInputEmailTag = 0;
// #endregion

class ComponentForgetPassword extends Component {
  
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
      email: '',
      shouldShowErrorArray: [false],
      errorArray: [undefined],
      shouldEnableScroll: false,
    };
    this.subjectForgetPasswordButton = new Subject();
    this.subjectSignUpButton = new Subject();
  }

  componentDidMount() {
    this.subjectForgetPasswordButton.subscribe({
      next: value => this.onPressButtonForgetPassword()
    });

    this.subjectSignUpButton.subscribe({
      next: value => this.onPressButtonSignUp()
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isError, response } = nextProps;
    if (!isError && response && !this.props.response) {
      if( response == "User not found" ){
        Alert.alert(
          'Fail',
          'User not found . Please enter your email again .',
          [
            { text: 'OK' },
          ],
          { cancelable: false })
      } else {
        Alert.alert(
          'Success',
          'Please check your email to get your password',
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack() },
          ],
          { cancelable: false });
      }
  
    }
    else if (isError && !this.props.response) {
      this.refs.toast.close();
      this.refs.toast.show(response);
    }
  }

  componentWillUnmount() {
    this.subjectForgetPasswordButton.unsubscribe();
    this.subjectSignUpButton.unsubscribe();
    this.subjectForgetPasswordButton = undefined;
    this.subjectSignUpButton = undefined;
  }

  // #endregion

  // #region Methods
  onGoBack = () => {
    Keyboard.dismiss();
    this.props.navigation.goBack();
    return true;
  }

  onPressButtonForgetPassword = () => {
    const { email } = this.state;
    if (Platform.OS === 'ios') {
      this.scroll.props.scrollToPosition(0, 0);
    }
    
    const isValid = this.validateTextInput(textInputAllTag);
    if (isValid) {
      console.log("button reset password");
      Keyboard.dismiss();
      const payload = {email: email};
      this.props.postAPIForgotPasswordStart(payload);
    }
  }

  onPressButtonSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  validateTextInput = (textInputIndex, text = undefined) => {
    const { email, password, shouldShowErrorArray, errorArray } = this.state;
    let newShouldShowErrorArray = shouldShowErrorArray;
    let newErrorArray = errorArray;

    switch(textInputIndex) {
      case textInputEmailTag: {
        const validateTextInputEmailResult = validateTextInputEmail(text);
        newShouldShowErrorArray[textInputEmailTag] = !validateTextInputEmailResult.isValid;
        newErrorArray[textInputEmailTag] = validateTextInputEmailResult.errorMessage;
        this.setState({...this.state, email: text, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
        return validateTextInputEmailResult.isValid;
      }

      default: {
        const validateTextInputEmailResult = validateTextInputEmail(email);
        newShouldShowErrorArray[textInputEmailTag] = !validateTextInputEmailResult.isValid;
        newErrorArray[textInputEmailTag] = validateTextInputEmailResult.errorMessage;
        this.setState({ ...this.state, shouldShowErrorArray: newShouldShowErrorArray, errorArray: newErrorArray});
        return validateTextInputEmailResult.isValid;
      }
    }
  }

  // #endregion

  
  render() {
    const { isLoading } = this.props;
    const { email, shouldShowErrorArray, errorArray, shouldEnableScroll } = this.state;
    return (
      <ImageBackground 
        style={styles.backgroundImage} 
        source={require('../../assets/images/bg.jpg')} 
        pointerEvents={!isLoading ? 'auto' : 'none'}
      >
        <StatusBar backgroundColor={Colors.main} barStyle='light-content' />
        <View style={[StylesGlobal.header, styles.fakeNavigationBar]} >
          <HeaderBackButton tintColor='white' onPress={this.onGoBack} />
        </View>
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
            <Text style={styles.textDescription} >{I18n.t('ToResetYourPasswordYouNeedToBeAbleToAccessYourEmail')}</Text>
            <ComponentCustomTextInput
              onRef={ref => (this.textInputEmail = ref)}
              textAlign={'left'}
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
          </View>
          
          <View style={styles.buttonContainer}>
            <ComponentRoundedButton
              style={styles.forgetPasswordContainer}
              buttonTitle={I18n.t('ResetPassword')}
              buttonTitleColor={Colors.main}
              onPress={() => this.subjectForgetPasswordButton.next()}
            />
          
            <TouchableOpacity 
              style={styles.signUpContainer} 
              // onPress={() => this.subjectSignUpButton.next()}
              >
             {/* <Text style={styles.signUp}>{I18n.t('DontHaveAnAccount')}</Text> */}
            </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>

        { isLoading ? (
          <View style={StylesGlobal.loadingView}>
            <ActivityIndicator
              size='large'
              color={'white'}
              animating={isLoading}
            />
          </View>
        ) : null
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
    flexGrow: 1,
    justifyContent: 'center',
  },

  fakeNavigationBar: {
    marginTop: Platform.OS === 'ios' ? padding : 0,
    marginLeft: Platform.OS === 'ios' ? padding / 2 : 0,
    backgroundColor: 'transparent',
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  textDescription: {
    marginHorizontal: 20 * Devices.displayScale,
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 14 * Devices.displayScale,
  },

  inputContainer: {
    flex: 1,
    marginTop: padding,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  buttonContainer: {
    flex: 1,
    marginTop: padding,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  forgetPasswordContainer: {
    width: DefaultProps.buttonDefaultWidth,
    backgroundColor: 'white',
  },

  signUpContainer: {
    marginVertical: padding,
  },

  signUp: {
    color: 'white',
    fontSize: 13 * Devices.displayScale,
    fontWeight: 'bold',
  },

});
// #endregion

// #region Redux
const mapStateToProps = state => (
  
  {
  isLoading: state.forgotPassword.isLoading,
  isError: state.forgotPassword.isError,
  response: state.forgotPassword.response,
});

function dispatchToProps(dispatch) {
  return bindActionCreators({
    postAPIForgotPasswordStart,
  }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(ComponentForgetPassword);
// #endregion