import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Modal
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { meetingsStyles } from '../styles/meetingsStyles';
import Dropdown from './Dropdown';
import Geolocation from '@react-native-community/geolocation';
import MeetingsHook from '../hook/MeetingsHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FirstTap = ({
  meetingStatus,
  setActiveTab
}: {
  meetingStatus: any;
  setActiveTab: (tab: string) => void;
}) => {
  const {
    handleSendInitialInfo,
    handleSendUpdateInfo,
    isLoadingSendData,
    isDataSuccess,
    handleSendLocation
  } = MeetingsHook();

  const [companyNameToVisit, setCompanyNameToVisit] = useState('');
  const [subject, setSubject] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [meetingStart, setMeetingStart] = useState<any>(null);
  const [meetingEnd, setMeetingEnd] = useState<any>(null);
  const [meetingStatusId, setMeetingStatusId] = useState('');
  const [observations, setObservations] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [documentId, setDocumentId] = useState('');
  const [saveData, setSaveData] = useState(false);
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false)

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message: 'La aplicación necesita acceso a su ubicación.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar'
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    const fetchMeetingState = async () => {
      try {
        const startTime = await AsyncStorage.getItem('@startTime');
        const endTime = await AsyncStorage.getItem('@endTime');
        const meeting = await AsyncStorage.getItem('@meeting');
        const meetingEndInfo = await AsyncStorage.getItem('@meetingEndInfo');
        const meetingStartInfo = await AsyncStorage.getItem(
          '@meetingStartInfo'
        );

        if (meeting !== null) {
          setMeetingStarted(JSON.parse(meeting));
        }

        if (startTime !== '') {
          startTime && setStartTime(JSON.parse(startTime));
        }

        if (endTime !== '') {
          endTime && setEndTime(JSON.parse(endTime));
        }

        if (meetingStartInfo !== null) {
          const {
            companyNameToVisit,
            subject,
            contactName,
            email,
            meetingStart,
            documentId
          } = JSON.parse(meetingStartInfo);
          setCompanyNameToVisit(companyNameToVisit);
          setSubject(subject);
          setContactName(contactName);
          setEmail(email);
          setMeetingStart(meetingStart);
          setDocumentId(documentId);
        }
        if (meetingEndInfo !== null) {
          const { meetingEnd } = JSON.parse(meetingEndInfo);
          setMeetingEnd(meetingEnd);
        }
      } catch (error) {
        console.error('Error al recuperar el estado de la ruta:', error);
      }
    };

    fetchMeetingState();
  }, []);

  const handlePressStartMeeting = async () => {
    if (meetingStarted) {
      console.log('La reunión ya ha comenzado. No se puede iniciar de nuevo.');
      return;
    }
    if (!isFormValid()) {
      console.log('Formulario inválido');
      return;
    }
    const hasLocationPermission = await requestLocationPermission();
    if (!hasLocationPermission) {
      console.log('Permiso de ubicación denegado');
      return;
    }

    setIsLoadingFirebase(true)
    const currentTime = new Date().toISOString();
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setMeetingStart({
          latitude,
          longitude,
          timestamp: currentTime
        });
        const dataInitial = {
          companyNameToVisit,
          subject,
          contactName,
          email,
          meetingStart: {
            latitude,
            longitude,
            timestamp: currentTime
          }
        };
        try {
          const send = await handleSendLocation(
            latitude.toString(),
            longitude.toString(),
            'startMeeting',
            currentTime
          );
          console.log('send', send);
          if (send) {
            const documentId = await handleSendInitialInfo(dataInitial);
            console.log('documentId', documentId);
            if (documentId) {
              setDocumentId(documentId);
              await AsyncStorage.setItem(
                '@meetingStartInfo',
                JSON.stringify({
                  companyNameToVisit,
                  subject,
                  contactName,
                  email,
                  meetingStart: {
                    latitude,
                    longitude,
                    timestamp: currentTime
                  },
                  documentId
                })
              );
              setStartTime(currentTime);
              setMeetingStarted(true);
              await AsyncStorage.setItem('@startTime', JSON.stringify(currentTime));
              await AsyncStorage.setItem('@meeting', JSON.stringify(true));
              setIsLoadingFirebase(false)
            } else {
              console.log('No se pudo obtener el ID del documento');
              setIsLoadingFirebase(false)
            }
          }
        } catch (error) {
          console.log('Error al enviar la información inicial:', error);
          setIsLoadingFirebase(false)
        }
      },
      error => {
        console.log('Error obteniendo la ubicación:', error.message);
        setIsLoadingFirebase(false)
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handlePressEndMeeting = async () => {
    if (!meetingStarted) {
      console.log('La reunión no ha comenzado. No se puede finalizar.');
      return;
    }

    const hasLocationPermission = await requestLocationPermission();
    if (!hasLocationPermission) {
      console.log('Permiso de ubicación denegado');
      return;
    }

    setIsLoadingFirebase(true)
    const currentTime = new Date().toISOString();
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setMeetingEnd({
          latitude,
          longitude,
          timestamp: currentTime
        });
        const dataUpdate = {
          meetingEnd: {
            latitude,
            longitude,
            timestamp: currentTime
          }
        };
        try {
          const send = await handleSendLocation(
            latitude.toString(),
            longitude.toString(),
            'endMeeting',
            currentTime
          );
          console.log('sendA', send);
          if (send) {
            const send2 = await handleSendUpdateInfo(documentId, dataUpdate, false);
            console.log('send2A', send2);
            if (send2) {
              await AsyncStorage.setItem(
                '@meetingEndInfo',
                JSON.stringify({
                  meetingEnd: {
                    latitude,
                    longitude,
                    timestamp: currentTime
                  }
                })
              );
              setEndTime(currentTime);
              setMeetingStarted(false);
              await AsyncStorage.setItem('@endTime', JSON.stringify(currentTime));
              await AsyncStorage.setItem('@meeting', JSON.stringify(false));
              setIsLoadingFirebase(false)
            }
          }
        } catch (error) {
          console.log('Error al enviar la información inicial:', error);
          setIsLoadingFirebase(false)
        }
      },
      error => {
        console.log('Error obteniendo la ubicación:', error.message);
        setIsLoadingFirebase(false)
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );

  };

  const handlePressSave = async () => {
    if (!isFormValid2()) {
      console.log('Formulario inválido');
      return;
    }
    setSaveData(true);
    const dataUpdate = {
      meetingStatusId,
      observations
    };
    try {
      await handleSendUpdateInfo(documentId, dataUpdate, true);
    } catch (error) {
      console.log('Error al enviar la información inicial:', error);
    }
  };

  const handleModalSaveData = () => {
    setSaveData(false);
    setActiveTab('tab2');
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const duration = end.getTime() - start.getTime();

      const hours = Math.floor(
        (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.ceil((duration % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours} hora${hours !== 1 ? 's' : ''} y ${minutes} minuto${minutes !== 1 ? 's' : ''
        }`;
    }
    return '0 horas y 0 minutos';
  };

  const displayStartTime = () => {
    if (startTime) {
      return new Date(startTime).toLocaleString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  const displayEndTime = () => {
    if (endTime) {
      return new Date(endTime).toLocaleString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      companyNameToVisit !== '' &&
      subject !== '' &&
      contactName !== '' &&
      email !== '' &&
      emailRegex.test(email)
    );
  };

  const isFormValid2 = () => {
    return (
      companyNameToVisit !== '' &&
      subject !== '' &&
      contactName !== '' &&
      email !== '' &&
      meetingStart != null &&
      meetingEnd != null &&
      meetingStatusId !== '' &&
      documentId !== ''
    );
  };

  useEffect(() => {
    if (isDataSuccess) {
      setCompanyNameToVisit('');
      setSubject('');
      setContactName('');
      setEmail('');
      setMeetingStart(null);
      setMeetingEnd(null);
      setMeetingStatusId('');
      setObservations('');
      setStartTime('');
      setEndTime('');
      setMeetingStarted(false);
      setDocumentId('');
      const resetAsyncStorage = async () => {
        await AsyncStorage.setItem('@startTime', JSON.stringify(''));
        await AsyncStorage.setItem('@endTime', JSON.stringify(''));
        await AsyncStorage.setItem('@meeting', JSON.stringify(null));
        await AsyncStorage.setItem('@meetingStartInfo', JSON.stringify(null));
        await AsyncStorage.setItem('@meetingEndInfo', JSON.stringify(null));
      };
      resetAsyncStorage();
    }
  }, [isDataSuccess]);

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      extraScrollHeight={20}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginRight: 5,
          marginLeft: 5
        }}>
        <View
          style={{
            height: 355,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              height: '100%',
              width: '90%'
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 15,
                height: 20,
                width: '100%'
              }}>
              <View
                style={{
                  alignItems: 'center'
                }}>
                <Text style={meetingsStyles.label}>Fecha</Text>
              </View>
              <Text style={{ color: 'black', fontSize: 13, fontWeight: 'normal' }}>
                {new Date().toISOString().slice(0, 10)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                height: 60,
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#9b9db3',
                marginTop: 15
              }}>
              <View>
                <View
                  style={{
                    alignItems: 'center'
                  }}>
                  <Text style={meetingsStyles.label}>Cliente</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5
                  }}>
                  <Ionicons name="person-outline" size={28} color="#396593" />
                </View>
              </View>

              <View
                style={{
                  width: '85%',
                  alignItems: 'center'
                }}>
                <TextInput
                  selectionColor={'#396593'}
                  cursorColor={'#396593'}
                  style={meetingsStyles.inputBox}
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  value={companyNameToVisit}
                  onChangeText={(text: any) => {
                    setCompanyNameToVisit(text);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                height: 60,
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#9b9db3',
                marginTop: 15
              }}>
              <View>
                <View
                  style={{
                    paddingTop: 15,
                    alignItems: 'center'
                  }}>
                  <Text style={meetingsStyles.label}>Asunto</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5
                  }}>
                  <AntDesign name="file1" size={25} color="#396593" />
                </View>
              </View>

              <View
                style={{
                  width: '85%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  selectionColor={'#396593'}
                  style={meetingsStyles.inputBox}
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  value={subject}
                  onChangeText={(text: any) => {
                    setSubject(text);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                alignItems: 'flex-start',
                height: 60,
                width: '100%',
                marginTop: 0
              }}>
              <View
                style={{
                  paddingTop: 15,
                  alignItems: 'center'
                }}>
                <Text style={meetingsStyles.label}>
                  Nombre contacto de la reunión
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#9b9db3'
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginVertical: 5,
                    paddingLeft: 10,
                    marginRight: 15,
                    width: '10%',
                    height: '100%'
                  }}>
                  <AntDesign name="file1" size={25} color="#396593" />
                </View>
                <TextInput
                  selectionColor={'#396593'}
                  style={[meetingsStyles.inputBox, { width: '90%' }]}
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  value={contactName}
                  onChangeText={(text: any) => {
                    setContactName(text);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                height: 60,
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#9b9db3',
                marginTop: 36
              }}>
              <View>
                <View
                  style={{
                    paddingTop: 15,
                    alignItems: 'center'
                  }}>
                  <Text style={meetingsStyles.label}>Correo</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5
                  }}>
                  <Fontisto name="email" size={28} color="#396593" />
                </View>
              </View>

              <View
                style={{
                  width: '85%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  keyboardType="email-address"
                  selectionColor={'#396593'}
                  style={meetingsStyles.inputBox}
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  value={email}
                  onChangeText={(text: any) => {
                    setEmail(text);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 15,
            height: 650,
            width: '90%'
          }}>
          <View
            style={{
              flexDirection: 'row'
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  isFormValid() && !meetingStarted ? '#030124' : '#888888',
                height: 40,
                width: 150
              }}
              onPress={isFormValid() ? handlePressStartMeeting : undefined}
              disabled={!isFormValid() || meetingStarted || isLoadingFirebase}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Ionicons name="play" size={28} color="white" />
              </View>
              <View
                style={{
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                {!meetingStarted && isLoadingFirebase ?
                  <ActivityIndicator size={25} color='white' />
                  :
                  <Text
                    style={{ color: 'white', fontSize: 15, fontWeight: 'normal' }}>
                    Iniciar
                  </Text>
                }
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingHorizontal: 15
              }}>
              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'normal' }}>
                {displayStartTime()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  isFormValid() && meetingStarted ? '#030124' : '#888888',
                height: 40,
                width: 150
              }}
              onPress={
                isFormValid() && meetingStarted
                  ? handlePressEndMeeting
                  : undefined
              }
              disabled={!isFormValid() || !meetingStarted || isLoadingFirebase}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Ionicons name="stop" size={28} color="white" />
              </View>
              <View
                style={{
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                {meetingStarted && isLoadingFirebase ?
                  <ActivityIndicator size={25} color='white' />
                  :
                  <Text
                    style={{ color: 'white', fontSize: 15, fontWeight: 'normal' }}>
                    Finalizar
                  </Text>
                }
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingHorizontal: 15
              }}>
              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'normal' }}>
                {displayEndTime()}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: 80,
              width: '100%'
            }}>
            <Text style={{ color: '#030124', fontSize: 14, fontWeight: 'normal' }}>
              Tiempo total reunión: {calculateDuration()}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: 20,
              width: '100%'
            }}>
            <Text style={{ color: '#396593', fontSize: 14, fontWeight: '500' }}>
              Resumen de Reunión
            </Text>
          </View>

          <Dropdown
            label="Selecciona una opción"
            options={meetingStatus}
            onSelect={selected => setMeetingStatusId(selected?.uid.toString())}
            isEnable={endTime !== '' && startTime !== ''}
          />

          <View
            style={{
              backgroundColor: 'white',
              height: 300,
              width: '100%',
              borderRadius: 20,
              justifyContent: 'flex-start',
              alignItems: 'center',
              elevation: 5,
              marginVertical: 20
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: 50,
                width: '100%',
                paddingLeft: 20
              }}>
              <Text style={{ color: '#396593', fontSize: 16, fontWeight: '500' }}>
                Observaciones:
              </Text>
            </View>
            <View
              style={{
                marginBottom: 10,
                height: 230,
                width: '90%'
              }}>
              <TextInput
                placeholderTextColor="#a0a0a0"
                underlineColorAndroid="transparent"
                selectionColor={'#396593'}
                cursorColor={'#396593'}
                multiline={true}
                numberOfLines={8}
                placeholder="Escribe tus comentarios aquí..."
                style={{
                  height: 230,
                  textAlignVertical: 'top',
                  fontSize: 16,
                  padding: 10,
                  fontWeight: 'normal',
                  color: 'black'
                }}
                value={observations}
                onChangeText={(text: string) => {
                  setObservations(text);
                }}
                editable={startTime !== ''}
              />
            </View>
          </View>

          <View
            style={{
              height: 90,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
            {isLoadingSendData ? (
              <View
                style={{
                  backgroundColor: '#396593',
                  height: 40,
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  borderRadius: 20
                }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: isFormValid2() ? '#396593' : '#808080',
                  height: 40,
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  borderRadius: 20
                }}
                onPress={isFormValid2() ? handlePressSave : undefined}>
                <Text
                  style={{ color: 'white', fontSize: 16, fontWeight: 'normal' }}>
                  Guardar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          style={{
            height: 140,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20
          }}></View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={saveData}
          onRequestClose={() => handleModalSaveData()}>
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
                    Guardado
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
                    Reunión guardada exitosamente
                  </Text>
                </View>
                <View
                  style={{
                    height: '20%',
                    width: '100%'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
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
                      onPress={() => handleModalSaveData()}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '400',
                          lineHeight: 22.98,
                          letterSpacing: 0.03,
                          textAlign: 'center',
                          color: '#007aff'
                        }}>
                        Aceptar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default FirstTap;
