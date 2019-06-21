import React, { Component } from 'react';
import { Platform, View, ImageBackground, TouchableOpacity, Text, StatusBar, ActivityIndicator, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Image from 'react-native-scalable-image';
import { Subject } from 'rxjs';
import ComponentHoshiTextInput from '../../components/componentHoshiTextInput.js';
import ComponentRoundedButton from '../../components/componentRoundedButton.js';
import { Devices, Colors, StylesGlobal, DefaultProps } from '../../constants/constants.js';
import { resetStackNavigator } from '../../helpers/helperReactNavigation/helperStackNavigator.js';
import { validateTextInputEmail, validateTextInputPassword } from '../../helpers/helperString/helperString.js';
import { postAPISignInStart } from '../../redux/actions/actionSignIn.js';
import { saveUser } from '../../redux/actions/actionApp.js';
import { URL_DOMAIN } from '../../constants/webServices.js';
import { styles, padding } from './styles';

// #region Constants
const textInputAllTag = -1;
const textInputEmailTag = 0;
const textInputPasswordTag = 1;
const textInputDomainTag = 2;
// #endregion

class SignIn extends Component {
  
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
      /* email: 'sun@adquestasia.com',
      password: '04070407', */
      email: '',
      password: '',
      domain: URL_DOMAIN,
      shouldShowErrorArray: [false, false],
      errorArray: [undefined, undefined, undefined],
      shouldEnableScroll: false,
      shouldShowButtonForgotPassword: true,
    };
    this.subjectForgotPasswordButton = new Subject();
    this.subjectSignInButton = new Subject();
    this.subjectSignUpButton = new Subject();
  }

  componentDidMount() {
    this.subjectForgotPasswordButton.subscribe({
      next: value => this.onPressButtonForgotPassword()
    });

    this.subjectSignInButton.subscribe({
      next: value => this.onPressButtonSignIn()
    });

    this.subjectSignUpButton.subscribe({
      next: value => this.onPressButtonSignUp()
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isError, response } = nextProps;
    const { domain } = this.state;

    if (!isError && response && !this.props.response) {
      // SUCCESS
      this.props.saveUser({
        ...response,
        domain,
        logInTime: new Date(),
        userName: this.state.email
      }); // ACTION_APP_SAVE_USER 

      // Navigator ADMIN TAB, USER TAB
      resetStackNavigator(this.props.navigation, 
        response.IsAdmin === true ? 'AdminTabNavigatorMain' : 'UserTabNavigatorMain'
      );
      return;
    }
    else if (isError && !this.props.response) {
      // FAIL
      this.refs.toast.close();
      this.refs.toast.show(response);
    }
  }

  render() {
    const { isLoading } = this.props;
    const { email, password, domain, errorArray, shouldEnableScroll, shouldShowButtonForgotPassword } = this.state;

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

            {/* <ComponentHoshiTextInput
              onRef={ref => (this.textInputEmail = ref)}
              text={I18n.t('Domain')}
              placeholderText={I18n.t('Domain')}
              value={domain}
              returnKeyType='next'
              autoCapitalize='none'
              onChangeText={text => this.validateTextInput(textInputDomainTag, text)}
              onSubmitEditing={() => this.textInputEmail.focus()}
            /> */}
            <ComponentHoshiTextInput
              onRef={ref => (this.textInputEmail = ref)}
              text={I18n.t('Email')}
              placeholderText={I18n.t('Email')}
              value={email}
              shouldShowError={errorArray[textInputEmailTag] ? true : false}
              errorText={errorArray[textInputEmailTag]}
              keyboardType='email-address'
              returnKeyType='next'
              autoCapitalize='none'
              onChangeText={text => this.validateTextInput(textInputEmailTag, text)}
              onSubmitEditing={() => this.textInputPassword.focus()}
            />
            
            <ComponentHoshiTextInput
              onRef={ref => (this.textInputPassword = ref)}
              text={I18n.t('Password')}
              placeholderText={I18n.t('Password')}
              value={password}
              iconColor={'white'}
              shouldShowError={errorArray[textInputPasswordTag] ? true : false}
              errorText={errorArray[textInputPasswordTag]}
              secureTextEntry={true}
              returnKeyType='done'
              autoCapitalize='none'
              onChangeText={text => this.validateTextInput(textInputPasswordTag, text)}
              onSubmitEditing={() => this.subjectSignInButton.next()}
            />
          </View>
            
          <View style={styles.buttonContainer} >
            {/* { shouldShowButtonForgotPassword ?
              <TouchableOpacity 
                style={styles.forgotPasswordContainer} 
                onPress={() => this.subjectForgotPasswordButton.next()} 
              >
                <Text style={styles.signUp} >{I18n.t('IForgotMyPassword')}</Text>
              </TouchableOpacity>
              : null
            } */}

            <ComponentRoundedButton
              style={styles.signInContainer}
              buttonTitle={I18n.t('SignIn')}
              buttonTitleColor={Colors.main}
              onPress={() => this.subjectSignInButton.next()}
            />

            <ComponentRoundedButton
              style={styles.signInContainer}
              buttonTitle={I18n.t('ForgetPassword')}
              buttonTitleColor={Colors.main}
              onPress={()=>this.onPressButtonForgotPassword()}
            />
            {/* <TouchableOpacity 
              style={styles.signUpContainer} 
              onPress={() => this.subjectSignUpButton.next()} 
            >
              <Text style={styles.signUp} >{I18n.t('DontHaveAnAccount')}</Text>
            </TouchableOpacity> */}
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
    this.subjectForgotPasswordButton.unsubscribe();
    this.subjectSignInButton.unsubscribe();
    this.subjectSignUpButton.unsubscribe();
    this.subjectForgotPasswordButton = undefined;
    this.subjectSignInButton = undefined;
    this.subjectSignUpButton = undefined;
  }

  // #endregion

  // #region Methods

  onPressButtonForgotPassword = () => {
    this.props.navigation.navigate('ForgetPassword');
  }

  onPressButtonSignIn = () => {
    const {domain, email, password } = this.state;
    if (Platform.OS === 'ios') {
      this.scroll.props.scrollToPosition(0, 0);
    }
    
    const isValid = this.validateTextInput(textInputAllTag);
    if (isValid) {
      Keyboard.dismiss();
      const payload = { domain: domain, email: email, password: password};
      this.props.postAPISignInStart(payload);
    }
    else {
      this.refs.toast.show(I18n.t('ErrorExist'));
    }
  }

  onPressButtonSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  validateTextInput = (textInputTag, text = undefined) => {
    const { email, password, shouldShowErrorArray, errorArray } = this.state;
    let error = { errorMessage: '', isValid: true };

    switch (textInputTag) {
      case textInputDomainTag:
        this.setState({ domain: text });
        break;

      case textInputEmailTag:
        error = validateTextInputEmail(text);
        errorArray[textInputTag] = error.errorMessage;
        this.setState({ email: text });
        this.setState({ errorArray }); // Show Error
        return error.isValid;
      
      case textInputPasswordTag:
        error = validateTextInputPassword(text);
        errorArray[textInputTag] = error.errorMessage;
        this.setState({ password: text });
        this.setState({ errorArray }); // Show Error
        return error.isValid;
      
      default:
        const errorEmail = validateTextInputEmail(this.state.email);
        errorArray[textInputEmailTag] = errorEmail.errorMessage;

        const errorPassword = validateTextInputPassword(this.state.password);
        errorArray[textInputPasswordTag] = errorPassword.errorMessage;

        this.setState({ errorArray }); // Show Error
        return errorEmail.isValid === true && errorPassword.isValid === true;
    }
    return false;
  }

  // #endregion
}

// #endregion

// #region Redux
const mapStateToProps = (state) => {
  return {
    isLoading: state.signIn.isLoading,
    isError: state.signIn.isError,
    response: state.signIn.response
  }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
      postAPISignInStart,
      saveUser
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(SignIn);
// #endregion