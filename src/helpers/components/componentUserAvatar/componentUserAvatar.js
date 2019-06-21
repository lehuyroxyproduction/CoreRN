import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image';
import { Devices, DefaultProps } from '../../../constants/constants.js';
import { URL_IMAGE_DOMAIN } from '../../../constants/webServices.js';

class ComponentUserAvatar extends Component {

    //#region Component Lifecycle

    render() {
        const { style, onPress, user } = this.props;
        return(
            <TouchableOpacity 
                style={[styles.container, style]} 
                onPress={() => onPress ? onPress() : null}
            >
                <FastImage
                    style={[styles.avatar, {backgroundColor: user.avatar && user.avatar.length > 0 ? 'black' : 'transparent'}]}
                    source={user.avatar && user.avatar.length > 0 ? {uri: URL_IMAGE_DOMAIN + user.avatar} : require('../../../assets/images/avatar.png')}
                />
            </TouchableOpacity>
        );
    }

    //#endregion
};

//#region Stylesheet
const styles = StyleSheet.create({

    container: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'transparent',
    },

    avatar: {
        width: DefaultProps.iconHeaderUserProfileWidth,
        height: DefaultProps.iconHeaderUserProfileWidth,
        borderRadius: DefaultProps.iconHeaderUserProfileWidth / 2
    },

});
//#endregion

//#region Redux
const mapStateToProps = (state) => ({
    user: state.app.user
});
  
function dispatchToProps(dispatch) {
    return bindActionCreators({
        
    }, dispatch);
}
  
export default connect(mapStateToProps, dispatchToProps)(ComponentUserAvatar);
//#endregion