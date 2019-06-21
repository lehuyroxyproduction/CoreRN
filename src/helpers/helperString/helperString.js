import I18n from 'react-native-i18n';
import { Regex } from '../../config/config.js'

export const validateEmail = email => {
  return Regex.emailRegex.test(String(email).toLowerCase());
}

export const validatePassword = password => {
  //return Regex.passwordRegex.test(String(password).toLowerCase());
  return true;
}

export const validatePhoneNumber = phoneNumber => {
  return Regex.phoneRegex.test(String(phoneNumber).toLowerCase());
}

export const validateTextInputEmail = email => {
  if (!email || email.trim() === '') { return {isValid: false, errorMessage: I18n.t('ThisFieldEmailIsRequired')}; }
  else if (!validateEmail(email)) { return {isValid: false, errorMessage: `${I18n.t('PleaseEnterAValid')} ${I18n.t('Email')}.`}; }
  else { return {isValid: true}; }
}

export const validateTextInputPassword = password => {
  if (!password || password.trim() === '') { return {isValid: false, errorMessage: I18n.t('ThisFieldPasswordIsRequired')}; }
  else if (!validatePassword(password) || password.length < Regex.passwordCharacters) { return {isValid: false, errorMessage: I18n.t('PleaseEnterAValidPassword')}; }
  else { return {isValid: true}; }
}

export const validateTextInputPhoneNumber = phoneNumber => {
  if (!phoneNumber || phoneNumber.trim() === '') { return {isValid: false, errorMessage: I18n.t('ThisFieldPhoneNumberIsRequired')}; }
  else if (!validatePhoneNumber(phoneNumber)) { return {isValid: false, errorMessage: `${I18n.t('PleaseEnterAValid')} ${I18n.t('PhoneNumber')}.`}; }
  else if (phoneNumber.length < Regex.phoneNumberCharacters) { return {isValid: false, errorMessage: I18n.t('PleaseEnterAtLeastPhoneNumberCharacters')}; }
  else if (phoneNumber.length > Regex.phoneNumberCharacters) { return {isValid: false, errorMessage: I18n.t('PleaseEnterNoMoreThanPhoneNumberCharacters')}; }
  else { return {isValid: true}; }
}

export const validateTextInputName = name => {
  if (!name || name.trim() === '') { return {isValid: false, errorMessage: I18n.t('ThisFieldNameIsRequired')}; }
  else if (name.length < Regex.nameCharacters) { return {isValid: false, errorMessage: I18n.t('PleaseEnterAtLeastNameCharacters')}; }
  else { return {isValid: true}; }
}

export const validateEqual = arrayText => {
  for (let i=0; i<arrayText.length-1; i++) {
    let text1 = arrayText[i].trim();
    let text2 = arrayText[i+1].trim();

    if (text1 != text2){
        return {isValid: false, errorMessage: I18n.t('PleaseEnterNewPassEqual')};
    }
  }

  return {isValid: true};
}

export const encodeBase64 = text => {
  const base64 = require('base-64');
  const utf8 = require('utf8');
  const bytes = utf8.encode(text);
  const encoded = base64.encode(bytes);
  return encoded;
}

export const decodeBase64 = text => {
  const base64 = require('base-64');
  const utf8 = require('utf8');
  var bytes = base64.decode(text);
  var decoded = utf8.decode(bytes);
  return decoded;
}

export const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
