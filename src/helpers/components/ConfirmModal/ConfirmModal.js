import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { DisplayScale } from '../../constants/constants';

type Props = {
  children: React.Note,
  visible: boolean,
  textTitle: string,
  textYes: string,
  textNo: string,
  onYes: Function,
  onNo: Function,
};
const ConfirmModal = ({ children, visible, textTitle, textYes, textNo, onYes, onNo}) => {
  return (
    <Modal
      backdropColor={'green'}
      backdropOpacity="1"
      animationType="fade"
      transparent="true"
      visible={visible}
      onRequestClose={() => null} //Disable Warning 
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.container_text}>
            <Text style={styles.text_title}>
              {textTitle}
            </Text>
            <Text style={styles.text_message}>
              {children}
            </Text>
          </View>

          <View style={styles.container_action}>
            <TouchableOpacity onPress={onNo}>
              <Text style={styles.text_no}>
                {textNo || 'No'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onYes}>
              <Text style={styles.text_yes}>
                {textYes || 'Yes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  container: {
    backgroundColor: '#fff',
    margin: 20 * DisplayScale,
    padding: 20 * DisplayScale,
  },
  container_text: {
    justifyContent: 'center',
  },
  container_action: {
    flexDirection: 'row',
    marginTop: 20 * DisplayScale,
    justifyContent: 'flex-end'
  },
  text_title: {
    fontSize: 20 * DisplayScale,
    color: '#000',
  },
  text_message: {
    marginTop: 20 * DisplayScale,
    color: '#000',
  },
  text_yes: {
    color: 'rgb(228,27,35)',
    fontWeight: 'bold'
  },
  text_no: {
    color: '#000',
    marginRight: 20 * DisplayScale
  }
});

export default ConfirmModal;
