import {useNavigation} from '@react-navigation/native';
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
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecoveryPasswordTwo = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('Login');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../images/fondo3.png')}>
        <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <Icon name="arrow-back-ios" size={27} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '20%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={styles.heading}>
              {`Hemos enviado un correo\ndonde deberas seguir los pasos\npara recuperar tu cuenta`}
            </Text>
          </View>
          <View
            style={{
              height: '55%',
              width: '80%',
              alignItems: 'flex-end',
              justifyContent: 'flex-end'
            }}>
            <View
              style={{
                height: '80%',
                width: '90%'
              }}>
              <Image
                resizeMode="contain"
                style={{
                  height: '100%',
                  width: '100%'
                }}
                source={require('../../../../images/password_change_girl.png')}
              />
            </View>
          </View>
          <View
            style={{
              height: '12.5%',
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
              <Text style={styles.buttonText}>Volver al inicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: '8%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15
  },
  button: {
    backgroundColor: '#396593',
    height: '45%',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: '#000'
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 19,
    letterSpacing: 0.08,
    textAlign: 'left'
  },
  heading: {
    color: '#030124',
    fontFamily: 'Open Sans',
    fontSize: 21,
    fontWeight: '700',
    paddingBottom: 10,
    textAlign: 'center',
    width: '80%'
  }
});

export default RecoveryPasswordTwo;
