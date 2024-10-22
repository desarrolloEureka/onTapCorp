import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomAlertBadge from '../../../../componets/customAlertBadge/CustomAlertBadge';
import MenuSuperior from '../../../menuSuperior/MenuSuperior';
import HomeHook from '../../hooks/HomeHook';
import {homeStyles} from '../../styles/homeStyles';
import CustomModalAlert from './profile/CustomModalAlert';
import CustomModalLoading from './profile/CustomModalLoading';
import ModalAlertDown from './profile/ModalAlertDown';

const Main = () => {
  const {
    templates,
    communications,
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
  } = HomeHook();

  const fechaActual = (): string => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();

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
      'Diciembre',
    ];
    const month = months[date.getMonth()];

    return `Día ${day} de ${month} del año ${year}`;
  };

  const SectionHeader = ({title}: {title: any}) => (
    <View
      style={{
        height: 30,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20,
      }}>
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#396593',
          borderRadius: 3,
        }}>
        <Text style={{fontSize: 13, color: 'white', fontWeight: 'normal'}}>
          {title}
        </Text>
      </View>
    </View>
  );

  const SectionItem = ({
    isActive,
    isDeleted,
    title,
    URL,
  }: {
    isActive: any;
    isDeleted: any;
    title: any;
    URL: any;
  }) =>
    isActive &&
    !isDeleted && (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          width: '90%',
          borderBottomWidth: 1,
          borderBottomColor: '#9b9db3',
          marginTop: 30,
          backgroundColor: 'white',
        }}
        onPress={() => {
          Linking.openURL(URL).catch(err =>
            console.error('Error al abrir la URL:', err),
          );
        }}>
        <View
          style={{
            height: '100%',
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="document-attach-outline" size={28} color="#396593" />
        </View>
        <View
          style={{
            height: '100%',
            width: '85%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'normal',
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );

  const Section = ({title, items}: {title: any; items: any}) => (
    <View
      style={{
        paddingVertical: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20,
      }}>
      <SectionHeader title={title} />
      {items &&
        items.map((item: any, index: any) => (
          <SectionItem
            isActive={item.isActive}
            isDeleted={item.isDeleted}
            title={item.subject}
            URL={item.url}
          />
        ))}
    </View>
  );

  return (
    <SafeAreaView style={homeStyles.rootContainer}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../images/background.png')}>
        <View
          style={{
            height: '8%',
            width: '100%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: '50%',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: '90%',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  height: '90%',
                  width: '28%',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../../../images/logo_inicio.png')}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '50%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MenuSuperior
                setAlertLogOut={setAlertLogOut}
                setAlertDelte={setAlertDelte}
              />
            </View>
          </View>
        </View>

        {/* <View style={{height: '50%', width: '90%', flexDirection: 'row'}}>
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

            {/* <View
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
        </View>*/}

        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 90}}>
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
                width: '90%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
                Hola, {user?.firstName[0]} {user?.lastName[0]}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '300', color: 'black'}}>
                {fechaActual()}
              </Text>
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
              <Text style={{fontSize: 22, fontWeight: '600', color: 'black'}}>
                Comunicaciones
              </Text>
            </View>
          </View>

          {communications && (
            <FlatList
              data={communications}
              renderItem={({item, index}) => (
                <Section title={item?.title} items={item?.items} />
              )}
            />
          )}
        </ScrollView>
        {/* 
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
        </View> */}

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
              source={require('../../../../images/icon2.png')}
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
            onPress={() => handleTabPress('Meetings')}>
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
            onPress={() => handleTabPress('Roads')}>
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

        {/* <CustomAlertBadge
          isOpen={alertSwitchOff}
          handleAlertSwitch={handleAlertSwitch}
        /> */}

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
