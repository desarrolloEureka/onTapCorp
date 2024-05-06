import React from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MeetingsHook from './hook/MeetingsHook';
import {meetingsStyles} from './styles/meetingsStyles';

interface Cliente {
  id: string;
  fecha: string;
  nombre: string;
  estado: string;
}

const data = [
  {id: '1', fecha: '01/05/2024', nombre: 'Cliente A', estado: 'Llamar'},
  {id: '2', fecha: '02/05/2024', nombre: 'Cliente B', estado: 'Concretado'},
  {id: '3', fecha: '03/05/2024', nombre: 'Cliente C', estado: 'Llamar'}
  // Agrega más datos según sea necesario
];

const Meetings = () => {
  const {
    user,
    handleTabPress,
    handleBackPress,
    activeTab,
    setActiveTab,
    searchText,
    setSearchText
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
        <View style={meetingsStyles.containerTab}>
          <TouchableOpacity
            style={[
              meetingsStyles.tab,
              activeTab === 'tab1' && meetingsStyles.activeTab
            ]}
            onPress={() => setActiveTab('tab1')}>
            <Text
              style={[
                meetingsStyles.tabText,
                activeTab === 'tab1' && meetingsStyles.tabTextSelected
              ]}>
              Nueva Reunión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              meetingsStyles.tab,
              activeTab === 'tab2' && meetingsStyles.activeTab
            ]}
            onPress={() => setActiveTab('tab2')}>
            <Text
              style={[
                meetingsStyles.tabText,
                activeTab === 'tab2' && meetingsStyles.tabTextSelected
              ]}>
              Historial Reuniones
            </Text>
          </TouchableOpacity>
        </View>

        <View style={meetingsStyles.tabContent}>
          {activeTab === 'tab1' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                  justifyContent: 'space-around',
                }}>
                <View style={meetingsStyles.searchConfig}>
                  <TouchableOpacity style={meetingsStyles.searchConfigIcon}>
                    <Entypo
                      style={{transform: [{rotate: '270deg'}]}}
                      name="sound-mix"
                      size={20}
                      color="#396593"
                    />
                  </TouchableOpacity>
                </View>
                <View style={meetingsStyles.search}>
                  <TextInput
                    style={meetingsStyles.searchInput}
                    placeholder="Buscar..."
                    selectionColor={'#396593'}
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                  />
                  <TouchableOpacity style={meetingsStyles.searchButton}>
                    <Fontisto name="search" size={20} color="#396593" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={meetingsStyles.containerTable}>
                <FlatList
                  data={data}
                  ListHeaderComponent={() => (
                    <View style={meetingsStyles.header}>
                      <Text style={meetingsStyles.headerText}>Fecha</Text>
                      <Text style={meetingsStyles.headerText}>Cliente</Text>
                      <Text style={meetingsStyles.headerText}>Estado</Text>
                      <Text style={meetingsStyles.headerText}>Detalle</Text>
                    </View>
                  )}
                  renderItem={({item}: {item: Cliente}) => {
                    return (
                      <View style={meetingsStyles.item}>
                        <Text style={meetingsStyles.text}>{item.fecha}</Text>
                        <Text style={meetingsStyles.text}>{item.nombre}</Text>
                        <Text style={meetingsStyles.text}>{item.estado}</Text>
                        <TouchableOpacity
                          style={meetingsStyles.detailContainer}>
                          <Icon
                            name="remove-red-eye"
                            size={20}
                            color="#396593"
                          />
                          <Text style={meetingsStyles.verText}>Detalle</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 10,
                    justifyContent: 'flex-end'
                  }}>
                  <TouchableOpacity>
                    <Icon name="arrow-back-ios" size={20} color="#606060" />
                  </TouchableOpacity>
                  <Text style={{color: '#606060'}}>Pag 3/3</Text>
                  <TouchableOpacity>
                    <Icon name="arrow-forward-ios" size={20} color="#606060" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Text>Contenido de la pestaña 2</Text>
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
