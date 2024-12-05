import {initializeApp} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBsybfHvoAj3Bvtzu_WwFq3fj9bWOYVziM",
  authDomain: "onetapcorp-d0146.firebaseapp.com",
  projectId: "onetapcorp-d0146",
  storageBucket: "onetapcorp-d0146.appspot.com",
  messagingSenderId: "828170350312",
  appId: "1:828170350312:web:e023c1b6a14e680233235d",
  measurementId: "G-ES4RD6WMNW",
  databaseURL: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dataBase = firestore();
export const authFire = auth()
export const message = messaging();
export const AuthorizationStatus = messaging.AuthorizationStatus; // Exporta AuthorizationStatus
export const fieldValue = firestore.FieldValue; // Exporta FieldValue