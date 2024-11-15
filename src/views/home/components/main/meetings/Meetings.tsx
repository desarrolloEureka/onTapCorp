import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SecondTap from './components/SecondTap';
import ModalDetail from './components/ModalDetail';
import ModalSearch from './components/ModalSearch';
import TabHeader from './components/TabHeader';
import MeetingsHook from './hook/MeetingsHook';
import {meetingsStyles} from './styles/meetingsStyles';
import FirstTap from './components/FirstTap';
import MenuSuperior from '../../../../menuSuperior/MenuSuperior';
import HomeHook from '../../../hooks/HomeHook';
import ModalAlertDown from '../profile/ModalAlertDown';
import {
  GetAllCommunications,
  GetAllMeetings,
} from '../../../../../reactQuery/home';
import {GetUser} from '../../../../../reactQuery/users';

const formatMeetingStatusActive = (meetingStatus: any) => {
  if (!meetingStatus) return [];
  const activeMeetings = meetingStatus.filter(meeting => meeting.isActive);
  return activeMeetings.sort((a: any, b: any) => a.name.localeCompare(b.name));
}

const processMeetings = (
  meetingStatus: any,
  meetings: any,
  selectedFilter: any,
  searchText: any,
) => {
  if (!meetingStatus || !meetings) return [];

  // Crear un objeto para facilitar la búsqueda de nombres por uid
  const meetingStatusMap = meetingStatus.reduce((acc: any, status: any) => {
    acc[status.uid] = status.name;
    return acc;
  }, {});

  // Reemplazar meetingStatusId por name y ordenar
  const updatedMeetings = meetings.map((meeting: any) => ({
    ...meeting,
    meetingStatusName:
      meetingStatusMap[meeting.meetingStatusId] || meeting.meetingStatusId,
  }));

  // Ordenar los meetings
  const sortedMeetings = [...updatedMeetings].sort((a, b) => {
    switch (selectedFilter) {
      case 'fecha':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'estado':
        return a.meetingStatusName.localeCompare(b.meetingStatusName);
      case 'cliente':
        return a.companyNameToVisit.localeCompare(b.companyNameToVisit);
      case 'todos':
      default:
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  // Filtrar los resultados según el searchText
  return sortedMeetings.filter(meeting => {
    if (searchText === '') return true; // No filtrar si searchText está vacío
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      meeting.timestamp.toLowerCase().includes(lowerCaseSearchText) || // Filtrar por fecha
      meeting.companyNameToVisit.toLowerCase().includes(lowerCaseSearchText) || // Filtrar por cliente
      meeting.meetingStatusName.toLowerCase().includes(lowerCaseSearchText) // Filtrar por estado
    );
  });
};

const Meetings = () => {
  const {
    user,
    handleTabPress,
    handleBackPress,
    activeTab,
    setActiveTab,
    searchText,
    setSearchText,
    handleConfigSearch,
    showConfigSearch,
    handleFilterChange,
    selectedFilter,
    handleShowDetail,
    showModalDetail,
    selectedMeeting,
  } = MeetingsHook();

  const {
    setAlertLogOut,
    setAlertDelte,
    handleAlertDelete,
    handleAlertLogOut,
    handlePressModalYes,
    alertDelte,
    alertLogOut,
  } = HomeHook();

  const {data} = GetUser();
  const meetingStatus = GetAllCommunications(
    'meetingStatus',
    data?.idCompany,
    activeTab,
  )?.data;
  const meetingStatusActive = formatMeetingStatusActive(meetingStatus)
  const meetings = GetAllMeetings('meetings', data?.uid, activeTab)?.data;

  const filteredMeetings = processMeetings(
    meetingStatusActive,
    meetings,
    selectedFilter,
    searchText,
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E9E9E9'}}>
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

        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <View style={meetingsStyles.tabContent}>
          {activeTab === 'tab1' ? (
            <FirstTap
              meetingStatus={meetingStatusActive}
              setActiveTab={setActiveTab}
            />
          ) : (
            <SecondTap
              handleConfigSearch={handleConfigSearch}
              setSearchText={setSearchText}
              searchText={searchText}
              data={filteredMeetings}
              handleShowDetail={handleShowDetail}
            />
          )}
        </View>

        <ModalSearch
          showConfigSearch={showConfigSearch}
          handleConfigSearch={handleConfigSearch}
          handleFilterChange={handleFilterChange}
          selectedFilter={selectedFilter}
        />

        <ModalDetail
          show={showModalDetail}
          data={selectedMeeting}
          handleClose={handleShowDetail}
        />

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
              borderTopWidth: 3.5,
              borderColor: '#396593',
            }}
            onPress={() => handleTabPress('Meetings')}>
            <Ionicons name="calendar-outline" size={25} color="#396593" />
            <Text style={{color: '#396593', fontWeight: 'normal'}}>
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
    </SafeAreaView>
  );
};

export default Meetings;
