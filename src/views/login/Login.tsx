import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigation } from '../../types/navigation';
import { LoginError } from '../../types/login';
import { GetLoginQuery } from '../../reactQuery/users';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);
  const [sendLogin, setSendLogin] = useState(false);
  const navigation = useNavigation<StackNavigation>();

  const handleForgotPassword = () => {
    navigation.navigate('RecoveryPassword');
  };

  const handleGoTerms = () => {
    navigation.navigate('Terminos');
  }

  const { data, isLoading, isRefetching } = GetLoginQuery({
    user: email,
    password,
    sendLogin,
  });

  const loginHandle = async () => {
    if (email && password) {
      setErrorForm(null);
      setSendLogin(true);
    } else {
      setSendLogin(false);
      if (!email) {
        setErrorForm({
          errorType: 1,
          errorMessage: "El correo es obligatorio",
        })
      } else if (!password) {
        setErrorForm({
          errorType: 2,
          errorMessage: "La contraseña es obligatoria",
        })
      }
    }
  };

  const userIsLogged = useCallback(() => {
    setSendLogin(false);
    if (data && data?.isActive) {
      if (data.isAdmin) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Home');
      }
    } else if (sendLogin) {
      setErrorForm({
        errorType: 3,
        errorMessage: "Usuario no Encontrado",
      });
    }
  }, [data, navigation, sendLogin]);

  useEffect(() => {
    userIsLogged();
  }, [userIsLogged]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView style={{flex:1}}> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Vista de inicio de sesión */}
          <View>
            <Text style={styles.title}>Iniciar Sesión</Text>

            {/* Línea debajo del título */}
            <View style={styles.titleLine} />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#396593"
              underlineColorAndroid="transparent"
              value={email}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />

            {errorForm?.errorType === 1 &&
              <Text style={{ color: 'red', marginTop: 3, marginRight: 70, marginBottom: 12 }}>
                {errorForm?.errorMessage}
              </Text>
            }

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholderTextColor="#396593"
                secureTextEntry={!showPassword}
                underlineColorAndroid="transparent"
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye' : 'eye-slash'}
                  size={20}
                  color="#396593"
                />
              </TouchableOpacity>
            </View>

            {errorForm?.errorType === 2 &&
              <Text style={{ color: 'red', marginTop: 3, marginRight: 70, marginBottom: 20 }}>
                {errorForm?.errorMessage}
              </Text>
            }

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}>
              <Text style={{ color: "black" }}>Recuperar Contraseña</Text>
            </TouchableOpacity>

            {errorForm?.errorType === 3 &&
              <Text style={{ color: 'red', marginTop: 3, marginRight: 70, marginBottom: 20 }}>
                {errorForm?.errorMessage}.
              </Text>
            }

            <View style={{ height: 30, width: "90%", flexDirection: 'row' }}>


              <TouchableOpacity style={{ height: "100%", width: "90%", alignItems: 'flex-start', justifyContent: 'center' }} onPress={handleGoTerms}>
                <Text style={{ color: "black" }}>Acepta los términos y condiciones</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.button} onPress={loginHandle}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>

          </View>
        </View>
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -200
  },
  title: {
    color: '#396593',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 130
  },
  titleLine: {
    //borderBottomWidth: 1,
    //borderBottomColor: '#396593',
    marginBottom: 10,
    alignSelf: 'center',
    width: 150,
    marginLeft: 38
  },
  input: {
    height: 52,
    width: 366, // Ajustado para que sea un poco más corto
    fontSize: 16,
    color: '#396593',
    borderBottomWidth: 1,
    borderBottomColor: '#396593',
    marginBottom: 10,
    paddingLeft: 10
  },
  label: {
    color: '#008F9E',
    marginTop: 3,
    marginRight: 240
  },
  button: {
    width: 265,
    height: 45,
    backgroundColor: '#02AF9B',
    marginLeft: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 140,
    marginBottom: -140
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#396593',
    marginBottom: 10
  },
  passwordInput: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: '#396593',
    paddingLeft: 10
  },
  eyeIcon: {
    padding: 10
  },
  forgotPassword: {
    marginLeft: 0,
    marginBottom: 20
  }
});

export default Login;
