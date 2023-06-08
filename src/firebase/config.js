import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "", //PASTE YOUR API KEY HERE
    authDomain: "olx-clone-e0d9e.firebaseapp.com",
    projectId: "olx-clone-e0d9e",
    storageBucket: "olx-clone-e0d9e.appspot.com",
    messagingSenderId: "846986955963",
    appId: "1:846986955963:web:23ad3e1d2d4e9f74866d9e",
    measurementId: "G-VTJ1YPZ65Y"
  };

export default firebase.initializeApp(firebaseConfig);



