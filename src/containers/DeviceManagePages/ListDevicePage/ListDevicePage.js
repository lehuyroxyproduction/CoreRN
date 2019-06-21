import React, { Component } from 'react';
import {
  View, Text, StatusBar, FlatList, RefreshControl, TouchableOpacity, Image, Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { HeaderBackButton } from 'react-navigation';
import {
  Container, Header, Left, Icon, Button, Body, Title, Right, StyleProvider, Content, ListItem, Thumbnail,
} from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import { StylesGlobal, Colors, AppImages } from '../../../constants/constants';
import { getListDeviceRequest, postRemoveDeviceRequest, postRemoveDeviceReset } from '../../../redux/actions/actionDeviceManage';
import { saveDeviceDetail } from '../../../redux/actions/actionApp';
import { createErrorSelector, createLoadingSelector } from '../../../helpers/HelperRedux';
import { ACTION_GET_LIST_USER, ACTION_GET_LIST_DEVICE } from '../../../redux/actions/types';
import { styles } from './styles';
import { HelperStyles } from '../../../helpers/HelperStyles';
import ImageButtonView from '../../../helpers/components/ImageButtonView/ImageButtonView';
import { ShowAlertError } from '../../../helpers/HelperMessage';

// #region Global
// #endregion

class ListDevicePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: I18n.t('ListDevice'),
      tabBarLabel: I18n.t('ListDevice'),
      headerLeft: (<HeaderBackButton tintColor="white" onPress={params.onGoBack} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('ListDevice')}</Text>,
      headerRight: <View />,
      headerStyle: StylesGlobal.header,
      headerTintColor: 'white',
    };
  };

  // #region Component Life Cycle
  constructor(props) {
    super(props);
    this.state = { phoneNumber: '+842873038688' };
  }

  componentDidMount() {
    if (this.props.listDevice.length <= 0) {
      this.refreshListDevice();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { responseRemoveDevice, isLoading, errorMessage } = nextProps;

    if (responseRemoveDevice.success === true && !isLoading && !errorMessage) {
      // ==== REMOVE user success =====
      this.refreshListDevice(false);
      this.props.postRemoveDeviceReset();
    } else if (errorMessage && !isLoading) {
      // ==== Remove User Error =======
      ShowAlertError(errorMessage);
      this.props.postRemoveUserReset();
    }
  }
  // #endregion


  // #region NavigationOptions
  onGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }
  // #endregion


  // #region Render
  renderEmptyList = () => (
    <View>
      <Text style={{ textAlign: 'center' }}>
        {I18n.t('EmptyList')}
      </Text>
    </View>
  )

  renderRowDevice = ({item}) => {
    const {
      _id, UserID, Mac, ChipSerial, IsActive, 
      ClockID, ClockStatus, ClockDescription,
      DoorID, DoorStatus, DoorDescription, QRString
    } = item;
    /* item: {
      "UserID": [
        "5b90e087e14aad057032c752",
        "5b90e0e9e14aad057032c753",
      ],
      "_id": "5b90f209e14aad057032c767",
      "Mac": "60:01:94:49:A6:7D",
      "ChipSerial": "4826749",
      "IsActive": true,
      "ClockID": 1,
      "ClockStatus": false,
      "ClockDescription": "",
      "DoorID": 1,
      "DoorStatus": false,
      "DoorDescription": "",
      "QRString": "60:01:94:49:A6:7DqdOvEPZ2ps",
      "__v": 0
    } */
    return (
      <ListItem thumbnail onPress={() => { this.onRowDevicePress(item); }}>
        <Left>
          <Thumbnail square source={AppImages.ICON_DEVICE} />
        </Left>
        <Body>
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
        </Body>
        <Right>
          <ImageButtonView
            style={ListItem.right_button}
            source={AppImages.ICON_REMOVE}
            onPress={() => { this.onRemoveDevicePress(_id); }}
          />
        </Right>
      </ListItem>
    );
  }
  // #endregion


  // #region Event
  refreshListDevice = (isCheckLoading = true) => {
    const { isLoading } = this.props;
    const { domain, token } = this.props.user;

    if (isCheckLoading && isLoading) return;
    
    this.props.getListDeviceRequest({
      domain, token,
    });
  }

  onAddDevicePress = () => {
    this.props.navigation.navigate('AddDevice', { refreshListDevice: this.refreshListDevice.bind(this) });
  }

  onRowDevicePress = (item) => {
    this.props.saveDeviceDetail(item);  // Save DeviceDetail to Props
    // this.props.navigation.navigate('DeviceDetail', { device: item, refreshListDevice: this.refreshListDevice.bind(this) });
    this.props.navigation.navigate('DeviceDetail', { refreshListDevice: this.refreshListDevice.bind(this) });
  }

  onRemoveDevicePress = (deviceId) => {
    Alert.alert(
      I18n.t('Delete'),
      I18n.t('DoYouWantToDelete'),
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => this.deleteDevice(deviceId) },
      ],
    );
  }

  deleteDevice(deviceId) {
    const { domain, token } = this.props.user;
    this.props.postRemoveDeviceRequest({
      domain,
      token,
      deviceId,
    });
  }
  // #endregion


  render() {
    const { isLoading, listDevice } = this.props;

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>

          {/* #region Header */}
          <Header style={{ backgroundColor: Colors.main }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Title>{I18n.t('Devices')}</Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent onPress={this.onAddDevicePress}>
                <Image
                  source={AppImages.ICON_ADD}
                  style={HelperStyles.button.add}
                />
              </Button>
            </Right>
          </Header>
          {/* #endregion */}


          {/* #region Content */}
          <View style={styles.content}>
            <FlatList
              style={styles.listDevice}
              refreshControl={(
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={this.refreshListDevice}
                  colors={[Colors.main]}
                />
              )}
              data={listDevice}
              renderItem={this.renderRowDevice}
              keyExtractor={(item, index) => `${index}`}
              ListEmptyComponent={this.renderEmptyList()}
            />
          </View>
          {/* #endregion */}


        </Container>
      </StyleProvider>
    );
  }
}

// #region REDUX
const loadingSelector = createLoadingSelector([ACTION_GET_LIST_DEVICE]);
const errorSelector = createErrorSelector([ACTION_GET_LIST_DEVICE]);

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    isLoading: loadingSelector(state),
    error: errorSelector(state),
    listDevice: state.deviceManage.listDevice,
    responseRemoveDevice: state.deviceManage.responseRemoveDevice,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getListDeviceRequest, saveDeviceDetail, postRemoveDeviceRequest, postRemoveDeviceReset,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ListDevicePage);
// #endregion
