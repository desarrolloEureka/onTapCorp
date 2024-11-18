import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import MenuSuperior from '../../../../menuSuperior/MenuSuperior';
import HomeHook from '../../../hooks/HomeHook';
import MeetingsHook from '../meetings/hook/MeetingsHook';

import ModalAlertDown from '../profile/ModalAlertDown';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GetAllRoutes } from '../../../../../reactQuery/home';
import { GetUser } from '../../../../../reactQuery/users';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const daysMap: { [key: string]: string } = {
  sundayRoute: 'Domingo',
  mondayRoute: 'Lunes',
  tuesdayRoute: 'Martes',
  wednesdayRoute: 'Miércoles',
  thursdayRoute: 'Jueves',
  fridayRoute: 'Viernes',
  saturdayRoute: 'Sábado',
};

const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const processRoutes = (data: any, routes: any) => {
  if (!routes || !data) return [];
  const filteredRoutes: any[] = [];
  const days = Object.keys(daysMap);

  days.forEach(day => {
    const routeId = data[day];
    const routeDetails = routes.find((route: any) => route.uid === routeId);

    filteredRoutes.push({
      [day]: routeId,
      dayName: daysMap[day],
      routeDetails: routeDetails || null,
    });
  });

  return filteredRoutes;
};

const Roads = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Home'>>();
  const handleTabPress = (tabName: string) => {
    if (tabName === 'Profile') {
      navigation.navigate('Profile');
    } else if (tabName === 'Meetings') {
      navigation.navigate('Meetings');
    } else if (tabName === 'Roads') {
      navigation.navigate('Roads');
    } else if (tabName === 'ShareQR') {
      navigation.navigate('ShareQR');
    } else {
      navigation.navigate('Home');
    }
  };

  const { handleSendLocation } = MeetingsHook();
  const {
    setAlertLogOut,
    setAlertDelte,
    handleAlertDelete,
    handleAlertLogOut,
    handlePressModalYes,
    alertDelte,
    alertLogOut,
  } = HomeHook();

  const { data } = GetUser();
  const routes = GetAllRoutes([
    data?.mondayRoute,
    data?.tuesdayRoute,
    data?.wednesdayRoute,
    data?.thursdayRoute,
    data?.fridayRoute,
    data?.saturdayRoute,
    data?.sundayRoute,
  ])?.data;

  const filteredRoutes = processRoutes(data, routes);
  const currentDayIndex = new Date().getDay();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const routeDetails = selectedOption?.routeDetails;
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [routeStarted, setRouteStarted] = useState(false);
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false);

  useEffect(() => {
    if (filteredRoutes.length > 0 && !selectedOption) {
      setSelectedOption(filteredRoutes[currentDayIndex]);
    }
  }, [filteredRoutes]);

  useEffect(() => {
    const fetchRouteState = async () => {
      try {
        const data = await AsyncStorage.getItem('@route');
        const data2 = await AsyncStorage.getItem('@startTime2');
        if (data !== null) {
          setRouteStarted(JSON.parse(data));
          setStartTime(JSON.parse(data2));
        }
      } catch (error) {
        console.error('Error al recuperar el estado de la ruta:', error);
      }
    };

    fetchRouteState();
  }, []);

  const getCurrentDateFormatted = (dayName: string) => {
    const date = new Date();
    const todayIndex = new Date().getDay();
    const dayIndex = days.indexOf(dayName);

    // Calcular días para avanzar
    const daysToAdd = dayIndex >= todayIndex ? dayIndex - todayIndex : 7 - (todayIndex - dayIndex);
    date.setDate(date.getDate() + daysToAdd);

    const dayNumber = date.getDate();
    const monthName = monthNames[date.getMonth()];

    return `Ruta ${dayName} ${dayNumber} de ${monthName}`;
  };

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const data2 = [
    { titulo: 'Nombre de Ruta', texto: routeDetails?.routeName || 'N/A' },
    { titulo: 'Zona', texto: routeDetails?.zoneName || 'N/A' },
    { titulo: 'Jefe Ruta', texto: routeDetails?.routeManager || 'N/A' },
    {
      titulo: 'Tiempo estimado',
      texto: routeDetails?.estimatedHours && routeDetails?.estimatedMinutes ?
        `${routeDetails?.estimatedHours} Horas ${routeDetails?.estimatedMinutes} Minutos`
        : 'N/A',
    },
  ];

  if (routeDetails?.addresses) {
    routeDetails.addresses.forEach((direccion: any, index: any) => {
      data2.push({ titulo: `Dirección ${index + 1}`, texto: direccion });
    });
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message: 'La aplicación necesita acceso a su ubicación.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handlePressStartRoute = async () => {
    if (routeStarted) {
      console.log('La ruta ya ha comenzado. No se puede iniciar de nuevo.');
      return;
    }
    const hasLocationPermission = await requestLocationPermission();
    if (!hasLocationPermission) {
      console.log('Permiso de ubicación denegado');
      return;
    }
    setIsLoadingFirebase(true);
    const currentTime = new Date().toISOString();
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const send = await handleSendLocation(
          latitude.toString(),
          longitude.toString(),
          'startRoute',
          currentTime,
        );
        if (send) {
          setRouteStarted(true);
          setStartTime(currentTime);
          await AsyncStorage.setItem('@route', JSON.stringify(true));
          await AsyncStorage.setItem(
            '@startTime2',
            JSON.stringify(currentTime),
          );
          setIsLoadingFirebase(false);
        }
      },
      error => {
        console.log('Error obteniendo la ubicación:', error.message);
        setIsLoadingFirebase(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const handlePressEndRoute = async () => {
    if (!routeStarted) {
      console.log('La ruta no ha comenzado. No se puede finalizar.');
      return;
    }
    const hasLocationPermission = await requestLocationPermission();
    if (!hasLocationPermission) {
      console.log('Permiso de ubicación denegado');
      return;
    }
    setIsLoadingFirebase(true);
    const currentTime = new Date().toISOString();
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const send = await handleSendLocation(
          latitude.toString(),
          longitude.toString(),
          'endRoute',
          currentTime,
        );
        if (send) {
          setIsLoadingFirebase(false);
          setEndTime(currentTime);
          setRouteStarted(false);
          await AsyncStorage.setItem('@route', JSON.stringify(false));
          await AsyncStorage.setItem('@startTime2', JSON.stringify(''));
        }
      },
      error => {
        console.log('Error obteniendo la ubicación:', error.message);
        setIsLoadingFirebase(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const displayStartTime = () => {
    if (startTime) {
      return new Date(startTime).toLocaleString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  const displayEndTime = () => {
    if (endTime) {
      return new Date(endTime).toLocaleString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const duration = end.getTime() - start.getTime();

      const hours = Math.floor(
        (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.ceil((duration % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours} hora${hours !== 1 ? 's' : ''} y ${minutes} minuto${minutes !== 1 ? 's' : ''
        }`;
    }
    return '0 horas y 0 minutos';
  };

  const origin = {
    latitude: routeDetails?.geolocations[0]?.coords?.lat,
    longitude: routeDetails?.geolocations[0]?.coords?.lng,
  };
  const destination = {
    latitude:
      routeDetails?.geolocations[routeDetails.geolocations.length - 1]?.coords
        ?.lat,
    longitude:
      routeDetails?.geolocations[routeDetails.geolocations.length - 1]?.coords
        ?.lng,
  };
  const waypoints = routeDetails?.geolocations
    ?.slice(1, -1)
    .map((loc: any) => ({
      latitude: loc.coords.lat,
      longitude: loc.coords.lng,
    }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E9E9E9' }}>
      <ImageBackground
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}
        source={require('../../../../../images/background.png')}>
        <View style={{ height: '7%', width: '90%', paddingLeft: 10 }}>
          <MenuSuperior
            setAlertLogOut={setAlertLogOut}
            setAlertDelte={setAlertDelte}
          />
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 430 }}>
          {routeDetails?.routeManager && (
            <View
              style={{
                height: '50%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <MapView
                initialRegion={{
                  latitude: routeDetails?.geolocations[0]?.coords?.lat,
                  longitude: routeDetails?.geolocations[0]?.coords?.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={{
                  width: '100%',
                  height: '95%',
                }}>
                {routeDetails.geolocations.map((location: any, index: any) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: location.coords.lat,
                      longitude: location.coords.lng,
                    }}
                    title={location.address}
                    pinColor="blue"
                  />
                ))}
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  waypoints={waypoints}
                  apikey="AIzaSyBwlZ54JrUtje068KLc8he3W58QLGN-5g8" // Reemplaza con tu clave de API
                  strokeWidth={4}
                  strokeColor="blue"
                  onError={errorMessage => {
                    console.error(errorMessage);
                  }}
                />
              </MapView>
            </View>
          )}

          {/* <View
          style={{
            height: '25%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View
            style={{
              height: '70%',
              width: '35%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View
              style={{
                height: '100%',
                width: '95%',
                backgroundColor: '#030124',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                elevation: 30
              }}>
              <Image
                style={{
                  borderRadius: 100,
                  width: '85%',
                  height: '85%'
                }}
                source={require('./../../../../../images/profilePhoto.png')}
              />
            </View>
          </View>

          <View
            style={{
              height: '20%',
              width: '40%',
              marginTop: 15,
              elevation: 30
            }}>
            <View style={roadsStyles.borderTargetName}>
              <Text style={roadsStyles.textName}>Hola David</Text>
            </View>
          </View>
        </View> */}

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                width: '85%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#396593',
                  padding: 10,
                  borderRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '50%',
                }}
                onPress={() => setIsOpen(prev => !prev)}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingRight: 40,
                    fontWeight: 'normal',
                  }}>
                  {selectedOption ? selectedOption?.dayName : 'Seleccionar'}
                </Text>
                <Icon2
                  name={isOpen ? 'chevron-thin-up' : 'chevron-thin-down'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              {isOpen && (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    elevation: 10,
                    marginTop: 3,
                  }}>
                  {filteredRoutes &&
                    filteredRoutes.map((option, index) => (
                      <TouchableOpacity
                        onPress={() => handleSelect(option)}
                        style={{ padding: 10 }}
                        key={index}
                      >
                        <Text
                          style={{
                            color: 'black',
                            paddingLeft: 10,
                            paddingRight: 40,
                            fontWeight: 'normal',
                          }}>
                          {option?.dayName}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginTop: 10,
              paddingLeft: 20,
              marginBottom: 20,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: '#396593' }}>
              {selectedOption
                ? getCurrentDateFormatted(selectedOption?.dayName)
                : getCurrentDateFormatted('Hoy')}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              height: '65%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: routeDetails?.routeManager ? 320 : 240,
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 15,
                elevation: 16,
              }}>
              <ScrollView
                contentContainerStyle={{ paddingVertical: 10 }}
                style={{ flex: 1 }}
                horizontal={false}
                nestedScrollEnabled={true}>
                {data2.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderBottomWidth: data2.length > index + 1 ? 1 : 0,
                      borderBottomColor: '#e6e6e6',
                      marginHorizontal: 10,
                      paddingVertical: 16,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderRightWidth: 1,
                        borderRightColor: '#e6e6e6',
                        paddingLeft: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: '#396593',
                        }}>
                        {item.titulo}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '400',
                          color: '#6b6b6b',
                        }}>
                        {item.texto}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          {selectedOption?.dayName === Object.values(daysMap)[currentDayIndex] &&
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                margin: 20,
                width: '90%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: !routeStarted && routeDetails?.routeManager ? '#030124' : '#888888',
                    height: 40,
                    width: 150,
                  }}
                  onPress={!routeStarted ? handlePressStartRoute : undefined}
                  disabled={routeStarted || isLoadingFirebase || !routeDetails?.routeManager}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="play" size={28} color="white" />
                  </View>
                  <View
                    style={{
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    {!routeStarted && isLoadingFirebase ? (
                      <ActivityIndicator size={25} color="white" />
                    ) : (
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'normal',
                        }}>
                        Iniciar
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{ color: 'black', fontSize: 15, fontWeight: 'normal' }}>
                    {displayStartTime()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: routeStarted ? '#030124' : '#888888',
                    height: 40,
                    width: 150,
                  }}
                  onPress={routeStarted ? handlePressEndRoute : undefined}
                  disabled={!routeStarted || isLoadingFirebase}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="stop" size={28} color="white" />
                  </View>
                  <View
                    style={{
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    {routeStarted && isLoadingFirebase ? (
                      <ActivityIndicator size={25} color="white" />
                    ) : (
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'normal',
                        }}>
                        Finalizar
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{ color: 'black', fontSize: 15, fontWeight: 'normal' }}>
                    {displayEndTime()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  height: 80,
                  width: '100%',
                }}>
                <Text
                  style={{ color: '#030124', fontSize: 14, fontWeight: 'normal' }}>
                  Tiempo tomado: {calculateDuration()}
                </Text>
              </View>
            </View>
          }

        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#E9E9E9',
            height: 90,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleTabPress('Home')}>
            {/* <Ionicons name="home-outline" size={25} color="#606060" /> */}
            <Image
              source={require('../../../../../images/icon2.png')}
              style={{ width: 28, height: 28, tintColor: '#606060' }}
            />
            <Text style={{ color: '#606060', fontWeight: 'normal' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleTabPress('Profile')}>
            <Ionicons name="person-outline" size={25} color="#606060" />
            <Text style={{ color: '#606060', fontWeight: 'normal' }}>
              Empleado
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleTabPress('Meetings')}>
            <Ionicons name="calendar-outline" size={25} color="#606060" />
            <Text style={{ color: '#606060', fontWeight: 'normal' }}>
              Reuniones
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: 3.5,
              borderColor: '#396593',
            }}
            onPress={() => handleTabPress('Roads')}>
            <Ionicons name="car-outline" size={30} color="#396593" />
            <Text style={{ color: '#396593', fontWeight: 'normal' }}>Rutas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleTabPress('ShareQR')}>
            <Feather name="share" size={25} color="#606060" />
            <Text style={{ color: '#606060', fontWeight: 'normal' }}>
              Compartir
            </Text>
          </TouchableOpacity>
        </View>

        <ModalAlertDown
          isModalAlert={alertLogOut}
          handleModalAlert={handleAlertLogOut}
          handlePressModalYes={handlePressModalYes}
          description={'¿Estás seguro de que deseas cerrar sesión?'}
          isDelete={false}
        />

        <ModalAlertDown
          isModalAlert={alertDelte}
          handleModalAlert={handleAlertDelete}
          handlePressModalYes={handlePressModalYes}
          description={'¿Estás seguro de que deseas eliminar tu cuenta?'}
          isDelete={true}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Roads;
