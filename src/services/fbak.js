import AccountKit from 'react-native-facebook-account-kit'

AccountKit.configure({
  defaultCountry: 'VN',
  titleType: 'login',
  receiveSMS: true,
  initialPhoneCountryPrefix: '+84'
})

export default AccountKit
