import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = [
  {id: '1', label: 'Cliente', text: 'Felipe Macias'},
  {id: '2', label: 'Correo', text: 'felipem@gmail.com'},
  {id: '3', label: 'Fecha', text: '2/05/2024'},
  {id: '4', label: 'Estado', text: 'Llamar'},
  {id: '5', label: 'Hora Inicio', text: '10:00 am'},
  {id: '6', label: 'Hora Fin', text: '11:30 am'},
  {id: '7', label: 'Duración Reunión', text: '1 Hora y 30 Minutos'},
  {
    id: '8',
    label: 'Observación',
    text: 'Cliente comenta estar interesado, sin embargo no puede tener respuesta final antes del 30 de febrero, por lo cual solicita un mayor plazo'
  }
];

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ModalDetail = ({show, handleClose}: Props) => {
  return (
    show && (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(128, 128, 128, 0.2)'
        }}>
        <View
          style={{
            height: '85%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
            // marginTop: 20
          }}>
          <View
            style={{
              height: '95%',
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View
              style={{
                height: '100%',
                width: '95%',
                backgroundColor: 'white',
                borderRadius: 20,
                justifyContent: 'flex-start',
                alignItems: 'center',
                elevation: 15
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%'
                }}>
                <View
                  style={{
                    height: '8%',
                    width: '100%',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#396593',
                    paddingHorizontal: 20
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#396593'
                      }}>
                      Distribuidor Potencial
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '50%',
                      alignItems: 'flex-end',
                      justifyContent: 'center'
                    }}
                    onPress={handleClose}>
                    <Ionicons name="close" size={25} color="#9C9C9C" />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: '88%',
                    width: '100%',
                    marginTop: 10,
                    paddingHorizontal: 20
                  }}>
                  <FlatList
                    data={data}
                    renderItem={({item}) => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginBottom: 18
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '500',
                              color: '#396593',
                              paddingBottom: 3
                            }}>
                            {item.label}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: 'black'
                            }}>
                            {item.text}
                          </Text>
                        </View>
                      );
                    }}
                    keyExtractor={item => item.id}
                    style={{
                      height: '100%',
                      width: '100%',
                      marginVertical: 5
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

export default ModalDetail;
