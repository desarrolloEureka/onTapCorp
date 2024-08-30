import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsybfHvoAj3Bvtzu_WwFq3fj9bWOYVziM",
  authDomain: "onetapcorp-d0146.firebaseapp.com",
  projectId: "onetapcorp-d0146",
  storageBucket: "onetapcorp-d0146.appspot.com",
  messagingSenderId: "828170350312",
  appId: "1:828170350312:web:e023c1b6a14e680233235d",
  measurementId: "G-ES4RD6WMNW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
export const authFire = getAuth(app);
