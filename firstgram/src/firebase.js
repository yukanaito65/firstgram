import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_NOT_SECRET_CODE,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "firstgram-1b4ce.appspot.com",
  messagingSenderId: "118853383042",
  appId: "1:118853383042:web:3675f7ae848b9bdb3a159b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 今回はfirestoreを使う、これでdbにfirebaseに保存されたデータが格納される
const db = getFirestore(app);
const storage = getStorage(app);


// 上記2つの変数をどこででも使えるようにexportする
export { db, storage };

//Firebaseの認証機能を使う場合に必要な記述
export const auth = getAuth(app);
