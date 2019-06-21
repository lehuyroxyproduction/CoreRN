import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const CMSpinner = ({ size }) => {
    return (
        <View style={styles.spinner} >
            {/* 'large' mặc định khi Size null */}
            <ActivityIndicator size = {size || 'large'} />
        </View>
    );
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export { CMSpinner };