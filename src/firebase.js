// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt1-XR7PMnIYEXPF8m8IvEyMl1pdKN-GU",
  authDomain: "one-drive-project-d53fc.firebaseapp.com",
  projectId: "one-drive-project-d53fc",
  storageBucket: "one-drive-project-d53fc.appspot.com",
  messagingSenderId: "727181624033",
  appId: "1:727181624033:web:dea97422e44f54e23d6da0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const storage = getStorage(app);
 const db = getFirestore(app);
 const auth = getAuth();
export {app,storage,db,auth};