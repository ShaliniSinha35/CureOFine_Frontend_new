import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const BookingAlert = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text allowFontScaling={false}  style={styles.title}>Success</Text>
        <Text allowFontScaling={false}  style={styles.message}>Thank your for booking</Text>
        <Text allowFontScaling={false}  style={styles.message}>We will get back to you soon!</Text>
        <TouchableOpacity style={styles.button} onPress={onConfirm}>
          <Text allowFontScaling={false}  style={styles.buttonText}>Check booking update</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#103042',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth:2,
    borderColor:"#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#fff"
  },
  message: {
    fontSize: 12,
  
    color:"#fff"
  },
  button: {
    backgroundColor: '#f08080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth:1,
    borderColor:"#fff",
    marginTop:15
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
   
  },
});

export default BookingAlert;
