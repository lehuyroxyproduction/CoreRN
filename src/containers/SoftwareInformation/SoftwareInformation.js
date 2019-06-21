import React, { Component } from 'react';
import { 
  View, Switch, Platform, Keyboard, ActivityIndicator, TextInput, Text, Button,
  Image,StyleSheet,TouchableOpacity
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import I18n from 'react-native-i18n';
import styles from './styles';
import { StylesGlobal, Devices } from '../../constants/constants';
import ComponentUserInformationAction from '../../components/componentUserInformationAction';
// #region Global
// const ICON_ADD = require('../../../assets/images/ic_add.png');
const ICON_DEVICE = require('../../assets/images/ic_device_big.png');
// #endregion


class SoftwareInfor extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
        // headerLeft: (<HeaderBackButton tintColor="white" onPress={() => { navigation.navigate.goBack(); }} />),
        headerTitle: props => <Text {...props} style={StylesGlobal.headerTitle}>{I18n.t('Softwareinfor')}</Text>,
        headerStyle: StylesGlobal.header,
        headerTintColor: 'white',
    };
  };

  // #region LIFE CYCLE
  constructor(props) {
    super(props);
    this.state = { 
        Version : '1.0.2',
        UpdateDate : '01/12/2018',
        License : 'Adquest Asia'
    }
  }
 
  render() {
      const { Version , UpdateDate , License } = this.state;
      return (
      <View style={StylesGlobal.contentContainer}>
        <View style={[styles.imageContainer]} >
          <Image source={ICON_DEVICE} style={styles.image} />
        </View>
        <View>
            <ComponentUserInformationAction 
                            style={styles.componentUserInformationAction}
                            icon={'software'}
                            title={I18n.t('SoftwareVer')}
                        />
                        <Text style={styles.inforText}>{Version}</Text>
        </View>
        <View>
            <ComponentUserInformationAction 
                            style={styles.componentUserInformationAction}
                            icon={'calenda'}
                            title={I18n.t('Updateday')}
                        />
                        <Text style={styles.inforText}>{UpdateDate}</Text>
        </View>
        <View>
            <ComponentUserInformationAction 
                            style={styles.componentUserInformationAction}
                            icon={'license'}
                            title={I18n.t('License')}
                        />
                        <Text style={styles.inforText}>{License}</Text>
        </View>
      </View>
    );
  }
}

export default SoftwareInfor ;

