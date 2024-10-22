import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ModalSuccessDelete = ({
  isSuccessDelete,
  handleSuccessDelete,
}: {
  isSuccessDelete: boolean;
  handleSuccessDelete: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSuccessDelete}
      onRequestClose={() => {
        handleSuccessDelete();
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(128, 128, 128, 0.7)',
        }}>
        <View
          style={{
            height: 170,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#02AF9B',
            borderRadius: 25,
          }}>
          <View
            style={{
              height: '25%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleSuccessDelete}>
              <Icon name="close" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '75%',
              width: '98%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 40,
            }}>
            <Text style={{color: 'white', fontSize: 19, paddingBottom: 10}}>
              One Tap dice!
            </Text>
            <Text style={{color: 'white', fontSize: 15}}>
              El dato de perfil ha sido eliminado exitosamente.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSuccessDelete;
