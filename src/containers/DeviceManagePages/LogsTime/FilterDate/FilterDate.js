import React, { Component } from 'react';
import { 
  View, Switch, Platform, Keyboard, ActivityIndicator, TextInput, Image, TouchableOpacity,
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
import { postAddDeviceRequest } from '../../../redux/actions/actionDeviceManage';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/HelperRedux';
import { ACTION_ADD_USER, ACTION_ADD_DEVICE } from '../../../redux/actions/types';
import { ItemInput } from '../../../components';
import { TextInputClean } from '../../../helpers/components';
import { HelperStyles } from '../../../helpers/HelperStyles';



class FilterDate extends Component {
 
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      // headerLeft: (<HeaderBackButton tintColor="white" onPress={() => { navigation.navigate.goBack(); }} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('AddDevice')}</Text>,
      headerRight: <View/>,
      headerStyle: StylesGlobal.header,
      headerTintColor: 'white',
    };
  };


  // #region LIFE CYCLE
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onAddDevicePress: this.onAddDevicePress });
  }

  componentWillReceiveProps(nextProps) {
 
  }
  // #endregion

  render() {
    
    return (
      <Container>
    
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

export default connect(mapStateToProps, mapDispatchToProps)(AddDevicePage);
// #endregion
