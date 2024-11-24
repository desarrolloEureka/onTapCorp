import React from 'react';
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
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertGPS from '../../../../../componets/AlertGPS';
import RoadsHook from './hook/RoadsHook';

const Roads = () => {
  const {
    user,
    handleTabPress,
    setAlertGPSOff,
    alertGPSOff,
    handleAlertGPS,
    routeStarted,
    isLoadingFirebase,
    setIsLoadingFirebase,
    setRouteStarted,
    setStartTime,
    setEndTime,
    routeDetails,
    origin,
    destination,
    waypoints,
    setIsOpen,
    isOpen,
    selectedOption,
    filteredRoutes,
    handleSelect,
    getCurrentDateFormatted,
    data2,
    daysMap,
    currentDayIndex,
    displayStartTime,
    displayEndTime,
    calculateDuration,
  } = RoadsHook();

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
    if (!user?.isGPSActive) {
      setAlertGPSOff(true)
      return;
    }

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
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
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
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  };

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
        <AlertGPS
          isOpen={alertGPSOff}
          handleAlertClose={handleAlertGPS}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Roads;
