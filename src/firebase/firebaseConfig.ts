import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

export const dataBase = firestore();
export const authFire = auth()
export const message = messaging();
export const AuthorizationStatus = messaging.AuthorizationStatus; // Exporta AuthorizationStatus
export const fieldValue = firestore.FieldValue; // Exporta FieldValue