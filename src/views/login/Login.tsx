import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginHook from './hooks/LoginHook';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoadsHook from './hooks/LoginHook';

const Login = () => {
  const {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    password,
    setPassword,
    errorForm,
    handleForgotPassword,
    handleGoTerms,
    handleBackPress,
    handleBackPress2,
    handleLogin
  } = LoginHook();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../images/fondo3.png')} // ruta de la imagen de fondo
        style={styles.background}>
        <View style={{height: '7%', width: '100%'}}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '18%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 5
            }}
            onPress={handleBackPress2}>
            <Icon name="arrow-back-ios" size={27} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.headerContainer}></View>

          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 1.3,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View style={styles.titleContainer}>
              <Text style={styles.heading}>Iniciar Sesión</Text>
            </View>
            <View style={{height: '85%', width: '100%'}}>
              <View
                style={{
                  height: '20%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '90%',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}>
                  <Text style={styles.label}>Correo Electrónico</Text>
                  <TextInput
                    style={styles.input}
                    selectionColor={'#396593'}
                    placeholderTextColor="#396593"
                    underlineColorAndroid="transparent"
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)}
                  />
                </View>
              </View>

              {errorForm?.errorType === 1 && (
                <View
                  style={{
                    height: '10%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '90%',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 3,
                        marginRight: 70,
                        marginBottom: 12,
                        fontWeight: 'normal'
                      }}>
                      {errorForm?.errorMessage}*
                    </Text>
                  </View>
                </View>
              )}

              <View
                style={{
                  height: '20%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '90%',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}>
                  <Text style={styles.label}>Contraseña</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      selectionColor={'#396593'}
                      placeholderTextColor="black"
                      secureTextEntry={!showPassword}
                      underlineColorAndroid="transparent"
                      value={password}
                      onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}>
                      <FontAwesome
                        name={showPassword ? 'eye' : 'eye-slash'}
                        size={20}
                        color="#396593"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {errorForm?.errorType === 2 && (
                <View
                  style={{
                    height: '10%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '90%',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 3,
                        marginRight: 70,
                        marginBottom: 12,
                        fontWeight: 'normal'
                      }}>
                      {errorForm?.errorMessage}*
                    </Text>
                  </View>
                </View>
              )}

              {errorForm?.errorType === 3 && (
                <View
                  style={{
                    height: '14%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '90%',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 0,
                        marginRight: 30,
                        marginBottom: 4,
                        fontWeight: 'normal'
                      }}>
                      {errorForm?.errorMessage}*
                    </Text>
                  </View>
                </View>
              )}

              <View
                style={{
                  height: '10%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '90%',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}
                  onPress={handleForgotPassword}>
                  <Text style={{color: 'black', fontWeight: 'normal'}}>
                    Recuperar Contraseña
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  height: '10%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '90%',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}
                  onPress={handleGoTerms}>
                  <Text
                    style={{color: 'black', textDecorationLine: 'underline'}}>
                    Términos y Condiciones
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>

          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.4,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover'
  },
  headerContainer: {
    flex: 1,
    aspectRatio: 1 / 0.15,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15
  },
  titleContainer: {
    height: '15%',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    color: '#030124',
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10
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
    height: '30%',
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
    color: '#030124',
    fontFamily: 'Open Sans',
    fontWeight: '300',
    paddingLeft: 10
  },
  eyeIcon: {
    padding: 10
  }
});

export default Login;
