import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MeetingsHook from './hook/MeetingsHook';

const Meetings = () => {
  const {user, handleTabPress, handleBackPress} = MeetingsHook();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E9E9E9'}}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../../images/background.png')}>
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
            <Ionicons name="home-outline" size={30} color="#606060" />
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Meetings;
