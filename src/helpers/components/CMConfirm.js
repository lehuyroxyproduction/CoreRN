import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet } from "react-native";
import { CMCardSection } from "./CMCardSection";
import { CMButton } from "./CMButton";

const CMConfirm = ({ children, visible, onYes, onNo}) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={()=>{}} >
            <View style={styles.container}>
                <CMCardSection style={styles.card_section}>
                    <Text style={styles.text}>
                        {children}
                    </Text>
                </CMCardSection>

                <CMCardSection>
                    <CMButton onClick={onYes}>Yes</CMButton>
                    <CMButton onClick={onNo}>No</CMButton>
                </CMCardSection>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    card_section: {
        justifyContent: 'center'
    },
    text: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
});

export {CMConfirm};