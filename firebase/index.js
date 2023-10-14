// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX8QFnWiQHXL3hRQrT3iCxkZVCEDWiT48",
  authDomain: "cs5513week07.firebaseapp.com",
  projectId: "cs5513week07",
  storageBucket: "cs5513week07.appspot.com",
  messagingSenderId: "723613043474",
  appId: "1:723613043474:web:ff7b70334f8412f6ef81cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };