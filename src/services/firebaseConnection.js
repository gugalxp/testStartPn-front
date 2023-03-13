import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyBeIzuTWjEX10F2csWCpzmjSo0bEndkV4U",
  authDomain: "sistema-5969a.firebaseapp.com",
  projectId: "sistema-5969a",
  storageBucket: "sistema-5969a.appspot.com",
  messagingSenderId: "974169491126",
  appId: "1:974169491126:web:e16861167f382fa9630817",
  measurementId: "G-VRVCDHZ7RZ"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;