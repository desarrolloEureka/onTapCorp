import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomAlertBadge from '../../../../../componets/CustomAlertBadge';
import MenuSuperior from '../../../../menuSuperior/MenuSuperior';
import HomeHook from '../../../hooks/HomeHook';
import {homeStyles} from '../../../styles/homeStyles';
import CustomCheckbox from '../home/CustomCheckbox';
import CustomSwitch from '../home/CustomSwitch';
import CustomModalAlert from '../profile/CustomModalAlert';
import CustomModalLoading from '../profile/CustomModalLoading';
import ModalAlertDown from '../profile/ModalAlertDown';
import {useNavigation} from '@react-navigation/native';
import AlertGPS from '../../../../../componets/AlertGPS';

const Templates = () => {
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
    handlePressModalYes,
    alertGPSOff,
    setAlertGPSOff,
    handleAlertGPS,
  } = HomeHook();

  const navigation = useNavigation();
  const [templateSelect, setTemplateSelect] = useState<any>(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={homeStyles.rootContainer}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../../images/background.png')}>
        <View
          style={{
            height: 150,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{height: '50%', width: '100%', flexDirection: 'row'}}>
            <View style={{height: '100%', width: '20%', flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  height: '95%',
                  width: '65%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginTop: 3,
                }}
                onPress={handleBackPress}>
                <MaterialIcons name="arrow-back-ios" size={27} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: '100%',
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
              </View>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
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
                  height: '55%',
                  width: '58%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <MaterialCommunityIcons name="eye" size={30} color="#030124" />
                <Text
                  style={{
                    fontFamily: 'Ubuntu',
                    fontSize: 20,
                    fontWeight: '700',
                    letterSpacing: 0.03,
                    textAlign: 'left',
                    color: '#030124',
                    marginLeft: 10,
                  }}>
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
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={homeStyles.switchWrapper}>
                  <Text style={[homeStyles.switchText, {color: '#030124'}]}>
                    Activar perfil
                  </Text>

                  <CustomSwitch
                    uid={user?.uid}
                    setAlertSwitchOff={setAlertSwitchOff}
                  />

                  <Text style={[homeStyles.switchText, {color: '#030124'}]}>
                    Off | On
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
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
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
            alignItems: 'center',
          }}>
          <View style={{height: '95%', width: '95%'}}>
            {templates && (
              <FlatList
                data={templates}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({item, index}) => {
                  const itemData = user?.templateData?.find(
                    (val: any) => val.id === item.uid,
                  );

                  return (
                    <View
                      style={{
                        height: 280,
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: '95%',
                          width: '95%',
                          backgroundColor: '#FFFFFF',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: '20%',
                            width: '100%',
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '50%',
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                              disabled={itemData ? !itemData?.checked : true}
                              style={{
                                height: '100%',
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onPress={() => handleNavigatePreview()}>
                              <Ionicons
                                name="eye-sharp"
                                size={15}
                                color="#030124"
                              />
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#030124',
                                  fontWeight: 'normal',
                                }}>
                                Vista{'\n'}Previa
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              height: '100%',
                              width: '50%',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <View
                              style={{
                                height: '100%',
                                width: '65%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {user && (
                                <CustomCheckbox
                                  uid={user?.uid}
                                  value={item}
                                  setTemplateSelect={setTemplateSelect}
                                  templates={user.templateData}
                                  checked={
                                    item?.uid ===
                                    (itemData?.id || templateSelect?.id)
                                      ? true
                                      : false
                                  }
                                />
                              )}
                              <Text
                                style={{
                                  fontSize: 9,
                                  color: '#030124',
                                  fontWeight: 'normal',
                                  textAlign: 'center',
                                }}>
                                Seleccionar{'\n'}plantilla
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
                            alignItems: 'center',
                          }}
                          onPress={() => selectTemplate(item)}>
                          <View
                            style={{
                              height: '98%',
                              width: '98%',
                            }}>
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
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '50%',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                height: '100%',
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: 'white',
                                  fontWeight: 'normal',
                                }}></Text>
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
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: 3.5,
              borderColor: '#396593',
            }}
            onPress={() => handleTabPress('Home')}>
            {/* <Ionicons name="home-outline" size={25} color="#396593" /> */}
            <Image
              source={require('../../../../../images/icon2.png')}
              style={{width: 28, height: 28, tintColor: '#396593'}}
            />
            <Text style={{color: '#396593', fontWeight: 'normal'}}>Home</Text>
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
              user?.isGPSActive
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
              user?.isGPSActive
                ? () => handleTabPress('Roads')
                : () => setAlertGPSOff(true)
            }>
            <Ionicons name="car-outline" size={30} color="#606060" />
            <Text style={{color: '#606060', fontWeight: 'normal'}}>Rutas</Text>
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
            <Text style={{color: '#606060', fontWeight: 'normal'}}>
              Compartir
            </Text>
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
        <AlertGPS isOpen={alertGPSOff} handleAlertClose={handleAlertGPS} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Templates;
