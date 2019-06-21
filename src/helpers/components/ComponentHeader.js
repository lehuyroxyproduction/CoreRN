import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, dimensions, DisplayScale } from "../../constants/constants";
import { AppView, AppButton } from ".";

const AppHeader = ({ children, title, leftViews, centerViews, rightViews, onLeftPress }) => {
    return(
        <View style={styles.container}>

            <View style={styles.left}>
                <TouchableOpacity onPress={onLeftPress}>
                    <Image source={require('../../assets/images/ic_back.png')} style={styles.left_button}/>
                </TouchableOpacity>
                { leftViews }
            </View>

            <View style={styles.center}>
                <AppButton style={styles.title}>{title}</AppButton>
                { centerViews }
                { children}
            </View>

            <View style={styles.right}>
                { rightViews }
            </View>

            {/* <Image source={require('../../../assets/images/night.png')} /> Woking*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 55 * DisplayScale,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10 * DisplayScale,
        paddingRight: 10 * DisplayScale,
        borderWidth: 0 * DisplayScale,
        elevation: 1 * DisplayScale,
        backgroundColor: Colors.main
    },
    center: {
       
    }, 
    left: {
        
    },
    right: {
       
    },
    title: {
        fontSize: 20 * DisplayScale,
        color: Colors.white
    },
    left_button: {
        width: 30 * DisplayScale,
        height: 30 * DisplayScale,
        marginRight: 20 * DisplayScale
    },
});

export {AppHeader};