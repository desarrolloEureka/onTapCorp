import { useState } from 'react';
import { UserData } from '../../../types/user';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../../types/navigation';
import { LoginError } from '../../../types/login';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeHook = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorForm, setErrorForm] = useState<LoginError | null>(null);
    const navigation = useNavigation<StackNavigation>();

    interface FirebaseError {
        code: string;
        message: string;
    }

    const handleForgotPassword = () => {
        navigation.navigate('RecoveryPassword');
    };

    const handleGoTerms = () => {
        navigation.navigate('Terminos');
    };

    const handleLogin = async () => {
        setErrorForm(null);
        if (email && password) {
            try {
                await auth().signInWithEmailAndPassword(email, password);
                setEmail('');
                setPassword('');
                setErrorForm(null);

                const unsubscribe = auth().onAuthStateChanged((user) => {
                    if (user) {
                        const userDocument = firestore().collection('users').doc(user.uid);
                        userDocument.get()
                            .then(documentSnapshot => {
                                if (documentSnapshot.exists) {
                                    const dataUser = documentSnapshot.data() as UserData;
                                    AsyncStorage.setItem('@user', JSON.stringify(dataUser));
                                    navigation.navigate('Home');
                                }
                            }).catch(error => {
                                console.error('Error al obtener datos del usuario:', error);
                            });
                    }
                });
                //
            } catch (error) {
                const firebaseError = error as FirebaseError;
                console.log("Error ", error);
                if (firebaseError?.code === 'auth/invalid-credential') {
                    setErrorForm({ errorType: 2, errorMessage: 'Credenciales inválidas' });
                } else if (firebaseError.code === 'auth/too-many-requests') {
                    setErrorForm({ errorType: 2, errorMessage: 'El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión.' });
                } else {
                    setErrorForm({ errorType: 2, errorMessage: 'Ocurrió un error, intenta de nuevo más tarde' });
                }
            }
        } else {
            if (!email) {
                setErrorForm({
                    errorType: 1,
                    errorMessage: 'El correo es obligatorio'
                });
            } else if (!password) {
                setErrorForm({
                    errorType: 2,
                    errorMessage: 'La contraseña es obligatoria'
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
        //
        handleForgotPassword,
        handleGoTerms,
        handleLogin
    };
};

export default HomeHook;
