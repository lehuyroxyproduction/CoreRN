import React, { Component } from 'react';
import { 
  View, Switch, Platform, Keyboard, ActivityIndicator, StatusBar, TouchableOpacity, InteractionManager, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Container, Header, Content, Form, Item, Input, Label, Button, Left, InputGroup, Text,
} from 'native-base';
import { HeaderBackButton } from 'react-navigation';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { StylesGlobal, Colors, AppImages } from '../../../constants/constants';
import { validateInputEmpty } from '../../../helpers/HelperValidate';
import { postAddUserRequest } from '../../../redux/actions/actionUserManage';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/HelperRedux';
import { ACTION_ADD_USER } from '../../../redux/actions/types';
import { HelperStyles } from '../../../helpers/HelperStyles';


// #region Global
const INPUT_TAG = {
  ALL: -1,
  USER_NAME: 0,
  PASSWORD: 1,
  RFID: 2,
  IS_ADMIN: 3,
};
const HelperGlobalStyle = HelperStyles.global;
// #endregion


class AddUserPage extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      // headerLeft: (<HeaderBackButton tintColor="white" onPress={() => { navigation.navigate.goBack(); }} />),
      headerLeft: (<HeaderBackButton tintColor='white' onPress={params.onGoBack} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('AddUser')}</Text>,
      headerRight: (
        <View>
          <TouchableOpacity onPress={() => { params.onAddUserPress(); }}>
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
    this.props.navigation.setParams({ onGoBack: this.onGoBack, onAddUserPress: this.onAddUserPress }); // warning - go into: componentWillReceiveProps

    this.state = {
      errorArray: [undefined, undefined, undefined, undefined],
      username: undefined,
      password: '',
      isAdmin: false,
      RFID: undefined,
    };
  }

  componentDidMount = () => {
    // InteractionManager.runAfterInteractions(() => {
    //   //this.props.navigation.setParams({ onGoBack: this.onGoBack });
    //   this.props.navigation.setParams({  });
    // });

    // this.props.navigation.setParams({ increaseCount: this.onGoBack });
  }
  
  componentWillReceiveProps(nextProps) {
    // Add SUCCESS
    const { isLoading, errorMessage, response } = nextProps;
    if (response.success === true && !isLoading && !errorMessage) {
      // SUCCESS
      this.props.navigation.state.params.refreshListUser();
      this.props.navigation.goBack();
    }
  }
  // #endregion

  // #region NavigationOptions
  onGoBack = () => {
    this.props.navigation.goBack();
    return true;
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

        /* case INPUT_TAG.PASSWORD:
        errorResult = validateInputEmpty(value);
        errorArray[INPUT_TAG.PASSWORD] = errorResult.errorMessage;
        if (saveState === true) this.setState({ password: value });
        break; */

      case INPUT_TAG.RFID:
        if (saveState === true) this.setState({ RFID: value });
        break;

      case INPUT_TAG.IS_ADMIN:
        if (saveState === true) this.setState({ isAdmin: value });
        break;
    
      default:
        // VALIDATE ALL TAG
        return this.validateInput(INPUT_TAG.USER_NAME, this.state.username, false)
          // && this.validateInput(INPUT_TAG.PASSWORD, this.state.password, false)
          && this.validateInput(INPUT_TAG.RFID, this.state.RFID, false)
          && this.validateInput(INPUT_TAG.IS_ADMIN, this.state.isAdmin, false);
    }

    this.setState({ errorArray });
    return errorResult.isValid;
  }

  onAddUserPress = () => {
    const { username, password, isAdmin, RFID } = this.state;
    const { domain, token } = this.props.user;

    if (Platform.OS === 'ios') {
      this.scroll.props.scrollToPosition(0, 0);
    }

    if (this.validateInput()) {
      Keyboard.dismiss();
      this.props.postAddUserRequest({
        username, password, isAdmin, RFID, domain, token,
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
      username, password, isAdmin, RFID, errorArray,
    } = this.state;
    const { isLoading, errorMessage } = this.props;

    return (
      <Container>
        <StatusBar backgroundColor={Colors.main} barStyle='light-content' />
        <TouchableOpacity style={styles.avatarContain} onPress={() => this.props.navigation.navigate('EditUserProfile')} >
          <FastImage
            style={[styles.avatarRounded]}
            source={AppImages.ICON_USER_DEFAULT}
          />
        </TouchableOpacity>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>
                {I18n.t('UserName')}
              </Label>
              <Input
                placeholder="user@adquestasia.com"
                value={username}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.USER_NAME, value); }}
              />
              { this.renderError(INPUT_TAG.USER_NAME)}
            </Item>
            

            {/* <Item stackedLabel>
              <Label>{I18n.t('Password')}</Label>
              <Input
                placeholder="***"
                value={password}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.PASSWORD, value); }}
              />
              { this.renderError(INPUT_TAG.PASSWORD)}
            </Item> */}
            <Item stackedLabel>
              <Label>{I18n.t('RfidUID')}</Label>
              <Input
                placeholder="00:000:000:00:0:0:0:0:0:0"
                value={RFID}
                onChangeText={(value) => { this.validateInput(INPUT_TAG.RFID, value); }}
              />
              { this.renderError(INPUT_TAG.RFID)}
            </Item>
            <Item style={styles.isAdmin}>
              <Switch
                onValueChange={(value) => { this.validateInput(INPUT_TAG.IS_ADMIN, value); }}
                value={isAdmin}
              />
              <Text>{I18n.t('IsAdmin')}</Text>
            </Item>

            <Text style={StylesGlobal.errorText}>
              {errorMessage}
            </Text>
            <Button success full
              style={styles.actionsContain} 
              onPress={this.onAddUserPress}
            >
              <Text>{I18n.t('AddUser')}</Text>
            </Button>
          </Form>
        </Content>

        { isLoading
          ? (
            <View style={StylesGlobal.loadingView} >
              <ActivityIndicator
                size='large'
                color={'white'}
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
const loadingSelector = createLoadingSelector([ACTION_ADD_USER]);
const errorSelector = createErrorSelector([ACTION_ADD_USER]);

const mapStateToProps = (state) => {
  // const {success, msg} = state.reducerUserManage;
  const isLoading = loadingSelector(state);
  const errorMessage = errorSelector(state);
  return {
    user: state.app.user,
    isLoading,
    errorMessage,
    response: state.userManage.responseAddUser,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    postAddUserRequest,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AddUserPage);
// #endregion
