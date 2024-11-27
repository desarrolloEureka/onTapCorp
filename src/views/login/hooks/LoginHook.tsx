import {getUserByIdFireStore} from '../../../firebase/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Linking} from 'react-native';
import {loginFirebase} from '../../../firebase/auth';
import {Alert} from 'react-native';
import { dataBase, fieldValue } from '../../../firebase/firebaseConfig';
import { getToken } from '../../../../App';

const LoginHook = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorForm, setErrorForm] = useState<any | null>(null);
  const navigation = useNavigation<any>();

  interface FirebaseError {
    code: string;
    message: string;
  }

  const handleForgotPassword = () => {
    navigation.navigate('RecoveryPassword');
  };

  const handleGoTerms = () => {
    Linking.openURL(
      'https://drive.google.com/file/d/1PSeTFOOG34BRrsoRGfcpQG72AurIc4ll/view',
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBackPress2 = () => {
    navigation.navigate('OnboardingInicioSesion');
  };

  const handleLogin = async () => {
    setErrorForm(null);
    if (email && password) {
      try {
        setEmail('');
        setPassword('');
        setErrorForm(null);
        const resultUser = await loginFirebase({user: email, password});
        // Verifica si resultUser es nulo
        if (!resultUser) {
          setErrorForm({errorType: 2, errorMessage: 'Credenciales inválidas'});
        }
        if (resultUser) {
          const user = await getUserByIdFireStore(resultUser.uid);
            if (user?.isActive) {
              await AsyncStorage.setItem('@user', JSON.stringify(user));
                try {
                  if (user?.uid) {
                    const userDoc = await dataBase.collection('users').doc(user.uid).get();
                    const existingTokens = userDoc.data()?.tokens || "";
                    const token = await getToken()
                    if (existingTokens !== token) {
                      await dataBase
                        .collection('users')
                        .doc(user.uid)
                        .update({
                          tokens: token,
                        });
                      console.log('Token saved to database');
                    } else {
                      console.log('Token already exists in database');
                    }
                  }
                } catch (error) {
                  console.error('Error saving token to database:', error);
                }
              navigation.navigate('Home');
            } else {
              Alert.alert(
                '',
                'Actualmente la cuenta no se encuentra activa, comunicarse con el administrador',
              );
            }
        }

        // const unsubscribe = auth().onAuthStateChanged(user => {
        //   if (user) {
        //     const userDocument = firestore().collection('users').doc(user.uid);
        //     userDocument
        //       .get()
        //       .then(documentSnapshot => {
        //         if (documentSnapshot.exists) {
        //           const dataUser = documentSnapshot.data() as UserData;
        //           AsyncStorage.setItem('@user', JSON.stringify(dataUser));
        //           navigation.navigate('Home');
        //         }
        //       })
        //       .catch(error => {
        //         console.error('Error al obtener datos del usuario:', error);
        //       });
        //   }
        // });
        //
      } catch (error) {
        const firebaseError = error as FirebaseError;
        console.log('Error ', error);
        if (firebaseError?.code === 'auth/invalid-credential') {
          setErrorForm({errorType: 2, errorMessage: 'Credenciales inválidas'});
        } else if (firebaseError.code === 'auth/too-many-requests') {
          setErrorForm({
            errorType: 2,
            errorMessage:
              'El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión.',
          });
        } else {
          setErrorForm({
            errorType: 2,
            errorMessage: 'Ocurrió un error, intenta de nuevo más tarde',
          });
        }
      }
    } else {
      if (!email) {
        setErrorForm({
          errorType: 1,
          errorMessage: 'El correo es obligatorio',
        });
      } else if (!password) {
        setErrorForm({
          errorType: 2,
          errorMessage: 'La contraseña es obligatoria',
        });
      }
    }
  };

  return {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    password,
    setPassword,
    errorForm,
    setErrorForm,
    navigation,
    handleForgotPassword,
    handleGoTerms,
    handleBackPress,
    handleBackPress2,
    handleLogin,
  };
};

export default LoginHook;
