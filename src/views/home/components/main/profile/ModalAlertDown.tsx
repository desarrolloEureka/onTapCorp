import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';

function ModalAlertDown({
  isModalAlert,
  handleModalAlert,
  handlePressModalYes,
  description,
  isDelete
}: {
  isModalAlert: boolean;
  handleModalAlert: (e: boolean) => void;
  handlePressModalYes: (e: boolean) => void;
  description: string;
  isDelete: boolean;
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalAlert}
      onRequestClose={() => handleModalAlert(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(128, 128, 128, 0.5)'
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View
            style={{
              height: '20%',
              width: '80%',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}>
            <View
              style={{
                height: '60%',
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '600',
                  lineHeight: 22.98,
                  letterSpacing: 0.03,
                  textAlign: 'center',
                  color: 'black'
                }}>
                Alerta
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  lineHeight: 22.98,
                  letterSpacing: 0.03,
                  textAlign: 'center',
                  color: 'black',
                  marginTop: 5
                }}>
                {description}
              </Text>
            </View>
            <View
              style={{
                height: '20%',
                width: '100%',
                flexDirection: 'row'
              }}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderColor: '#a9a9ab',
                  borderTopWidth: 1,
                  borderRightWidth: 1
                }}>
                <TouchableOpacity
                  style={{
                    height: '70%',
                    width: '45%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => handleModalAlert(false)}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      lineHeight: 22.98,
                      letterSpacing: 0.03,
                      textAlign: 'center',
                      color: '#007aff'
                    }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderColor: '#a9a9ab',
                  borderTopWidth: 1
                }}>
                <TouchableOpacity
                  style={{
                    height: '70%',
                    width: '45%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => handlePressModalYes(isDelete)}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      lineHeight: 22.98,
                      letterSpacing: 0.03,
                      textAlign: 'center',
                      color: '#007aff'
                    }}>
                    SI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalAlertDown;
