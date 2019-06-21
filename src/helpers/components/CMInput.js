import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

//secureTextEntry= null = false
const CMInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{ label }</Text>
            <TextInput style={styles.input}
                placeholder = {placeholder}
                value = {value}
                onChangeText = {onChangeText}
                autoCorrect = {false}
                secureTextEntry = {secureTextEntry}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    label: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
});

export { CMInput };
