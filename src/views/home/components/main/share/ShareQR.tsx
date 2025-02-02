import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ShareHook from './hook/ShareHook';
import MenuSuperior from '../../../../menuSuperior/MenuSuperior';
import HomeHook from '../../../hooks/HomeHook';
import ModalAlertDown from '../profile/ModalAlertDown';
import AlertGPS from '../../../../../componets/AlertGPS';

const ShareQR = () => {
  const {
    data,
    copiedText,
    urlGlobal,
    handleBackPress,
    copyToClipboard,
    handleTabPress,
    handleShare,
    alertGPSOff,
    setAlertGPSOff,
    handleAlertGPS,
  } = ShareHook();

  const {
    setAlertLogOut,
    setAlertDelte,
    handleAlertDelete,
    handleAlertLogOut,
    handlePressModalYes,
    alertDelte,
    alertLogOut,
  } = HomeHook();
  return (
    urlGlobal && (
      <SafeAreaView style={{flex: 1}}>
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

          <View
            style={{
              height: '50%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '85%',
                width: '85%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              {data && data.preview && urlGlobal ? (
                <QRCodeStyled
                  data={urlGlobal}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                  padding={30}
                  pieceSize={8}
                  pieceBorderRadius={4}
                  outerEyesOptions={{
                    topLeft: {
                      borderRadius: 20,
                    },
                    topRight: {
                      borderRadius: 20,
                    },
                    bottomLeft: {
                      borderRadius: 20,
                    },
                  }}
                  innerEyesOptions={{
                    borderRadius: 6,
                    scale: 0.95,
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
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '35%',
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
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
                  backgroundColor: 'white',
                }}
                onPress={copyToClipboard}>
                <View
                  style={{
                    height: '100%',
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather name="copy" size={24} color="black" />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
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
                alignItems: 'center',
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
                  backgroundColor: 'white',
                }}
                onPress={handleShare}>
                <View
                  style={{
                    height: '100%',
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather name="share" size={24} color="black" />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
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
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', fontWeight: 'normal'}}>
                  ¡Copiado!
                </Text>
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
                style={{width: 28, height: 28, tintColor: '#606060'}}
              />
              <Text style={{color: '#606060', fontWeight: 'normal'}}>Home</Text>
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
              <Text style={{color: '#606060', fontWeight: 'normal'}}>
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
              onPress={
                data?.isGPSActive
                  ? () => handleTabPress('Meetings')
                  : () => setAlertGPSOff(true)
              }>
              <Ionicons name="calendar-outline" size={25} color="#606060" />
              <Text style={{color: '#606060', fontWeight: 'normal'}}>
                Reuniones
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={
                data?.isGPSActive
                  ? () => handleTabPress('Roads')
                  : () => setAlertGPSOff(true)
              }>
              <Ionicons name="car-outline" size={30} color="#606060" />
              <Text style={{color: '#606060', fontWeight: 'normal'}}>
                Rutas
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
              onPress={() => handleTabPress('ShareQR')}>
              <Feather name="share" size={25} color="#396593" />
              <Text style={{color: '#396593', fontWeight: 'normal'}}>
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
        <AlertGPS isOpen={alertGPSOff} handleAlertClose={handleAlertGPS} />
      </SafeAreaView>
    )
  );
};

export default ShareQR;
