
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGj0hhi9_FFqKgOlygG1kuFVjdwltoE_4",
  authDomain: "maltimart-fe294.firebaseapp.com",
  projectId: "maltimart-fe294",
  storageBucket: "maltimart-fe294.appspot.com",
  messagingSenderId: "791487648988",
  appId: "1:791487648988:web:27382adaa801bef57e1019"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage  = getStorage(app)

export default app