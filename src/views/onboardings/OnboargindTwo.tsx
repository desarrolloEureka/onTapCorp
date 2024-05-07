import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../types/navigation';

const OnboardingTwo = () => {
  const navigation = useNavigation<StackNavigation>();

  const handleNextPress = () => {
    navigation.navigate('OnboardingThree');
  };

  const handlePressOmit = () => {
    navigation.navigate('OnboardingInicioSesion');
  };

  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../images/onboarding_2.png')}>
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
          <View style={{height: '25%', width: '100%', alignItems: 'center'}}>
            <View
              style={{
                height: '55%',
                width: '93%',
                justifyContent: 'flex-start'
              }}>
              <Text
                style={{fontSize: 13, color: 'white', textAlign: 'justify'}}>
                Tu información siempre al día. {'\n'}Nunca más te preocupes por
                tener tu información desactualizada. Con One Tap, mantén tus
                datos siempre al día, puedes modificarlos en cualquier momento,
                y se actualizarán al instante tanto desde la aplicación móvil
                como a través del sitio web.
              </Text>
            </View>

            <View
              style={{
                height: '45%',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: 5
              }}>
              <TouchableOpacity
                style={{
                  height: '50%',
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
export default OnboardingTwo;
