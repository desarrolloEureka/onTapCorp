import React from 'react';
import {Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlertGPS = ({
  isOpen,
  handleAlertClose,
}: {
  isOpen: boolean;
  handleAlertClose: () => void;
}) => {
  return (
    <Modal
      animationType="none"
      transparent
      visible={isOpen}
      onRequestClose={() => handleAlertClose()}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Ionicons name="alert-circle-sharp" size={25} color="#396593" />
            <TouchableOpacity onPress={() => handleAlertClose()}>
              <Ionicons name="close" size={25} color="#9C9C9C" />
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>
            No tienes permisos de GPS, comunicate con tu administrador.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    marginTop: '30%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default AlertGPS;
