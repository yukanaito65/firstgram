import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB5ojtvdlzeFl6pzQkME8Z0ySNDNIjaNQ4",
  authDomain: "test2-1dcda.firebaseapp.com",
  projectId: "test2-1dcda",
  storageBucket: "test2-1dcda.appspot.com",
  messagingSenderId: "697679529997",
  appId: "1:697679529997:web:37ca51ced0c41613b4ed44"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 今回はfirestoreを使う、これでdbにfirebaseに保存されたデータが格納される
const db = getFirestore(app);


// 上記2つの変数をどこででも使えるようにexportする
export { db };

//Firebaseの認証機能を使う場合に必要な記述
export const auth = getAuth(app);
