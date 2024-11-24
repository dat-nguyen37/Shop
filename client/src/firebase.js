import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApahWtydME7lqcjSDlVkKWwKO3XcvgXQU",
  authDomain: "noithat-b8966.firebaseapp.com",
  projectId: "noithat-b8966",
  storageBucket: "noithat-b8966.appspot.com",
  messagingSenderId: "378962598654",
  appId: "1:378962598654:web:1c67cb8a3ba13f93eaa3af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imgDb=getStorage(app) 