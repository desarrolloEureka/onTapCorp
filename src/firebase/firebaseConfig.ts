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

{/*
  const firebaseConfig = {
  apiKey: "AIzaSyBMxPncTwFOXkpvGR6Mc8UBdGDRPK-ljfo",
  authDomain: "ontapcorp-backoffice.firebaseapp.com",
  projectId: "ontapcorp-backoffice",
  storageBucket: "ontapcorp-backoffice.appspot.com",
  messagingSenderId: "613452523667",
  appId: "1:613452523667:web:471ae1eb4677d110ab0566",
  measurementId: "G-GGMTTWBPQZ"
};
  */}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
export const authFire = getAuth(app);
