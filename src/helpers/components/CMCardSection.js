import React from 'react';
import { View, StyleSheet } from 'react-native';


// Card con
const CMCardSection = (props) => {
    return (
        // [styles.container, props.style]: ghi đè container nếu trùng
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    }
});

//export default CMCardSection;
export { CMCardSection };
