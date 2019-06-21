import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';


// Lớp Giao diện chứa, như Card bên Android
//() là function, => là phải return
const CMCard = (props) => {

    // props.children: thêm View con vào
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width:0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
});

//export default CMCard;
export { CMCard };
