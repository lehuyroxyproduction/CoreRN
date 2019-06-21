import { StyleSheet } from 'react-native';
import { Devices, DefaultProps } from '../../constants/constants.js';

export const padding = 18 * Devices.displayScale;

// #region Stylesheet
export const styles = StyleSheet.create({
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
  logoContainer: {
    flex: 1,
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
  buttonContainer: {
    flex: 1,
    marginTop: padding,
    marginBottom: padding,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  forgotPasswordContainer: {
    marginVertical: padding,
  },
  signInContainer: {
    width: DefaultProps.buttonDefaultWidth,
    backgroundColor: 'white'
  },
  signUpContainer: {
    marginVertical: padding,
  },
  signUp: {
    color: 'white',
    fontSize: 13 * Devices.displayScale,
    fontWeight: 'bold'
  },
});