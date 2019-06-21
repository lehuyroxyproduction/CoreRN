import React, { Component } from 'react';
import {
  View, Text, StatusBar, FlatList, RefreshControl, TouchableOpacity, Image, Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { HeaderBackButton } from 'react-navigation';
import {
  Container, Header, Left, Icon, Body, Title, Right, StyleProvider, Content, ListItem, Thumbnail,
} from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import { StylesGlobal, Colors, AppImages } from '../../../constants/constants';
import { fecthfilterDoor,fecthfilterlogin,postAPIDoorFilterStart,postAPILoginFilterStart  } from '../../../redux/actions/actionLogsFilter';
import { fetchDataLogin , fetchDataDoor } from '../../../redux/actions/actionLogs';
import { saveDeviceDetail } from '../../../redux/actions/actionApp';
import { createErrorSelector, createLoadingSelector } from '../../../helpers/HelperRedux';
import { styles } from './styles';
import { HelperStyles } from '../../../helpers/HelperStyles';
import ImageButtonView from '../../../helpers/components/ImageButtonView/ImageButtonView';
import { ShowAlertError } from '../../../helpers/HelperMessage';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import moment from 'moment';


//#region import component
import LogsDoor from './DoorLogs';
import LogsLogin from './LoginLogs';

// #region Global
// #endregion

class Logs extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: I18n.t('LogsTime'),
      tabBarLabel: I18n.t('LogsTime'),
      headerLeft: (<HeaderBackButton tintColor="white" onPress={params.onGoBack} />),
      headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('LogsTime')}</Text>,
      headerRight: <View />,
      headerStyle: StylesGlobal.header,
      headerTintColor: 'white',
    };
  };

  // #region Component Life Cycle
  constructor(props) {
    super(props);
    this.state={
      selectedIndex: 0,
      datetime:undefined,
      swipeToClose: true,
    }
  }

  //lifecircle
  componentWillMount=()=>{
    let year = moment().get('year')
    let month= (moment().get('month'))+1;
    let date = moment().get('date');
    this.setState({datetime:year+"-"+month+"-"+date});
  }
  componentWillReceiveProps(nextProps){}

  // #region NavigationOptions
  onGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }
  // #endregion

  //#region Render
  renderEmptyList = () => (
    <View>
      <Text style={{ textAlign: 'center' }}>
        {I18n.t('EmptyList')}
      </Text>
    </View>
  )
 //#endregion

  //#region fucntion
  handleIndexChange = (index) => {
  this.setState({
    ...this.state,
    selectedIndex: index,
  });
  }
  onFilterDate= () =>{
    const {selectedIndex,datetime} = this.state;
    let day= moment(datetime).format("MMM DD YYYY"); 
    // console.log(day)
    this.setState({swipeToClose: !this.state.swipeToClose})
    if(selectedIndex===0){
      this.props.fetchDataLogin(day);
    }else{
      this.props.fetchDataDoor(day);
    }
    this.refs.modal3.close()
  }
 
  //#end region Function

  render() {
    const { selectedIndex  } =this.state;
    // console.log(this.state.date);
    return (
      
      <StyleProvider style={getTheme(material)}>
          <Container>

          <Header style={{ backgroundColor: Colors.main }}>
            <Left style={{flex:1}}/>
            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Title style={{fontWeight:'bold'}}>{I18n.t('LogsTime')}</Title>
            </Body>
            <Right>
              <Button transparent 
              // onPress={this.onAddDevicePress}
              onPress={() => this.refs.modal3.open()}
              >
                <Image 
                style={{width:20,height:20}} 
                source={AppImages.ICON_FILTER}
                />
              </Button>
            </Right>
          </Header>
          <View>
                <SegmentedControlTab
                    values={['Logs Login', 'Logs Door']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    borderRadius={0}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabTextStyle={styles.tabTextStyle}
                    />
          </View>
          {
            selectedIndex === 0 ? <LogsLogin/> : <LogsDoor/>
          }

          <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
            <Text style={styles.text}>Filter Date</Text>
            <DatePicker
                style={{width: 200}}
                date={this.state.datetime}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2036-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({datetime: date})}}
      />
            <Button onPress={()=>this.onFilterDate()} style={styles.btn}  backButtonClose={false}>Filter</Button>
          </Modal>
          
                     
          </Container>          
       
      </StyleProvider>
   
    );
  }
}

// #region REDUX


const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.app.user,
    isLoading:state.Logs.isLoading,
    // data:state.Logs.data, //log time
    // response:state.Logs.response // log Door

    // listDevice: state.deviceManage.listDevice,
    // responseRemoveDevice: state.deviceManage.responseRemoveDevice,

  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveDeviceDetail,
    postAPIDoorFilterStart,
    postAPILoginFilterStart,
    fecthfilterDoor,
    fecthfilterlogin,
    fetchDataLogin,
    fetchDataDoor
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
// #endregion

