import React, { Component } from 'react';
// @flow

import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, StylesGlobal } from '../../constants/constants';

// //BASE_FONT = 'YOUR_CUSTOM_FONTS_FAMILY';
// AppButton.PropTypes = {
//   // On Press something
//   onPress: PropTypes.func,
// };

type Props = {
    loading: boolean
};

class AppFullLoading extends Component<Props> {
  render() {
    const { loading } = this.props;

    return (( loading ) ?
        <View style={StylesGlobal.loadingView} >
            <ActivityIndicator
            size='large'
            color={Colors.defaultTintColor}
            animating={loading}
            />
        </View>
        : null
    );
  }
}

export {AppFullLoading};