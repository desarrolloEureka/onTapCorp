import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import { getAuth, updatePassword } from 'firebase/auth';
import { app, dataBase } from './firebaseConfig';

const ref = ({ ref, collection }: any) =>
  doc(dataBase, collection, ref.document);

const allRef = ({ ref }: any) => collection(dataBase, ref);

const loginRef = ({ user, password }: any) =>
  query(
    collection(dataBase, 'users'),
    where('user_name', '==', user),
    where('password', '==', password)
  );


export const getUserByIdFireStore = async (user: string) =>
  await getDoc(doc(dataBase, 'users', user));


export const getAllUsers = async () => await getDocs(allRef({ ref: 'users' }));

export const registerUserData = async (data: any) => {
  const docRef = await setDoc(doc(dataBase, 'users', data.uid), data);
  return docRef;
};

export const updateUserData = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updateSwitchProfileFirebase = async (
  userId: string,
  switchState: any
) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, switchState);
};

export const updateTemplateSelectedFirebase = async (
  userId: string,
  newData: any
) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updateDataUserProfile = async (
  userId: string,
  data: any,
  isProUser: boolean
) => {
  try {
    const profRef = isProUser
      ? { 'profile.professional': data }
      : { 'profile.social': data };
    const userDocRef = doc(dataBase, 'users', userId);
    const res = await updateDoc(userDocRef, profRef);
    return res;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};

export const updateSwitchAllFirebase = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updatePasswordFirebase = async (newPassword: string) => {
  const auth =  getAuth(app);
  const user =  auth.currentUser;
  if (user) {
    return await updatePassword(user, newPassword)
      .then(() => {
        console.debug('Contraseña actualizada correctamente');
        return true;
      })
      .catch((error) => {
        console.debug('Error al actualizar la contraseña:', error.message);
        return false;
      });
  } else {
    console.debug('No hay un usuario autenticado');
    return false;
  }
};

export const updateSwitchActivateCard = async (
  userId: string,
  switchState: any
) => {
  try {
    const userDocRef = doc(dataBase, 'users', userId);
    const res = await updateDoc(userDocRef, switchState);
    return res;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};

export const updateViewsUser = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updatePreView = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updateInactiveUser = async (
  userId: string,
  newData: any
): Promise<boolean> => {
  try {
    const userDocRef = doc(dataBase, 'users', userId);
    await updateDoc(userDocRef, newData);
    return true;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return false;
  }
};
