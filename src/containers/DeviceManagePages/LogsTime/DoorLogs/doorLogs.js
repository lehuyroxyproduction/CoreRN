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

import {  Colors, AppImages } from '../../../../constants/constants';
import { getAPILogsDoorStart, fetchDataDoor } from '../../../../redux/actions/actionLogs';
import { saveDeviceDetail } from '../../../../redux/actions/actionApp';
import { styles } from '../styles';

// #region Global
// #endregion

class LogsDoor extends Component {
  
  // #region Component Life Cycle
  constructor(props) {
    super(props);
    this.state={
      dataLogs:undefined,
      datetime:undefined
    }
  }

  componentDidMount() {
    this.props.fetchDataDoor();
    this.props.getAPILogsDoorStart();
    console.log('call action')
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
  
  renderDoorRowDevice = ({item}) => {
    const {
      Device, DoorStatus, Note,Timestamp
    } = item;
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={AppImages.ICON_DOOR} />
        </Left>
        <Body>
          <Text>{`Device: ${Device}`}</Text>
          <Text>{`Door Status: ${DoorStatus}`}</Text>
          <Text>{`Note : ${Note}`}</Text>
          <Text>{`TimeStamp : ${Timestamp}`}</Text>
        </Body>
      </ListItem>
    );
  }
  refreshLogsTime = () => {
    this.props.getAPILogsDoorStart();
    this.props.fetchDataDoor();
  }
 // #endregion

 //#region fucntion
  doorLogs = () => {
    this.props.getAPILogsDoorStart();
    this.props.fetchDataDoor();
    this.setState({dataLogs:this.props.response})
    console.log("func Door");
  }
  componentWillReceiveProps(nextProps){
  }
//#end region Function

  render() {
    const { isLoading , response } = this.props;
   
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
              data={response}
              renderItem={this.renderDoorRowDevice}
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
    response:state.Logs.response // log Door

  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveDeviceDetail,
    getAPILogsDoorStart,
    fetchDataDoor,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(LogsDoor);
// #endregion

