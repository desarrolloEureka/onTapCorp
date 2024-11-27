import {dataBase, authFire} from '../firebase/firebaseConfig';

const userRefByUser = (ref: any) => {
  return dataBase.collection('users').where('user_name', '==', ref.user);
};

export const userExist = async (user: string) => {
  //this function must be removed
  let userFound = null;
  try {
    const querySnapshot = await userRefByUser(user).get();
    if (querySnapshot.empty) {
      return false;
    }
    querySnapshot.forEach(doc => {
      userFound = doc.data();
    });
    return userFound;
  } catch (error) {
    console.error('Error al verificar si el usuario existe:', error);
    return false;
  }
};

const userRefByEmail = async (email: string) => {
  try {
    const usersCollection = await dataBase.collection('users').get();
    for (const doc of usersCollection.docs) {
      const userData = doc.data();
      if (userData?.emails != undefined) {
        const userEmail = userData?.emails[0]?.text;
        if (userEmail === email) {
          return userData;
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error al buscar usuario por email:', error);
    return null;
  }
};

export const registerFirebase = async (user: string, password: string) => {
  try {
    const userCredential = await authFire.createUserWithEmailAndPassword(
      user,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
  }
};

export const loginFirebase = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  try {
    const userCredential = await authFire.signInWithEmailAndPassword(
      user,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.debug('error message', error);
    return null;
  }
};

export const resetPasswordFirebase = async (email: string) => {
  try {
    // Verificar si el usuario existe en Firestore
    const user = await userRefByEmail(email);
    if (user != null) {
      // Enviar correo de restablecimiento de contraseña
      await authFire.sendPasswordResetEmail(email);
      console.log('Email de restablecimiento enviado correctamente.');
      return 'success';
    } else {
      console.log(
        `El usuario con correo electrónico ${email} no está registrado.`,
      );
      return 'user_not_found';
    }
  } catch (error) {
    console.error('Error al enviar el email de restablecimiento:', error);
    return 'send_email_failed';
  }
};

export const changePasswordFirebase = async (
  oobCode: string,
  confirmPassword: string,
) => {
  try {
    await authFire.confirmPasswordReset(oobCode, confirmPassword);
    return true;
  } catch (error) {
    console.debug('error message', error);
    return null;
  }
};
