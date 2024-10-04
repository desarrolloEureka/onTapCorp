import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {resetPasswordFirebase} from '../../../../firebase/auth';

const RecoveryPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [statusSendEmail, setStatusSendEmail] = useState('');

  const handleNextPress = async () => {
    const res = await resetPasswordFirebase(email);
    setStatusSendEmail(res as any);
    if (res === 'success') {
      navigation.navigate('RecoveryPasswordTwo');
    } else if (res === 'user_not_found') {
      Alert.alert(
        '',
        'El correo electrónico no está registrado. Por favor, verifica y vuelve a intentarlo.'
      );
    } else if (res === 'send_email_failed') {
      Alert.alert(
        '',
        'Hubo un problema al intentar enviar el correo de restablecimiento. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../../images/fondo3.png')} // ruta de la imagen de fondo
        style={styles.background}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="arrow-back-ios" size={27} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.heading}>Recuperar Contraseña</Text>
          </View>

          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.input}
                selectionColor={'#396593'}
                placeholder="Correo Electrónico"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => setEmail(text)}
              />
            </View>
          </View>
        </View>
        <View style={styles.footerContainer}>
          {email != '' ? (
            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.button}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </View>
          )}
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
  contentContainer: {
    height: '77%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    height: '15%',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingTop: 2,
    height: '85%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inputContainer: {
    height: '25%',
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  footerContainer: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    color: '#396593',
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#396593'
  },
  label: {
    fontFamily: 'Open Sans',
    fontSize: 15,
    fontWeight: '400',
    color: '#396593'
  },
  input: {
    height: 52,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#396593',
    color: '#030124',
    fontFamily: 'Open Sans',
    fontSize: 17,
    fontWeight: '300'
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
  background: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default RecoveryPassword;
