import { Alert } from 'react-native';

export const MessageStringPrefix = {
  SUCCESS: 'SUCCESS: ',
  SERVER_ERROR: 'SERVER ERROR: ',
  LOCAL_ERROR: 'LOCAL ERROR: '
};

export const ShowAlertSuccess = (message) => {
  Alert.alert(
    'Success',
    message,
    [
      { text: 'OK' },
    ],
    { cancelable: false }
  );
};

export const ShowAlertError = (message) => {
  Alert.alert(
    'Error',
    message,
    [
      { text: 'OK' },
    ],
    { cancelable: true }
  );
};
