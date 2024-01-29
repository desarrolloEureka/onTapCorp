import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import {
  getAuth, updatePassword
} from 'firebase/auth';
import {
  AllRefPropsFirebase,
  GetUserByLoginProps,
  LoginRefProps,
  RefPropsFirebase,
} from '../types/userFirebase';
import { dataBase } from './firebaseConfig';
import { UserData } from '../types/user';
import { DataForm } from '../types/profile';

const ref = ({ ref, collection }: RefPropsFirebase) =>
  doc(dataBase, collection, ref.document);

const allRef = ({ ref }: AllRefPropsFirebase) => collection(dataBase, ref);

const loginRef = ({ user, password }: LoginRefProps) =>
  query(
    collection(dataBase, 'users'),
    where('user_name', '==', user),
    where('password', '==', password)
  );

export const getUserById = async (user: string) =>
  await getDoc(doc(dataBase, 'users', user));

// ref({ ref: user, collection: 'users' });

export const getAllUsers = async () => await getDocs(allRef({ ref: 'users' }));

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

export const updateDataUserProfile = async (userId: string, data: DataForm) => {
  try {
    const userDocRef = doc(dataBase, 'users', userId);
    const res = await updateDoc(userDocRef, { profile: data });
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

export const updatePasswordFirebase = (newPassword: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return updatePassword(user, newPassword)
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