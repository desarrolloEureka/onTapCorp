import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { GetUser } from '../../../../../reactQuery/users';
import { RouteStackParamList } from '../../../../../types/navigation';
import { SocialDataForm } from '../../../../../types/profile';
import { profileStyles } from '../../../styles/profileStyles';
import CustomModalAlert from './CustomModalAlert';
import CustomModalLoading from './CustomModalLoading';
import CustomSwitchGeneral from './CustomSwitchGeneral';
import FormAddDataUser from './FormAddDataUser';
import FormDataUser from './FormDataUser';
import ProfileHook from './hooks/ProfileHook';
import PhotoUser from './PhotoUser';
// Iconos
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
                <View style={{height: 50, width: '100%'}}>
                  <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '18%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={handleBackPress}>
                    <Icon name="arrow-back-ios" size={27} color="black" />
                  </TouchableOpacity>
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
              <Ionicons name="home-outline" size={25} color="#606060" />
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
