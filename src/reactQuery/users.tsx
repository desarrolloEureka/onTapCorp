import {dataBase, authFire} from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {
  getAllUsers,
  getUserByIdFireStore,
  updateDataUserProfile,
  updatePasswordFirebase,
  updateSwitchAllFirebase,
  updateSwitchProfileFirebase,
  updateTemplateSelectedFirebase,
  updateUserData,
  updateViewsUser,
  updatePreView,
} from '../firebase/user';

const navigation = useNavigation<StackNavigationProp<any, 'Home'>>();

const GetAllUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getAllUsers(),
    refetchOnWindowFocus: false,
  });
  return query;
};

const userDataToSend = (user: any, resultUser: any) => {
  user.uid = resultUser.user.uid;
  user.email = resultUser.user.email;
  user.emailVerified = resultUser.user.emailVerified;
  user.displayName = resultUser.user.name;
  user.isAdmin = user.is_admin;
  return user;
};

const GetLoginQuery = ({user, password, sendLogin}: any) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        await authFire.signInWithEmailAndPassword(user!, password!);
        authFire.onAuthStateChanged(async (user: any) => {
          if (user) {
            const userDocument = dataBase.collection('users').doc(user.uid);
            try {
              const documentSnapshot = await userDocument.get();
              if (documentSnapshot.exists) {
                const dataUser = documentSnapshot.data() as any;
                await AsyncStorage.setItem('@user', JSON.stringify(dataUser));
                navigation.navigate('Home');
              }
            } catch (error) {
              console.error('Error al obtener datos del usuario:', error);
            }
          }
        });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
    retry: false,
    enabled: sendLogin,
  });

  return query;
};

/* const GetLoginQuery = ({ user, password, sendLogin }: GetLoginQueryProps) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      
      const resultUser = await loginFirebase({
        user: user!,
        password: password!,
      });

      if (resultUser && resultUser.user) {
        const docSnap = await getUserByIdFireStore(resultUser.user.uid);
        if (docSnap.exists) {
          const user = docSnap.data() as any;
          const getUser = userDataToSend(user, resultUser);
          await AsyncStorage.setItem('@user', JSON.stringify(getUser));
          return getUser;
        } else {
          return null;
        }
      } else {
        //create account if user not exist and exist in woocommerce
        return null;
      }
    },
    retry: false,
    enabled: sendLogin,
  });
  return query;
}; */

/* Actualizar react query*/
const SendDataImage = async (
  isProUser: boolean,
  userId: string,
  base64String: string,
) => {
  const imageDataKey = isProUser ? 'imagePro' : 'image';
  await updateUserData(userId, {[imageDataKey]: base64String});
  const userData = await getUserByIdFireStore(userId);
  if (userData) {
    const getUser = await reBuildUserData(userData);
    await AsyncStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const reBuildUserData = async (userData: any) => {
  const userStorage = await AsyncStorage.getItem('@user');
  if (userStorage) {
    const user = await JSON.parse(userStorage);
    return userDataToSend(userData, {user});
  } else {
    return userData;
  }
};

const SendSwitchProfile = async (userId: string, switchState: boolean) => {
  await updateSwitchProfileFirebase(userId, {
    switch_profile: switchState,
    preview: 'https://backoffice.onetap.com.co/es/views/cardView?uid=' + userId,
  });
  const userData = await getUserByIdFireStore(userId);
  if (userData) {
    const getUser = await reBuildUserData(userData);
    await AsyncStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const UpdatePassword = async (password: string) => {
  const res = await updatePasswordFirebase(password);
  return res;
};

const SendBackgroundSelected = async (
  userId: string,
  backgroundSelect: string,
  templateSelect: string,
) => {
  const templateData = {
    template_id: templateSelect,
    background_id: backgroundSelect,
  };

  await updateTemplateSelectedFirebase(userId, {templateData});
};

const SendSwitchAllForm = async (userId: string, dataForm: any) => {
  await updateSwitchAllFirebase(userId, {switchAllForm: dataForm});
};

const SendDataUserProfile = async (
  userId: string,
  data: any,
  isProUser: boolean,
) => {
  return await updateDataUserProfile(userId, data, isProUser)
    .then(async () => {
      const userData = await getUserByIdFireStore(userId);
      if (userData) {
        const getUser = await reBuildUserData(userData);
        await AsyncStorage.setItem('@user', JSON.stringify(getUser));
        return {success: true, error: false};
      }
    })
    .catch(error => {
      console.error(error.message);
      return {success: false, error: error.message};
    });
};

const SendViewUser = async (userId: string, numViewsNew: number) => {
  await updateViewsUser(userId, {views: numViewsNew});
};

const GetUserById = (userUid: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userData = await getUserByIdFireStore(userUid);
      if (userData) {
        const getUser = await reBuildUserData(userData);
        await AsyncStorage.setItem('@user', JSON.stringify(getUser));
        return getUser;
      } else {
        return null;
      }
    },
    enabled: !!userUid,
  });
};

const GetUser = (refetch?: boolean) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userLogged = await AsyncStorage.getItem('@user');
      if (userLogged) {
        const user = await JSON.parse(userLogged);
        const userData = await getUserByIdFireStore(user.uid);
        if (userData) {
          const getUser = await reBuildUserData(userData);
          await AsyncStorage.setItem('@user', JSON.stringify(getUser));
          return getUser;
        } else {
          return user;
        }
      } else {
        return null;
      }
    },
    refetchOnWindowFocus: refetch ?? false,
  });

const SendPreView = async (userId: string, url: string) => {
  const res = await updatePreView(userId, {preview: url});
  return res;
};

const SendSwitchActivateCard = async (userId: string, switchState: boolean) => {
  try {
    const userDocumentRef = dataBase.collection('users').doc(userId);
    await userDocumentRef.update({switch_activateCard: switchState});
    const updatedUser = await userDocumentRef.get();
    if (updatedUser.exists) {
      const userData = updatedUser.data();
      const getUser = await reBuildUserData(userData);
      await AsyncStorage.setItem('@user', JSON.stringify(getUser));
    }
  } catch (error) {
    console.error('Error al enviar el estado del interruptor:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
};

const SendTemplateSelected = async (
  userId: string,
  data: any[],
  queryClient: any,
) => {
  try {
    const userDocumentRef = dataBase.collection('users').doc(userId);
    const userDoc = await userDocumentRef.get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      const existingTemplateData = Array.isArray(userData?.templateData)
        ? userData.templateData
        : [];
      existingTemplateData[0] = data[0];
      await userDocumentRef.set(
        {templateData: existingTemplateData},
        {merge: true}, // Usamos 'merge' para no sobrescribir el resto de los datos
      );

      const userDataUpdate = await getUserByIdFireStore(userId);
      if (userDataUpdate) {
        const getUser = await reBuildUserData(userDataUpdate);

        // Guardamos los datos del usuario en AsyncStorage y en el queryClient
        await AsyncStorage.setItem('@user', JSON.stringify(getUser));
        await queryClient.setQueryData(['user'], () => getUser);
      }
    }
  } catch (error) {
    console.error('Error al enviar la plantilla seleccionada:', error);
    throw error;
  }
};

const SendInactiveUser = async (userId: string) => {
  try {
    const userDocumentRef = dataBase.collection('users').doc(userId);
    await userDocumentRef.update({isActive: false});
    return true; // Otra forma de indicar que la actualización fue exitosa
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return false; // Indicar que la actualización falló
  }
};

const SendDataInitialInfo = async (userId: string, data: any) => {
  // Crear un objeto con los datos necesarios
  const meetingData = {
    companyNameToVisit: data?.companyNameToVisit || '',
    contactName: data?.contactName || '',
    email: data?.email || '',
    employeeId: userId, // Asignar el userId como employeeId
    meetingEnd: {
      latitude: data?.meetingEnd?.latitude || '',
      longitude: data?.meetingEnd?.longitude || '',
      timestamp: data?.meetingEnd?.timestamp || '',
      address: data?.meetingEnd?.address || '',
    },
    meetingStart: {
      latitude: data?.meetingStart?.latitude || '',
      longitude: data?.meetingStart?.longitude || '',
      timestamp: data?.meetingStart?.timestamp || '',
      address: data?.meetingStart?.address || '',
    },
    meetingStatusId: data?.meetingStatusId || '',
    observations: data?.observations || '',
    subject: data?.subject || '',
    timestamp: new Date().toISOString(), // Marca de tiempo actual
    uid: '', // Este será llenado después
  };

  try {
    const docRef = await dataBase.collection('meetings').add(meetingData);
    await docRef.update({uid: docRef.id});
    return {success: true, uid: docRef.id};
  } catch (error) {
    console.error('Error creating meeting document:', error);
    return {success: false, error: error};
  }
};

const SendDataUpdateInfo = async (userId: string, uid: string, data: any) => {
  try {
    const meetDocRef = dataBase.collection('meetings').doc(uid);
    const meetDoc = await meetDocRef.get();
    if (!meetDoc.exists) {
      return {success: false, error: 'User document does not exist'};
    }

    const meetData = meetDoc.data();
    // Validaciones
    if (meetData?.employeeId !== userId) {
      return {success: false, error: 'User ID does not match the employee ID'};
    }

    const updateData: {[key: string]: any} = {};

    if (data.meetingEnd !== undefined) {
      updateData.meetingEnd = {
        latitude:
          data.meetingEnd.latitude !== undefined
            ? data.meetingEnd.latitude
            : meetData.meetingEnd.latitude,
        longitude:
          data.meetingEnd.longitude !== undefined
            ? data.meetingEnd.longitude
            : meetData.meetingEnd.longitude,
        timestamp:
          data.meetingEnd.timestamp !== undefined
            ? data.meetingEnd.timestamp
            : meetData.meetingEnd.timestamp,
        address:
        data.meetingEnd.address !== undefined
          ? data.meetingEnd.address
          : meetData.meetingEnd.address,
      };
    }

    if (data.meetingStatusId !== undefined)
      updateData.meetingStatusId = data.meetingStatusId;
    if (data.observations !== undefined)
      updateData.observations = data.observations;

    // Actualizar el documento del usuario solo si hay datos para actualizar
    if (Object.keys(updateData).length > 0) {
      await meetDocRef.update(updateData);
    }

    return {success: true, error: false, uid: meetDocRef.id};
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {success: false, error: error};
  }
};

const SendDataAllSwitch = async (
  userId: string,
  selectedArea: string,
  switchState: boolean,
) => {
  const workAreaDocument = dataBase.collection('workAreas').doc(selectedArea);
  try {
    const docSnapshot = await workAreaDocument.get();
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      // Itera sobre todas las propiedades del documento
      for (const key in data) {
        // Busca los campos que sigan la estructura de urlName, urlName2, etc.
        if (key.startsWith('urlName')) {
          const userObjects = data[key][2]; // Suponiendo que los usuarios están en la tercera posición

          // Verifica si el usuario existe en este urlNameKey
          if (userObjects && userObjects[userId]) {
            const user = userObjects[userId];
            user.isActive = switchState; // Cambia el estado isActive del usuario

            // Clona el array completo y actualiza solo el campo isActive del usuario
            const updatedArray = [...data[key]];
            updatedArray[2] = {
              ...userObjects, // Mantiene los demás usuarios
              [userId]: user, // Actualiza solo el usuario específico
            };

            // Actualiza el array en Firestore
            await workAreaDocument.update({
              [key]: updatedArray,
            });

            console.log(
              `Estado actualizado en ${key} para el usuario ${userId}:`,
              switchState,
            );
          }
        }
      }
    } else {
      console.log('Documento no existe.');
    }
  } catch (error) {
    console.error('Error al actualizar el estado en Firebase:', error);
  }
};

const SendDataLocation = async (
  companyId: string,
  userId: string,
  latitude: string,
  longitude: string,
  subject: string,
  timestamp: string,
  address: string,
) => {
  const locationData = {
    companyId: companyId,
    employeeId: userId, // Asignar el userId como employeeId
    latitude: latitude || '',
    longitude: longitude || '',
    timestamp: timestamp || '',
    subject: subject,
    address: address,
    uid: '', // Este será llenado después
  };

  try {
    const docRef = await dataBase.collection('locations').add(locationData);
    await dataBase
      .collection('locations')
      .doc(docRef.id)
      .update({uid: docRef.id});
    return {success: true, uid: docRef.id};
  } catch (error) {
    console.error('Error creating meeting document:', error);
    return {success: false, error: error};
  }
};

const SendDataIndividualSwitch = async (
  userId: string,
  selectedArea: string,
  switchState: boolean,
  item: any,
) => {
  const workAreaDocument = dataBase.collection('workAreas').doc(selectedArea);
  try {
    // Obtén el documento para acceder a los userObjects
    const docSnapshot = await workAreaDocument.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data();

      // Accede a los userObjects usando el nameKey
      const urlNameKey = item.nameKey; // Usa el nameKey del item
      const userObjects = data[urlNameKey][2]; // Suponiendo que los usuarios están en la tercera posición
      const user = userObjects[userId];

      if (user) {
        user.isActive = switchState;

        // Actualiza el array completo en Firestore para no perder las posiciones 0 y 1
        const updatedUrlName = [...data[urlNameKey]];
        updatedUrlName[2] = {
          ...userObjects, // Mantiene el resto de usuarios
          [userId]: user, // Actualiza solo el usuario específico
        };

        await workAreaDocument.update({
          [urlNameKey]: updatedUrlName,
        });

        console.log('Estado actualizado en Firebase:', switchState);
      } else {
        console.log('Usuario no encontrado:', userId);
      }
    } else {
      console.log('Documento no existe.');
    }
  } catch (error) {
    console.error('Error al actualizar el estado en Firebase:', error);
  }
};

const GetArea = async (uid: string) => {
  try {
    const userLogged = await AsyncStorage.getItem('@user');
    if (userLogged) {
      const docSnap = await dataBase.collection('workAreas').doc(uid).get();
      if (docSnap.exists) {
        return docSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching area:', error);
    return null;
  }
};

const GetCompany = async (uid: string) => {
  try {
    const userLogged = await AsyncStorage.getItem('@user');
    if (userLogged) {
      const docSnap = await dataBase.collection('companies').doc(uid).get();
      if (docSnap.exists) {
        return docSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching area:', error);
    return null;
  }
};

const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number,
) => {
  try {
    const apiKey = 'AIzaSyBwlZ54JrUtje068KLc8he3W58QLGN-5g8'; // Asegúrate de tener tu clave API configurada
    if (latitude && longitude) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${latitude},${longitude}`,
            key: apiKey,
          },
        },
      );

      if (response.data.status === 'OK') {
        // Retorna la dirección formateada
        return response.data.results[0].formatted_address;
      }
    }
  } catch (error) {
    return '';
  }
};

export {
  GetAllUserQuery,
  GetLoginQuery,
  GetUser,
  GetArea,
  GetCompany,
  SendDataImage,
  SendDataUserProfile,
  SendSwitchActivateCard,
  SendSwitchAllForm,
  SendSwitchProfile,
  SendTemplateSelected,
  UpdatePassword,
  SendBackgroundSelected,
  GetUserById,
  SendViewUser,
  SendInactiveUser,
  SendPreView,
  SendDataInitialInfo,
  SendDataUpdateInfo,
  SendDataLocation,
  SendDataIndividualSwitch,
  SendDataAllSwitch,
  getAddressFromCoordinates,
};
