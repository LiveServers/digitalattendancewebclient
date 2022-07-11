import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyD1cdcxgZLYj_ZA1c7OeihPo1oQ2rIV16Y',
  authDomain: 'digital-attendance-2afa8.firebaseapp.com',
  projectId: 'digital-attendance-2afa8',
  storageBucket: 'digital-attendance-2afa8.appspot.com',
  messagingSenderId: '933289084839',
  appId: '1:933289084839:web:55c8def7e662ca2b3bd882',
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth, signInWithEmailAndPassword, addDoc, collection, setDoc, doc, getDoc}