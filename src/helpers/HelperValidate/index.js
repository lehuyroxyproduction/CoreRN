import I18n from 'react-native-i18n';
import _ from 'lodash';

export const RegexRule = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,   //at least 1 Number and 1 Char
  phone: /^\d+$/,
  passwordLength: 3,
  nameLength: 4,
  phoneLength: 8,
};

export const defaultValidateInputResult = { errorMessage: '', isValid: true };


// #region VALIDATE TEXT
export const validateEmail = (emailText) => {
  return RegexRule.email.test(String(emailText).toLowerCase());
};

export const validatePassword = (password) => {
  return RegexRule.passwordRegex.test(String(password).toLowerCase());
};

export const validatePhoneNumber = ( phoneNumber ) => {
  return RegexRule.phone.test(String(phoneNumber).toLowerCase());
};
// #endregion


// #region VALIDATE INPUT
export const validateInputEmpty = (textValue) => {
  if (!textValue || textValue.toString().trim() === '') {
    return { isValid: false, errorMessage: I18n.t('ThisFieldIsRequired') }; 
  }
  return { isValid: true };
};

export const validateInputEmail = ( email ) => {
  if (!email || email.trim() === '') {
    return { isValid: false, errorMessage: I18n.t('ThisFieldEmailIsRequired') }; 
  }
  if (!validateEmail(email)) {
    return { isValid: false, errorMessage: `${I18n.t('PleaseEnterAValid')} ${I18n.t('Email')}.` };
  }
  return { isValid: true };
};

export const validateInputPassword = ( password ) => {
  if (!password || password.trim() === '') {
    return { isValid: false, errorMessage: I18n.t('ThisFieldPasswordIsRequired') };
  }
  if (!validatePassword(password) || password.length < RegexRule.passwordLength) {
    return { isValid: false, errorMessage: I18n.t('PleaseEnterAValidPassword') };
  }

  return { isValid: true };
};

export const validateInputPhoneNumber = ( phoneNumber ) => {
  if (!phoneNumber || phoneNumber.trim() === '') {
    return { isValid: false, errorMessage: I18n.t('ThisFieldPhoneNumberIsRequired') };
  }
  if (!validatePhoneNumber(phoneNumber)) { 
    return {isValid: false, errorMessage: `${I18n.t('PleaseEnterAValid')} ${I18n.t('PhoneNumber')}.`}; 
  }
  if (phoneNumber.length < RegexRule.phoneLength) { 
    return { isValid: false, errorMessage: I18n.t('PleaseEnterAtLeastPhoneNumberCharacters') }; 
  }
  if (phoneNumber.length > RegexRule.phoneLength) { 
    return {isValid: false, errorMessage: I18n.t('PleaseEnterNoMoreThanPhoneNumberCharacters')}; 
  }
  return {isValid: true};
};

export const validateInputName = ( name ) => {
  if (!name || name.trim() === '') { 
    return {isValid: false, errorMessage: I18n.t('ThisFieldNameIsRequired')}; 
  }
  
  if (name.length < RegexRule.nameLength) { 
    return {isValid: false, errorMessage: I18n.t('PleaseEnterAtLeastNameCharacters')}; 
  }
  
  return {isValid: true};
};

export const validateInputEqual = ( arrayText ) => {
  for (let i = 0; i < arrayText.length - 1; i++) {
    let text1 = arrayText[i].trim();
    let text2 = arrayText[i+1].trim();

    if (text1 !== text2) {
      return {isValid: false, errorMessage: I18n.t('PleaseEnterNewPassEqual')};
    }
  }

  return {isValid: true};
};
// #endregion
