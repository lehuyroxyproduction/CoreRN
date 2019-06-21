import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import Communications from 'react-native-communications';
import FastImage from 'react-native-fast-image';
import ComponentUserInformationAction from '../../components/componentUserInformationAction';
import { resetStackNavigator } from '../../helpers/helperReactNavigation/helperStackNavigator.js';
import { Devices, Colors, StylesGlobal } from '../../constants/constants.js';
import { URL_DOMAIN } from '../../constants/webServices.js';
import { saveUser } from '../../redux/actions/actionApp.js';
import { styles } from './styles.js';



class UserProfile extends Component {
    // #region NavigationOptions
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: I18n.t('UserProfile'),
            tabBarLabel: I18n.t('UserProfile'),
            headerTitle: (props) => <Text {...props} style={StylesGlobal.headerTitle} >{I18n.t('UserProfile')}</Text>,
            headerStyle: StylesGlobal.header,
            headerTintColor: 'white',
        };
    }
    // #endregion

    // #region Component Lifecycle
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '+842873038688'
        };
    }

    render() {
        const { user } = this.props;
        const { phoneNumber } = this.state;

        return (
            <View style={styles.container} >
                <StatusBar backgroundColor={Colors.main} barStyle='light-content' />

                <TouchableOpacity style={styles.containerAvatar} onPress={() => this.props.navigation.navigate('EditUserProfile')} >
                    <FastImage
                        style={[styles.avatarRounded, {backgroundColor: user.avatars && user.avatars.length > 0 ? 'black' : 'transparent'}]}
                        source={user.avatars && user.avatars.length > 0 ? {uri: URL_DOMAIN + user.avatars} : require('../../assets/images/ic_user_avatar.png')}
                    />
                    <Text style={styles.textUserName} >{user.userName}</Text>
                </TouchableOpacity>

                <ScrollView style={styles.scrollView} scrollEnabled={false} >
                    {/* <ComponentUserInformationAction
                        style={styles.componentUserInformationAction}
                        icon={'settings'}
                        title={I18n.t('EditUserProfile')}
                        onPress={() => this.props.navigation.navigate('EditUserProfile')}
                    /> */}
                    <ComponentUserInformationAction 
                        style={styles.componentUserInformationAction}
                        icon={'settings'}
                        title={I18n.t('ChangePassword')}
                        onPress={() => this.props.navigation.navigate('ChangePassword')}
                    />
                    <ComponentUserInformationAction 
                        style={styles.componentUserInformationAction}
                        icon={'userGuide'}
                        title={I18n.t('UserGuide')}
                        onPress={() => this.props.navigation.navigate('UserGuide')}
                    />
                    <ComponentUserInformationAction
                        style={styles.componentUserInformationAction}
                        icon={'serviceTel'}
                        title={I18n.t('ServiceTel')}
                        content={phoneNumber}
                        onPress={() => Communications.phonecall(phoneNumber, true)}
                    />
                    <ComponentUserInformationAction
                        style={styles.componentUserInformationAction}
                        icon={'software'}
                        title={I18n.t('Softwareinfor')}
                        onPress={() => this.props.navigation.navigate('Software')}
                    />
                    <ComponentUserInformationAction
                        style={styles.componentUserInformationAction}
                        icon={'logout'}
                        title={I18n.t('Logout')}
                        onPress={() => this.onPressButtonLogout()}
                    />
                </ScrollView>
            </View>
        );
    }

    // #endregion

    // #region Methods
    onPressButtonLogout = () => {
        this.props.saveUser(undefined);
        resetStackNavigator(this.props.navigation, 'SignIn');
    }
    // #endregion
  
}

// #endregion

// #region Redux
const mapStateToProps = (state) => ({
    user: state.app.user,
});
  
function dispatchToProps(dispatch) {
    return bindActionCreators({
      saveUser
    }, dispatch);
}
  
export default connect(mapStateToProps, dispatchToProps)(UserProfile);
// #endregion
