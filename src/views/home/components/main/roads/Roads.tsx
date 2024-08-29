import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import RoadsHook from './hook/RoadsHook';
import {roadsStyles} from './styles/roadsStyles';
import MenuSuperior from '../../../../menuSuperior/MenuSuperior';
import HomeHook from '../../../hooks/HomeHook';
import ModalAlertDown from '../profile/ModalAlertDown';
// import MapView from 'react-native-maps';

const data = [
  {titulo: 'Nombre de Ruta', texto: 'Ruta centro A'},
  {titulo: 'Zona', texto: 'Zona Centro'},
  {titulo: 'Jefe Ruta', texto: 'Mario Martinez Núñez'},
  {titulo: 'Dirección 1', texto: 'Calle 17 #35-6'},
  {titulo: 'Dirección 2', texto: 'Calle 24 #38-15'},
  {titulo: 'Dirección 3', texto: 'Calle 27 #35-11'},
  {titulo: 'Dirección 4', texto: 'Calle 32 #25-76'},
  {titulo: 'Dirección 5', texto: 'Calle 28 #89-65'},
  {titulo: 'Dirección 6', texto: 'Calle 10 #55-96'},
  {titulo: 'Tiempo estimado', texto: '4 Horas'}
  // Agrega más datos según sea necesario
];

const Roads = () => {
  const {handleTabPress, handleBackPress} = RoadsHook();
  const {
    setAlertLogOut,
    setAlertDelte,
    handleAlertDelete,
    handleAlertLogOut,
    handlePressModalYes,
    alertDelte,
    alertLogOut
  } = HomeHook();

  const getCurrentDateFormatted = today => {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ];
    const months = [
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
      'Diciembre'
    ];

    const date = new Date();
    const dayName = days[date.getDay()];
    const dayNumber = date.getDate();
    const monthName = months[date.getMonth()];

    if (today) {
      return `${dayName}`;
    }
    return `${dayName} ${dayNumber} de ${monthName}`;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E9E9E9'}}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../../images/background.png')}>
        <View style={{height: '7%', width: '90%', paddingLeft: 10}}>
          <MenuSuperior
            setAlertLogOut={setAlertLogOut}
            setAlertDelte={setAlertDelte}
          />
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 430}}>
        <View
        style={{
          height: '50%',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
        {/* <MapView
          style={{
            width: '100%',
            height: '95%'
          }}
        /> */}
        <Image
          source={require('../../../../../images/maps.png')}
          style={{
            width: '100%',
            height: '95%'
          }}
        />
      </View>
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
              alignItems: 'center'
            }}>
            <View
              style={{
                height: 90,
                width: '85%',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#396593',
                  height: 40,
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  borderRadius: 20,
                  flexDirection: 'row'
                }}>
                <Text style={{color: 'white', fontSize: 16, paddingRight: 50}}>
                  {getCurrentDateFormatted(true)}
                </Text>
                <Icon2 name="chevron-thin-down" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        <View
          style={{
            height: '5%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: 10,
            paddingLeft: 20,
            marginBottom: 20
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#396593'}}>
          Ruta {getCurrentDateFormatted(false)}
          </Text>
        </View>

        <View
            style={{
              flex: 1,
              height: '65%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View
              style={{
                height: 320,
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 15,
              elevation: 16
            }}>
              <ScrollView
                contentContainerStyle={{paddingVertical: 10}}
                style={{flex: 1}}
                horizontal={false}
                nestedScrollEnabled={true}>
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderBottomWidth: data.length > index + 1 ? 1 : 0,
                      borderBottomColor: '#e6e6e6',
                      marginHorizontal: 10,
                      paddingVertical: 16
                    }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderRightWidth: 1,
                    borderRightColor: '#e6e6e6',
                    paddingLeft: 15
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#396593'
                    }}>
                    {item.titulo}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingLeft: 20
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      color: '#6b6b6b'
                    }}>
                    {item.texto}
                  </Text>
                </View>
              </View>
            ))}
                          </ScrollView>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              margin: 20,
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
                  backgroundColor: '#888888',
                  height: 40,
                  width: 150
                }}>
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
                  <Text style={{color: 'white', fontSize: 11}}>
                    Iniciar ruta
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingHorizontal: 15
                }}>
                <Text style={{color: 'black', fontSize: 13}}>10:00 am</Text>
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
                  backgroundColor: '#030124',
                  height: 40,
                  width: 150
                }}>
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
                  <Text style={{color: 'white', fontSize: 11}}>
                    Finalizar ruta
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingHorizontal: 15
                }}>
                <Text style={{color: 'black', fontSize: 13}}>12:30 am</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: 80,
                width: '100%'
              }}>
              <Text style={{color: '#030124', fontSize: 14}}>
                Tiempo tomado: 4 hora y 30 minutos
              </Text>
            </View>
          </View>
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
            width: '100%'
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => handleTabPress('Home')}>
            {/* <Ionicons name="home-outline" size={25} color="#606060" /> */}
            <Image
              source={require('../../../../../images/icon.png')}
              style={{width: 25, height: 25, tintColor: '#606060'}}
            />
            <Text style={{color: '#606060'}}>Home</Text>
               </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => handleTabPress('Profile')}>
            <Ionicons name="person-outline" size={25} color="#606060" />
            <Text style={{color: '#606060'}}>Empleado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => handleTabPress('Meetings')}>
            <Ionicons name="calendar-outline" size={25} color="#606060" />
            <Text style={{color: '#606060'}}>Reuniones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: 3.5,
              borderColor: '#396593'
            }}
            onPress={() => handleTabPress('Roads')}>
            <Ionicons name="car-outline" size={30} color="#396593" />
            <Text style={{color: '#396593'}}>Rutas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => handleTabPress('ShareQR')}>
            <Feather name="share" size={25} color="#606060" />
            <Text style={{color: '#606060'}}>Compartir</Text>
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
