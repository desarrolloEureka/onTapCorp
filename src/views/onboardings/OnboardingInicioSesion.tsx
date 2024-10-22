import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoginHook from '../login/hooks/LoginHook';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OnboardingInicioSesion = () => {
  const navigation = useNavigation();
  const {handleGoTerms} = LoginHook();

  const [checkbox, setCheckbox] = useState(false);

  const handleLoginPress = () => {
    if (checkbox) {
      navigation.navigate('Login');
    }
  };

  return (
    <ImageBackground
      source={require('../../images/fondo3.png')} // ruta de la imagen de fondo
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../images/logo_inicio.png')}
          style={styles.image}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: checkbox ? '#030124' : '#888888'}
          ]}
          onPress={handleLoginPress}
          disabled={!checkbox}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      {/* <View>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Términos y condiciones</Text>
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TouchableOpacity
          onPress={() => {
            setCheckbox(!checkbox);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            paddingRight: 10
          }}>
          <Ionicons
            name={
              checkbox ? 'radio-button-on-outline' : 'radio-button-off-outline'
            }
            size={19}
            color={'#030124'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={handleGoTerms}>
          <Text style={styles.linkText}>Aceptar términos y condiciones</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'white',
    paddingTop: 200
  },
  imageContainer: {
    width: 216,
    height: 180,
    marginBottom: 100,
    marginTop: -100
    // alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  button: {
    width: 265,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    elevation: 50
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal'
  },
  linkText: {
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: 'normal'
  },
  link: {
    width: 265,
    justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'flex-start'
  }
});

export default OnboardingInicioSesion;
