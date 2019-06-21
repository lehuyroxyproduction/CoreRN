import React, { Component } from 'react';
import {
  View, Text, StatusBar, FlatList, RefreshControl, TouchableOpacity, Image, Switch, ActivityIndicator, Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { HeaderBackButton } from 'react-navigation';
import {
  Container, Header, Left, Icon, Button, Body, Title, Right, StyleProvider, Content, ListItem, Thumbnail,
} from 'native-base';
import _ from 'lodash';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import { StylesGlobal, Colors, DefaultProps } from '../../../constants/constants';
import { ShowAlertError, ShowAlertSuccess } from '../../../helpers/HelperMessage';
import { getListUserRequest } from '../../../redux/actions/actionUserManage';
import { toggleUserInDeviceRequest } from '../../../redux/actions/actionDeviceManage';
import { createErrorSelector, createLoadingSelector } from '../../../helpers/HelperRedux';
import { ACTION_GET_LIST_USER, ACTION_GET_LIST_DEVICE, ACTION_TOGGLE_USER_IN_DEVICE } from '../../../redux/actions/types';
import { styles } from './styles';

// #region Global
const ICON_ADD = require('../../../assets/images/ic_add.png');
const ICON_USER = require('../../../assets/images/ic_user.png');
// #endregion

class DeviceUserPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: I18n.t('ListDevice'),
      tabBarLabel: I18n.t('ListDevice'),
      headerLeft: (<HeaderBackButton tintColor="white" onPress={params.onGoBack} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('UserOnDevice')}</Text>,
      headerRight: <View />,
      headerStyle: StylesGlobal.header,
      headerTintColor: 'white',
    };
  };

  // #region Component Life Cycle
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onGoBack: this.onGoBack });
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
  componentDidMount() {
    if (this.props.listUser.length <= 0) {
      this.refreshListUser();
    }
  }

  // #region NavigationOptions
  onGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }
  // #endregion 
  
  componentWillReceiveProps(nextProps) {
    const { errorMessage, isLoading, responseToggleUserInDevice } = nextProps;

    if (responseToggleUserInDevice && !errorMessage && !isLoading) {
      // Update User in Device SUCCESS
      const { selected, deviceId, userId } = responseToggleUserInDevice;
      const listUserID = this.state.UserID;
      
      this.updateUserInDevice(selected, listUserID, userId);

    } else if (errorMessage) {
      // ERROR
      ShowAlertError(errorMessage);
    }
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

  renderRowUser = (item, listUserId, deviceId) => {
    const {
      IsAdmin, RfidUID, password, username, __v, _id,
    } = item;
    
    /* item: {
      IsAdmin: false
      RfidUID: "0:0:0;0:0:0:0:0:0:0"
      password: "$2a$10$zF9j8XhCyrQD5hA./nNz.uWhJqjRee3.FNM7p7lkdPn7PVH6IBLxy"
      username: "zip"
      __v: 0
      _id: "5b9f6449b5bd36051a1cdd46"
    } */
    return (
      <ListItem thumbnail onPress={() => { this.onRowUserPress(item); }}>
        <Left>
          {/* <Image source={ICON_USER} /> */}
          <Thumbnail square source={ICON_USER} />
        </Left>
        <Body>
          <Text>{`User name: ${username}`}</Text>
          {/* <Text>{`Password: ${password}`}</Text> */}
          <Text>{`RfidUID: ${RfidUID}`}</Text>
          <Text>{`Admin: ${IsAdmin}`}</Text>
          <Text>{`id: ${_id}`}</Text>
        </Body>
        <Right>
          <Switch
            value={listUserId.includes(_id)}
            onValueChange={value => this.onUserOnDeviceToggle(deviceId, _id, value)}
          />
        </Right>
      </ListItem>
    );
  }
  // #endregion



  // #region Event
  refreshListUser = () => {
    const { isLoading } = this.props;
    const { domain, token } = this.props.user;

    if (isLoading) return;
    
    this.props.getListUserRequest({
      domain, token,
    });
  }

  onAddUserPress = () => {
    this.props.navigation.navigate('AddUser', { refreshListUser: this.refreshListUser.bind(this) });
  }

  onRowUserPress = (item) => {
    this.props.navigation.navigate('UpdateUser', { user: item, refreshListUser: this.refreshListUser.bind(this) });
  }

  // #endregion

  
  // #region Method
  onUserOnDeviceToggle = (deviceId, userId, selected) => {
    const { domain, token } = this.props.user;
    this.props.toggleUserInDeviceRequest({
      domain, token, deviceId, userId, selected,
    });
  }
  
  updateUserInDevice(selected, listUserID, userId) {
    // isSelect === true ? add user to device : remove user
    if (selected === true) {
      listUserID.push(userId);
    }
    else {
      _.remove(listUserID, item => item === userId);
    }
    this.setState({ UserID: listUserID });
  }
  
  // #endregion
  

  render() {
    const { isLoading, listUser } = this.props;
    const { UserID } = this.state;
    const deviceId = this.state._id;

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>

          {/* #region Content */}
          <View style={styles.content}>
            <FlatList
              style={styles.listUser}
              refreshControl={(
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={this.refreshListUser}
                  colors={[Colors.main]}
                />
              )}
              data={listUser}
              renderItem={({item}) => this.renderRowUser(item, UserID, deviceId)}
              keyExtractor={(item, index) => `${index}`}
              ListEmptyComponent={this.renderEmptyList()}
            />
          </View>
          {/* #endregion */}

          { isLoading
            ? (
              <View style={StylesGlobal.loadingView}>
                <ActivityIndicator
                  size="large"
                  color="white"
                  animating={isLoading}
                />
              </View>)
            : null
          }
        </Container>
      </StyleProvider>
    );
  }
}

// #region REDUX
const loadingSelector = createLoadingSelector([ACTION_GET_LIST_USER, ACTION_TOGGLE_USER_IN_DEVICE]);
const errorSelector = createErrorSelector([ACTION_GET_LIST_USER, ACTION_TOGGLE_USER_IN_DEVICE]);

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    deviceDetail: state.app.deviceDetail, // get Device Detail on Props
    isLoading: loadingSelector(state),
    errorMessage: errorSelector(state),
    listUser: state.userManage.listUser,
    responseToggleUserInDevice: state.deviceManage.responseToggleUserInDevice,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getListUserRequest,
    toggleUserInDeviceRequest,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceUserPage);
// #endregion
