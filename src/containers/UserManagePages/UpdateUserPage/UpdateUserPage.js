import React, { Component } from 'react';
import { 
  View, Switch, Platform, Keyboard, ActivityIndicator, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Container, Header, Content, Form, Item, Input, Label, Button, Left, InputGroup, Text,
} from 'native-base';
import { HeaderBackButton } from 'react-navigation';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import styles from './styles';
import { StylesGlobal, AppImages } from '../../../constants/constants';
import { validateInputEmpty } from '../../../helpers/HelperValidate';
import { postUpdateUserRequest, postUpdateUserReset } from '../../../redux/actions/actionUserManage';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/HelperRedux';
import { ACTION_ADD_USER, ACTION_UPDATE_USER } from '../../../redux/actions/types';
import { HelperStyles } from '../../../helpers/HelperStyles';


// #region Global
const INPUT_TAG = {
  ALL: -1,
  USER_NAME: 0,
  RFID: 1,
  IS_ADMIN: 2,
};
// #endregion


class UpdateUserPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      // headerLeft: (<HeaderBackButton tintColor="white" onPress={() => { navigation.navigate.goBack(); }} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('UpdateUser')}</Text>,
      headerRight: (
        <View>
          <TouchableOpacity onPress={() => { params.onUpdateUserPress(); }}>
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
    this.props.navigation.setParams({ onUpdateUserPress: this.onUpdateUserPress }); // warning - go into: componentWillReceiveProps

    const {_id, username, password, IsAdmin, RfidUID} = this.props.navigation.state.params.user;

    this.state = {
      errorArray: [undefined, undefined, undefined, undefined],
      username,
      IsAdmin,
      RFID: RfidUID,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Add SUCCESS
    const { isLoading, errorMessage, response } = nextProps;
    if (response.success === true && !isLoading && !errorMessage) {
      // SAVE SUCCESS
      this.props.postUpdateUserReset();
      this.props.navigation.state.params.refreshListUser();
      this.props.navigation.goBack();
    }
  }
  // #endregion


  // #region METHOD
  validateInput = (inputTag = INPUT_TAG.ALL, value = undefined, saveState = true) => {
    const { errorArray } = this.state;
    let errorResult = { errorMessage: '', isValid: true };

    switch (inputTag) {
      case INPUT_TAG.USER_NAME:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.USER_NAME] = errorResult.errorMessage;
        if (saveState === true) this.setState({ username: value });
        break;

      case INPUT_TAG.RFID:
        if (saveState === true) this.setState({ RFID: value });
        break;

      case INPUT_TAG.IS_ADMIN:
        if (saveState === true) this.setState({ IsAdmin: value });
        break;
    
      default:
        // VALIDATE ALL TAG
        return this.validateInput(INPUT_TAG.USER_NAME, this.state.username, false)
          && this.validateInput(INPUT_TAG.RFID, this.state.RFID, false)
          && this.validateInput(INPUT_TAG.IS_ADMIN, this.state.IsAdmin, false);
    }

    this.setState({ errorArray });
    return errorResult.isValid;
  }

  onUpdateUserPress = () => {
    const { username, password, IsAdmin, RFID } = this.state;
    const { domain, token } = this.props.user;

    if (Platform.OS === 'ios') {
      this.scroll.props.scrollToPosition(0, 0);
    }
    
    if (this.validateInput()) {
      Keyboard.dismiss();
      this.props.postUpdateUserRequest({
        username, IsAdmin, RFID, domain, token,
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
    const { username, IsAdmin, RFID, errorArray, } = this.state;
    const { isLoading, errorMessage } = this.props;

    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>{I18n.t('UserName')}</Label>
              <Text style={styles.userName}>
                {username}
              </Text>
              {/* <Input
                placeholder="user@adquestasia.com"
                value={username}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.USER_NAME, value); }}
              />
              { this.renderError(INPUT_TAG.USER_NAME)} */}
            </Item>

            <Item stackedLabel>
              <Label>{I18n.t('RfidUID')}</Label>
              <Input
                placeholder="00:000:000:00:0:0:0:0:0:0"
                value={RFID}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.RFID, value); }}
              />
              { this.renderError(INPUT_TAG.RFID)}
            </Item>

            <Item>
              <Switch
                style={styles.isAdmin}
                onValueChange={(value) => { this.validateInput(INPUT_TAG.IS_ADMIN, value); }}
                value={IsAdmin}
              />
              <Text>{I18n.t('IsAdmin')}</Text>
            </Item>

            <Text style={StylesGlobal.errorText}>
              {errorMessage}
            </Text>
            <Button success full
              style={styles.actionsContain} 
              onPress={this.onUpdateUserPress}
            >
              <Text>{I18n.t('Save')}</Text>
            </Button>
          </Form>
        </Content>

        { isLoading ?
          <View style={StylesGlobal.loadingView} >
            <ActivityIndicator
              size='large'
              color={'white'}
              animating={isLoading}
            />
          </View>
          : null
        }
      </Container>
    );
  }
}


// #region REDUX
const loadingSelector = createLoadingSelector([ACTION_UPDATE_USER]);
const errorSelector = createErrorSelector([ACTION_UPDATE_USER]);

const mapStateToProps = (state) => {
  // const {success, msg} = state.reducerUserManage;
  const isLoading = loadingSelector(state);
  const errorMessage = errorSelector(state);
  return {
    user: state.app.user,
    isLoading,
    errorMessage,
    response: state.userManage.responseUpdateUser,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    postUpdateUserRequest,
    postUpdateUserReset,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserPage);
// #endregion
