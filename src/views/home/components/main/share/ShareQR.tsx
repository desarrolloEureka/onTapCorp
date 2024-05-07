import React from 'react';
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ShareHook from './hook/ShareHook';

const ShareQR = () => {
  const {
    data,
    copiedText,
    urlGlobal,
    handleBackPress,
    copyToClipboard,
    handleTabPress,
    handleShare
  } = ShareHook();

  return (
    urlGlobal && (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
          source={require('../../../../../images/background.png')}>
          <View style={{height: '10%', width: '100%'}}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={handleBackPress}>
              <MaterialIcons name="arrow-back-ios" size={27} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: '50%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View
              style={{
                height: '85%',
                width: '85%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}>
              {data && data.preview && urlGlobal ? (
                <QRCodeStyled
                  data={urlGlobal}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                    overflow: 'hidden'
                  }}
                  padding={30}
                  pieceSize={8}
                  pieceBorderRadius={4}
                  outerEyesOptions={{
                    topLeft: {
                      borderRadius: 20
                    },
                    topRight: {
                      borderRadius: 20
                    },
                    bottomLeft: {
                      borderRadius: 20
                    }
                  }}
                  innerEyesOptions={{
                    borderRadius: 6,
                    scale: 0.95
                  }}
                  pieceScale={1.02}
                  isPiecesGlued
                  color={'black'}
                  preserveAspectRatio="none"
                />
              ) : null}
            </View>
          </View>

          <View
            style={{
              height: '30%',
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
            <View
              style={{
                height: '35%',
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                style={{
                  height: '55%',
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderRadius: 30,
                  borderWidth: 0.2,
                  flexDirection: 'row',
                  backgroundColor: 'white'
                }}
                onPress={copyToClipboard}>
                <View
                  style={{
                    height: '100%',
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Feather name="copy" size={24} color="black" />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                  }}>
                  <Text
                    style={{fontSize: 14.5, color: 'black', fontWeight: '500'}}>
                    Copiar URL del Perfil
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: '35%',
                width: '80%',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                style={{
                  height: '55%',
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderRadius: 30,
                  borderWidth: 0.2,
                  flexDirection: 'row',
                  backgroundColor: 'white'
                }}
                onPress={handleShare}>
                <View
                  style={{
                    height: '100%',
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Feather name="share" size={24} color="black" />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                  }}>
                  <Text
                    style={{fontSize: 14.5, color: 'black', fontWeight: '500'}}>
                    Compartir Perfil
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {copiedText === true && (
              <View
                style={{
                  height: '35%',
                  width: '80%',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}>
                <Text style={{color: 'black'}}>¡Copiado!</Text>
              </View>
            )}
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
                justifyContent: 'center'
              }}
              onPress={() => handleTabPress('Roads')}>
              <Ionicons name="car-outline" size={30} color="#606060" />
              <Text style={{color: '#606060'}}>Rutas</Text>
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
              onPress={() => handleTabPress('ShareQR')}>
              <Feather name="share" size={25} color="#396593" />
              <Text style={{color: '#396593'}}>Compartir</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  );
};

export default ShareQR;
