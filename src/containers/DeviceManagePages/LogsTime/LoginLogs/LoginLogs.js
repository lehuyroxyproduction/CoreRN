import React, { Component } from 'react';
import {
  View, Text, StatusBar, FlatList, RefreshControl, TouchableOpacity, Image, Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import {
  Container, Header, Left, Icon, Button, Body, Title, Right, StyleProvider, Content, ListItem, Thumbnail,
} from 'native-base';

import { StylesGlobal, Colors, AppImages } from '../../../../constants/constants';
import { getAPILogsLoginStart , fetchDataLogin } from '../../../../redux/actions/actionLogs';
import { saveDeviceDetail } from '../../../../redux/actions/actionApp';
import { styles } from '../styles';

// #region Global
// #endregion

class LogsLogin extends Component {
   // #region Component Life Cycle
  constructor(props) {
    super(props);
    this.state={
      dataLogs:undefined,
      datetime:undefined
    }
  }

  componentDidMount() {
    this.props.getAPILogsLoginStart();
    this.props.fetchDataLogin(this.state.date);
    console.log('call action')
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
  renderLoginRowDevice = ({item}) => {
    const {
      Device,Actor,DoorStatus,Timestamp,TypeOfServices
    } = item;
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={AppImages.ICON_LOGIN} />
        </Left>
        <Body>
          <Text>{`Device: ${Device}`}</Text>
          <Text>{`Actor: ${Actor}`}</Text>
          <Text>{`Door Status: ${DoorStatus}`}</Text>
          <Text>{`TimeStamp : ${Timestamp}`}</Text>
          <Text>{`Type Of Services: ${TypeOfServices}`}</Text>
        </Body>
      </ListItem>
    );
  }
  refreshLogsTime = () => {
    this.props.getAPILogsLoginStart();
    this.props.fetchDataLogin();
  }
 // #endregion

 //#region fucntion
  loginLogs = () => {
    this.props.getAPILogsLoginStart();
    this.props.fetchDataLogin();
    this.setState({dataLogs:this.props.data})
    console.log("func Login")
  }
  componentWillReceiveProps(nextProps){
   
  }
//#end region Function

  render() {
    const { isLoading ,data  } = this.props;
   
    return (
          <View style={styles.content}>
            <FlatList
              style={styles.listDevice}
              refreshControl={(
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={this.refreshLogsTime}
                  colors={[Colors.main]}
                />
              )}
              data={data}
              renderItem={this.renderLoginRowDevice}
              keyExtractor={(item, index) => `${index}`}
              ListEmptyComponent={this.renderEmptyList()}
            />
          </View>

    );
  }
}

// #region REDUX


const mapStateToProps = (state) => {
  console.log(state.Logs)
  return {
    user: state.app.user,
    isLoading:state.Logs.isLoading,
    data:state.Logs.data, //log time
    

  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveDeviceDetail,
    getAPILogsLoginStart,
    fetchDataLogin
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(LogsLogin);
// #endregion

