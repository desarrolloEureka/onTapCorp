import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native';

interface FormChangePasswordProps {
  handleNext: () => void;
  handleBack: () => void;
}

const FormChangePassword = () => {
  const dictionary = {
    newPassword: {
      createNewPass: 'Crear Nueva Contraseña',
      nPassword: 'Nueva Contraseña',
      repeatPassword: 'Repetir Contraseña',
      nextNewPassword: 'Siguiente'
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {dictionary?.newPassword.createNewPass}
        </Text>
      </View>
      <Text style={styles.label}>{dictionary?.newPassword.nPassword}</Text>
      <TextInput
        style={styles.input}
        placeholder={dictionary?.newPassword.nPassword}
        placeholderTextColor="#396593"
        underlineColorAndroid="transparent" // Para Android
      />
      <Text style={styles.label}>{dictionary?.newPassword.repeatPassword}</Text>
      <TextInput
        style={styles.input}
        placeholder={dictionary?.newPassword.repeatPassword}
        placeholderTextColor="#396593"
        secureTextEntry={true}
        underlineColorAndroid="transparent" // Para Android
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {dictionary?.newPassword.nextNewPassword}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50
  },
  title: {
    color: '#396593',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 50
  },
  input: {
    height: 52,
    width: 386,
    fontSize: 16,
    color: '#396593', // Color del texto
    borderBottomWidth: 1,
    borderBottomColor: '#396593', // Color de la línea
    marginBottom: 10,
    paddingLeft: 10
  },
  label: {
    color: '#008F9E',
    marginTop: 3,
    marginRight: 250
  },
  button: {
    width: 265,
    height: 45,
    backgroundColor: '#02AF9B',
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default FormChangePassword;
