import {app, dataBase} from '../firebase/firebaseConfig';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {GetAllUserQuery} from "../reactQuery/users"

const auth = getAuth(app);
const userRefByUser = (ref: any) =>
  query(collection(dataBase, 'users'), where('user_name', '==', ref.user));

export const userExist = async (user: string) => {
  //this function must be removed
  let userFound = null;
  const querySnapshot = await getDocs(userRefByUser(user));
  if (querySnapshot.empty) {
    return false;
  }

  querySnapshot.forEach(doc => {
    //localStorage.setItem('@user', JSON.stringify(doc.data()));
    userFound = doc.data();
  });
  return userFound;
};

export const loginFirebase = async ({user, password}: any) => {
  try {
    const loginF = await signInWithEmailAndPassword(auth, user, password);
    return loginF;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};

export const registerFirebase = async (user: string, password: string) => {
  createUserWithEmailAndPassword(auth, user, password);
};

// const userRefByEmail = (email: any) => query(collection(dataBase, 'users'), where('email', '==', email));

const userRefByEmail = async (email: any) => {
  const usersQuery = query(collection(dataBase, 'users'));
  const querySnapshot = await getDocs(usersQuery);
  for (const doc of querySnapshot.docs) {
    const userData = doc.data();
    if(userData?.emails != undefined) {
      const userEmail = userData?.emails[0]?.text;
      if (userEmail === email) {
        return userData;
      }
    }
  }
  return null
};

export const resetPasswordFirebase = async (email: string) => {
  try {
    // Verificar si el usuario existe en Firestore
    const user = await userRefByEmail(email);
    if (user != null) {
      // Enviar correo de restablecimiento de contraseña
      await sendPasswordResetEmail(auth, email);
      console.log('Email de restablecimiento enviado correctamente.');
      return 'success';
    } else {
      console.log(
        `El usuario con correo electrónico ${email} no está registrado.`
      );
      return 'user_not_found';
    }
  } catch (error: any) {
    console.error('Error al enviar el email de restablecimiento:', error);
    return 'send_email_failed';
  }
};

export const changePasswordFirebase = async (
  oobCode: string,
  confirmPassword: string
) => {
  try {
    await confirmPasswordReset(auth, oobCode, confirmPassword);
    return true;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};
