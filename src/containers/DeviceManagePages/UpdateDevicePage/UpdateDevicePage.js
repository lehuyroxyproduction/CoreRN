import React, { Component } from 'react';
import { 
  View, Switch, Platform, Keyboard, ActivityIndicator, TextInput, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Container, Header, Content, Form, Item, Label, Button, Left, InputGroup, Text, ListItem
} from 'native-base';
import { HeaderBackButton } from 'react-navigation';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import styles from './styles';
import { StylesGlobal, AppImages } from '../../../constants/constants';
import { validateInputEmpty } from '../../../helpers/HelperValidate';
import { postUpdateDeviceRequest, postUpdateDeviceReset } from '../../../redux/actions/actionDeviceManage';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/HelperRedux';
import { ACTION_ADD_USER, ACTION_ADD_DEVICE } from '../../../redux/actions/types';
import { ItemInput } from '../../../components';
import { TextInputClean } from '../../../helpers/components';
import { HelperStyles } from '../../../helpers/HelperStyles';


// #region Global
const INPUT_TAG = {
  ALL: -1,
  MAC: 0,
  CHIP_SERIAL: 1,
  IS_ACTIVE: 2,
  CLOCK_ID: 3,
  CLOCK_STATUS: 4,
  CLOCK_DESCRIPTION: 5,
  DOOR_ID: 6,
  DOOR_STATUS: 7,
  DOOR_DESCRIPTION: 8,
};
// #endregion


class UpdateDevicePage extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      // headerLeft: (<HeaderBackButton tintColor="white" onPress={() => { navigation.navigate.goBack(); }} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('AddDevice')}</Text>,
      headerRight: (
        <View>
          <TouchableOpacity onPress={() => { params.onUpdateDevicePress(); }}>
            <Image
              source={AppImages.ICON_CHECK}
              style={HelperStyles.button.add}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: StylesGlobal.header,
      headerTintColor: 'white',
    };
  };


  // #region LIFE CYCLE
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onUpdateDevicePress: this.onUpdateDevicePress }); // warning - go into: componentWillReceiveProps

    /* const {
      _id, UserID, Mac, ChipSerial, IsActive, 
      ClockID, ClockStatus, ClockDescription,
      DoorID, DoorStatus, DoorDescription,
    } = this.props.navigation.state.params.device; */
    const {
      _id, UserID, Mac, ChipSerial, IsActive, 
      ClockID, ClockStatus, ClockDescription,
      DoorID, DoorStatus, DoorDescription,
    } = this.props.deviceDetail;

    this.state = {
      errorArray: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      deviceId: _id,
      mac: Mac,
      chipSerial: ChipSerial,
      isActive: IsActive,
      clockID: ClockID,
      clockStatus: ClockStatus,
      clockDescription: ClockDescription,
      doorID: DoorID,
      doorStatus: DoorStatus,
      doorDescription: DoorDescription,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Add SUCCESS
    const { isLoading, errorMessage, responseUpdateDevice } = nextProps;
    const {
      deviceId, mac, chipSerial, isActive, clockID, clockStatus,
      clockDescription, doorID, doorStatus, doorDescription,
    } = this.state;

    if (responseUpdateDevice.success === true && !isLoading && !errorMessage) {
      this.props.postUpdateDeviceReset();

      // SUCCESS  
      this.props.navigation.state.params.updateDeviceDetail({
        _id: deviceId,
        Mac: mac,
        ChipSerial: chipSerial,
        IsActive: isActive,
        ClockID: clockID,
        ClockStatus: clockStatus,
        ClockDescription: clockDescription,
        DoorID: doorID,
        DoorStatus: doorStatus,
        DoorDescription: doorDescription,
      });
      this.props.navigation.goBack();
    }
  }
  // #endregion


  // #region METHOD
  validateInput = (inputTag = INPUT_TAG.ALL, value = undefined, saveState = true) => {
    const { errorArray } = this.state;
    let errorResult = { errorMessage: '', isValid: true };

    switch (inputTag) {
      case INPUT_TAG.MAC:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.MAC] = errorResult.errorMessage;
        if (saveState === true) this.setState({ mac: value });
        break;

      case INPUT_TAG.CHIP_SERIAL:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.CHIP_SERIAL] = errorResult.errorMessage;
        if (saveState === true) this.setState({ chipSerial: value });
        break;

      case INPUT_TAG.IS_ACTIVE:
        if (saveState === true) this.setState({ isActive: value });
        break;

      case INPUT_TAG.CLOCK_ID:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.CLOCK_ID] = errorResult.errorMessage;
        if (saveState === true) this.setState({ clockID: value });
        break;

      case INPUT_TAG.CLOCK_STATUS:
        if (saveState === true) this.setState({ clockStatus: value });
        break;

      case INPUT_TAG.CLOCK_DESCRIPTION:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.CLOCK_DESCRIPTION] = errorResult.errorMessage;
        if (saveState === true) this.setState({ clockDescription: value });
        break;

      case INPUT_TAG.DOOR_ID:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.DOOR_ID] = errorResult.errorMessage;
        if (saveState === true) this.setState({ doorID: value });
        break;

      case INPUT_TAG.DOOR_STATUS:
        if (saveState === true) this.setState({ doorStatus: value });
        break;

      case INPUT_TAG.DOOR_DESCRIPTION:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.DOOR_DESCRIPTION] = errorResult.errorMessage;
        if (saveState === true) this.setState({ doorDescription: value });
        break;

      default:
        // VALIDATE ALL TAG
        return this.validateInput(INPUT_TAG.MAC, this.state.mac, false)
          && this.validateInput(INPUT_TAG.CHIP_SERIAL, this.state.chipSerial, false)
          && this.validateInput(INPUT_TAG.IS_ACTIVE, this.state.isActive, false)
          && this.validateInput(INPUT_TAG.CLOCK_ID, this.state.clockID, false)
          && this.validateInput(INPUT_TAG.CLOCK_STATUS, this.state.clockStatus, false)
          && this.validateInput(INPUT_TAG.CLOCK_DESCRIPTION, this.state.clockDescription, false)
          && this.validateInput(INPUT_TAG.DOOR_ID, this.state.doorID, false)
          && this.validateInput(INPUT_TAG.DOOR_STATUS, this.state.doorStatus, false)
          && this.validateInput(INPUT_TAG.DOOR_DESCRIPTION, this.state.doorDescription, false);
    }

    this.setState({ errorArray });
    return errorResult.isValid;
  }

  onUpdateDevicePress = () => {
    const {
      errorArray, deviceId, mac, chipSerial, isActive, clockID, clockStatus, 
      clockDescription, doorID, doorStatus, doorDescription, 
    } = this.state;
    const { domain, token } = this.props.user;

    if (Platform.OS === 'ios') {
      this.scroll.props.scrollToPosition(0, 0);
    }

    if (this.validateInput()) {
      Keyboard.dismiss();
      this.props.postUpdateDeviceRequest({
        domain,
        token,
        deviceId,
        mac,
        chipSerial,
        isActive,
        clockID,
        clockStatus,
        clockDescription,
        doorID,
        doorStatus,
        doorDescription,
      });
    } else {
      // this.setState({...this.state, shouldShowButtonForgotPassword: true})
    }
  }
  // #endregion


  // #region RENDER
  renderError(inputTag) {
    if (this.state.errorArray[inputTag]) {
      return (
        <Text style={StylesGlobal.errorText}>
          {this.state.errorArray[inputTag]}
        </Text>
      );
    }
    return null;
  }
  // #endregion


  render() {
    const {
      errorArray, mac, chipSerial, isActive, clockID, clockStatus, 
      clockDescription, doorID, doorStatus, doorDescription, 
    } = this.state;

    const { isLoading, errorMessage } = this.props;

    return (
      <Container>
        <Content>
          <Form>

            {/* MAC */}
            <ItemInput
              title={I18n.t('Mac')}
              errorText={errorArray[INPUT_TAG.MAC]}
            >
              <TextInputClean
                placeholder="000"
                value={mac}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.MAC, value); }}
                onSubmitEditing={() => { this.inputChipSerial.focus(); }}
              />
            </ItemInput>

            {/* Chip Serial */}
            <ItemInput
              title={I18n.t('ChipSerial')}
              errorText={errorArray[INPUT_TAG.CHIP_SERIAL]}
            >
              <TextInputClean
                ref={(input) => { this.inputChipSerial = input; }}
                placeholder="000"
                value={chipSerial}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.CHIP_SERIAL, value); }}
                onSubmitEditing={() => { this.QRString.focus(); }}
              />
            </ItemInput>
          
            {/* IS Active */}
            <Item style={styles.switchContain}>
              <Switch
                onValueChange={(value) => { this.validateInput(INPUT_TAG.IS_ACTIVE, value); }}
                value={isActive}
              />
              <Text>{I18n.t('Active')}</Text>
            </Item>

            <ListItem itemDivider>
              <Text>{I18n.t('Clock')}</Text>
            </ListItem>

            {/* Lock ID */}
            <ItemInput
              title={I18n.t('ClockID')}
              errorText={errorArray[INPUT_TAG.CLOCK_ID]}
            >
              <TextInputClean
                ref={(input) => { this.ClockID = input; }}
                placeholder="1"
                value={clockID+''}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.CLOCK_ID, value); }}
                onSubmitEditing={() => { this.ClockDescription.focus(); }}
              />
            </ItemInput>

            {/* Clock Status */}
            <Item style={styles.switchContain}>
              <Switch
                onValueChange={(value) => { this.validateInput(INPUT_TAG.CLOCK_STATUS, value); }}
                value={clockStatus}
              />
              <Text>{I18n.t('ClockActive')}</Text>
            </Item>

            {/* Lock Description */}
            <ItemInput
              title={I18n.t('ClockDescription')}
              errorText={errorArray[INPUT_TAG.CLOCK_DESCRIPTION]}
            >
              <TextInputClean
                ref={(input) => { this.ClockDescription = input; }}
                placeholder={I18n.t('ClockDescription')}
                value={clockDescription}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.CLOCK_DESCRIPTION, value); }}
                onSubmitEditing={() => { this.DoorID.focus(); }}
              />
            </ItemInput>

            <ListItem itemDivider>
              <Text>{I18n.t('Door')}</Text>
            </ListItem>

            {/* Door ID */}
            <ItemInput
              title={I18n.t('DoorID')}
              errorText={errorArray[INPUT_TAG.DOOR_ID]}
            >
              <TextInputClean
                ref={(input) => { this.DoorID = input; }}
                placeholder="1"
                value={doorID+''}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.DOOR_ID, value); }}
                onSubmitEditing={() => { this.DoorDescription.focus(); }}
              />
            </ItemInput>

            {/* Door Status */}
            <Item style={styles.switchContain}>
              <Switch
                onValueChange={(value) => { this.validateInput(INPUT_TAG.DOOR_STATUS, value); }}
                value={doorStatus}
              />
              <Text>{I18n.t('DoorActive')}</Text>
            </Item>

            {/* Door Description */}
            <ItemInput
              title={I18n.t('DoorDescription')}
              errorText={errorArray[INPUT_TAG.DOOR_DESCRIPTION]}
            >
              <TextInputClean
                ref={(input) => { this.DoorDescription = input; }}
                placeholder={I18n.t('DoorDescription')}
                value={doorDescription}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.DOOR_DESCRIPTION, value); }}
              />
            </ItemInput>


            {/* BUTTON + ERROR */}
            <Text style={StylesGlobal.errorText}>
              {errorMessage}
            </Text>
            <Button
              success
              full
              style={styles.actionsContain} 
              onPress={this.onUpdateDevicePress}
            >
              <Text>{I18n.t('Save')}</Text>
            </Button>
          </Form>
        </Content>

        { isLoading
          ? (
            <View style={StylesGlobal.loadingView}>
              <ActivityIndicator
                size="large"
                color="white"
                animating={isLoading}
              />
            </View>
          )
          : null
        }
      </Container>
    );
  }
}


// #region REDUX
const loadingSelector = createLoadingSelector([ACTION_ADD_DEVICE]);
const errorSelector = createErrorSelector([ACTION_ADD_DEVICE]);

const mapStateToProps = (state) => {
  const isLoading = loadingSelector(state);
  const errorMessage = errorSelector(state);
  return {
    user: state.app.user,
    deviceDetail: state.app.deviceDetail, // get Device Detail on Props
    isLoading,
    errorMessage,
    responseUpdateDevice: state.deviceManage.responseUpdateDevice,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    postUpdateDeviceRequest,
    postUpdateDeviceReset,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDevicePage);
// #endregion
