import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const formatDataForModal = (data: any) => {
  if (!data) return []; // Si no hay datos, retornar un arreglo vacío

  const startTime = new Date(data.meetingStart.timestamp);
  const endTime = new Date(data.meetingEnd.timestamp);

  // Calcular duración en milisegundos
  const durationMs = endTime.getTime() - startTime.getTime();

  // Convertir a horas y minutos redondeando hacia arriba
  const totalMinutes = Math.ceil(durationMs / (1000 * 60)); // Redondear minutos hacia arriba
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  const durationText = `${hours} Hora${
    hours !== 1 ? 's' : ''
  } y ${minutes} Minuto${minutes !== 1 ? 's' : ''}`;

  return [
    {id: '1', label: 'Cliente', text: data.companyNameToVisit},
    {id: '2', label: 'Correo', text: data.email},
    {id: '3', label: 'Fecha', text: data.timestamp.slice(0, 10)},
    {id: '4', label: 'Estado', text: data.meetingStatusName},
    {
      id: '5',
      label: 'Hora Inicio',
      text: startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    {
      id: '6',
      label: 'Hora Fin',
      text: endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    },
    {id: '7', label: 'Duración Reunión', text: durationText},
    {id: '8', label: 'Observación', text: data.observations}
  ];
};

type Props = {
  show: boolean;
  data: any;
  handleClose: (item: any) => void;
};

const ModalDetail = ({show, data, handleClose}: Props) => {
  const formattedData = formatDataForModal(data);

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
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
            // marginTop: 20
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View
              style={{
                width: '95%',
                backgroundColor: 'white',
                borderRadius: 20,
                justifyContent: 'flex-start',
                alignItems: 'center',
                elevation: 15,
                marginTop: 40
              }}>
              <View style={{width: '100%'}}>
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
                      width: '80%',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#396593'
                      }}>
                      Distribuidor Potencial
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '20%',
                      alignItems: 'flex-end',
                      justifyContent: 'center'
                    }}
                    onPress={() => handleClose(null)}>
                    <Ionicons name="close" size={25} color="#9C9C9C" />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: '100%',
                    marginTop: 10,
                    paddingHorizontal: 20
                  }}>
                  <FlatList
                    data={formattedData}
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
                            {item?.label}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: 'black',
                              fontWeight: 'normal'
                            }}>
                            {item?.text}
                          </Text>
                        </View>
                      );
                    }}
                    keyExtractor={item => item?.id}
                    style={{
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
