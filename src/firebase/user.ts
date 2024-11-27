import { dataBase, authFire } from './firebaseConfig';

export const getUserByIdFireStore = async (user: string) => {
  try {
    const userDoc = await dataBase.collection('users').doc(user).get();
    return userDoc.exists ? userDoc.data() : null;
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await dataBase.collection('users').get();
    const usersData = usersSnapshot.docs.map(doc => ({
      ...doc.data(),
      uid: doc.id,
    }));
    return usersData;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
};

export const registerUserData = async (data: any) => {
  try {
    const docRef = await dataBase.collection('users').doc(data.uid).set(data);
    return docRef;
  } catch (error) {
    console.error('Error al registrar los datos del usuario:', error);
    throw error;
  }
};

export const updateUserData = async (userId: string, newData: any) => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    await userDocRef.update(newData);
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    throw error;
  }
};

export const updateSwitchProfileFirebase = async (
  userId: string,
  switchState: any,
) => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    await userDocRef.update(switchState);
  } catch (error) {
    console.error('Error al actualizar el estado del switch del perfil:', error);
    throw error;
  }
};

export const updateTemplateSelectedFirebase = async (
  userId: string,
  newData: any,
) => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    await userDocRef.update(newData);
  } catch (error) {
    console.error('Error al actualizar los datos del template seleccionado:', error);
    throw error;
  }
};

export const updateDataUserProfile = async (
  userId: string,
  data: any,
  isProUser: boolean,
) => {
  try {
    const profRef = isProUser
      ? { 'profile.professional': data }
      : { 'profile.social': data };
    const userDocRef = dataBase.collection('users').doc(userId);
    const res = await userDocRef.update(profRef);
    return res;
  } catch (error) {
    console.debug('error message', error);
    return null;
  }
};

export const updateSwitchAllFirebase = async (userId: string, newData: any) => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    await userDocRef.update(newData);
  } catch (error) {
    console.error('Error al actualizar los switches del usuario:', error);
    return null;
  }
};

export const updateSwitchActivateCard = async (
  userId: string,
  switchState: any,
) => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    const res = await userDocRef.update(switchState);
    return res;
  } catch (error) {
    console.debug('Error al actualizar el estado del switch:', error);
    return null;
  }
};

export const updateViewsUser = async (userId: string, newData: any) => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    await userDocRef.update(newData);
  } catch (error) {
    console.debug('Error al actualizar las vistas del usuario:', error)
  }
};

export const updatePreView = async (userId: string, newData: any) => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    await userDocRef.update(newData);

  } catch (error) {
    console.debug('Error al actualizar la vista previa del usuario:', error)
  }
};

export const updateInactiveUser = async (
  userId: string,
  newData: any,
): Promise<boolean> => {
  try {
    const userDocRef = dataBase.collection('users').doc(userId);
    await userDocRef.update(newData);
    return true;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return false;
  }
};

export const updatePasswordFirebase = async (newPassword: string) => {
  const user = authFire.currentUser;
  if (user) {
    try {
      await user.updatePassword(newPassword);
      console.debug('Contraseña actualizada correctamente');
      return true;
    } catch (error) {
      console.debug('Error al actualizar la contraseña:', error);
      return false;
    }
  } else {
    console.debug('No hay un usuario autenticado');
    return false;
  }
};
