import React, { Component } from 'react';
import { 
  View, Switch, Platform, Keyboard, ActivityIndicator, TextInput, Text, Button,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { HeaderBackButton } from 'react-navigation';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import styles from './styles';
import { StylesGlobal, Devices } from '../../../constants/constants';
import { validateInputEmpty } from '../../../helpers/HelperValidate';
import { postAddDeviceRequest } from '../../../redux/actions/actionDeviceManage';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/HelperRedux';
import { ACTION_ADD_USER, ACTION_ADD_DEVICE } from '../../../redux/actions/types';
import { ItemInput } from '../../../components';
import { TextInputClean, ButtonView } from '../../../helpers/components';


// #region Global
const ICON_ADD = require('../../../assets/images/ic_add.png');
const ICON_DEVICE = require('../../../assets/images/ic_device_big.png');
// #endregion


class DeviceDetailPage extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      // headerLeft: (<HeaderBackButton tintColor="white" onPress={() => { navigation.navigate.goBack(); }} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('DeviceDetails')}</Text>,
      headerRight: <View />,
      headerStyle: StylesGlobal.header,
      headerTintColor: 'white',
    };
  };


  // #region LIFE CYCLE
  constructor(props) {
    super(props);
    /* const {
      _id, UserID, Mac, ChipSerial, IsActive, 
      ClockID, ClockStatus, ClockDescription,
      DoorID, DoorStatus, DoorDescription,
    } = this.props.navigation.state.params.device; */

    /* this.state = {
      ...this.props.navigation.state.params.device,
    }; */

    this.state = {
      ...this.props.deviceDetail,
    };
  }
  

  componentWillReceiveProps(nextProps) {
    // Add SUCCESS
    const { isLoading, errorMessage, response } = nextProps;
    if (!isLoading && !errorMessage) {
      // SUCCESS
      this.props.navigation.state.params.refreshListDevice();
      this.props.navigation.goBack();
    }
  }
  // #endregion


  // #region EVEN
  onUserPress = () => {
    // this.props.navigation.navigate('DeviceUser', this.props.navigation.state.params);
    this.props.navigation.navigate('DeviceUser');
  }

  onUpdateDevicePress = () => {
    // this.props.navigation.navigate('UpdateDevice', this.props.navigation.state.params);
    this.props.navigation.navigate('UpdateDevice', { updateDeviceDetail: this.updateDeviceDetail.bind(this) });
  }
  // #endregion


  // #region RENDER
  
  // #endregion

  // #region EVENT
  updateDeviceDetail = (deviceDetail) => {
    this.setState({...deviceDetail });
    this.props.navigation.state.params.refreshListDevice();
  }
  // #endregion


  render() {
    const {
      _id, UserID, Mac, ChipSerial, IsActive, 
      ClockID, ClockStatus, ClockDescription,
      DoorID, DoorStatus, DoorDescription, QRString
    } = this.state;
    const { isLoading, errorMessage } = this.props;
    console.log(this.state);

    return (
      <View style={StylesGlobal.contentContainer}>
        <View style={[styles.imageContainer]}>
          <Image source={ICON_DEVICE} style={styles.image} />
        </View>
        <View style={styles.actionsContain}>
          <Button
            style={styles.button}
            title={I18n.t('Users')} 
            onPress={this.onUserPress}
          />
          <Button
            style={styles.button}
            title={I18n.t('UpdateDevice')}
            onPress={this.onUpdateDevicePress}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text>{`Mac: ${Mac}`}</Text>
          <Text>{`ChipSerial: ${ChipSerial}`}</Text>
          <Text>{`IsActive: ${IsActive}`}</Text>
          <Text>{`ClockID: ${ClockID}`}</Text>
          <Text>{`ClockStatus: ${ClockStatus}`}</Text>
          <Text>{`ClockDescription: ${ClockDescription}`}</Text>
          <Text>{`DoorID: ${DoorID}`}</Text>
          <Text>{`DoorStatus: ${DoorStatus}`}</Text>
          <Text>{`DoorDescription: ${DoorDescription}`}</Text>
          <Text>{`QRString: ${QRString}`}</Text>
        </View>
      </View>
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
    response: state.deviceManage.responseAddDevice,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    postAddDeviceRequest,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetailPage);
// #endregion
