import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNssDMHzvnvrHLx4TyFxkVagyrrgG5Slk",
  authDomain: "react-twitter-clone-practice.firebaseapp.com",
  projectId: "react-twitter-clone-practice",
  storageBucket: "react-twitter-clone-practice.appspot.com",
  messagingSenderId: "802155933543",
  appId: "1:802155933543:web:b45e5b2a6b0cbacc8089c2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const database = getFirestore(app);
