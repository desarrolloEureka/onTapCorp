import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
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
  View
} from 'react-native';
import {GetUser} from '../../../../../reactQuery/users';
import {RouteStackParamList} from '../../../../../types/navigation';
import {SocialDataForm} from '../../../../../types/profile';
import {profileStyles} from '../../../styles/profileStyles';
import CustomModalAlert from './CustomModalAlert';
import CustomModalLoading from './CustomModalLoading';
import CustomSwitchGeneral from './CustomSwitchGeneral';
import CustomSwitch from '../home/CustomSwitch';
import FormAddDataUser from './FormAddDataUser';
import FormDataUser from './FormDataUser';
import ProfileHook from './hooks/ProfileHook';
import PhotoUser from './PhotoUser';
// Iconos
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

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
    handleSwitchAll,
    switchValue,
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
    isModalIcons
  } = ProfileHook({
    isProUser: false
  });

  const [isModalAlertNavigation, setIsModalAlertNavigation] = useState(false);

  const navigation =
    useNavigation<StackNavigationProp<RouteStackParamList, 'Home'>>();

  const userData = GetUser();

  const handleDataSet = (data: SocialDataForm) => {
    setDataForm(data);
  };

  const handleBackPress = () => {
    navigation.goBack();
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
                    height: 70,
                    width: '100%',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '27%',
                      justifyContent: 'center'
                    }}>
                    <TouchableOpacity
                      style={{
                        height: '70%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Ubuntu',
                          fontSize: 18,
                          fontWeight: '700',
                          lineHeight: 28,
                          letterSpacing: 0.03,
                          textAlign: 'left',
                          color: '#030124'
                        }}>
                        <Icon name="eye" size={22} color="#030124" />
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: '#030124'
                        }}>
                        Vista previa perfil
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '46%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 15
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: '#396593'
                      }}>
                      Iniciar Jornada
                    </Text>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                      }}>
                      <View
                        style={{
                          padding: 7,
                          borderRadius: 50,
                          backgroundColor: 'white',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <Icon2 name="power-standby" size={30} color="#396593" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    flexDirection: 'row'
                  }}>
                  {/* <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '18%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={handleBackPress}>
                    <Icon name="arrow-back-ios" size={27} color="black" />
                  </TouchableOpacity> */}
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      flexDirection: 'row'
                    }}>
                    <View
                      style={{
                        height: '70%',
                        width: '50%',
                        paddingLeft: '3%',
                        justifyContent: 'flex-end'
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: '53%',
                          width: '57%',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Ubuntu',
                            fontSize: 18,
                            fontWeight: '700',
                            lineHeight: 28,
                            letterSpacing: 0.03,
                            textAlign: 'left',
                            color: '#030124'
                          }}>
                          <Icon name="eye" size={22} color="#030124" />{' '}
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
                        <View
                          style={{
                            marginVertical: 10,
                            alignItems: 'center'
                          }}>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#030124'
                            }}>
                            Ináctivar perfil
                          </Text>

                          <CustomSwitch
                            uid={user?.uid}
                            setAlertSwitchOff={setAlertSwitchOff}
                          />
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#030124'
                            }}>
                            On | Off
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <PhotoUser
                  name={
                    user.profile && user.profile.social
                      ? user.profile.social?.name?.text || ''
                      : ''
                  }
                  isProUser={false}
                />

                <View
                  style={{
                    height: 100,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 9,
                    marginBottom: 10
                  }}>
                  <CustomSwitchGeneral
                    name="all_true"
                    handleSwitch={(e: any) => handleSwitchAll(e)}
                    checked={switchValue}
                  />
                </View>

                <View style={{backgroundColor: 'white'}}>
                  <View
                    style={{
                      height: 60,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 15
                    }}>
                    <View
                      style={{
                        height: '100%',
                        width: '96%',
                        justifyContent: 'center'
                      }}>
                      <View
                        style={{
                          height: '65%',
                          width: '30%',
                          justifyContent: 'center',
                          backgroundColor: '#396593',
                          borderRadius: 5
                        }}>
                        <Text style={{color: 'white'}}> Datos empleado</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row'
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%'
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%'
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
                            borderBottomColor: '#9b9db3'
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center'
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
                              justifyContent: 'center'
                            }}>
                            <TextInput
                              keyboardType={'default'}
                              style={profileStyles.inputBox}
                              placeholderTextColor="#000000"
                              underlineColorAndroid="transparent"
                              maxLength={undefined}
                              onChangeText={(text: any) => {}}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 100,
                      justifyContent: 'flex-start',
                      flexDirection: 'row'
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '90%',
                        width: '85%'
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 10
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '20%',
                            width: '90%'
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
                            borderBottomColor: '#9b9db3'
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '15%',
                              alignItems: 'center',
                              justifyContent: 'center'
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
                              justifyContent: 'center'
                            }}>
                            <TextInput
                              keyboardType={'default'}
                              style={profileStyles.inputBox}
                              placeholderTextColor="#000000"
                              underlineColorAndroid="transparent"
                              maxLength={undefined}
                              onChangeText={(text: any) => {}}
                            />
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
                    justifyContent: 'center'
                  }}></View>

                <FormDataUser
                  isProUser={false}
                  dataForm={dataForm}
                  handleDataSet={e => handleDataSet(e)}
                  data={data}
                  handleData={handleData}
                  user={user}
                  handleSwitch={handleSwitch}
                />

                <FormAddDataUser
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
                />

                <View
                  style={{
                    height: 120,
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 20
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
                justifyContent: 'center',
                borderTopWidth: 3.5,
                borderColor: '#396593'
              }}
              onPress={() => handleTabPress('Profile')}>
              <Ionicons name="person-outline" size={25} color="#396593" />
              <Text style={{color: '#396593'}}>Empleado</Text>
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
                justifyContent: 'center'
              }}
              onPress={() => handleTabPress('ShareQR')}>
              <Feather name="share" size={25} color="#606060" />
              <Text style={{color: '#606060'}}>Compartir</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  );
};

export default Profile;
