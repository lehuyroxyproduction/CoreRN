// @flow

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { DisplayScale, Colors } from '../../../constants/constants';

type Props = {
    title: string, 
    color: string, 
    disable: boolean, 
    loading: boolean,
    onPress: PropTypes.func
};
class ButtonBorder extends Component<Props> {

    //  MARK: - Component Lifecycle
    render() {
        const { title, color, disable, loading} = this.props;

        if (disable) {
            // Disable
            return(
                <View style={[styles.container, {borderColor: Colors.grayBlur}, this.props.style, ]} >
                    {(() => {
                        if (title) 
                            return <Text style={[styles.text, {color: Colors.grayBlur, fontSize: 15 * DisplayScale}]} >{title}</Text>;
                    })()}
                    {this.props.children}
                </View>
            );
        }

        if (loading) {
            // Disable
            return(
                <View style={[styles.container, {borderColor: Colors.grayBlur}, this.props.style, ]} >
                    <ActivityIndicator size="small" color={color} />
                </View>
            );
        }

        // Normal
        return(
            <TouchableOpacity style={[styles.container, {borderColor: color}, this.props.style, ]} 
                onPress={() => this.props.onPress != undefined ? this.props.onPress() : null} >
                {(() => {
                    if (title) 
                        return <Text style={[styles.text, {color: color != undefined ? color : 'white', fontSize: 15 * DisplayScale}]} >{title}</Text>;
                })()}
                {this.props.children}
            </TouchableOpacity>
        );
    }
};

export { ButtonBorder };