import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UpdatePassword } from '../../../../../reactQuery/users';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
    const navigation = useNavigation();
    const [showPasswordOne, setShowPasswordOne] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);
    const [password, setPassword] = useState<string>();
    const [passwordConfirm, setPasswordConfirm] = useState<string>();
    const [errorForm, setErrorForm] = useState(0);
    const [stateUpdate, setStateUpdate] = useState(false);

    const handleSeePassword = () => {
        setShowPasswordOne(!showPasswordOne)
    }

    const handleSeePasswordTwo = () => {
        setShowPasswordTwo(!showPasswordTwo)
    }

    const handleChangePassword = async () => {
        if (password && passwordConfirm && password === passwordConfirm) {
            setErrorForm(0);
            const resUpdate = await UpdatePassword(password);
            setStateUpdate(resUpdate);
            if (resUpdate === true) {
                Alert.alert('Alerta', 'La contraseña se cambió correctamente.');
            } else {
                Alert.alert('Error', 'Ocurrió un error y no fue posible cambiar la contraseña. Por favor, inténtalo de nuevo.');
            }
        } else {
            if (!password) {
                setErrorForm(1);
            } else if (!passwordConfirm) {
                setErrorForm(2);
            } else if (password !== passwordConfirm) {
                setErrorForm(3);
            }
        }
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
      <SafeAreaView style={{backgroundColor: '#e8e8e8', flex: 1}}>
        <ScrollView>
          <View style={{flex: 1, aspectRatio: 1 / 0.15, width: '100%'}}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '18%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={handleBackPress}>
              <Icon name="arrow-back-ios" size={27} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.2,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={styles.title}>Cambiar Contraseña</Text>
          </View>

          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.05,
              width: '100%',
              alignItems: 'center'
            }}>
            <View style={{height: '100%', width: '95%'}}>
              <Text style={styles.labelPassword}>Contraseña</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.2,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View style={{height: '100%', width: '95%'}}>
              <View
                style={{
                  height: '80%',
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#396593',
                  flexDirection: 'row'
                }}>
                <View style={{height: '100%', width: '85%'}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#396593"
                    underlineColorAndroid="transparent"
                    secureTextEntry={!showPasswordOne}
                    onChangeText={text => setPassword(text)}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={handleSeePassword}>
                  {showPasswordOne ? (
                    <MaterialCommunityIcons
                      name="eye-outline"
                      size={30}
                      color="#030124"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={30}
                      color="#030124"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {errorForm === 1 && (
            <View
              style={{
                flex: 1,
                aspectRatio: 1 / 0.08,
                width: '100%',
                alignItems: 'center'
              }}>
              <View style={{height: '100%', width: '95%'}}>
                <Text style={{color: 'red'}}>La contraseña está vacía.</Text>
              </View>
            </View>
          )}

          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.05,
              width: '100%',
              alignItems: 'center'
            }}>
            <View style={{height: '100%', width: '95%'}}>
              <Text style={styles.label}>Confirmar Contraseña</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.2,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View style={{height: '100%', width: '95%'}}>
              <View
                style={{
                  height: '80%',
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#396593',
                  flexDirection: 'row'
                }}>
                <View style={{height: '100%', width: '85%'}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#396593"
                    underlineColorAndroid="transparent"
                    secureTextEntry={!showPasswordTwo}
                    onChangeText={text => setPasswordConfirm(text)}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={handleSeePasswordTwo}>
                  {showPasswordTwo ? (
                    <MaterialCommunityIcons
                      name="eye-outline"
                      size={30}
                      color="#030124"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={30}
                      color="#030124"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {errorForm === 2 && (
            <View
              style={{
                flex: 1,
                aspectRatio: 1 / 0.05,
                width: '100%',
                alignItems: 'center'
              }}>
              <View style={{height: '100%', width: '95%'}}>
                <Text style={{color: 'red'}}>
                  La confirmación de contraseña está vacía.
                </Text>
              </View>
            </View>
          )}

          {errorForm === 3 && (
            <View
              style={{
                flex: 1,
                aspectRatio: 1 / 0.05,
                width: '100%',
                alignItems: 'center'
              }}>
              <View style={{height: '100%', width: '95%'}}>
                <Text style={{color: 'red'}}>
                  Las contraseñas no coinciden.
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.9,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
            <TouchableOpacity
              style={{
                height: '15%',
                width: '55%',
                backgroundColor: '#030124',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100
              }}
              onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  title: {
    color: '#396593',
    fontSize: 24
  },
  input: {
    height: 52,
    width: 386,
    fontSize: 16,
    color: '#396593'
  },
  label: {
    color: '#030124',
    marginTop: 3,
    marginRight: 220
  },
  labelPassword: {
    color: '#030124'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default ChangePassword;