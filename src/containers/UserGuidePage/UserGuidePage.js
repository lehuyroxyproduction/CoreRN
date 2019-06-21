import React, { Component } from 'react';
import { Platform, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from 'react-native-scalable-image'
import ImageSlider from 'react-native-image-slider';
import I18n from 'react-native-i18n';
import { Devices, StylesGlobal, EventListenerName } from '../../constants/constants.js';
import { updateTabbarVisible } from '../../redux/actions/actionApp.js';
import { styles } from './styles';

// MARK: - Constants
export const imageSize = 200 * Devices.displayScale;
const imageUserGuide1 = 'bg_user_guide_1.png';
const imageUserGuide2 = 'bg_user_guide_2.png';
const imageUserGuide3 = 'bg_user_guide_3.png';
const imageUserGuide4 = 'bg_user_guide_4.png';

class UserGuidePage extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerLeft:  <HeaderBackButton tintColor='white' onPress={params.onGoBack} />,
            headerTitle: (props) => <Text {...props} style={StylesGlobal.headerTitle} >{I18n.t('UserGuide')}</Text>,
            headerRight: <View />,
            headerStyle: StylesGlobal.header,
            headerTintColor: 'white',
        };
    };

    //  MARK: - Component Lifecycle
    constructor(props) {
        super(props);
        this.props.navigation.setParams({ onGoBack: this.onGoBack });
        this.state = {
            data: [ 
                { image: imageUserGuide1, text:  I18n.t('WelcomeToHRCRM')}, 
                { image: imageUserGuide2, text:  I18n.t('WhatIsHRCRM')}, 
                { image: imageUserGuide3, text:  I18n.t('WhatIsReactNative')}, 
                { image: imageUserGuide4, text:  I18n.t('ReadyToStart')}
            ]
        };
    }

    componentDidMount() {
        if (Platform.OS == 'android') {
            BackHandler.addEventListener(EventListenerName.AndroidHardwareBackPress, this.onGoBack);
        }
        this.props.updateTabbarVisible(false);
    }

    render() {
        const { data } = this.state;
        return (
            <ImageSlider
                style={styles.container}
                images={data}
                customSlide={({ index, item, style, width }) => (
                    <View key={index} style={[style, styles.customSlide]}>
                        <Image style={styles.image} 
                            source={
                                item.image == imageUserGuide1 ? require('../../assets/images/bg_user_guide_1.png') :
                                item.image == imageUserGuide2 ? require('../../assets/images/bg_user_guide_2.png') :
                                item.image == imageUserGuide3 ? require('../../assets/images/bg_user_guide_3.png') :
                                item.image == imageUserGuide4 ? require('../../assets/images/bg_user_guide_4.png') :
                                require('../../assets/images/bg_user_guide_1.png')
                            }
                            width={imageSize} 
                        />
                        <Text style={styles.text} >{item.text}</Text>
                        { index == data.length - 1 ?
                            <TouchableOpacity onPress={() => this.onPressButtonContinue()} >
                                <Text style={styles.button} >{I18n.t('Continue').toUpperCase()} -></Text>
                            </TouchableOpacity>
                            : null
                        }
                    </View>
                )}
            />
        );
    }

    componentWillUnmount() {
        if (Platform.OS == 'android') {
            BackHandler.removeEventListener(EventListenerName.AndroidHardwareBackPress, this.onGoBack);
        }
    }

    // #region Methods
    onGoBack = () => {
        this.props.updateTabbarVisible(true);
        this.props.navigation.goBack();
        return true;
    }

    onPressButtonContinue() {
        this.onGoBack();
    }
    // #endregion
}

// #endregion

// #region Redux
const mapStateToProps = (state) => ({
    
});
  
function dispatchToProps(dispatch) {
    return bindActionCreators({
        updateTabbarVisible
    }, dispatch);
}
  
export default connect(mapStateToProps, dispatchToProps)(UserGuidePage);
// #endregion