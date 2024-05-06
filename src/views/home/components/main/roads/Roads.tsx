import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoadsHook from './hook/RoadsHook';
import { roadsStyles } from './styles/roadsStyles';

const data = [
  {titulo: 'Nombre de Ruta', texto: 'Ruta centro A'},
  {titulo: 'Zona', texto: 'Zona Centro'},
  {titulo: 'Jefe Ruta', texto: 'Mario Martinez Núñez'},
  {titulo: 'Dirección 1', texto: 'Calle 17 #35-76'},
  {titulo: 'Dirección 2', texto: 'Calle 28 #35-76'},
  {titulo: 'Dirección 3', texto: 'Calle 13 #35-76'}
  // Agrega más datos según sea necesario
];

const Roads = () => {
  const {handleTabPress, handleBackPress} = RoadsHook();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E9E9E9'}}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../../images/background.png')}>
        <View style={{height: '7%', width: '100%'}}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '18%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 5
            }}
            onPress={handleBackPress}>
            <Icon name="arrow-back-ios" size={27} color="black" />
          </TouchableOpacity>
        </View>

        <View
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
            Ruta Asignada
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            height: '65%',
            width: '100%'
          }}>
          <View
            style={{
              height: 320,
              width: '95%',
              backgroundColor: '#FFFFFF',
              borderRadius: 15,
              marginLeft: 10,
              elevation: 16
            }}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomWidth: data.length > index + 1 ? 1 : 0,
                  borderBottomColor: '#e6e6e6',
                  marginHorizontal: 10
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
          </View>
        </View>

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
            <Ionicons name="home-outline" size={25} color="#606060" />
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Roads;
