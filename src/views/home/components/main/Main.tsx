import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomAlertBadge from '../../../../componets/customAlertBadge/CustomAlertBadge';
import MenuSuperior from '../../../menuSuperior/MenuSuperior';
import HomeHook from '../../hooks/HomeHook';
import { homeStyles } from '../../styles/homeStyles';
import CustomCheckbox from './home/CustomCheckbox';
import CustomSwitch from './home/CustomSwitch';
import CustomModalAlert from './profile/CustomModalAlert';
import CustomModalLoading from './profile/CustomModalLoading';
import ModalAlertDown from './profile/ModalAlertDown';

const Main = () => {
  const {
    templates,
    copiedText,
    user,
    isModalAlertBg,
    handleModalAlertBg,
    handleAlertProfileSocial,
    isLoadingSendData,
    copyToClipboard,
    handleNavigatePreview,
    selectTemplate,
    isAlertProfileSocial,
    handleTabPress,
    alertSwitchOff,
    handleAlertSwitch,
    setAlertSwitchOff,
    alertLogOut,
    setAlertLogOut,
    handleAlertLogOut,
    alertDelte,
    setAlertDelte,
    handleAlertDelete,
    handlePressModalYes
  } = HomeHook();

  return (
    <SafeAreaView style={homeStyles.rootContainer}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../images/background.png')}>
        <View
          style={{
            height: 150,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View style={{height: '50%', width: '100%', flexDirection: 'row'}}>
            <View style={{height: '100%', width: '20%', flexDirection: 'row'}}>
              <View
                style={{
                  height: '95%',
                  width: '65%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginLeft: 14,
                  marginTop: 3
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: '100%', height: '100%'}}
                  source={require('../../../../images/logo_inicio.png')}
                />
              </View>
            </View>
            <View
              style={{
                height: '100%',
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}>
              <View
                style={{
                  height: '100%',
                  width: '40%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <TouchableOpacity
                  style={{
                    height: '94%',
                    width: '95%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={copyToClipboard}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: '#396593'
                    }}>
                    Copiar URL
                  </Text>
                  <Feather name="copy" size={23} color="#396593" />
                  {copiedText === true && (
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: '#030124'
                      }}>
                      ¡Copiado!
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flexDirection: 'row'
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-end'
                }}>
                <MenuSuperior
                  setAlertLogOut={setAlertLogOut}
                  setAlertDelte={setAlertDelte}
                />
              </View>
            </View>
          </View>

          <View style={{height: '50%', width: '90%', flexDirection: 'row'}}>
            <View
              style={{height: '100%', width: '50%', justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: '55%',
                  width: '58%',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text style={homeStyles.buttonText}>
                  <Icon name="eye" size={19} color="#030124" />{' '}
                  {user ? user.views : ''}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: '100%',
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View style={homeStyles.switchWrapper}>
                  <Text style={[homeStyles.switchText, {color: '#030124'}]}>
                    Activar Tarjeta
                  </Text>

                  <CustomSwitch
                    uid={user?.uid}
                    setAlertSwitchOff={setAlertSwitchOff}
                  />

                  <Text style={[homeStyles.switchText, {color: '#030124'}]}>
                    OFF | ON
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 60,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={{fontSize: 22, fontWeight: '500', color: '#396593'}}>
              Plantillas
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 475,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View style={{height: '95%', width: '95%'}}>
            {templates && (
              <FlatList
                data={templates}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({item, index}) => {
                  const i = item.id;
                  const itemData = user?.templateData?.find(
                    val => val.id === i
                  );
                  const background = user?.templateData?.find(
                    val => val.id === i && val.background_id
                  );

                  return (
                    <View
                      style={{
                        height: 280,
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <View
                        style={{
                          height: '95%',
                          width: '95%',
                          backgroundColor: '#FFFFFF',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        <View
                          style={{
                            height: '20%',
                            width: '100%',
                            alignItems: 'flex-end',
                            flexDirection: 'row'
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '50%',
                              justifyContent: 'center'
                            }}>
                            <TouchableOpacity
                              disabled={itemData ? !itemData?.checked : true}
                              style={{
                                height: '100%',
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                              onPress={() => handleNavigatePreview(background)}>
                              <Ionicons
                                name="eye-sharp"
                                size={15}
                                color="#030124"
                              />
                              <Text style={{fontSize: 10, color: '#030124'}}>
                                Vista{'\n'}Previa
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              height: '100%',
                              width: '50%',
                              justifyContent: 'center',
                              alignItems: 'flex-end'
                            }}>
                            <View
                              style={{
                                height: '100%',
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>
                              {user && (
                                <CustomCheckbox
                                  uid={user?.uid}
                                  value={item}
                                  checked={
                                    itemData != undefined
                                      ? itemData
                                        ? itemData?.checked
                                        : false
                                      : false
                                  }
                                />
                              )}
                              <Text style={{fontSize: 9, color: '#030124'}}>
                                Seleccionar {'\n'} plantilla
                              </Text>
                            </View>
                          </View>
                        </View>

                        <TouchableOpacity
                          disabled={itemData ? itemData?.checked : false}
                          style={{
                            height: '65%',
                            width: '98%',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => selectTemplate(item)}>
                          <View style={{height: '98%', width: '98%'}}>
                            <Image
                              source={{uri: `${item.image}`}}
                              style={{flex: 1, resizeMode: 'contain'}}
                            />
                          </View>
                        </TouchableOpacity>

                        <View
                          style={{
                            height: '15%',
                            width: '100%',
                            alignItems: 'flex-end',
                            flexDirection: 'row'
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '50%',
                              justifyContent: 'center'
                            }}>
                            <View
                              style={{
                                height: '100%',
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>
                              <Text
                                style={{fontSize: 10, color: 'white'}}></Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
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
              justifyContent: 'center',
              borderTopWidth: 3.5,
              borderColor: '#396593'
            }}
            onPress={() => handleTabPress('Home')}>
            <Ionicons name="home-outline" size={30} color="#396593" />
            <Text style={{color: '#396593'}}>Home</Text>
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
        </View>

        <CustomModalAlert
          isModalAlert={isModalAlertBg}
          handleModalAlert={handleModalAlertBg}
          title="One Tap dice!"
          description={'No se ha seleccionado un fondo para la plantilla'}
          isClosed={true}
        />

        <CustomModalAlert
          handleModalAlert={handleAlertProfileSocial}
          title="One Tap dice!"
          description={'Debes registrar los datos en el perfil social'}
          isModalAlert={isAlertProfileSocial}
          isClosed={true}
        />

        <CustomModalLoading isLoadingSendData={isLoadingSendData} />

        <CustomAlertBadge
          isOpen={alertSwitchOff}
          handleAlertSwitch={handleAlertSwitch}
        />

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
          description={'¿Estás seguro de que deseas eliminar tu sesión?'}
          isDelete={true}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Main;
