import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAKqvjXcfg59UE5XBtzXAr7z3dzAa3O2zc",
//   authDomain: "sns-app-c00fe.firebaseapp.com",
//   projectId: "sns-app-c00fe",
//   storageBucket: "sns-app-c00fe.appspot.com",
//   messagingSenderId: "325481626795",
//   appId: "1:325481626795:web:b44e1d09ae578534450bee"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBOdixOrF8HVWCth1WaH7XphdXFJBHIxWM",
//   authDomain: "test-f7eb9.firebaseapp.com",
//   projectId: "test-f7eb9",
//   storageBucket: "test-f7eb9.appspot.com",
//   messagingSenderId: "595176906429",
//   appId: "1:595176906429:web:09162605721036572e21d4"
// };


const firebaseConfig = {
  // apiKey: "AIzaSyB5ojtvdlzeFl6pzQkME8Z0ySNDNIjaNQ4",
  apiKey: process.env.REACT_APP_NOT_SECRET_CODE,
  authDomain: "test2-1dcda.firebaseapp.com",
  projectId: "test2-1dcda",
  storageBucket: "test2-1dcda.appspot.com",
  messagingSenderId: "697679529997",
  appId: "1:697679529997:web:37ca51ced0c41613b4ed44"
};
//apiKey: process.env.REACT_APP_NOT_SECRET_CODE

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 今回はfirestoreを使う、これでdbにfirebaseに保存されたデータが格納される
const db = getFirestore(app);
const storage = getStorage(app);


// 上記2つの変数をどこででも使えるようにexportする
export { db, storage };

//Firebaseの認証機能を使う場合に必要な記述
export const auth = getAuth(app);
