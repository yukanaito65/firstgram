import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKqvjXcfg59UE5XBtzXAr7z3dzAa3O2zc",
  authDomain: "sns-app-c00fe.firebaseapp.com",
  projectId: "sns-app-c00fe",
  storageBucket: "sns-app-c00fe.appspot.com",
  messagingSenderId: "325481626795",
  appId: "1:325481626795:web:b44e1d09ae578534450bee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 今回はfirestoreを使う、これでdbにfirebaseに保存されたデータが格納される
const db = getFirestore(app);

// 上記2つの変数をどこででも使えるようにexportする
export { db };
