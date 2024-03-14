import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN3tkrUuf6AY8QRLLHMVc4ZZ72zf1cd54",
  authDomain: "swipp-b74be.firebaseapp.com",
  projectId: "swipp-b74be",
  storageBucket: "swipp-b74be.appspot.com",
  messagingSenderId: "147022767859",
  appId: "1:147022767859:web:185aecccdf9c031f99b986",
  measurementId: "G-11Q86C19N2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
