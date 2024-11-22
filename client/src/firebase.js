import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyCDe-BNzyF1txsyks6AFPPEhLqCtJmzB_k",
  authDomain: "verifyotp-fc8cf.firebaseapp.com",
  projectId: "verifyotp-fc8cf",
  storageBucket: "verifyotp-fc8cf.firebasestorage.app",
  messagingSenderId: "897613265668",
  appId: "1:897613265668:web:7e988f20c221503ca8ee51",
  measurementId: "G-SYW7CJPY86"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };