import React, { useState } from "react";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getDoc,
  doc,
  deleteDoc,
  collection,
  CollectionReference,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
  orderBy,
  startAt,
  endAt
} from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { db } from "../../firebase";

function SearchPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [name, setName] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [icon, setIcon] = useState<string>("")

  const accountList = async() => {
  const queryPost = query(
    collection(db, "user"),
    where("name", "==", true),
    orderBy("message"),
    startAt(searchValue),
    endAt(searchValue + '\uf8ff'),
  );
  
  console.log(queryPost)

//   const usersRef = collection(db, "user");

// getDocs(query(usersRef, orderBy("age", "desc"))).then(snapshot => {
//   snapshot.forEach(doc => {
//     console.log(`${doc.id}: ${doc.data().userName}`);
//   })
// })

  const querySnapshot = await getDocs(queryPost);
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = (doc.id, " => ", doc.data());
    console.log(data);
  });
}

  return (
    <div>
      <input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p>{searchValue}</p>

      <button onClick={accountList}>検索</button>
    </div>
  );
}

export default SearchPage;

// まずはアカウント検索
// まずはsearchValueと一致するデータを取ってくる
