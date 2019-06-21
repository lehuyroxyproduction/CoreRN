import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CMButton = ({ onClick, children }) => {
    return (
        <TouchableOpacity style={styles.button}
            onPress={onClick}>
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignSelf: 'stretch', // stretch on parent
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
    },
    text : {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
});

//export default CMButton;
export { CMButton };
