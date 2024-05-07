import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SecondTap from './components/SecondTap';
import ModalDetail from './components/ModalDetail';
import ModalSearch from './components/ModalSearch';
import TabHeader from './components/TabHeader';
import MeetingsHook from './hook/MeetingsHook';
import {meetingsStyles} from './styles/meetingsStyles';
import FirstTap from './components/FirstTap';

const data = [
  {id: '1', fecha: '01/05/2024', nombre: 'Cliente A', estado: 'Llamar'},
  {id: '2', fecha: '02/05/2024', nombre: 'Cliente B', estado: 'Concretado'},
  {id: '3', fecha: '03/05/2024', nombre: 'Cliente C', estado: 'Llamar'}
];

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
    handleShowDetail,
    showModalDetail
  } = MeetingsHook();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E9E9E9'}}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../../images/background.png')}>
        <View style={{height: '7%', width: '100%'}}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '18%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 5
            }}
            onPress={handleBackPress}>
            <Icon name="arrow-back-ios" size={27} color="black" />
          </TouchableOpacity>
        </View>

        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <View style={meetingsStyles.tabContent}>
          {activeTab === 'tab1' ? (
            <FirstTap />
          ) : (
            <SecondTap
              handleConfigSearch={handleConfigSearch}
              setSearchText={setSearchText}
              searchText={searchText}
              data={data}
              handleShowDetail={handleShowDetail}
            />
          )}
        </View>

        <ModalSearch
          showConfigSearch={showConfigSearch}
          handleConfigSearch={handleConfigSearch}
        />

        <ModalDetail show={showModalDetail} handleClose={handleShowDetail} />

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
              justifyContent: 'center',
              borderTopWidth: 3.5,
              borderColor: '#396593'
            }}
            onPress={() => handleTabPress('Meetings')}>
            <Ionicons name="calendar-outline" size={25} color="#396593" />
            <Text style={{color: '#396593'}}>Reuniones</Text>
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
  );
};

export default Meetings;
