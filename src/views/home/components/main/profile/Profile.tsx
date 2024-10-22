import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  PermissionsAndroid,
  Linking,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {GetUser, GetCompany, GetArea} from '../../../../../reactQuery/users';
import {profileStyles} from '../../../styles/profileStyles';
import CustomModalAlert from './CustomModalAlert';
import CustomModalLoading from './CustomModalLoading';
import CustomSwitchGeneral from './CustomSwitchGeneral';
import CustomSwitchIndividual from './CustomSwitchIndividual';
import CustomSwitch from '../home/CustomSwitch';
import FormAddDataUser from './FormAddDataUser';
import FormDataUser from './FormDataUser';
import ProfileHook from './hooks/ProfileHook';
import MeetingsHook from '../meetings/hook/MeetingsHook';
import PhotoUser from './PhotoUser';
import CustomAlertBadge from '../../../../../componets/customAlertBadge/CustomAlertBadge';
// Iconos
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const {
    handleModalAlert,
    handleDeleteData,
    isDetailOpen,
    itemDetail,
    isModalAlert,
    handleModalAux,
    dataForm,
    setDataForm,
    handleSendProfile,
    isSuccessDelete,
    handleSuccessDelete,
    isDataError,
    isDataSuccess,
    setIsDataError,
    setIsDataSuccess,

    isLoadingSendData,
    status,
    isEmailPhoneRight,
    setisEmailPhoneRight,
    noDeleted,
    data,
    user,
    handleSwitch,
    handleData,
    handleAddData,
    handleModalAlertLimit,
    setAlertSwitchOff,
    isModalAlertLimit,
    handleDataNetworks,
    setModalIcons,
    itemUrlKey,
    itemUrlSelected,
    handleModalIcons,
    isModalIcons,
    alertSwitchOff,
    handleAlertSwitch,
    areaDataUrls,
    views,
  } = ProfileHook({
    isProUser: false,
  });
  const {handleSendLocation} = MeetingsHook();

  const [isModalAlertNavigation, setIsModalAlertNavigation] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false);

  const [company, setCompany] = useState<any>(null);
  const [area, setArea] = useState<any>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const data = await GetCompany(user?.idCompany);
      setCompany(data);
    };

    const fetchAreaData = async () => {
      const data = await GetArea(user?.selectedArea);
      setArea(data);
    };
    user.data && fetchCompanyData();

    user && fetchCompanyData();
    user && fetchAreaData();
  }, [user]);

  useEffect(() => {
    const fetchDayState = async () => {
      try {
        const data = await AsyncStorage.getItem('@profile');
        if (data !== null) {
          setIsStarted(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error al recuperar el estado de la ruta:', error);
      }
    };

    fetchDayState();
  }, []);

  const transformData = (Data: any, switchh: boolean): any => {
    const DataUrls: any = {urls: []};

    Object.keys(Data).forEach(key => {
      const urlMatch = key.match(/urlLink(\d*)/);

      if (urlMatch) {
        const index = urlMatch[1] === '' ? '' : urlMatch[1]; // Obtener el índice
        const url = Data[key];
        const nameKey = `urlName${index}`; // Construir el nombre correspondiente

        if (nameKey in Data) {
          const [nameOrIcon, checked] = Data[nameKey];
          if (switchh) {
            DataUrls.urls.push({
              url,
              name: nameOrIcon, // Puedes ajustar esto si necesitas diferenciar entre nombre e ícono
              checked,
              isActiveSwitch: false,
            });
          } else {
            DataUrls.urls.push({
              url,
              name: nameOrIcon, // Puedes ajustar esto si necesitas diferenciar entre nombre e ícono
              checked,
            });
          }
        }
      }
    });

    return DataUrls;
  };
  const companyDataUrls = company ? transformData(company, false) : {urls: []};

  if (company) {
    companyDataUrls.urls.push({
      url: company.webSite[0],
      name: company.tradename[1] ? company.tradename[0] : '',
      checked: company.webSite[1],
    });
  }

  const navigation = useNavigation<StackNavigationProp<any, 'Home'>>();

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

  const toggleJornada = async () => {
    setIsLoadingFirebase(true);
    const currentTime = new Date().toISOString();
    const hasLocationPermission = await requestLocationPermission();
    if (!hasLocationPermission) {
      console.log('Permiso de ubicación denegado');
      return;
    }
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const send = await handleSendLocation(
          latitude.toString(),
          longitude.toString(),
          isStarted ? 'endDay' : 'startDay',
          currentTime,
        );
        if (send) {
          await AsyncStorage.setItem('@profile', JSON.stringify(!isStarted));
          setIsStarted(!isStarted);
          setIsLoadingFirebase(false);
        }
      },
      error => {
        console.log('Error obteniendo la ubicación:', error.message);
        setIsLoadingFirebase(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

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

  return (
    data &&
    user &&
    dataForm && (
      <SafeAreaView style={{flex: 1, backgroundColor: '#e9e9e9'}}>
        <ImageBackground
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
          source={require('../../../../../images/background.png')}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={profileStyles.scrollViewContainer}>
                <View
                  style={{
                    height: 90,
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '33%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={toggleJornada}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      disabled={isLoadingFirebase}>
                      <View
                        style={{
                          padding: 3,
                          borderRadius: 50,
                          backgroundColor: isStarted ? '#030124' : 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {isLoadingFirebase ? (
                          <ActivityIndicator
                            size={25}
                            color={isStarted ? 'white' : '#030124'}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="power-standby"
                            size={25}
                            color={isStarted ? 'white' : '#030124'}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#396593',
                        textAlign: 'center',
                      }}>
                      {isStarted ? 'Finalizar\nJornada' : 'Iniciar\nJornada'}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '34%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="eye"
                      size={30}
                      color="#030124"
                    />
                    <Text
                      style={{
                        fontFamily: 'Ubuntu',
                        fontSize: 20,
                        fontWeight: '700',
                        letterSpacing: 0.03,
                        textAlign: 'center',
                        color: '#030124',
                      }}>
                      {views ? views.toString() : ''}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '33%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: '#030124',
                      }}>
                      Activar perfil
                    </Text>

                    <CustomSwitch
                      uid={user?.uid}
                      setAlertSwitchOff={setAlertSwitchOff}
                    />
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: '#030124',
                      }}>
                      Off | On
                    </Text>
                  </View>
                </View>
                <PhotoUser
                  name={user && user?.name ? user?.name || '' : ''}
                  isProUser={false}
                />
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 9,
                    marginBottom: 10,
                  }}>
                  <CustomSwitchGeneral
                    uid={user?.uid}
                    selectedArea={user?.selectedArea}
                  />
                </View>
                <View style={{backgroundColor: 'white'}}>
                  <View
                    style={{
                      height: 60,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <View
                      style={{
                        height: '100%',
                        width: '96%',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: '65%',
                          width: '34%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#396593',
                          borderRadius: 5,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'normal'}}>
                          {' '}
                          Datos empleado
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%',
                          }}>
                          <Text style={profileStyles.label}>Nombre</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '55%',
                            width: '90%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#9b9db3',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Ionicons
                              name="person-outline"
                              size={28}
                              color="#396593"
                            />
                          </View>

                          <View
                            style={{
                              height: '100%',
                              width: '85%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                height: '50%',
                                width: '95%',
                                fontSize: 15,
                                color: 'black',
                                marginBottom: -5,
                                fontWeight: 'normal',
                                //paddingLeft: 1,
                              }}>
                              {user?.firstName[0]} {user?.lastName[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%',
                          }}>
                          <Text style={profileStyles.label}>Cargo</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '55%',
                            width: '90%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#9b9db3',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Ionicons
                              name="document-attach-outline"
                              size={28}
                              color="#396593"
                            />
                          </View>

                          <View
                            style={{
                              height: '100%',
                              width: '85%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                height: '50%',
                                width: '95%',
                                fontSize: 15,
                                color: 'black',
                                marginBottom: -5,
                                fontWeight: 'normal',
                                //paddingLeft: 1,
                              }}>
                              {user?.position[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: '1%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}></View>
                <View style={{backgroundColor: 'white'}}>
                  <View
                    style={{
                      height: 60,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <View
                      style={{
                        height: '100%',
                        width: '96%',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: '65%',
                          width: '34%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#396593',
                          borderRadius: 5,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'normal'}}>
                          {' '}
                          Datos Empresa
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%',
                          }}>
                          <Text style={profileStyles.label}>
                            Nombre comercial
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '55%',
                            width: '90%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#9b9db3',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Ionicons
                              name="person-outline"
                              size={28}
                              color="#396593"
                            />
                          </View>

                          <View
                            style={{
                              height: '100%',
                              width: '85%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                height: '50%',
                                width: '95%',
                                fontSize: 15,
                                color: 'black',
                                marginBottom: -5,
                                fontWeight: 'normal',
                                //paddingLeft: 1,
                              }}>
                              {company?.tradename[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%',
                          }}>
                          <Text style={profileStyles.label}>NIT</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '55%',
                            width: '90%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#9b9db3',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Ionicons
                              name="document-attach-outline"
                              size={28}
                              color="#396593"
                            />
                          </View>

                          <View
                            style={{
                              height: '100%',
                              width: '85%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                height: '50%',
                                width: '95%',
                                fontSize: 15,
                                color: 'black',
                                marginBottom: -5,
                                fontWeight: 'normal',
                                //paddingLeft: 1,
                              }}>
                              {company?.id[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%',
                          }}>
                          <Text style={profileStyles.label}>
                            Dirección principal
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '55%',
                            width: '90%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#9b9db3',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Ionicons
                              name="bag-outline"
                              size={28}
                              color="#396593"
                            />
                          </View>

                          <View
                            style={{
                              height: '100%',
                              width: '85%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                height: '50%',
                                width: '95%',
                                fontSize: 15,
                                color: 'black',
                                marginBottom: -5,
                                fontWeight: 'normal',
                                //paddingLeft: 1,
                              }}>
                              {company?.address[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%',
                          }}>
                          <Text style={profileStyles.label}>Teléfono</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '55%',
                            width: '90%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#9b9db3',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Feather name="phone" size={28} color="#396593" />
                          </View>

                          <View
                            style={{
                              height: '100%',
                              width: '85%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                height: '50%',
                                width: '95%',
                                fontSize: 15,
                                color: 'black',
                                marginBottom: -5,
                                fontWeight: 'normal',
                                //paddingLeft: 1,
                              }}>
                              {company?.phone[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: '1%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}></View>

                <View style={{backgroundColor: 'white'}}>
                  <View
                    style={{
                      height: 60,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <View
                      style={{
                        height: '100%',
                        width: '96%',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: '65%',
                          width: '34%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#396593',
                          borderRadius: 5,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'normal'}}>
                          {' '}
                          Urls Empresa
                        </Text>
                      </View>
                    </View>
                  </View>

                  <ScrollView
                    style={{maxHeight: 300}} // Ajusta la altura máxima según lo necesites
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}>
                    {companyDataUrls.urls.map((item: any, index: any) => (
                      <View
                        style={{
                          height: 100,
                          justifyContent: 'flex-start',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '90%',
                            width: '85%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              height: '100%',
                              width: '100%',
                              paddingLeft: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: '20%',
                                width: '90%',
                              }}>
                              <Text style={profileStyles.label}>
                                {item.name}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: '55%',
                                width: '90%',
                                borderBottomWidth: 1,
                                borderBottomColor: '#9b9db3',
                              }}>
                              <View
                                style={{
                                  height: '100%',
                                  width: '15%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Ionicons
                                  name="document-attach-outline"
                                  size={28}
                                  color="#396593"
                                />
                              </View>
                              <TouchableOpacity
                                style={{
                                  height: '100%',
                                  width: '85%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onPress={() => Linking.openURL(item.url)}>
                                <Text
                                  style={{
                                    height: '50%',
                                    width: '95%',
                                    fontSize: 15,
                                    color: 'black',
                                    marginBottom: -5,
                                    fontWeight: 'normal',
                                    //paddingLeft: 1,
                                  }}>
                                  {item.url}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>

                <View
                  style={{
                    height: '1%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />

                <View style={{backgroundColor: 'white'}}>
                  <View
                    style={{
                      height: 60,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <View
                      style={{
                        height: '100%',
                        width: '96%',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: '65%',
                          width: '38%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#396593',
                          borderRadius: 5,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'normal'}}>
                          Area {area?.areaName}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <ScrollView
                    style={{maxHeight: 300}} // Ajusta la altura máxima según lo necesites
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}>
                    {areaDataUrls.map((item: any, index: any) => (
                      <CustomSwitchIndividual
                        uid={user?.uid}
                        selectedArea={user?.selectedArea}
                        item={item}
                      />
                    ))}
                  </ScrollView>
                </View>

                {/* <FormAddDataUser
                  isProUser={false}
                  dataForm={dataForm}
                  handleDataSet={e => handleDataSet(e)}
                  isDetailOpen={isDetailOpen}
                  itemDetail={itemDetail}
                  handleModalAlert={({index, subindex}) =>
                    handleModalAlert({index, subindex})
                  }
                  data={data}
                  handleData={handleData}
                  user={user}
                  handleSwitch={handleSwitch}
                  handleAddData={handleAddData}
                  handleModalAlertLimit={handleModalAlertLimit}
                  isModalAlertLimit={isModalAlertLimit}
                  handleDataNetworks={handleDataNetworks}
                  setModalIcons={setModalIcons}
                  itemUrlKey={itemUrlKey}
                  itemUrlSelected={itemUrlSelected}
                  handleModalIcons={handleModalIcons}
                  isModalIcons={isModalIcons}
                  handleDeleteData={handleDeleteData}
                /> */}

                <View
                  style={{
                    height: 120,
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 20,
                  }}></View>

                <CustomModalAlert
                  isModalAlert={isDataError}
                  handleModalAlert={setIsDataError}
                  title={'One Tap dice!'}
                  description={
                    'La información del usuario no pudo ser registrada, por favor intenta de nuevo.'
                  }
                />
                <CustomModalAlert
                  isModalAlert={isDataSuccess}
                  handleModalAlert={setIsDataSuccess}
                  title={'One Tap dice!'}
                  description={
                    'La información del usuario ha sido registrada con éxito.'
                  }
                />

                <CustomModalLoading isLoadingSendData={isLoadingSendData} />
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

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
                style={{width: 25, height: 25, tintColor: '#606060'}}
              />
              <Text style={{color: '#606060', fontWeight: 'normal'}}>Home</Text>
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
              onPress={() => handleTabPress('Profile')}>
              <Ionicons name="person-outline" size={25} color="#396593" />
              <Text style={{color: '#396593', fontWeight: 'normal'}}>
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
              }}
              onPress={() => handleTabPress('ShareQR')}>
              <Feather name="share" size={25} color="#606060" />
              <Text style={{color: '#606060', fontWeight: 'normal'}}>
                Compartir
              </Text>
            </TouchableOpacity>
          </View>

          <CustomAlertBadge
            isOpen={alertSwitchOff}
            handleAlertSwitch={handleAlertSwitch}
          />
        </ImageBackground>
      </SafeAreaView>
    )
  );
};

export default Profile;
