// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA2M2eCHGo9Sm8Mg_DztcvVCN_DPTNL3Y",
  authDomain: "cs5513week08.firebaseapp.com",
  projectId: "cs5513week08",
  storageBucket: "cs5513week08.appspot.com",
  messagingSenderId: "1077282829804",
  appId: "1:1077282829804:web:37efae8fe796fbce01bcc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
