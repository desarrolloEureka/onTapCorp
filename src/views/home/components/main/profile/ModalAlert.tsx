import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';

const ModalAlert = ({
  isModalAlert,
  handleModalAlert,
  handleDeleteData,
  noDeleted,
}: {
  isModalAlert: boolean;
  handleModalAlert: () => void;
  handleDeleteData: () => void;
  noDeleted: boolean;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalAlert}
      onRequestClose={() => {
        handleModalAlert();
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
              height: '95%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '65%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                {noDeleted
                  ? 'No puedes dejar este espacio vacío'
                  : '¿Está seguro de eliminar este dato?'}{' '}
              </Text>
            </View>
            <View
              style={{
                height: '35%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderTopWidth: 1,
              }}>
              {noDeleted ? (
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handleModalAlert()}>
                  <Text style={{color: 'white'}}>Cancelar</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRightWidth: 1,
                    }}
                    onPress={() => handleDeleteData()}>
                    <Text style={{color: 'white'}}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => handleModalAlert()}>
                    <Text style={{color: 'white'}}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
