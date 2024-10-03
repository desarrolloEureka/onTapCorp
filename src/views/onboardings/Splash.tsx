import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import SplashHook from './hooks/SplashHook';
import {splashStyles} from './styles/splashStyles';

const Splash = () => {
  SplashHook();
  return (
    <ImageBackground
      source={require('../../images/fondo1.png')} // ruta de la imagen de fondo
      style={splashStyles.background}>
      <View style={splashStyles.container}>
        <View style={splashStyles.imageContainer}>
          <Image
            source={require('../../images/logo_OT.png')}
            style={splashStyles.image}
          />
        </View>
      </View>
    </ImageBackground>

    /*
    <LinearGradient
      colors={['#000000', '#1f1f1f', '#4f4f4f', '#6e6e6e']}
      style={splashStyles.background}>
      <View style={splashStyles.container}>
        <View style={splashStyles.imageContainer}>
          <Image
            source={require('../../images/logo_OT.png')}
            style={splashStyles.image}
          />
        </View>
      </View>
    </LinearGradient>
    */
  );
};

export default Splash;
