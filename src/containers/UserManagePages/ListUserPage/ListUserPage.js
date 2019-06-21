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
import { getListUserRequest, postRemoveUserRequest, postRemoveUserReset } from '../../../redux/actions/actionUserManage';
import { createErrorSelector, createLoadingSelector } from '../../../helpers/HelperRedux';
import { ACTION_GET_LIST_USER, ACTION_REMOVE_USER } from '../../../redux/actions/types';
import { styles } from './styles';
import ImageButtonView from '../../../helpers/components/ImageButtonView/ImageButtonView';
import { ShowAlertError, ShowAlertSuccess } from '../../../helpers/HelperMessage';
import { HelperStyles } from '../../../helpers/HelperStyles';

// #region Global
const listItem = HelperStyles.listItem;
// #endregion

class ListUserPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: I18n.t('ListUser'),
      tabBarLabel: I18n.t('ListUser'),
      headerLeft: (<HeaderBackButton tintColor="white" onPress={params.onGoBack} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('ChangePassword')}</Text>,
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
    if (this.props.listUser.length <= 0) {
      this.refreshListUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { responseRemoveUser, isLoading, errorMessage } = nextProps;

    if (responseRemoveUser.success === true && !isLoading && !errorMessage) {
      // ==== REMOVE user success =====
      this.refreshListUser(false);
      this.props.postRemoveUserReset();
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

  renderRowUser = ({item}) => {
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
      <TouchableOpacity
        style={listItem.container}
        onPress={() => { this.onRowUserPress(item); }}
      >
        <View style={listItem.left}>
          <Image source={AppImages.ICON_USER} />
        </View>

        {/* ==== Info ==== */}
        <View style={listItem.body}>
          <View style={listItem.center}>
            {/* <Text>{I18n.t('UserName')}</Text> */}
            <View style={HelperStyles.global.inline}>
              {IsAdmin
                ? (<Image source={AppImages.ICON_ADMIN} style={styles.key} />)
                : null
              }
              <Text style={HelperStyles.text.h7}>
                {username}
              </Text>
            </View>
            <Text>
              {`${I18n.t('RfidUID')}: ${RfidUID}`}
            </Text>
            <Text>
              {`${I18n.t('Id')}: ${_id}`}
            </Text>
          </View>

          {/* ====== Buttons ===== */}
          <View style={[listItem.right]}>
            <ImageButtonView
              style={[listItem.right_button]}
              imageStyle={HelperStyles.button.edit}
              source={AppImages.ICON_EDIT}
              onPress={() => { this.onRowUserPress(_id); }}
            />
            <ImageButtonView
              style={listItem.right_button}
              source={AppImages.ICON_REMOVE}
              onPress={() => { this.onRemoveUserPress(_id); }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // #endregion


  // #region Event
  refreshListUser = (isCheckLoading = true) => {
    const { isLoading } = this.props;
    const { domain, token } = this.props.user;

    if (isCheckLoading && isLoading) return;
    
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

  onRemoveUserPress = (userId) => {
    Alert.alert(
      I18n.t('Delete'),
      I18n.t('DoYouWantToDelete'),
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => this.deleteUser(userId) },
      ],
    );
  }

  deleteUser(userId) {
    const { domain, token } = this.props.user;
    this.props.postRemoveUserRequest({
      domain,
      token,
      userId,
    });
  }
  // #endregion


  render() {
    const { isLoading, errorMessage, responseRemoveUser, listUser } = this.props;

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>

          {/* #region Header */}
          <Header style={{ backgroundColor: Colors.main }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Title>{I18n.t('Users')}</Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent onPress={this.onAddUserPress}>
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
              style={styles.listUser}
              refreshControl={(
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={this.refreshListUser}
                  colors={[Colors.main]}
                />
              )}
              data={listUser}
              renderItem={this.renderRowUser}
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
const loadingSelector = createLoadingSelector([ACTION_GET_LIST_USER, ACTION_REMOVE_USER]);
const errorSelector = createErrorSelector([ACTION_GET_LIST_USER, ACTION_REMOVE_USER]);

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    isLoading: loadingSelector(state),
    errorMessage: errorSelector(state),
    listUser: state.userManage.listUser,
    responseRemoveUser: state.userManage.responseRemoveUser,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getListUserRequest,
    postRemoveUserRequest,
    postRemoveUserReset,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ListUserPage);
// #endregion
