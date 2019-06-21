import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl, StatusBar } from 'react-native';
import Image from 'react-native-scalable-image';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import { fetchAccessLog } from "../../redux/actions/actionAccessLog";
import { Devices, Colors, StylesGlobal, DefaultProps } from '../../constants/constants.js';
import { RESPONSE_STATUS } from '../../constants/webServices';

// #region Constants
const displayScale = Devices.displayScale;
const padding = 15 * Devices.displayScale;
const largeIconSize = 40 * Devices.displayScale;
const iconSize = 15 * Devices.displayScale;
// #endregion

class ComponentAccessLogs extends Component {

    // #region NavigationOptions
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: (props) => <Text {...props} style={StylesGlobal.headerTitle} >{I18n.t('AccessLogs')}</Text>,
            headerStyle: StylesGlobal.header,
            headerTintColor: 'white',
        };
    }
    // #endregion

    // #region Component Lifecycle

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.onRefresh();
    }

    componentWillReceiveProps (nextProps) {
        let {status, errorMessage} = nextProps;

        if (status == RESPONSE_STATUS.SERVER_ERROR){
            errorMessage = I18n.t('ServerError') + ": " + errorMessage;
            this.refs.toast.close();
            this.refs.toast.show(errorMessage);
        }
        if (status == RESPONSE_STATUS.UNEXPECTED_ERROR) {
            errorMessage = I18n.t('UnexpectedError') + ": " + errorMessage;
            this.refs.toast.close();
            this.refs.toast.show(errorMessage);
        }
    }

    render() {
        const { status, listAccessLog } = this.props;
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor={Colors.main} barStyle='light-content' />
                <FlatList 
                    refreshControl={
                        <RefreshControl
                            refreshing={(status==RESPONSE_STATUS.LOADING)}
                            onRefresh={this.onRefresh}
                            colors={[Colors.main]}
                        />
                    }
                    data={listAccessLog}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.showEmptyListView()}
                />

                {/* Dialog/ Popup */}
                <Toast 
                    ref='toast'
                    style={StylesGlobal.toastContainer}
                    textStyle={StylesGlobal.toastText}
                    defaultCloseDelay={DefaultProps.toastDefaultCloseDelay}
                    position='top'
                    positionValue={ 20 * displayScale }
                />
            </View>
        );
    }

    // #endregion

    // #region Components
    renderItem = ({item}) => {
        return (
            <View style={styles.container_list_item} >
                <Image 
                    source={require('../../assets/images/stopwatch.png')}
                    tintColor={'black'}
                    width={largeIconSize}
                />
                <View style={styles.container_info} >
                    <Text style={[styles.text, styles.address_value]} >{item.building_name}</Text>
                    <View style={styles.container_time} >
                        <Image 
                            source={require('../../assets/images/login.png')}
                            tintColor={'black'}
                            width={iconSize}
                        />
                        <Text style={[styles.text, styles.time_label]}>Login: </Text>
                        <Text style={[styles.text, styles.time_value]}>{item.login}</Text>
                    </View>
                    <View style={styles.container_time} >
                        <Image 
                            source={require('../../assets/images/logout.png')}
                            tintColor={'black'}
                            width={iconSize}
                        />
                        <Text style={[styles.text, styles.time_label]}>Logout: </Text>
                        <Text style={[styles.text, styles.time_value]}>{item.logout}</Text>
                    </View>
                </View>
            </View>
        );
    }

    showEmptyListView() {
        return (
            <View>
                <Text style={{textAlign: 'center'}}>
                    {I18n.t('EmptyList')}
                </Text>
            </View>
        )
    }
    // #endregion
  
    // #region Methods
    onRefresh = () => {
        this.props.fetchAccessLog({userId: this.props.user.id});
    }
    // #endregion

}

// #region Stylesheet
const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    container_list_item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: padding,
        paddingVertical: padding / 2,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    container_info: {
        marginLeft: padding,
    },
    
    container_time: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 3,
    },
      
    text: {
        color: 'black',
        fontSize: 14 * Devices.displayScale,
    },

    time_label: {
        fontWeight: 'bold',
        marginLeft: 3
    },

    address_value: {
        fontSize: 16 * Devices.displayScale,
        fontWeight: 'bold'
    },

    time_value: {

    }

});
// #endregion

// #region Redux
const mapStateToProps = (state, ownProps) => {
    const {status, errorMessage, listAccessLog} = state.accessLog;

    return {
        user: state.app.user,
        status,
        errorMessage,
        listAccessLog,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAccessLog,
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(ComponentAccessLogs);
// #endregion
