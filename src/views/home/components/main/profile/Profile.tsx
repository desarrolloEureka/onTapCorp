import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { profileStyles } from '../../../styles/profileStyles';
import PhotoUser from './PhotoUser';
import FormDataUser from './FormDataUser';
import FormAddDataUser from './FormAddDataUser';
import ProfileHook from './hooks/ProfileHook';
import ModalAlert from './ModalAlert';
import ModalSuccessDelete from './ModalSuccessDelete';
import CustomModalAlert from './CustomModalAlert';
import CustomSwitchGeneral from './CustomSwitchGeneral';
import CustomModalLoading from './CustomModalLoading';
import { SocialDataForm } from '../../../../../types/profile';
import { GetUser } from '../../../../../reactQuery/users';
import { RouteStackParamList } from '../../../../../types/navigation';
// Iconos
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { profile } from '../../../../../initialData/profileInitialData';

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
    if (tabName === 'Professional' && userData?.data?.plan === 'standard') {
      setIsModalAlertNavigation(true);
    } else {
      if (tabName === 'Social') {
        navigation.navigate('Profile');
      } else if (tabName === 'Professional') {
        navigation.navigate('ProfileProfessional');
      } else {
        navigation.navigate('Home');
      }
    }
  };

  return (
    data &&
    user &&
    dataForm && (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#e9e9e9" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={profileStyles.scrollViewContainer}>
              <View style={{ height: 50, width: '100%' }}>
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
                name={user.profile && user.profile.social ? user.profile.social?.name?.text || '' : ''}
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
                handleModalAlert={({ index, subindex }) =>
                  handleModalAlert({ index, subindex })
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

              <View style={{ height: 120, width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
              </View>

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

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#E9E9E9', height: 90, position: 'absolute', bottom: 0, width: '100%' }}>
          <TouchableOpacity style={{ height: "100%", width: "25%", alignItems: 'center', justifyContent: 'center' }} onPress={() => handleTabPress('Home')}>
            <Ionicons name="car-outline" size={30} color='#396593' />
            <Text style={{ color: '#396593' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: "100%", width: "25%", alignItems: 'center', justifyContent: 'center', borderTopWidth: 3.5, borderColor: '#396593' }} onPress={() => handleTabPress('Profile')}>
            <Ionicons name="person-outline" size={25} color='#606060' />
            <Text style={{ color: '#606060' }}>Empleado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: "100%", width: "25%", alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="person-outline" size={25} color='#606060' />
            <Text style={{ color: '#606060' }}>Reuniones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: "100%", width: "25%", alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="car-outline" size={30} color='#606060' />
            <Text style={{ color: '#606060' }}>Rutas</Text>
          </TouchableOpacity>
        </View>


      </SafeAreaView>
    )
  );
};

export default Profile;
