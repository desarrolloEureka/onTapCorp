import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {StackNavigation} from '../../types/navigation';

const OnboardingOne = () => {
  const navigation = useNavigation<StackNavigation>();

  const handleNextPress = () => {
    navigation.navigate('OnboardingTwo');
  };

  const handlePressOmit = () => {
    navigation.navigate('OnboardingInicioSesion');
  };

  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../images/onboarding_1.png')}>
        <View style={{height: '100%', width: '100%'}}>
          <View style={{height: '75%', width: '100%', alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{
                height: '12%',
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={handlePressOmit}>
              <Text style={{fontSize: 15, color: 'white'}}>Omitir</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '25%',
              width: '100%',
              alignItems: 'center'
            }}>
            <View
              style={{
                height: '50%',
                width: '90%',
                justifyContent: 'flex-start'
              }}>
              <Text
                style={{fontSize: 15, color: 'white', textAlign: 'justify'}}>
                Dile adiós a las tarjetas de presentación en papel y dale la
                bienvenida a One Tap, la tarjeta de presentación digital que
                está revolucionando la forma en que compartes tu información.
              </Text>
            </View>
            <View
              style={{
                height: '50%',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                style={{
                  height: '40%',
                  width: '80%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={handleNextPress}>
                <Text style={{color: 'black', fontSize: 16}}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnboardingOne;
