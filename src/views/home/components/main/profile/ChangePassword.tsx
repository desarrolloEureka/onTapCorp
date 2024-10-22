import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UpdatePassword} from '../../../../../reactQuery/users';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import LogOut from '../../../../../hooks/logOut/LogOut';

const ChangePassword = () => {
  const {logOut} = LogOut();
  const navigation = useNavigation();
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [errorForm, setErrorForm] = useState(0);
  const [stateUpdate, setStateUpdate] = useState(false);

  const handleSeePassword = () => {
    setShowPasswordOne(!showPasswordOne);
  };

  const handleSeePasswordTwo = () => {
    setShowPasswordTwo(!showPasswordTwo);
  };

  const handleChangePassword = async () => {
    if (
      password &&
      passwordConfirm &&
      password === passwordConfirm &&
      passwordConfirm?.length > 5
    ) {
      setErrorForm(0);
      const resUpdate = await UpdatePassword(password);
      setStateUpdate(resUpdate);
      if (resUpdate === true) {
        Alert.alert('', 'La contraseña se cambió correctamente.', [
          {
            text: 'Aceptar',
            onPress: () => navigation.navigate('Home') // Navega a 'Home' al aceptar
          }
        ]);
      } else {
        Alert.alert('', 'Ocurrió un error y no fue posible cambiar la contraseña. Por favor, iniciar sesión nuevamente.', [
            {
              text: 'Aceptar',
              onPress: logOut
            }
          ]);
      }
    } else {
      if (!password) {
        setErrorForm(1);
      } else if (!passwordConfirm) {
        setErrorForm(2);
      } else if (password !== passwordConfirm) {
        setErrorForm(3);
      } else if (passwordConfirm?.length < 6) {
        setErrorForm(4);
      }
    }
  };

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
            aspectRatio: 1 / 0.1,
            width: '100%',
            alignItems: 'center'
          }}>
          <View style={{height: '100%', width: '90%'}}>
            <Text style={styles.labelPassword}>Contraseña</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            aspectRatio: 1 / 0.15,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View style={{height: '100%', width: '90%'}}>
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
                  placeholderTextColor="#a8a8a8"
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
                <MaterialCommunityIcons
                  name={showPasswordOne ? 'eye-outline' : 'eye-off-outline'}
                  size={30}
                  color="#396593"
                />
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
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
            <View style={{height: '100%', width: '90%'}}>
              <Text style={{color: 'red', fontWeight: 'normal'}}>
                La contraseña está vacía.
              </Text>
            </View>
          </View>
        )}

        <View
          style={{
            flex: 1,
            aspectRatio: 1 / 0.1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <View style={{height: '100%', width: '90%'}}>
            <Text style={styles.label}>Verificar contraseña</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            aspectRatio: 1 / 0.15,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View style={{height: '100%', width: '90%'}}>
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
                  placeholder="Verificar contraseña"
                  placeholderTextColor="#a8a8a8"
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
                <MaterialCommunityIcons
                  name={showPasswordTwo ? 'eye-outline' : 'eye-off-outline'}
                  size={30}
                  color="#396593"
                />
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
            <View style={{height: '100%', width: '90%'}}>
              <Text style={{color: 'red', fontWeight: 'normal'}}>
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
            <View style={{height: '100%', width: '90%'}}>
              <Text style={{color: 'red', fontWeight: 'normal'}}>
                Las contraseñas no coinciden.
              </Text>
            </View>
          </View>
        )}

        {errorForm === 4 && (
          <View
            style={{
              flex: 1,
              aspectRatio: 1 / 0.05,
              width: '100%',
              alignItems: 'center'
            }}>
            <View style={{height: '100%', width: '90%'}}>
              <Text style={{color: 'red', fontWeight: 'normal'}}>
                La contraseña debe tener minimo 6 caracteres.
              </Text>
            </View>
          </View>
        )}

        <View
          style={{
            flex: 1,
            aspectRatio: 1 / 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              height: '13%',
              width: '65%',
              backgroundColor: '#396593',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100
            }}
            onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    height: 52,
    width: 386,
    fontSize: 16,
    color: 'black',
    fontWeight: 'normal'
  },
  label: {
    color: '#396593',
    fontWeight: 'normal',
    fontSize: 18
  },
  labelPassword: {
    color: '#396593',
    fontWeight: 'normal',
    fontSize: 18
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal'
  }
});

export default ChangePassword;
