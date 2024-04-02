import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../types/navigation';

const OnboardingThree = () => {
  const navigation = useNavigation<StackNavigation>();

  const handleNextPress = () => {
    navigation.navigate('OnboardingInicioSesion');
  };

  return (
    <SafeAreaView>
      <View style={{ height: "100%", width: "100%" }}>
        <Image
          resizeMode='cover'
          source={require('../../images/onboarding_3.png')}
          style={{ height: "100%", width: "100%"}}
        />
      </View>
      <View style={{ height: "100%", width: "100%", position: 'absolute' }}>
        <View style={{ height: "65%", width: "100%", alignItems: 'flex-end' }}>
        </View>
        <View style={{ height: "35%", width: "100%", alignItems: 'center' }}>
          <View style={{ height: "15%", width: "90%", justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}></Text>
          </View>
          <View style={{ height: "35%", width: "90%", justifyContent: 'flex-start', paddingTop: 2 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>Elige, comparte y conecta. Tu información, tu modo, tu control.</Text>
          </View>
          <View style={{ height: "50%", width: "90%", justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15 }}>
            <TouchableOpacity style={{ height: "40%", width: "90%", backgroundColor: '#02AF9B', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} onPress={handleNextPress}>
              <Text style={{ color: 'white', fontSize: 16 }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView >
  );
};

export default OnboardingThree;