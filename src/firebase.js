// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQF2YqFv_ewEXjj6_uk2poYEyK5u1Sdu4",
  authDomain: "crs-in-react-js-c7752.firebaseapp.com",
  projectId: "crs-in-react-js-c7752",
  storageBucket: "crs-in-react-js-c7752.appspot.com",
  messagingSenderId: "236703955362",
  appId: "1:236703955362:web:b24a1788daec85e7249afb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
