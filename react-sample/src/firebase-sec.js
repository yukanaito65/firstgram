import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

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
// const db = getFirestore(app);

const storage = getStorage(app);

// 上記2つの変数をどこででも使えるようにexportする
// export { db };

export default storage;
